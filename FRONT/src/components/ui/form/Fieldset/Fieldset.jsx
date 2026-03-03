import cN from '@/utils/classNameManager';

const Fieldset = ({
  legendText,

  children,

  className,

  asDiv = false,

  wide
}) => {
  const BoxTag = asDiv ? 'div' : 'fieldset';

  const TitleTag = asDiv ? 'h2' : 'legend';

  return (
    <BoxTag
      className={cN(
        'fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xs border p-4 relative',
        asDiv && 'pt-0 mt-4',
        wide && 'max-w-full',
        className
      )}
    >
      <TitleTag className={cN('fieldset-legend', asDiv && 'relative bottom-4')}>
        {legendText}
      </TitleTag>
      {children}
    </BoxTag>
  );
};

export default Fieldset;
