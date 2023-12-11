"use client";
import { useListingStore } from "./listing-store";
import { ReactNode, useState } from "react";
import { NextButton, PrevButton, SaveAndExitButton } from "./buttons";
import { useRouter } from "next/navigation";

type Props = {
  children?: ReactNode;
  heading: ReactNode;
  handleNext: () => PromiseLike<boolean> | boolean;
  nextBtn?: {
    text?: ReactNode;
    disabled?: boolean;
  };
};

export default function StepsLayout({
  children,
  handleNext,
  heading,
  nextBtn,
}: Props) {
  const { currentStep, handleNextStep } = useListingStore();
  const [processing, setProcessing] = useState(false);

  const handleNextClick = async () => {
    setProcessing(true);
    const canGoNext = await handleNext();
    if (canGoNext) {
      await handleNextStep();
    }
    setProcessing(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <PrevButton />
        {currentStep !== "idle" && <SaveAndExitButton />}
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold underline underline-offset-[12px] decoration-[3px] text-center">
          {heading}
        </h1>
      </div>
      <div className="flex-1">{children}</div>
      <NextButton
        onClick={handleNextClick}
        disabled={nextBtn?.disabled || processing}
        loading={processing}
      >
        {nextBtn?.text ? nextBtn.text : "Next >"}
      </NextButton>
    </>
  );
}
