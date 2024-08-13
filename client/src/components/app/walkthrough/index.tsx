import React, { useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
  showWalkthroughAtom,
  walkthroughStepAtom,
  setupStepsAtom,
} from "../../../utils/atoms";
import Preferences from "../../../pages/preferences";
import AddressForm from "../../../pages/address";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../../../graphql/queries/getUserData";

const steps = ["Welcome to LunJ!", "Set your preferences", "Add your address"];

const Walkthrough: React.FC = () => {
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

  const handleNext = useCallback(() => {
    // Move to the next uncompleted step
    const nextStep = steps.findIndex((_, index) => {
      if (index <= currentStep) return false;
      if (index === 1) return !setupSteps.preferences;
      if (index === 2) return !setupSteps.address;
      return true;
    });

    if (nextStep !== -1) {
      setCurrentStep(nextStep);
    } else {
      setShowWalkthrough(false);
    }
  }, [currentStep, setupSteps, setCurrentStep, setShowWalkthrough]);

  const handleSkip = () => {
    setShowWalkthrough(false);
  };

  if (!showWalkthrough || loading) return null;
  if (error) return <p>Error loading walkthrough data.</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="scroll-m-20 my-4 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
          {steps[currentStep]}
        </h1>

        <div className="mb-6">
          {currentStep === 1 && !setupSteps.preferences && (
            <Preferences
              onPreferencesSaved={() => {
                setSetupSteps((prev) => ({ ...prev, preferences: true }));
                handleNext();
              }}
            />
          )}
          {currentStep === 2 && !setupSteps.address && (
            <AddressForm
              onAddressSaved={() => {
                setSetupSteps((prev) => ({ ...prev, address: true }));
                handleNext();
              }}
            />
          )}
          {/* Other components for steps */}
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
