import cN from '@/utils/classNameManager';

const StepsVisualizer = ({ totalSteps, currentStep }) => {
  return (
    <ul className='steps'>
      {[...Array(totalSteps)].map((_, i) => (
        <li
          key={i}
          className={cN('step', currentStep >= i + 1 && 'step-primary')}
        />
      ))}
    </ul>
  );
};

export default StepsVisualizer;
