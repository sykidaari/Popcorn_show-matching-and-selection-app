import useText from '@/contexts/App/hooks/useText';
import useMultiStepForm from '@/hooks/form/useMultiStepForm';
import useSteps from '@/hooks/useSteps';
import InviteFriends from '@c/features/sessions/InviteFriends/InviteFriends';
import SessionParameters from '@c/features/sessions/SessionParameters/SessionParameters';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper';
import StepsVisualizer from '@c/ui/StepsVisualizer/StepsVisualizer';

const CreateSession = () => {
  const { step, next, isStep } = useSteps();
  const { formData, saveStepData } = useMultiStepForm();

  const nextText = useText('ui.next');

  console.log(formData);

  return (
    <FullLengthPageWrapper className='gap-7.5 '>
      <StepsVisualizer currentStep={step} totalSteps={2} />

      {isStep(1) && (
        <InviteFriends
          maxAmount={5}
          onSubmit={(data) => {
            saveStepData(data);
            next();
          }}
          buttonContent={nextText}
          buttonClassName='btn-primary'
        />
      )}
      {isStep(2) && <SessionParameters />}
    </FullLengthPageWrapper>
  );
};

export default CreateSession;
