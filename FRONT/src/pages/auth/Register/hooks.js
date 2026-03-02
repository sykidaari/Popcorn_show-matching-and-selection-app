import backend from '@/api/config/axios.js';
import useText from '@/contexts/App/hooks/useText.js';
import useMultiStepForm from '@/hooks/form/useMultiStepForm';
import { useLoginMutation } from '@/hooks/useLoginMutation.js';
import useImgUpload from '@/hooks/user/currentUser/useImgUpload';
import useSteps from '@/hooks/useSteps';
import { IS_DEV } from '@/utils/env';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useMultiStepRegister = () => {
  const { formData, saveStepData } = useMultiStepForm();
  const { step, next, isStep } = useSteps();

  const [stayLoggedInChecked, setStayLoggedInChecked] = useState(true);
  const [serverError, setServerError] = useState(null);

  const imageSelected = !!formData.img;

  const setImg = (file) => saveStepData({ img: file });
  const clearServerError = () => setServerError(null);

  const loginMutation = useLoginMutation(stayLoggedInChecked, () => {});

  const serverProblemText = useText('ui.error.serverProblem');
  const { loginProblem: loginProblemText } = useText(
    'pages.auth.register.errors'
  );

  const { uploadImg } = useImgUpload();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const { img, ...registerPayload } = formData;

      const { data } = await backend.post('/user/register', registerPayload);
      const userId = data.user?._id;

      try {
        await loginMutation.mutateAsync({
          identifier: registerPayload.emailAddress,
          password: registerPayload.password
        });
      } catch {
        setServerError(loginProblemText);
        return { success: true };
      }

      if (img) {
        await uploadImg(img, userId);
      }

      return { success: true };
    },

    onError: () => {
      setServerError(serverProblemText);
    }
  });

  return {
    step,
    next,
    isStep,

    saveStepData,
    setImg,
    imageSelected,

    submitAll: registerMutation.mutate,
    submitAllAsync: registerMutation.mutateAsync,
    isSubmitting: registerMutation.isPending || loginMutation.isPending,
    error: registerMutation.error,

    stayLoggedInChecked,
    setStayLoggedInChecked,
    serverError,
    clearServerError
  };
};
