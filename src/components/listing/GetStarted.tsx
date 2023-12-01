import Image from "next/image";
import StepsLayout from "./StepsLayout";
import { stepsHeadings } from "./constants";

type Instruction = {
  heading: string;
  description: string;
  image: string;
};

const instructions: Instruction[] = [
  {
    heading: "Tell us about your property",
    description: "Share some basic info, such as where it is, area etc.",
    image: "/images/house.webp",
  },
  {
    heading: "Add some photos",
    description: "Share some basic info, such as where it is, area etc.",
    image: "/images/photopng.webp",
  },
  {
    heading: "Ready to publish",
    description: "Share some basic info, such as where it is, area etc.",
    image: "/images/donepng.webp",
  },
];

export default function GetStarted() {
  const handleNext = () => true;
  return (
    <StepsLayout
      heading={stepsHeadings.getStarted}
      handleNext={handleNext}
      nextBtn={{
        text: "Get Started",
      }}
    >
      <div className="mt-10 w-full flex flex-col items-center max-w-[742px] mx-auto flex-1">
        {instructions.map((instruction, index) => (
          <Instruction key={index} {...instruction} num={index + 1} />
        ))}
      </div>
    </StepsLayout>
  );
}

function Instruction({
  description,
  heading,
  image,
  num,
}: Instruction & { num: number }) {
  return (
    <div className="flex w-full h-[6.5rem] border-b-[1px] last:border-0 border-slate-200 dark:border-slate-700 px-5">
      <div className="w-[50px] h-full pt-4 pr-4 flex justify-end text-slate-500  dark:text-slate-200">
        <span>{num}</span>
      </div>
      <div className="flex-1 h-full pt-4">
        <span className="text-lg font-semibold  text-slate-800 dark:text-slate-100">
          {heading}
        </span>
        <br />
        <span className="text-slate-700 text-sm  dark:text-slate-300">
          {description}
        </span>
      </div>
      <div className="h-full relative">
        <Image
          src={image}
          width={150}
          height={103}
          className="w-auto h-full object-contain object-right"
          alt=""
        />
      </div>
    </div>
  );
}
