from dotenv import load_dotenv
from pathlib import Path
from typing import List, Any
import os

load_dotenv(override=True)

NO_RELEVANT_DATA_EXTRACTED: str = "NO_RELEVANT_DATA_EXTRACTED"
Path("./extras").mkdir(exist_ok=True)
USER_SUBMISSIONS_DIR = Path("./extras/user_submissions")
USER_SUBMISSIONS_DIR.mkdir(exist_ok=True)
CACHED_DATA_DIR = Path("./extras/cached_data")
CACHED_DATA_DIR.mkdir(exist_ok=True)
PDF_UPLOADS_DIR = Path("./extras/pdf_uploads")
PDF_UPLOADS_DIR.mkdir(exist_ok=True)
TRAINING_DATA_DIR = Path("./extras/training_data")
TRAINING_DATA_DIR.mkdir(exist_ok=True)

STR_FIELDS: List[str] = [
    "property_name",
    "property_type",
    "developer",
    "country",
    "city",
    "location",
    "price",
    "description",
    "bedrooms",
    "bathroom",
    "area",
    "payment_plan",
    "handover",
    "down_payment",
    "average_price_per_sqft",
]

BOOL_FIELDS: List[str] = [
    "has_maid_room",
    "has_air_conditioning",
    "has_balcony_terrace",
    "has_bult_in_wadrobes",
    "has_walk_in_closet",
    "has_health_care_center",
    "has_kids_play_area",
    "has_laundry",
    "has_sauna",
    "has_spa",
    "has_indoor_pool",
    "has_lobby_reception",
    "has_concierge",
    "has_prayer_room",
    "has_parking",
    "has_garden",
    "has_shared_pool",
    "has_landmark_views",
    "has_tennis_cout",
    "has_running_track",
    "has_outdoor_dining",
    "has_outdoor_gymnasium",
    "has_bbq_area",
    "is_pet_friendly",
]

CORS: dict[str, Any] = {
    "allow_origins": ["http://localhost:3000"],
    "allow_methods": ["POST", "OPTIONS"],
    "allow_headers": ["Content-Type"],
}

GEMINI_API_KEY: str = os.environ["SIRAA_GEMINI_KEY"]
