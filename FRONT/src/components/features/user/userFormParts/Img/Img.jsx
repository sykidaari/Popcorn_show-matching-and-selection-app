import useText from '@/contexts/App/hooks/useText.js';
import cN from '@/utils/classNameManager.js';
import Fieldset from '@c/ui/form/Fieldset/Fieldset.jsx';
import Form from '@c/ui/form/Form/Form.jsx';
import Label from '@c/ui/form/Label/Label.jsx';
import SubmitButton from '@c/ui/form/SubmitButton/SubmitButton.jsx';
import { useState } from 'react';

const Img = ({
  onNext,
  onImgChange,
  legendText,
  hasButton,
  buttonContent,
  children,
  isSubmitting
}) => {
  const {
    label: labelText,
    tooBig: tooBigText,
    wrongFormat: wrongFormatText
  } = useText('features.user.userFormParts.img');

  const [imgError, setImgError] = useState(null);
  const [file, setFile] = useState(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const handleChange = (e) => {
    const f = e.target.files?.[0] || null;

    setImgError(null);
    setFile(null);
    onImgChange?.(null);

    if (!f) return;

    if (f.size > MAX_FILE_SIZE) {
      setImgError(tooBigText);
      return;
    }

    if (!allowedTypes.includes(f.type)) {
      setImgError(wrongFormatText);
      return;
    }

    setFile(f);
    onImgChange?.(f);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onNext({ img: file });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Fieldset legendText={legendText}>
        <Label error={imgError}>
          {labelText}
          <input
            type='file'
            accept='.jpg,.jpeg,.png,.webp'
            className='file-input'
            onChange={handleChange}
          />
        </Label>

        {hasButton && (
          <SubmitButton
            className={cN(imgError && 'btn-disabled')}
            isLoading={isSubmitting}
          >
            {buttonContent}
          </SubmitButton>
        )}

        {children}
      </Fieldset>
    </Form>
  );
};

export default Img;
