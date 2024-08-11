import React from "react";
import Walkthrough from "@/components/app/walkthrough";
import { useAtomValue } from "jotai";
import { setupStepsAtom, showWalkthroughAtom } from "../utils/atoms";

const Home: React.FC = () => {
  // Use the atoms to check setup steps and whether the walkthrough should be shown
  const setupSteps = useAtomValue(setupStepsAtom);
  const showWalkthrough = useAtomValue(showWalkthroughAtom);

  return (
    <div className="home-container">
      {showWalkthrough ? (
        <Walkthrough />
      ) : (
        <div className="setup-complete-message">
          {setupSteps.preferences && (
            <p>Preferences are set. You can update them later in settings.</p>
          )}
          {/* Other sections can be added here, like address or payment setup checks */}
        </div>
      )}
    </div>
  );
};

export default Home;

