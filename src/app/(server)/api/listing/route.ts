import { connectMongoose, db } from "@/server/lib/db";
import Property, {
  IProperty,
  IPropertyStatus,
} from "@/server/lib/db/schemas/properties";
import { ApiResponse } from "@/typing/api";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectMongoose();
  const body = (await req.json()) as IListingData & {
    status?: IPropertyStatus;
  };
  try {
    let property: IProperty | undefined | null;
    property = body.dbRef
      ? (await db.Property.findOne({ id: body.dbRef }))?.toObject()
      : undefined;
    if (property) {
      property = await db.Property.findOneAndUpdate(
        { id: property.id },
        {
          ...(body.propertyType && { propertyType: body.propertyType }),
          ...(body.location && { location: body.location }),
          ...(body.mediaFiles && {
            mediaFiles: body.mediaFiles.map((file: any) => ({
              publicId: file.publicId,
              url: file.url,
            })),
          }),
          ...(body.status && { status: body.status }),
          ...(body.propertyDetails && {
            propertyDetails: body.propertyDetails,
          }),
        }
      );
    } else {
      property = await Property.create({
        propertyType: body.propertyType,
        location: body.location,
        mediaFiles: body.mediaFiles?.map((file: any) => ({
          publicId: file.publicId,
          url: file.url,
        })),
        status: body.status,
        propertyDetails: body.propertyDetails,
      });
    }
    property = await Property.findOne({ id: property?.id });
    if (!property) throw new Error("Failed to save property");
    return NextResponse.json({
      succeed: true,
      data: {
        id: property.id,
        status: property.status,
        propertyType: property.propertyType,
        location: property.location,
        mediaFiles: property.mediaFiles,
        propertyDetails: property.propertyDetails,
      },
      code: "SUCCESS",
    } satisfies ApiResponse<IProperty>);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      succeed: false,
      code: "UNKOWN_ERROR",
    } satisfies ApiResponse<IProperty>);
  }
};
