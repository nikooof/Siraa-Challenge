from fastapi import APIRouter
from src.PropertyData import EditedPropertyData
from src.storage import cache_result
from src.config import (
    USER_SUBMISSIONS_DIR,
    TRAINING_DATA_DIR,
    PDF_UPLOADS_DIR,
    CACHED_DATA_DIR,
)
import uuid
import shutil

submit_router = APIRouter()


@submit_router.post("/submit")
async def updating_property_data(data: EditedPropertyData) -> dict[str, str]:
    sid = uuid.uuid4().hex

    property_data = data.property_data.model_dump_json(indent=2)

    user_submission_path = USER_SUBMISSIONS_DIR / f"{sid}.json"
    user_submission_path.write_text(property_data, encoding="utf-8")

    training_data_path = TRAINING_DATA_DIR / data.hash_key
    training_data_path.mkdir(parents=True, exist_ok=True)

    for original_copy in PDF_UPLOADS_DIR.glob(f"{data.hash_key}_*.pdf"):
        shutil.copy(original_copy, training_data_path / original_copy.name)

    original_property_data_json = CACHED_DATA_DIR / f"{data.hash_key}.json"
    shutil.copy(
        original_property_data_json, training_data_path / "original_property_data.json"
    )

    updated_property_data_json = training_data_path / "updated_property_data.json"
    updated_property_data_json.write_text(property_data, encoding="utf-8")

    cache_result(data.hash_key, data.property_data)

    return {"status": "ok", "id": sid}
