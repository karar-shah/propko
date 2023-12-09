import { connectMongoose, db } from "@/server/lib/db";
import Property, {
  IProperty,
  IPropertyStatus,
} from "@/server/lib/db/schemas/properties";
import { ApiResponse, PaginatedApiResponse } from "@/typing/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userid");
  console.log("userId", userId);
  try {
    await connectMongoose();
    const properties = await db.Property.find();

    // Map properties to the desired format
    const mappedProperties = properties.map((property: any) => ({
      id: property.id,
      status: property.status,
      propertyType: property.propertyType,
      location: property.location,
      mediaFiles: property.mediaFiles,
      propertyDetails: property.propertyDetails,
      propertyHighlights: property.propertyHighlights,
      updatedAt: property.updatedAt,
    }));

    return NextResponse.json({
      succeed: true,
      data: mappedProperties,
      code: "SUCCESS",
      pagination: {
        page: 1,
        perPage: 1,
        results: 1,
        count: 1,
        totalPages: 1,
      },
    } satisfies PaginatedApiResponse<IProperty[]>);

    // satisfies ApiResponse<IProperty>);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      succeed: false,
      code: "UNKOWN_ERROR",
    } satisfies ApiResponse<IProperty>);
  }
};

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
          ...(body.propertyHighlights && {
            $set: { propertyHighlights: body.propertyHighlights },
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
        propertyHighlights: body.propertyHighlights,
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
        propertyHighlights: property.propertyHighlights,
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
