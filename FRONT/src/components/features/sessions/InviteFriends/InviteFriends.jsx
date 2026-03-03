import useText from '@/contexts/App/hooks/useText';
import cN from '@/utils/classNameManager';
import FriendsSection from '@c/features/user/currentUser/FriendsSection/FriendsSection';
import Form from '@c/ui/form/Form/Form';
import SubmitButton from '@c/ui/form/SubmitButton/SubmitButton';
import {
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const InviteFriends = ({
  maxAmount,
  onSubmit,

  buttonClassName,
  buttonContent
}) => {
  const { title: titleText, maxAmount: maxAmountText } = useText(
    'features.sessions.session.invite'
  );

  const [selectedUsers, setSelectedUsers] = useState(new Set());

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ otherUserId: Array.from(selectedUsers) });
      }}
    >
      <div className='flex flex-col w-full justify-center items-center max-w-md m-auto mb-5'>
        <div className='flex flex-col items-center gap-1.5 pb-5'>
          <h2 className='text-primary text-lg font-semibold'>{titleText}:</h2>
          <span className='badge badge-primary'>
            {selectedUsers.size}/{maxAmount}
          </span>
        </div>
        <div className='w-full h-[50dvh] min-h-76 mb-1.5'>
          <FriendsSection
            minimalItems
            listItems
            seenFnsDisabled
            onClick={(item) => {
              setSelectedUsers((prev) => {
                const next = new Set(prev);
                const id = item?.user?._id;

                if (next.has(id)) next.delete(id);
                else {
                  if (next.size >= maxAmount) return prev;
                  next.add(id);
                }
                return next;
              });
            }}
            additionalListItemContent={(item) =>
              selectedUsers.has(item?.user?._id) && (
                <div className='absolute inset-0 bg-success/10 rounded-box z-10'>
                  <CheckCircleIcon className='size-7 text-success right-1.5 top-1/2 -translate-y-1/2 absolute' />
                </div>
              )
            }
            listItemDisabled={(item) => {
              const id = item?.user?._id;
              return selectedUsers.size >= maxAmount && !selectedUsers.has(id);
            }}
          ></FriendsSection>
        </div>
        <div className='flex justify-center gap-1 text-info'>
          <InformationCircleIcon className='size-5 min-w-5' />
          <p className='text-sm'> {maxAmountText}</p>
        </div>
        {
          <SubmitButton
            className={cN(
              selectedUsers.size <= 0 && 'btn-disabled',
              buttonClassName
            )}
          >
            {buttonContent}
          </SubmitButton>
        }
      </div>
    </Form>
  );
};

export default InviteFriends;
