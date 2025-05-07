from hashlib import sha256
from src.config import STR_FIELDS, BOOL_FIELDS, NO_RELEVANT_DATA_EXTRACTED


def normalize_strings(data: dict[str, str | bool]) -> dict[str, str | bool]:
    return {k: (data.get(k) or NO_RELEVANT_DATA_EXTRACTED) for k in STR_FIELDS}


def normalize_bools(data: dict[str, str | bool]) -> dict[str, str | bool]:
    return {k: bool(data.get(k)) for k in BOOL_FIELDS}


def generate_hash_keys(bytes_1: bytes, bytes_2: bytes) -> str:
    hash_key_1 = sha256(bytes_1).hexdigest()
    hash_key_2 = sha256(bytes_2).hexdigest()

    first, second = sorted([hash_key_1, hash_key_2])

    combined_hash_key = "".join(f"{first}{second}").encode()
    return sha256(combined_hash_key).hexdigest()
