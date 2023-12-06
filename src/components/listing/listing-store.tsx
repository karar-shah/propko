"use client";
import { createContext, useRef } from "react";
import { createStore } from "zustand";

type ListingState = {
  currentStep: IListingStep;
  listingData: IListingData;
  setLocation: (value: IAddressDetails) => void;
  setPropertyType: (value: string) => void;
  setPropertyDetails: (value: Partial<IPropertyDetails>) => void;
  setPropertyHighlights: (value: Partial<IPropertyHighlights>) => void;
  // setPropertyHighlights: (value: IPropertyHighlightItem |string) => void;
  // setPropertyHighlights: (value: any) => void;
  setMediaFiles: (value: ILocalFile[]) => void;
  handleNextStep: () => Promise<void> | void;
  handlePrevStep: () => void;
};

function getNextStep(curStep: IListingStep): IListingStep {
  if (curStep === "idle") return "property-type";
  if (curStep === "property-type") return "property-details";
  if (curStep === "property-details") return "location";
  if (curStep === "location") return "highlights";
  if (curStep === "highlights") return "media-files";
  if (curStep === "media-files") return "publish";
  return "idle";
}

function getPrevStep(curStep: IListingStep): IListingStep {
  if (curStep === "publish") return "media-files";
  if (curStep === "media-files") return "highlights";
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

const createListingStore = (intialData?: IListingData) => {
  const startStep: IListingStep = "idle";
  console.log("intialData", intialData);
  return createStore<ListingState>()((setState, getState) => ({
    currentStep: startStep,
    listingData: {
      ...intialData,
      // propertyHighlights: intialData?.propertyHighlights || [],
      // propertyDetails: intialData?.propertyDetails || DEFAULT_PROPERTY_DETAILS,
    },
    async handleNextStep() {
      const currentStep = getState().currentStep;
      let updatedData: IListingData | undefined;
      if (currentStep !== "idle") {
        const res = await apiClient.listings.saveData(getState().listingData);
        if (res.succeed && res.data) {
          updatedData = {
            dbRef: res.data.id,
            location: res.data.location,
            propertyDetails: res.data.propertyDetails,
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
      console.log("value", value);
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
      console.log("value", value);
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          propertyHighlights: {
            ...state.listingData.propertyHighlights,
            ...(value.wifi && {
              wifi: !state.listingData.propertyHighlights?.wifi,
            }),
            ...(value.tv && { tv: !state.listingData.propertyHighlights?.tv }),
            ...(value.kitchen && {
              kitchen: !state.listingData.propertyHighlights?.kitchen,
            }),
            ...(value.washer && {
              washer: !state.listingData.propertyHighlights?.washer,
            }),
            ...(value.freeParkingOnPremises && {
              freeParkingOnPremises:
                !state.listingData.propertyHighlights?.freeParkingOnPremises,
            }),
            ...(value.paidParkingOnPremises && {
              paidParkingOnPremises:
                !state.listingData.propertyHighlights?.paidParkingOnPremises,
            }),
            ...(value.airConditioning && {
              airConditioning:
                !state.listingData.propertyHighlights?.airConditioning,
            }),
            ...(value.dedicatedWorkspace && {
              dedicatedWorkspace:
                !state.listingData.propertyHighlights?.dedicatedWorkspace,
            }),
            ...(value.pool && {
              pool: !state.listingData.propertyHighlights?.pool,
            }),
            ...(value.hotTub && {
              hotTub: !state.listingData.propertyHighlights?.hotTub,
            }),
            ...(value.patio && {
              patio: !state.listingData.propertyHighlights?.patio,
            }),
            ...(value.bbqGrill && {
              bbqGrill: !state.listingData.propertyHighlights?.bbqGrill,
            }),
            ...(value.outdoorDiningArea && {
              outdoorDiningArea:
                !state.listingData.propertyHighlights?.outdoorDiningArea,
            }),
            ...(value.firePit && {
              firePit: !state.listingData.propertyHighlights?.firePit,
            }),
            ...(value.poolTable && {
              poolTable: !state.listingData.propertyHighlights?.poolTable,
            }),
            ...(value.indoorFireplace && {
              indoorFireplace:
                !state.listingData.propertyHighlights?.indoorFireplace,
            }),
            ...(value.piano && {
              piano: !state.listingData.propertyHighlights?.piano,
            }),
            ...(value.exerciseEquipment && {
              exerciseEquipment:
                !state.listingData.propertyHighlights?.exerciseEquipment,
            }),
            ...(value.lakeAccess && {
              lakeAccess: !state.listingData.propertyHighlights?.lakeAccess,
            }),
            ...(value.beachAccess && {
              beachAccess: !state.listingData.propertyHighlights?.beachAccess,
            }),
            ...(value.skiInSkiOut && {
              skiInSkiOut: !state.listingData.propertyHighlights?.skiInSkiOut,
            }),
            ...(value.outdoorShower && {
              outdoorShower:
                !state.listingData.propertyHighlights?.outdoorShower,
            }),
            ...(value.smokeAlarm && {
              smokeAlarm: !state.listingData.propertyHighlights?.smokeAlarm,
            }),
            ...(value.firstAidKit && {
              firstAidKit: !state.listingData.propertyHighlights?.firstAidKit,
            }),
            ...(value.fireExtinguisher && {
              fireExtinguisher:
                !state.listingData.propertyHighlights?.fireExtinguisher,
            }),
            ...(value.carbonMonoxideAlarm && {
              carbonMonoxideAlarm:
                !state.listingData.propertyHighlights?.carbonMonoxideAlarm,
            }),
          },
        },
      }));
    },
    // setPropertyHighlights(value) {
    //   setState((state) => ({
    //     ...state,
    //     listingData: {
    //       ...state.listingData,
    //       propertyHighlights: [...state.listingData.propertyHighlights!, value],
    //     },
    //   }));
    // },
    setMediaFiles(value) {
      setState((state) => ({
        ...state,
        listingData: {
          ...state.listingData,
          mediaFiles: value,
        },
      }));
    },
  }));
};

type ProviderProps = React.PropsWithChildren<{
  listingData?: IListingData;
}>;

export function ListingStoreProvider({ children, listingData }: ProviderProps) {
  const storeRef = useRef<ListingStore>();
  if (!storeRef.current) {
    storeRef.current = createListingStore(listingData);
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
import { IProperty } from "@/server/lib/db/schemas/properties";

export function useListingStore() {
  const store = useContext(ListingContext);
  if (!store) throw new Error("Missing ListingStore.Provider in the tree");
  return useStore(store);
}
