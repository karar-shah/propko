"use client";
import React from "react";
import { useListingStore } from "./listing-store";
import { useRouter } from "next/navigation";

const Publish = () => {
  const router = useRouter();
  const { handleNextStep, setStaus, listingData } = useListingStore();
  setStaus("published");
  //   console.log("listingData from publish page", listingData);

  (async () => {
    await handleNextStep();
  })();
  //   router.prefetch("/");
  router.push("/");
  return <></>;
};

export default Publish;
