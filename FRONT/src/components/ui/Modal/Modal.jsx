import cN from '@/utils/classNameManager';

const Modal = ({ open, setOpen, children, className, onOutsideClick }) => {
  return (
    <dialog className={cN('modal', open && 'modal-open')}>
      <div
        className={cN(
          'modal-box overflow-y-visible max-w-2xs mobile:max-w-md',
          className
        )}
      >
        {children}
      </div>
      <div
        method='dialog'
        className='modal-backdrop cursor-pointer'
        onClick={() => {
          setOpen(false);
          onOutsideClick?.();
        }}
      ></div>
    </dialog>
  );
};

export default Modal;
