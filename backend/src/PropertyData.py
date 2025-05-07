from pydantic import BaseModel


class PropertyData(BaseModel):
    property_name: str
    property_type: str
    developer: str
    country: str
    city: str
    location: str
    price: str
    description: str
    bedrooms: str
    bathroom: str
    area: str
    payment_plan: str
    handover: str
    down_payment: str
    average_price_per_sqft: str
    has_maid_room: bool
    has_air_conditioning: bool
    has_balcony_terrace: bool
    has_bult_in_wadrobes: bool
    has_walk_in_closet: bool
    has_health_care_center: bool
    has_kids_play_area: bool
    has_laundry: bool
    has_sauna: bool
    has_spa: bool
    has_indoor_pool: bool
    has_lobby_reception: bool
    has_concierge: bool
    has_prayer_room: bool
    has_parking: bool
    has_garden: bool
    has_shared_pool: bool
    has_landmark_views: bool
    has_tennis_cout: bool
    has_running_track: bool
    has_outdoor_dining: bool
    has_outdoor_gymnasium: bool
    has_bbq_area: bool
    is_pet_friendly: bool


class EditedPropertyData(BaseModel):
    type: str
    hash_key: str
    property_data: PropertyData
