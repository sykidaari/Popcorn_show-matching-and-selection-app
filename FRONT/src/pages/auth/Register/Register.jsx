import useText from '@/contexts/App/hooks/useText.js';
import { useMultiStepRegister } from '@/pages/auth/Register/hooks.js';
import Email from '@c/features/user/userFormParts/Email/Email.jsx';
import Img from '@c/features/user/userFormParts/Img/Img.jsx';
import Locale from '@c/features/user/userFormParts/Locale/Locale.jsx';
import Names from '@c/features/user/userFormParts/Names/Names.jsx';
import Password from '@c/features/user/userFormParts/Password/Password.jsx';
import StayLoggedInCheckBox from '@c/ui/form/StayLoggedInCheckBox/StayLoggedInCheckBox.jsx';
import StepsVisualizer from '@c/ui/StepsVisualizer/StepsVisualizer';

const Register = () => {
  const {
    legends: {
      locale: localeLegend,
      email: emailLegend,
      names: namesLegend,
      password: passwordLegend,
      img: imgLegend
    },
    skipAndFinish: skipText,
    finish: finishText
  } = useText('pages.auth.register');

  const nextText = useText('ui.next');

  const {
    saveStepData,
    setImg,
    submitAll,
    isSubmitting,
    step,
    next,
    isStep,
    imageSelected,
    stayLoggedInChecked,
    setStayLoggedInChecked,
    serverError,
    clearServerError
  } = useMultiStepRegister();

  const sharedProps = {
    onNext: (data) => {
      saveStepData(data);
      next();
    },
    hasButton: true,
    buttonContent: nextText
  };

  return (
    <div className='w-full flex flex-col items-center gap-5'>
      <StepsVisualizer currentStep={step} totalSteps={5} />

      {serverError && <p className='text-error text-sm mt-2'>{serverError}</p>}

      <div className='w-full'>
        {isStep(1) && <Locale {...sharedProps} legendText={localeLegend} />}
        {isStep(2) && <Email {...sharedProps} legendText={emailLegend} />}
        {isStep(3) && <Names {...sharedProps} legendText={namesLegend} />}
        {isStep(4) && <Password {...sharedProps} legendText={passwordLegend} />}

        {isStep(5) && (
          <Img
            hasButton
            legendText={imgLegend}
            buttonContent={imageSelected ? finishText : skipText}
            onImgChange={setImg}
            onNext={(data) => {
              saveStepData(data);
              clearServerError();
              submitAll();
            }}
            isSubmitting={isSubmitting}
          >
            <StayLoggedInCheckBox
              className='mt-10'
              checked={stayLoggedInChecked}
              setChecked={setStayLoggedInChecked}
            />
          </Img>
        )}
      </div>
    </div>
  );
};

export default Register;
