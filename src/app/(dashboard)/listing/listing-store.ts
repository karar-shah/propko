import { create } from "zustand";

export type IListingStep =
  | "idle"
  | "media-files"
  | "property-type"
  | "location";

export type ListingData = {
  location?: ILocation;
  propertyType?: string;
  mediaFiles?: IFile[];
};

type UseListingStore = {
  currentStep: IListingStep;
  listingData?: ListingData;
  setLocation: (value: ILocation) => void;
  setPropertyType: (value: string) => void;
  setMediaFiles: (value: IFile[]) => void;
  handleNextStep: () => void;
};

function getNextStep(curStep: IListingStep): IListingStep {
  if (curStep === "idle") return "property-type";
  if (curStep === "property-type") return "location";
  if (curStep === "location") return "media-files";
  return "idle";
}

export const useListingStore = create<UseListingStore>()(
  (setState, getState) => ({
    currentStep: "idle",
    handleNextStep() {
      const listingData = getState().listingData;
      const currentStep = getState().currentStep;
      if (currentStep === "property-type" && !listingData?.propertyType) return;
      if (currentStep === "location" && !listingData?.location) return;
      const step = getNextStep(currentStep);
      if (step === "idle") return;
      setState((state) => ({
        ...state,
        currentStep: step,
      }));
    },
    setLocation(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state,
          location: value,
        },
      }));
    },
    setPropertyType(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state,
          propertyType: value,
        },
      }));
    },
    setMediaFiles(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state,
          mediaFiles: value,
        },
      }));
    },
  })
);
