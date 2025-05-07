from google.genai import Client
from src.config import GEMINI_API_KEY
from pathlib import Path
from fastapi import HTTPException

MODEL: str = "gemini-2.0-flash"

PROMPT: str = """
                You are a real estate expert and are looking through a property's brochure and floor plan to
                determine the following fields exactly with their corresponding definitions:

                • property_name: the name of the building or development.  
                • property_type: type of the property (e.g. villa, townhouse, apartment).  
                • developer: the developer’s name (e.g. Emaar).  
                • country: country where it’s located.  
                • city: city where it’s located.  
                • location: the neighborhood or district within the city.  
                • price: total sale price in AED (numeric), if not in AED; convert it into AED.  
                • description: a 1–2 sentence summary of the property.  
                • bedrooms: number of bedrooms. If given as a range (e.g. “3 to 6”), return "3 to 6".  
                • bathroom: the number of bathrooms in the property.
                • area: the area of the building/property in sqft or whatever unit is there in the files (e.g. 1,000 - 3,200 sqft)
                • payment_plan: text description of the payment schedule.  
                • handover: handover date or quarter (e.g. “Q1 2026”).  
                • down_payment: down payment percentage (numeric, e.g. “20%” → 20).  
                • average_price_per_sqft: calculate price divided by area (numeric).

                Also extract every following field as a boolean (true/false):
                • has_maid_room, has_air_conditioning, has_balcony_terrace 
                • has_bult_in_wadrobes, has_walk_in_closet, has_health_care_center, has_kids_play_area
                • has_laundry, has_sauna, has_spa, has_indoor_pool, has_lobby_reception, has_concierge 
                • has_prayer_room, has_parking, has_garden, has_shared_pool, has_landmark_views 
                • has_tennis_cout, has_running_track, has_outdoor_dining, has_outdoor_gymnasium
                • has_bbq_area, is_pet_friendly

                Return output as a strict JSON object, with exactly these keys and no extra commentary, 
                matching this example scheme exactly:
                {
                    "property_name": "Example Tower",
                    "property_type": "Apartment",
                    "developer": "Emaar",
                    "country": "UAE",
                    "city": "Dubai",
                    "location": "Downtown",
                    "price": 1500000,
                    "description": "A luxury 2-bedroom apartment overlooking the promenade.",
                    "bedrooms": "2 to 5",
                    "bathroom": "2",
                    "area": "1200 sqft",
                    "payment_plan": "50/50",
                    "handover": "Q1 2026",
                    "down_payment": "20",
                    "average_price_per_sqft": "1250",
                    "has_maid_room": false,
                    "has_air_conditioning": true,
                    "has_balcony_terrace": false,
                    "has_bult_in_wadrobes": false,
                    "has_walk_in_closet": true,
                    "has_health_care_center": true,
                    "has_kids_play_area": true,
                    "has_laundry": true,
                    "has_sauna": true,
                    "has_spa": true,
                    "has_indoor_pool": true,
                    "has_lobby_reception": true,
                    "has_concierge": false,
                    "has_prayer_room": true,
                    "has_parking": true,
                    "has_garden": true,
                    "has_shared_pool": true,
                    "has_landmark_views": false,
                    "has_tennis_cout": true,
                    "has_running_track": true,
                    "has_outdoor_dining": true,
                    "has_outdoor_gymnasium": true,
                    "has_bbq_area": true,
                    "is_pet_friendly": true
                }
            """

client: Client = Client(api_key=GEMINI_API_KEY)


def extract_with_gemini(
    pdf_1_path: Path, pdf_2_path: Path, prompt: str = PROMPT
) -> str:
    try:
        pdf_1 = client.files.upload(
            file=pdf_1_path, config={"mime_type": "application/pdf"}
        )
        pdf_2 = client.files.upload(
            file=pdf_2_path, config={"mime_type": "application/pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini file upload error: {e}")

    try:
        response = client.models.generate_content(
            model=MODEL, contents=[pdf_1, pdf_2, prompt]
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Gemini response generation error: {e}"
        )

    return response.text or ""
