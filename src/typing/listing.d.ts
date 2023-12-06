type IAddressDetails = {
  country: string;
  city: string;
  street: string;
  landmark?: string;
  state?: string;
  fullAddress: string;
  postCode?: string;
};

type IListingStep =
  | "idle"
  | "property-type"
  | "property-details"
  | "location"
  | "highlights"
  | "media-files"
  | "publish";

type IPropertySaleType = "Rent" | "Sale";
type IPropertyHoldType = "Freehold" | "Leasehold";

type IPropertyDetails = {
  bedrooms?: number;
  bathrooms?: number;
  saleType?: IPropertySaleType;
  holdType?: IPropertyHoldType;
};
type IPropertyHighlights = {
  wifi?: boolean;
  tv?: boolean;
  kitchen?: boolean;
  washer?: boolean;
  freeParkingOnPremises?: boolean;
  paidParkingOnPremises?: boolean;
  airConditioning?: boolean;
  dedicatedWorkspace?: boolean;
  pool?: boolean;
  hotTub?: boolean;
  patio?: boolean;
  bbqGrill?: boolean;
  outdoorDiningArea?: boolean;
  firePit?: boolean;
  poolTable?: boolean;
  indoorFireplace?: boolean;
  piano?: boolean;
  exerciseEquipment?: boolean;
  lakeAccess?: boolean;
  beachAccess?: boolean;
  skiInSkiOut?: boolean;
  outdoorShower?: boolean;
  smokeAlarm?: boolean;
  firstAidKit?: boolean;
  fireExtinguisher?: boolean;
  carbonMonoxideAlarm?: boolean;
};

// type IPropertyHighlightItem = {
//   Wifi?: string;
//   TV?: string;
//   Kitchen?: string;
//   Washer?: string;
//   "Free parking on premises"?: string;
//   "Paid parking on premises"?: string;
//   "Air conditioning"?: string;
//   "Dedicated workspace"?: string;
//   Pool?: string;
//   "Hot tub"?: string;
//   Patio?: string;
//   "BBQ grill"?: string;
//   "Outdoor dining area"?: string;
//   "Fire pit"?: string;
//   "Pool table"?: string;
//   "Indoor fireplace"?: string;
//   Piano?: string;
//   "Exercise equipment"?: string;
//   "Lake access"?: string;
//   "Beach access"?: string;
//   "Ski-in/Ski-out"?: string;
//   "Outdoor shower"?: string;
//   "Smoke alarm"?: string;
//   "First aid kit"?: string;
//   "Fire extinguisher"?: string;
//   "Carbon monoxide alarm"?: string;
// };

// type IPropertyHighlights = {
//   wifi?: string | boolean;
//   tv?: string | boolean;
// };

type IListingData = {
  dbRef?: string;
  location?: IAddressDetails;
  propertyType?: string;
  propertyDetails?: IPropertyDetails;
  propertyHighlights?: IPropertyHighlights;
  mediaFiles?: ILocalFile[];
};

// type SetPropertyHighlightsFunction = (
//   value: IPropertyHighlights | IPropertyHighlights[] | undefined
// ) => void;
