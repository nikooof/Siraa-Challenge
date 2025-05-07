export interface PropertyData {
  property_name: string;
  property_type: string;
  developer: string;
  country: string;
  city: string;
  location: string;
  price: string;
  description: string;
  bedrooms: string;
  bathroom: string;
  area: string;
  payment_plan: string;
  handover: string;
  down_payment: string;
  average_price_per_sqft: string;
  has_maid_room: boolean;
  has_air_conditioning: boolean;
  has_balcony_terrace: boolean;
  has_bult_in_wadrobes: boolean;
  has_walk_in_closet: boolean;
  has_health_care_center: boolean;
  has_kids_play_area: boolean;
  has_laundry: boolean;
  has_sauna: boolean;
  has_spa: boolean;
  has_indoor_pool: boolean;
  has_lobby_reception: boolean;
  has_concierge: boolean;
  has_prayer_room: boolean;
  has_parking: boolean;
  has_garden: boolean;
  has_shared_pool: boolean;
  has_landmark_views: boolean;
  has_tennis_cout: boolean;
  has_running_track: boolean;
  has_outdoor_dining: boolean;
  has_outdoor_gymnasium: boolean;
  has_bbq_area: boolean;
  is_pet_friendly: boolean;
}

export interface ParsedResult {
  type: string;
  hash_key: string;
  property_data: PropertyData;
}
