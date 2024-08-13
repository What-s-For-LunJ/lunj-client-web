import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
  showWalkthroughAtom,
  walkthroughStepAtom,
  setupStepsAtom,
} from "../../../utils/atoms";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../../../graphql/queries/getUserData";

interface Step {
  title: string;
  component: React.ReactNode;
  condition?: () => boolean;
}

interface WalkthroughProps {
  steps: Step[];
  handleNext: () => void;
}

const Walkthrough: React.FC<WalkthroughProps> = ({ steps, handleNext }) => {
  const [showWalkthrough, setShowWalkthrough] = useAtom(showWalkthroughAtom);
  const [currentStep, setCurrentStep] = useAtom(walkthroughStepAtom);
  const [setupSteps, setSetupSteps] = useAtom(setupStepsAtom);

  const { data, loading, error } = useQuery(GET_USER_DATA);

  useEffect(() => {
    if (data) {
      const preferencesFilled =
        data.preferences?.dietaryPreferences?.length > 0 ||
        data.preferences?.cuisinePreferences?.length > 0;
      const addressesFilled = data.addresses?.length > 0;

      setSetupSteps((prev) => ({
        ...prev,
        preferences: preferencesFilled,
        address: addressesFilled,
      }));

      // If all sections are filled, hide walkthrough
      if (preferencesFilled && addressesFilled) {
        setShowWalkthrough(false);
      }
    }
  }, [data, setSetupSteps, setShowWalkthrough]);

  const handleSkip = () => {
    setShowWalkthrough(false);
  };

  if (!showWalkthrough || loading) return null;
  if (error) return <p>Error loading walkthrough data.</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="scroll-m-20 my-4 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
          {steps[currentStep].title}
        </h1>

        <div className="mb-6">
          {React.cloneElement(
            steps[currentStep].component as React.ReactElement,
            { handleNext }
          )}
        </div>

        <div className="flex justify-center mb-4">
          <div className="space-x-2">
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
