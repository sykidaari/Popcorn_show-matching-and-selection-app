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
    if (!selectedUserId) throw new Error('uploadImg: missing userId');
    if (!img) throw new Error('uploadImg: missing img');

    const fd = new FormData();
    fd.append('img', img);

    const { data } = await backend.patch(`/user/${selectedUserId}/img`, fd);

    setImg(data.img);
    return data.img;
  };

  const uploadImgSafe = async (img, userId) => {
    try {
      return await uploadImg(img, userId);
    } catch (e) {
      if (IS_DEV) console.log(e);
    }
  };

  return { uploadImg, uploadImgSafe };
};

export default useImgUpload;
