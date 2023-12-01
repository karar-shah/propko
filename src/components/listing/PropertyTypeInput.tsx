"use client";
import { cn } from "@/lib/utils";
import { HomeIcon } from "@radix-ui/react-icons";
import { useListingStore } from "./listing-store";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";

type PropertyType = {
  label: string;
  image: string;
};

const propertyTypes: PropertyType[] = [
  {
    label: "House/Villas",
    image: "/images/house.webp",
  },
  {
    label: "Flat/Apartment",
    image: "/images/house.webp",
  },
  {
    label: "Room/Flatshare",
    image: "/images/house.webp",
  },
  {
    label: "Paying Guest",
    image: "/images/house.webp",
  },
  {
    label: "Land/Plot",
    image: "/images/house.webp",
  },
  {
    label: "Shop/Showroom",
    image: "/images/house.webp",
  },
  {
    label: "Office",
    image: "/images/house.webp",
  },
  {
    label: "Warehouse",
    image: "/images/house.webp",
  },
  {
    label: "Industrial Shed",
    image: "/images/house.webp",
  },
  {
    label: "Business For Sale",
    image: "/images/house.webp",
  },
  {
    label: "Coworking",
    image: "/images/house.webp",
  },
];

export default function PropertyTypeInput() {
  const { handleNextStep, setPropertyType, listingData } = useListingStore();

  const handleNext = () => {
    if (!listingData?.propertyType) return false;
    return true;
  };

  return (
    <StepsLayout
      heading={stepsHeadings.propertyType}
      handleNext={handleNext}
      nextBtn={{
        disabled: !listingData?.propertyType,
      }}
    >
      <div
        className={cn(
          "flex-1 w-full max-w-[800px] mx-auto gap-5",
          "grid grid-cols-3 py-10"
        )}
      >
        {propertyTypes.map((propertyType, index) => (
          <PropertyType
            key={index}
            {...propertyType}
            active={listingData?.propertyType === propertyType.label}
            onSelect={() => setPropertyType(propertyType.label)}
          />
        ))}
      </div>
    </StepsLayout>
  );
}

type PropertyTypeProps = PropertyType & {
  active?: boolean;
  onSelect?: () => void;
};
function PropertyType(props: PropertyTypeProps) {
  return (
    <div
      role="button"
      onClick={props.onSelect}
      className={cn(
        "rounded-md border border-slate-200 dark:border-slate-700 p-5 w-full",
        "cursor-pointer transition-all text-slate-700 dark:text-white",
        "flex flex-col items-center justify-center",
        props.active
          ? "bg-slate-200 dark:bg-slate-700"
          : " hover:bg-slate-100 dark:hover:bg-slate-700"
      )}
    >
      <HomeIcon className="w-10 h-10" />
      <h5 className="mt-2 font-bold">{props.label}</h5>
    </div>
  );
}
