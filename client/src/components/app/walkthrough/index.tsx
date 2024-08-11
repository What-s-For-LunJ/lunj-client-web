import React from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { showWalkthroughAtom, walkthroughStepAtom } from "../../../utils/atoms";

const steps = [
  "Welcome to LunJ!",
  "Set your preferences",
  "Add your address",
  "Setup payment",
];

const Walkthrough: React.FC = () => {
  const [showWalkthrough, setShowWalkthrough] = useAtom(showWalkthroughAtom);
  const [currentStep, setCurrentStep] = useAtom(walkthroughStepAtom);

  const handleNext = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSkip = () => {
    setShowWalkthrough(false);
  };

  if (!showWalkthrough) return null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="scroll-m-20 my-4 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
          {steps[currentStep]}
        </h1>
        <div className="flex justify-center mb-4">
          <div className="space-x-2">
            <Button onClick={handlePrev} variant="secondary">
              Prev
            </Button>
            <Button onClick={handleNext} variant="default">
              Next
            </Button>
            <Button onClick={handleSkip} variant="destructive">
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;
