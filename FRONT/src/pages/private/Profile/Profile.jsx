import backend from '@/api/config/axios';
import R from '@/constants/client/routePaths';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId.js';
import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext';
import UserProfile from '@c/features/user/UserProfile/UserProfile.jsx';
import FullLengthPageWrapper from '@c/layouts/PrivateLayout/FullLengthPageWrapper/FullLengthPageWrapper.jsx';
import LoadingButtonsSection from '@c/ui/LoadingButtonsSection/LoadingButtonsSection';
import Modal from '@c/ui/Modal/Modal';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const Profile = () => {
  const userId = useCurrentUserId();

  const {
    title: logoutTitle,
    confirmation: {
      title: logoutConfirmationTitle,
      yes: yesLogout,
      no: noLogout
    }
  } = useText('features.user.currentUser.logout');

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const {
    actions: { logout: contextlogout }
  } = useUserSessionContext();

  const {
    mutate: logout,
    isPending,
    isError
  } = useMutation({
    mutationFn: async () => {
      await backend.delete('/user');
    },
    onSuccess: () => contextlogout()
  });

  return (
    <FullLengthPageWrapper className='gap-5'>
      <UserProfile userId={userId} />

      <button
        className='btn btn-outline btn-secondary'
        onClick={() => setLogoutModalOpen(true)}
      >
        {logoutTitle}
      </button>

      {logoutModalOpen && (
        <Modal open={logoutModalOpen} setOpen={setLogoutModalOpen}>
          <p className='text-center text-sm mb-2.5'>
            {logoutConfirmationTitle}
          </p>
          <LoadingButtonsSection isError={isError} isLoading={isPending}>
            <button className='btn-warning' onClick={logout}>
              {yesLogout}
            </button>
            <button onClick={() => setLogoutModalOpen(false)}>
              {noLogout}
            </button>
          </LoadingButtonsSection>
        </Modal>
      )}
    </FullLengthPageWrapper>
  );
};

export default Profile;
