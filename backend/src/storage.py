import shutil
import uuid
from pathlib import Path
from src.PropertyData import PropertyData
from src.config import CACHED_DATA_DIR, PDF_UPLOADS_DIR


def save_temp_pdf(bytes_: bytes, suffix: str) -> Path:
    tmp = Path("/tmp")
    tmp.mkdir(exist_ok=True, parents=True)
    p = tmp / f"{uuid.uuid4()}{suffix}"
    p.write_bytes(bytes_)
    return p


def cache_result(hash_key: str, data: PropertyData):
    p = CACHED_DATA_DIR / f"{hash_key}.json"
    p.write_text(data.model_dump_json(indent=2), encoding="utf-8")


def load_cached(hash_key: str) -> PropertyData:
    raw = (CACHED_DATA_DIR / f"{hash_key}.json").read_text(encoding="utf-8")
    return PropertyData.model_validate_json(raw)


def archive_pdfs(hash_key: str, *paths: Path):
    for src in paths:
        dst = PDF_UPLOADS_DIR / f"{hash_key}_{src.stem.split('_')[-1]}.pdf"
        shutil.copy(src, dst)
