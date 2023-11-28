import { BackButton, Button } from "@/components/ui/button";
import StepsContainer from "./StepsContainer";

export default function Page() {
  return (
    <main className="p-10 flex-1 flex flex-col">
      <div className="w-full flex items-center justify-between">
        <BackButton />
        <div></div>
      </div>
      <StepsContainer />
    </main>
  );
}
