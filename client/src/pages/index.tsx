import React, { useCallback, useEffect, useMemo } from "react";
import Walkthrough from "@/components/app/walkthrough";
import Preferences from "@/components/app/walkthrough/preferences";
import AddressForm from "@/components/app/walkthrough/address";
import { useAtom } from "jotai";
import {
  setupStepsAtom,
  showWalkthroughAtom,
  walkthroughStepAtom,
} from "../utils/atoms";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();

  const [setupSteps, setSetupSteps] = useAtom(setupStepsAtom);
  const [showWalkthrough, setShowWalkthrough] = useAtom(showWalkthroughAtom);
  const [currentStep, setCurrentStep] = useAtom(walkthroughStepAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to the register page if not authenticated
      router.push("/register");
    }
  }, [router]);

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    router.push("/login");
  };

  // Define handleNext function here
  const handleNext = useCallback(() => {
    // We determine steps outside of useMemo to avoid dependency issues
    const steps = [
      {
        title: "What's for Lunj?",
        component: (
          <p className="text-center">
            Let&apos;s first get a few things out the way.
          </p>
        ),
        condition: () => true, // This is always true as it's the starting step
      },
      {
        title: "Set your preferences",
        component: (
          <Preferences
            onPreferencesSaved={() =>
              setSetupSteps((prev) => ({ ...prev, preferences: true }))
            }
            handleNext={handleNext}
          />
        ),
        condition: () => setupSteps.preferences,
      },
      {
        title: "Add your address",
        component: (
          <AddressForm
            onAddressSaved={() =>
              setSetupSteps((prev) => ({ ...prev, address: true }))
            }
            handleNext={handleNext}
          />
        ),
        condition: () => setupSteps.address,
      },
      // Add more steps as needed
    ];

    // Determine the next step that hasn't been completed
    const nextStepIndex = steps.findIndex((step, index) => {
      if (index <= currentStep) return false;
      if (step.condition && step.condition()) return false;
      return true;
    });

    if (nextStepIndex !== -1) {
      setCurrentStep(nextStepIndex);
    } else {
      setShowWalkthrough(false);
    }
  }, [
    currentStep,
    setCurrentStep,
    setShowWalkthrough,
    setSetupSteps,
    setupSteps,
  ]);

  // Use useMemo to ensure steps are stable for Walkthrough component
  const steps = useMemo(
    () => [
      {
        title: "What's for Lunj?",
        component: (
          <p className="text-center">
            Let&apos;s first get a few things out the way.
          </p>
        ),
        condition: () => true,
      },
      {
        title: "Set your preferences",
        component: (
          <Preferences
            onPreferencesSaved={() =>
              setSetupSteps((prev) => ({ ...prev, preferences: true }))
            }
            handleNext={handleNext}
          />
        ),
        condition: () => setupSteps.preferences,
      },
      {
        title: "Add your address",
        component: (
          <AddressForm
            onAddressSaved={() =>
              setSetupSteps((prev) => ({ ...prev, address: true }))
            }
            handleNext={handleNext}
          />
        ),
        condition: () => setupSteps.address,
      },
      // Add more steps as needed
    ],
    [setupSteps, setSetupSteps, handleNext]
  ); // Explicitly include handleNext

  return (
    <ApolloProvider client={client}>
      <div className="home-container">
        {showWalkthrough ? (
          <Walkthrough steps={steps} handleNext={handleNext} />
        ) : (
          <div className="setup-complete-message">
            {setupSteps.preferences && setupSteps.address ? (
              <>
                <h1 className="text-3xl font-bold">Home</h1>
                <button
                  onClick={handleSignOut}
                  className="signout-button bg-red-500 text-white px-4 py-2 rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {setupSteps.preferences && (
                  <p className="text-sm font-bold text-green-500 mt-4">
                    Preferences are set. You can update them later in settings.
                  </p>
                )}
                {setupSteps.address && (
                  <p className="text-sm font-bold text-green-500 mt-4">
                    Address is set. You can update it later in settings.
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default Home;
