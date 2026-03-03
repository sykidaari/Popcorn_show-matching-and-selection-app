import cN from '@/utils/classNameManager.js';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const InfoToolTip = ({ text, className }) => {
  return (
    <div
      className={cN(
        'tooltip size-6 max-mobile:before:text-xs max-mobile:before:max-w-[60dvw]',
        className
      )}
      data-tip={text}
    >
      <InformationCircleIcon />
    </div>
  );
};

export default InfoToolTip;
