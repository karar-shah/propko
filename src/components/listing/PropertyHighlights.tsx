"use client";
import { cn } from "@/lib/utils";
import { HomeIcon } from "@radix-ui/react-icons";
import { useListingStore } from "./listing-store";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";

type highlightType = {
  id: string;
  label: string;
  image: string;
};

const propertyHighlights: highlightType[] = [
  { id: "wifi", label: "Wifi", image: "/images/house.webp" },
  { id: "tv", label: "TV", image: "/images/house.webp" },
  { id: "kitchen", label: "Kitchen", image: "/images/house.webp" },
  { id: "washer", label: "Washer", image: "/images/house.webp" },
  {
    id: "freeParkingOnPremises",
    label: "Free parking on premises",
    image: "/images/house.webp",
  },
  {
    id: "paidParkingOnPremises",
    label: "Paid parking on premises",
    image: "/images/house.webp",
  },
  {
    id: "airConditioning",
    label: "Air conditioning",
    image: "/images/house.webp",
  },
  {
    id: "dedicatedWorkspace",
    label: "Dedicated workspace",
    image: "/images/house.webp",
  },
  { id: "pool", label: "Pool", image: "/images/house.webp" },
  { id: "hotTub", label: "Hot tub", image: "/images/house.webp" },
  { id: "patio", label: "Patio", image: "/images/house.webp" },
  { id: "bbqGrill", label: "BBQ grill", image: "/images/house.webp" },
  {
    id: "outdoorDiningArea",
    label: "Outdoor dining area",
    image: "/images/house.webp",
  },
  { id: "firePit", label: "Fire pit", image: "/images/house.webp" },
  { id: "poolTable", label: "Pool table", image: "/images/house.webp" },
  {
    id: "indoorFireplace",
    label: "Indoor fireplace",
    image: "/images/house.webp",
  },
  { id: "piano", label: "Piano", image: "/images/house.webp" },
  {
    id: "exerciseEquipment",
    label: "Exercise equipment",
    image: "/images/house.webp",
  },
  { id: "lakeAccess", label: "Lake access", image: "/images/house.webp" },
  { id: "beachAccess", label: "Beach access", image: "/images/house.webp" },
  { id: "skiInSkiOut", label: "Ski-in/Ski-out", image: "/images/house.webp" },
  { id: "outdoorShower", label: "Outdoor shower", image: "/images/house.webp" },
  { id: "smokeAlarm", label: "Smoke alarm", image: "/images/house.webp" },
  { id: "firstAidKit", label: "First aid kit", image: "/images/house.webp" },
  {
    id: "fireExtinguisher",
    label: "Fire extinguisher",
    image: "/images/house.webp",
  },
  {
    id: "carbonMonoxideAlarm",
    label: "Carbon monoxide alarm",
    image: "/images/house.webp",
  },
];

export default function PropertyHighlights() {
  const { setPropertyHighlights, listingData } = useListingStore();
  console.log("listingData from highlights", listingData);

  const handleNext = () => {
    if (!listingData?.propertyHighlights) return false;
    return true;
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
        {propertyHighlights.map((propertyHighlight, index) => {
          const { id } = propertyHighlight;
          return (
            <button
              key={id}
              className={
                listingData.propertyHighlights?.[id] // Use the dynamic id here
                  ? "text-red-500"
                  : "text-yellow-300"
              }
              onClick={() =>
                setPropertyHighlights({
                  [id]: true, // Use the dynamic id here
                })
              }
            >
              {id}
            </button>
          );
        })}
        <button
          className={
            listingData.propertyHighlights?.tv
              ? "text-red-500"
              : "text-yellow-300"
          }
          onClick={() =>
            setPropertyHighlights({
              tv: true,
            })
          }
        >
          tv
        </button>
        <button
          className={
            listingData.propertyHighlights?.wifi
              ? "text-red-500"
              : "text-yellow-300"
          }
          onClick={() =>
            setPropertyHighlights({
              wifi: true,
            })
          }
        >
          wifi
        </button>
        {/* {propertyHighlights.map((propertyHighlight, index) => (
          <PropertyHighlight
            key={index}
            {...propertyHighlight}
            active={listingData?.propertyType === propertyHighlight.label}
            onSelect={() => setPropertyHighlights(listingData.propertyHighlights?.tv)}
          />
        ))} */}
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
