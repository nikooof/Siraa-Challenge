import json
import re
from typing import Dict
from fastapi import APIRouter, UploadFile, File, HTTPException
from src.llm_client import extract_with_gemini
from src.utils import normalize_bools, normalize_strings, generate_hash_keys
from src.storage import cache_result, load_cached, save_temp_pdf, archive_pdfs
from src.PropertyData import PropertyData
from pathlib import Path
from src.config import CACHED_DATA_DIR

parse_router = APIRouter()


@parse_router.post("/parse")
async def parse(
    brochure: UploadFile = File(...),
    floor_plan: UploadFile = File(...),
) -> Dict[str, str | PropertyData]:
    try:
        brochure_bytes = await brochure.read()
        floor_plan_bytes = await floor_plan.read()
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Brochure or Floor Plan Read Error: {e}"
        )

    hash_key = generate_hash_keys(brochure_bytes, floor_plan_bytes)

    cached_data_path: Path = CACHED_DATA_DIR / f"{hash_key}.json"

    if cached_data_path.exists():
        return {
            "type": "cached",
            "hash_key": hash_key,
            "property_data": load_cached(hash_key),
        }

    temp_dir: Path = Path("/tmp")
    temp_dir.mkdir(parents=True, exist_ok=True)

    brochure_name: str = brochure.filename or ""
    floor_plan_name: str = floor_plan.filename or ""

    brochure_suffix: str = Path(brochure_name).suffix or ".pdf"
    floor_plan_suffix: str = Path(floor_plan_name).suffix or ".pdf"

    try:
        brochure_tmp = save_temp_pdf(brochure_bytes, Path(brochure_suffix).suffix)
        floor_plan_tmp = save_temp_pdf(floor_plan_bytes, Path(floor_plan_suffix).suffix)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write temp files: {e}")

    archive_pdfs(hash_key, brochure_tmp, floor_plan_tmp)

    raw_text: str = extract_with_gemini(brochure_tmp, floor_plan_tmp)

    if raw_text.strip().startswith("```"):
        raw_text = re.sub(r"^```(?:json)?", "", raw_text, flags=re.IGNORECASE)
        raw_text = re.sub(r"```$", "", raw_text)

    raw_text = raw_text.strip()

    try:
        extracted_property_data: dict[str, str | bool] = json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse JSON: {e}")

    kwargs = {}
    kwargs.update(normalize_strings(extracted_property_data))
    kwargs.update(normalize_bools(extracted_property_data))

    property_data = PropertyData(**kwargs)

    cache_result(hash_key, property_data)

    return {"type": "api", "hash_key": hash_key, "property_data": property_data}
