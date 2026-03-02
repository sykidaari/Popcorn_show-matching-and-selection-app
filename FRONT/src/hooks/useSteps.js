import { useState } from 'react';

const useSteps = () => {
  const [step, setStep] = useState(1);
  const next = () => setStep((s) => s + 1);

  const isStep = (nr) => step === nr;

  return { step, next, isStep };
};

export default useSteps;
