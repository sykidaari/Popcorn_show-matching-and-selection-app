import backend from '@/api/config/axios';
import useCurrentUserId from '@/contexts/UserSession/hooks/useCurrentUserId';
import useUserSessionContext from '@/contexts/UserSession/hooks/useUserSessionContext';
import { IS_DEV } from '@/utils/env';

const useImgUpload = () => {
  const {
    actions: { setImg }
  } = useUserSessionContext();

  const currentUserId = useCurrentUserId();

  const uploadImg = async (img, userId) => {
    const selectedUserId = userId ?? currentUserId;

    try {
      const fd = new FormData();
      fd.append('img', img);
      const { data } = await backend.patch(`/user/${selectedUserId}/img`, fd);

      setImg(data.img);
    } catch (error) {
      if (IS_DEV) console.log(error);
    }
  };

  return { uploadImg };
};

export default useImgUpload;
