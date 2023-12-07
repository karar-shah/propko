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

type IPropertyHighlight = {
  name: string;
};

type IListingData = {
  dbRef?: string;
  location?: IAddressDetails;
  propertyType?: string;
  propertyDetails?: IPropertyDetails;
  propertyHighlights?: IPropertyHighlight[];
  mediaFiles?: ILocalFile[];
};
