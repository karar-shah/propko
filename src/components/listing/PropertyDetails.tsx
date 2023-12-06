"use client";
import { cn } from "@/lib/utils";
import { useListingStore } from "./listing-store";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";
import { Label } from "../ui/label";
import { CountInput, SwitchEl } from "./inputs";
import { SelectEl } from "../ui/select";

export default function PropertyDetails() {
  const { listingData, setPropertyDetails } = useListingStore();
  console.log("listingData", listingData);

  const handleNext = () => {
    if (!listingData?.propertyDetails) return false;
    if (!listingData?.propertyDetails.saleType) return false;
    if (!listingData?.propertyDetails.holdType) return false;
    return true;
  };

  return (
    <StepsLayout
      heading={stepsHeadings.propertyDetails}
      handleNext={handleNext}
      nextBtn={{
        disabled: !listingData?.propertyDetails,
      }}
    >
      <div
        className={cn(
          "flex-1 w-full max-w-[800px] mx-auto gap-5",
          "py-10 divide-y divide-slate-200 dark:divide-slate-700/50"
        )}
      >
        <div className="flex items-center justify-between py-5 w-full">
          <Label className="text-lg">Is this for Sale or Rent?</Label>
          <SwitchEl
            onChange={(value) => {
              setPropertyDetails({
                ...listingData.propertyDetails,
                saleType: value as any,
              });
            }}
            options={["Sale", "Rent"]}
          />
        </div>
        {listingData?.propertyDetails?.saleType === "Sale" && (
          <div className="flex items-center justify-between py-5 w-full">
            <Label className="text-lg">Select One</Label>
            <SwitchEl
              onChange={(value) => {
                setPropertyDetails({
                  ...listingData.propertyDetails,
                  holdType: value as any,
                });
              }}
              options={["Freehold", "Leasehold"]}
            />
          </div>
        )}
        <div className="flex items-center justify-between py-5 w-full">
          <Label className="text-lg">Bathrooms</Label>
          <CountInput
            onChange={(value) => {
              setPropertyDetails({
                ...listingData.propertyDetails,
                bathrooms: value,
              });
            }}
          />
        </div>
        <div className="flex items-center justify-between py-5 w-full">
          <Label className="text-lg">Bedrooms</Label>
          <CountInput
            onChange={(value) => {
              setPropertyDetails({
                ...listingData.propertyDetails,
                bedrooms: value,
              });
            }}
          />
        </div>
        <div className="flex items-center justify-between py-5 w-full">
          <Label className="text-lg">Dropdown</Label>
          <SelectEl
            className="min-w-[300px]"
            onChange={(value) => console.log(value)}
            options={[
              { label: "Option 1", value: "opt1" },
              { label: "Option 2", value: "opt2" },
              { label: "Option 3", value: "opt3" },
            ]}
          />
        </div>
      </div>
    </StepsLayout>
  );
}
