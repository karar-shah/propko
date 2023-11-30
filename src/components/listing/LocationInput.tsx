"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePlacesWidget } from "react-google-autocomplete";
import { useListingStore } from "./listing-store";
import { useRouter } from "next/navigation";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value?: IAddressDetails;
  onChange?: (value: IAddressDetails) => void;
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
      // const latitude = place?.geometry.location.lat();
      // const longitude = place?.geometry.location.lng();

      const addressDetails: IAddressDetails = {
        country: "",
        city: "",
        street: "",
        landmark: "",
        state: "",
        fullAddress: "",
      };

      place?.address_components?.forEach((component: any) => {
        const { types, long_name } = component;
        addressDetails.fullAddress += long_name + ", ";

        if (types.includes("country")) {
          addressDetails.country = long_name;
        } else if (types.includes("locality")) {
          addressDetails.city = long_name;
        } else if (types.includes("route")) {
          addressDetails.street = long_name;
        } else if (types.includes("point_of_interest")) {
          addressDetails.landmark = long_name;
        } else if (types.includes("administrative_area_level_1")) {
          addressDetails.state = long_name;
        }
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

      onChange?.(addressDetails);
    },
  });

  return <Input placeholder="Search Location" ref={ref} />;
}

export default function LocationInput() {
  const { setLocation, listingData } = useListingStore();

  const handleNext = () => {
    if (!listingData?.location) return false;
    return true;
  };

  return (
    <StepsLayout
      heading={stepsHeadings.location}
      handleNext={handleNext}
      nextBtn={{
        disabled: !listingData?.location,
      }}
    >
      <div
        className={cn("flex-1 w-full max-w-[800px] mx-auto gap-5", " py-10")}
      >
        <LocationInputField onChange={setLocation} />
        {listingData?.location && (
          <div className="mt-5 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={listingData?.location?.country} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">City</Label>
              <Input id="country" value={listingData?.location?.city} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Street</Label>
              <Input id="country" value={listingData?.location?.street} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Full Address</Label>
              <Textarea
                id="country"
                value={listingData?.location?.fullAddress}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Nearby Landmark</Label>
              <Input id="country" value={listingData?.location?.landmark} />
            </div>
          </div>
        )}
      </div>
    </StepsLayout>
  );
}
