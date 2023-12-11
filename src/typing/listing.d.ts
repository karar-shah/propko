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
  | "description"
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

type IPropertyDescription = string;
//{
//   description: string;
// };

type IListingData = {
  userId?: string;
  dbRef?: string;
  location?: IAddressDetails;
  propertyType?: string;
  propertyDetails?: IPropertyDetails;
  propertyHighlights?: IPropertyHighlight[];
  propertyDescription?: IPropertyDescription;
  mediaFiles?: ILocalFile[];
};
