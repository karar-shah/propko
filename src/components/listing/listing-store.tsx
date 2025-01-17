"use client";
import { createContext, useRef } from "react";
import { createStore } from "zustand";

type ListingState = {
  currentStep: IListingStep;
  listingData: IListingData;
  setLocation: (value: IAddressDetails) => void;
  setPropertyType: (value: string) => void;
  setPropertyDetails: (value: Partial<IPropertyDetails>) => void;
  setPropertyHighlights: (value: IPropertyHighlight[]) => void;
  setPropertyDescription: (value: IPropertyDescription) => void;
  setMediaFiles: (value: ILocalFile[]) => void;
  handleNextStep: () => Promise<void> | void;
  handlePrevStep: () => void;
  setStaus: (value: IPropertyStatus) => void;
};

function getNextStep(curStep: IListingStep): IListingStep {
  if (curStep === "idle") return "property-type";
  if (curStep === "property-type") return "property-details";
  if (curStep === "property-details") return "location";
  if (curStep === "location") return "highlights";
  if (curStep === "highlights") return "description";
  if (curStep === "description") return "media-files";
  if (curStep === "media-files") return "publish";
  return "idle";
}

function getPrevStep(curStep: IListingStep): IListingStep {
  if (curStep === "publish") return "media-files";
  if (curStep === "media-files") return "description";
  if (curStep === "description") return "highlights";
  if (curStep === "highlights") return "location";
  if (curStep === "location") return "property-details";
  if (curStep === "property-details") return "property-type";
  return "idle";
}

type ListingStore = ReturnType<typeof createListingStore>;
export const ListingContext = createContext<null | ListingStore>(null);

const DEFAULT_PROPERTY_DETAILS: IPropertyDetails = {
  bathrooms: 0,
  bedrooms: 0,
  holdType: undefined,
  saleType: undefined,
};

const createListingStore = (
  intialData?: IListingData,
  userId?: string | undefined
) => {
  const startStep: IListingStep = "idle";

  return createStore<ListingState>()((setState, getState) => ({
    currentStep: startStep,
    listingData: {
      userId: userId,
      ...intialData,
      // propertyDetails: intialData?.propertyDetails || DEFAULT_PROPERTY_DETAILS,
    },
    async handleNextStep() {
      const currentStep = getState().currentStep;
      let updatedData: IListingData | undefined;
      if (currentStep !== "idle") {
        const res = await apiClient.listings.saveData(getState().listingData);

        if (res.succeed && res.data) {
          updatedData = {
            userId: res.data.userId,
            dbRef: res.data.id,
            location: res.data.location,
            propertyDetails: res.data.propertyDetails,
            propertyHighlights: res.data.propertyHighlights,
            propertyDescription: res.data.propertyDescription,
            mediaFiles: res.data.mediaFiles?.map((file) => ({
              id: file.publicId,
              uploaded: true,
              name: file.publicId,
              publicId: file.publicId,
              url: file.url,
            })),
            propertyType: res.data.propertyType,
          };
        }
      }
      const step = getNextStep(currentStep);
      if (step === "idle") return;
      setState((state) => ({
        ...state,
        ...(updatedData && { listingData: updatedData }),
        currentStep: step,
      }));
    },
    handlePrevStep() {
      const currentStep = getState().currentStep;
      const step = getPrevStep(currentStep);
      setState((state) => ({
        ...state,
        currentStep: step,
      }));
    },
    setLocation(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          location: value,
        },
      }));
    },
    setPropertyType(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          propertyType: value,
        },
      }));
    },
    setPropertyDetails(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          propertyDetails: {
            ...state.listingData.propertyDetails,
            bathrooms: value.bathrooms
              ? value.bathrooms
              : state.listingData.propertyDetails?.bedrooms ||
                DEFAULT_PROPERTY_DETAILS.bathrooms,
            bedrooms: value.bedrooms
              ? value.bedrooms
              : state.listingData.propertyDetails?.bedrooms ||
                DEFAULT_PROPERTY_DETAILS.bedrooms,
            ...(value.saleType && { saleType: value.saleType }),
            ...(value.holdType && { holdType: value.holdType }),
          },
        },
      }));
    },
    setPropertyHighlights(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          propertyHighlights: value,
        },
      }));
    },
    setPropertyDescription(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          propertyDescription: value,
        },
      }));
    },
    setMediaFiles(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          mediaFiles: value,
        },
      }));
    },
    setStaus(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          status: value,
        },
      }));
    },
  }));
};

type ProviderProps = React.PropsWithChildren<{
  listingData?: IListingData;
}>;

export function ListingStoreProvider({ children, listingData }: ProviderProps) {
  const { data: session, status } = useSession();
  const storeRef = useRef<ListingStore>();
  if (!storeRef.current) {
    storeRef.current = createListingStore(listingData, session?.user.id);
  }
  return (
    <ListingContext.Provider value={storeRef.current}>
      {children}
    </ListingContext.Provider>
  );
}

import { useContext } from "react";
import { useStore } from "zustand";
import apiClient from "@/client/api";
import { ApiResponse } from "@/typing/api";
import { IProperty, IPropertyStatus } from "@/server/lib/db/schemas/properties";
import { useSession } from "next-auth/react";

export function useListingStore() {
  const store = useContext(ListingContext);
  if (!store) throw new Error("Missing ListingStore.Provider in the tree");
  return useStore(store);
}
