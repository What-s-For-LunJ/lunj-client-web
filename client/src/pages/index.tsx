import React from "react";
import Walkthrough from "@/components/app/walkthrough";
import Preferences from "./preferences";
// import Address from "./Address";
// import Payment from "./Payment";
import { useAtomValue } from "jotai";
import { setupStepsAtom } from "../utils/atoms";

const Home: React.FC = () => {
  const setupSteps = useAtomValue(setupStepsAtom);

  return (
    <div className="home-container">
      <Walkthrough />
      {!setupSteps.preferences && <Preferences />}
      {/* {!setupSteps.address && <Address />} */}
      {/* {!setupSteps.payment && <Payment />} */}
    </div>
  );
};

export default Home;

