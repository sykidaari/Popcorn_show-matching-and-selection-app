import backend from '@/api/config/axios';
import R from '@/constants/client/routePaths';
import useText from '@/contexts/App/hooks/useText';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useModal from '@/hooks/useModal';
import MediaCard from '@c/features/media/MediaSection/MediaCardStack/MediaCard/MediaCard';
import MatchModal from '@c/features/sessions/session/MatchModal/MatchModal';
import SessionCard from '@c/features/sessions/session/SessionCard/SessionCard';
import SessionParticipants from '@c/features/sessions/session/SessionParticipants/SessionParticipants';
import UserProfileModal from '@c/features/user/UserProfile/UserProfileModal/UserProfileModal';
import LoadingButtonsSection from '@c/ui/LoadingButtonsSection/LoadingButtonsSection';
import { Menubox } from '@c/ui/MenuBox/Menubox';
import Modal from '@c/ui/Modal/Modal';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionMenu = ({ session }) => {
  const currentUserId = useCurrentUserId();

  const {
    sessionDetails: detailsTitle,
    sessionOptions: {
      title: OptionsTitle,
      options: {
        leaveSession: {
          title: leaveTitle,
          confirmation: leaveConfirmation,
          yes: leaveYes,
          no: leaveNo
        }
      }
    },
    matchedMedias: { title: matchedTitle, none: noMatchesText }
  } = useText('features.sessions.session.menu');

  const [leaveModalOpen, setleaveModalOpen] = useState(false);

  const navigate = useNavigate();

  const {
    open: selectedMatchOpen,
    setOpen: setSelectedMatchOpen,
    item: selectedMatch,
    openSelectedItemModal: openSelectedMatchModal
  } = useModal();

  const {
    open: selectedParticipantModalOpen,
    setOpen: setSelectedParticipantModalOpen,
    item: selectedParticipant,
    openSelectedItemModal: openSelectedParticipantModal
  } = useModal();

  const {
    mutate: leaveSession,
    isError: leaveIsError,
    isPending: leaveIsPending
  } = useMutation({
    mutationFn: async () => {
      await backend.patch(`/${currentUserId}/session/${session?._id}/leave`);
    },
    onSuccess: () => {
      navigate(R.private.sessions.abs);
    }
  });

  return (
    <>
      <div className='p-2.5 max-mobile:px-1.5 flex flex-col overflow-y-auto items-center mb-2.5'>
        <div className='flex items-center flex-col mobile:flex-row mobile:gap-2.5'>
          <Menubox title={detailsTitle} className='gap-0'>
            <SessionCard sessionParameters={session} detail>
              <SessionParticipants
                session={session}
                openSelectedUserModal={openSelectedParticipantModal}
              />
            </SessionCard>
          </Menubox>
          <Menubox title={OptionsTitle}>
            <button
              className='btn btn-outline'
              onClick={() => setleaveModalOpen(true)}
            >
              {leaveTitle}
            </button>
          </Menubox>
        </div>

        <div className='divider divider-neutral max-mobile:hidden mx-2.5' />
        <Menubox noDivider title={matchedTitle} bigTitle className='gap-5'>
          {session?.matchedMedias?.length ? (
            <ul className='flex flex-wrap justify-center gap-2.5'>
              {session?.matchedMedias?.map((media) => (
                <li
                  key={media._id}
                  className='small:w-[40dvw] mobile:max-w-sm flex justify-center'
                >
                  <button
                    onClick={() => openSelectedMatchModal(media)}
                    className='cursor-pointer'
                  >
                    <MediaCard
                      noDetails
                      media={media}
                      specifyShowType={!!session?.includedMedia?.mediaType}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-info text-center text-sm'>{noMatchesText}</p>
          )}
        </Menubox>
      </div>
      {leaveModalOpen && (
        <Modal open={leaveModalOpen} setOpen={setleaveModalOpen}>
          <Menubox noDivider title={leaveConfirmation} className='gap-2.5'>
            <LoadingButtonsSection
              isError={leaveIsError}
              isLoading={leaveIsPending}
            >
              <button className='btn-warning' onClick={leaveSession}>
                {leaveYes}
              </button>
              <button onClick={() => setleaveModalOpen(false)}>
                {leaveNo}
              </button>
            </LoadingButtonsSection>
          </Menubox>
        </Modal>
      )}

      {selectedMatch && (
        <MatchModal
          open={selectedMatchOpen}
          setOpen={setSelectedMatchOpen}
          specifyShowType={!!session?.includedMedia?.mediaType}
          media={selectedMatch}
          notNew
        />
      )}

      {selectedParticipant && (
        <UserProfileModal
          noFriendshipButtons
          userId={selectedParticipant?._id}
          open={selectedParticipantModalOpen}
          setOpen={setSelectedParticipantModalOpen}
        />
      )}
    </>
  );
};

export default SessionMenu;
