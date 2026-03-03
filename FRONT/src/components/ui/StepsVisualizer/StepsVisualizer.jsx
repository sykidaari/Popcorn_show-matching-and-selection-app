import cN from '@/utils/classNameManager';

const StepsVisualizer = ({ totalSteps, currentStep }) => {
  return (
    <div className='overflow-x-auto max-w-full min-h-10'>
      <ul className='steps'>
        {[...Array(totalSteps)].map((_, i) => (
          <li
            key={i}
            className={cN('step', currentStep >= i + 1 && 'step-primary')}
          />
        ))}
      </ul>
    </div>
  );
};

export default StepsVisualizer;
