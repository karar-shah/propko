"use client";
import GetStarted from "./GetStarted";
import PropertyTypeInput from "./PropertyTypeInput";
import LocationInput from "./LocationInput";
import { ListingStoreProvider, useListingStore } from "./listing-store";
import MediaInput from "./MediaInput";
import PropertyDetails from "./PropertyDetails";
import PropertyHighlights from "./PropertyHighlights";

function StepsContainerInner() {
  const { currentStep } = useListingStore();

  return (
    <>
      {currentStep === "property-type" ? (
        <PropertyTypeInput />
      ) : currentStep === "property-details" ? (
        <PropertyDetails />
      ) : currentStep === "location" ? (
        <LocationInput />
      ) : currentStep === "highlights" ? (
        <PropertyHighlights />
      ) : currentStep === "media-files" ? (
        <MediaInput />
      ) : currentStep === "publish" ? (
        <GetStarted />
      ) : (
        <GetStarted />
      )}
    </>
  );
}

export default function StepsContainer() {
  return (
    <ListingStoreProvider>
      <StepsContainerInner />
    </ListingStoreProvider>
  );
}
