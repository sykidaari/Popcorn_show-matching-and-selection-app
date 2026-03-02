import { useState } from 'react';

const useMultiStepForm = (initial = {}) => {
  const [formData, setFormData] = useState(initial);

  const saveStepData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  return { formData, saveStepData, setFormData };
};

export default useMultiStepForm;
