import mongoose, { Schema } from "mongoose";
import { createId } from "@paralleldrive/cuid2";

export type IPropertyStatus = "draft" | "published";

export type IProperty = {
  id: string;
  status: IPropertyStatus;
  propertyType?: string;
  propertyHighlights?: Array<IPropertyHighlight>;
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
