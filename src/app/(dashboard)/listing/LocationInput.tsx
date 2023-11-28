"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePlacesWidget } from "react-google-autocomplete";
import NextButton from "./NextButton";
import { useListingStore } from "./listing-store";
import { useRouter } from "next/navigation";

type Props = {
  value?: ILocation;
  onChange?: (value: ILocation) => void;
};

export function LocationInputField({ onChange, value }: Props) {
  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: "AIzaSyAduj4Rg_xC99pzh6v2-5om2rrGO4-Nn-g",
    options: {
      // types: ["(regions)"],
      fields: ["address_components", "geometry"],
      types: ["address"],
    },
    onPlaceSelected: (place) => {
      const latitude = place?.geometry.location.lat();
      const longitude = place?.geometry.location.lng();
      const locationName = ref?.current?.value;
      onChange?.({
        lat: latitude,
        lng: longitude,
        name: locationName || "",
      });

      // for (const component of place.address_components) {
      //   const componentType = component.types[0];

      //   switch (componentType) {
      //     case "street_number": {
      //       address1 = `${component.long_name} ${address1}`;
      //       break;
      //     }

      //     case "route": {
      //       address1 += component.short_name;
      //       break;
      //     }

      //     case "postal_code": {
      //       postcode = `${component.long_name}${postcode}`;
      //       break;
      //     }

      //     case "postal_code_suffix": {
      //       postcode = `${postcode}-${component.long_name}`;
      //       break;
      //     }

      //     case "locality":
      //       break;

      //     case "administrative_area_level_1": {
      //       break;
      //     }

      //     case "country":
      //       break;
      //   }
      // }
    },
  });

  return <Input placeholder="Search Location" ref={ref} />;
}

export default function LocationInput() {
  const { handleNextStep, setLocation, listingData } = useListingStore();

  const handleNext = () => {
    if (!listingData?.location) return;
    handleNextStep();
  };

  return (
    <>
      <div
        className={cn("flex-1 w-full max-w-[800px] mx-auto gap-5", " py-10")}
      >
        <LocationInputField onChange={setLocation} />
      </div>
      <NextButton disabled={!listingData?.location} onClick={handleNext}>
        Next {">"}
      </NextButton>
    </>
  );
}
