"use client";
import GetStarted from "./GetStarted";
import PropertyTypeInput from "./PropertyTypeInput";
import LocationInput from "./LocationInput";
import { IListingStep, useListingStore } from "./listing-store";
import MediaInput from "./MediaInput";

const getCurrentStepHeading = (step: IListingStep) => {
  if (step === "location") {
    return (
      <span>
        Select Location <span className="text-red-500">*</span>
      </span>
    );
  }
  if (step === "property-type") {
    return (
      <span>
        Select Property Type <span className="text-red-500">*</span>
      </span>
    );
  }
  if (step === "media-files") {
    return <span>Select Media Files (Optional) </span>;
  }
  return <span>Start your listing on Propko</span>;
};

export default function StepsContainer() {
  const { currentStep, handleNextStep } = useListingStore();

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold underline underline-offset-[12px] decoration-[3px] text-center">
          {getCurrentStepHeading(currentStep)}
        </h1>
      </div>
      {currentStep === "media-files" ? (
        <MediaInput />
      ) : currentStep === "property-type" ? (
        <PropertyTypeInput />
      ) : currentStep === "location" ? (
        <LocationInput />
      ) : (
        <GetStarted />
      )}
    </>
  );
}
