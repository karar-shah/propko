"use client";
import { cn } from "@/lib/utils";
import { HomeIcon } from "@radix-ui/react-icons";
import { useListingStore } from "./listing-store";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";

type highlightType = {
  name: string;
  label: string;
  image: string;
};

const propertyHighlights: highlightType[] = [
  { name: "wifi", label: "Wifi", image: "/images/house.webp" },
  { name: "tv", label: "TV", image: "/images/house.webp" },
  { name: "kitchen", label: "Kitchen", image: "/images/house.webp" },
  { name: "washer", label: "Washer", image: "/images/house.webp" },
  {
    name: "freeParkingOnPremises",
    label: "Free parking on premises",
    image: "/images/house.webp",
  },
  {
    name: "paidParkingOnPremises",
    label: "Paid parking on premises",
    image: "/images/house.webp",
  },
  {
    name: "airConditioning",
    label: "Air conditioning",
    image: "/images/house.webp",
  },
  {
    name: "dedicatedWorkspace",
    label: "Dedicated workspace",
    image: "/images/house.webp",
  },
  { name: "pool", label: "Pool", image: "/images/house.webp" },
  { name: "hotTub", label: "Hot tub", image: "/images/house.webp" },
  { name: "patio", label: "Patio", image: "/images/house.webp" },
  { name: "bbqGrill", label: "BBQ grill", image: "/images/house.webp" },
  {
    name: "outdoorDiningArea",
    label: "Outdoor dining area",
    image: "/images/house.webp",
  },
  { name: "firePit", label: "Fire pit", image: "/images/house.webp" },
  { name: "poolTable", label: "Pool table", image: "/images/house.webp" },
  {
    name: "indoorFireplace",
    label: "Indoor fireplace",
    image: "/images/house.webp",
  },
  { name: "piano", label: "Piano", image: "/images/house.webp" },
  {
    name: "exerciseEquipment",
    label: "Exercise equipment",
    image: "/images/house.webp",
  },
  { name: "lakeAccess", label: "Lake access", image: "/images/house.webp" },
  { name: "beachAccess", label: "Beach access", image: "/images/house.webp" },
  { name: "skiInSkiOut", label: "Ski-in/Ski-out", image: "/images/house.webp" },
  {
    name: "outdoorShower",
    label: "Outdoor shower",
    image: "/images/house.webp",
  },
  { name: "smokeAlarm", label: "Smoke alarm", image: "/images/house.webp" },
  { name: "firstAidKit", label: "First aid kit", image: "/images/house.webp" },
  {
    name: "fireExtinguisher",
    label: "Fire extinguisher",
    image: "/images/house.webp",
  },
  {
    name: "carbonMonoxideAlarm",
    label: "Carbon monoxide alarm",
    image: "/images/house.webp",
  },
];

export default function PropertyHighlights() {
  const { setPropertyHighlights, listingData } = useListingStore();

  const handleNext = () => {
    if (!listingData?.propertyHighlights) return false;
    return true;
  };

  const handleSelectHighlight = (highLight: highlightType) => {
    // Check if propertyHighlights is not available in listingData
    if (!listingData?.propertyHighlights) {
      setPropertyHighlights([
        {
          name: highLight.name,
        },
      ]);
    } else {
      // Check if the current highlight is already present
      const isHighlightPresent = listingData.propertyHighlights.some(
        (listingHighlight) => listingHighlight.name === highLight.name
      );

      if (isHighlightPresent) {
        // If the current highlight is present, update its selected value
        setPropertyHighlights(
          listingData.propertyHighlights.filter(
            (ListingHighLight) => ListingHighLight.name !== highLight.name
          )
        );
      } else {
        // If the current highlight is not present, check if the maximum limit is reached
        if (listingData.propertyHighlights.length < 5) {
          setPropertyHighlights([
            ...listingData.propertyHighlights,
            {
              name: highLight.name,
            },
          ]);
        }
      }
    }
  };

  

  return (
    <StepsLayout
      heading={stepsHeadings.propertyHighlights}
      handleNext={handleNext}
      nextBtn={{
        disabled: !listingData?.propertyHighlights,
      }}
    >
      <div
        className={cn(
          "flex-1 w-full max-w-[800px] mx-auto gap-5",
          "grid grid-cols-3 py-10"
        )}
      >
        {propertyHighlights.map((highLight, index) => (
          <PropertyHighlight
            key={index}
            {...highLight}
            active={listingData?.propertyHighlights?.some(
              (item) => item.name === highLight.name
            )}
            onSelect={() => handleSelectHighlight(highLight)}
          />
        ))}
      </div>
    </StepsLayout>
  );
}

type PropertyHighlightProps = highlightType & {
  active?: boolean;
  onSelect?: () => void;
};
function PropertyHighlight(props: PropertyHighlightProps) {
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
