import { atom } from 'jotai';

// Atom to track if the walkthrough should be displayed
export const showWalkthroughAtom = atom(true);

// Atom to track the current step of the walkthrough
export const walkthroughStepAtom = atom(0);

// Atom to manage if setup steps are completed
export const setupStepsAtom = atom({
  preferences: false,
  address: false,
  payment: false,
});
