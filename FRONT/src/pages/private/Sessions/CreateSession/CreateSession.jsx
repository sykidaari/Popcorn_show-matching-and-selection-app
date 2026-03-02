import useText from '@/contexts/App/hooks/useText';
import useSteps from '@/hooks/useSteps';
import InviteFriends from '@c/features/sessions/InviteFriends/InviteFriends';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper';
import StepsVisualizer from '@c/ui/StepsVisualizer/StepsVisualizer';

const CreateSession = () => {
  const { step, next, isStep } = useSteps();
  const nextText = useText('ui.next');

  const sharedProps = {
    // onNext: handleStep,

    buttonContent: nextText,
    buttonClassName: 'btn-soft btn-primary'
  };

  return (
    <FullLengthPageWrapper>
      <StepsVisualizer currentStep={step} />
      {isStep(1) && <InviteFriends maxAmount={5} {...sharedProps} />}
      {isStep(2)}
    </FullLengthPageWrapper>
  );
};

export default CreateSession;
