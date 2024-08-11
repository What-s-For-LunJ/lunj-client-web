import React from "react";
import Walkthrough from "@/components/app/walkthrough";
import { useAtomValue } from "jotai";
import { setupStepsAtom, showWalkthroughAtom } from "../utils/atoms";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";

const Home: React.FC = () => {
  const setupSteps = useAtomValue(setupStepsAtom);
  const showWalkthrough = useAtomValue(showWalkthroughAtom);

  return (
    <ApolloProvider client={client}>
      <div className="home-container">
        {showWalkthrough ? (
          <Walkthrough />
        ) : (
          <div className="setup-complete-message">
            {setupSteps.preferences && setupSteps.address ? (
              <h1 className="text-3xl font-bold">Home</h1>
            ) : (
              <>
                {setupSteps.preferences && (
                  <p>
                    Preferences are set. You can update them later in settings.
                  </p>
                )}
                {setupSteps.address && (
                  <p>Address is set. You can update it later in settings.</p>
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

