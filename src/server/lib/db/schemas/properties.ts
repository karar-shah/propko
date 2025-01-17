import mongoose, { Schema } from "mongoose";
import { createId } from "@paralleldrive/cuid2";

export type IPropertyStatus = "draft" | "published";

export type IProperty = {
  userId: string;
  id: string;
  status: IPropertyStatus;
  propertyType?: string;
  propertyHighlights?: Array<IPropertyHighlight>;
  propertyDescription?: IPropertyDescription;
  mediaFiles?: Array<ICldFile>;
  propertyDetails?: IPropertyDetails;
  location?: IAddressDetails;
};

const PropertiesSchema = new mongoose.Schema<IProperty>(
  {
    id: {
      type: String,
      index: {
        unique: true,
      },
      default: () => createId(),
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    userId: {
      type: String,
    },
    propertyType: {
      type: String,
    },
    mediaFiles: {
      type: Array<ICldFile>,
    },
    location: {
      type: Schema.Types.Mixed,
    },
    propertyDetails: {
      type: Schema.Types.Mixed,
    },
    propertyHighlights: {
      type: Array<IPropertyHighlight>,
    },
    propertyDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    // _id: false,
  }
);

let Property: mongoose.Model<IProperty> =
  mongoose.models.Properties ||
  mongoose.model<IProperty>("Properties", PropertiesSchema);

export default Property;
