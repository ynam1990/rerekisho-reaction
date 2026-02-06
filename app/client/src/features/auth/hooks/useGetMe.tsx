import { useAppDispatch } from "@/app/store/hooks";
import { initializeAuthThunk } from "@/features/auth";

export const useGetMe = () => {
  const dispatch = useAppDispatch();
  
  const initializeAuth = async (onAfterGetMe?: (isAuthenticated: boolean) => void) => {
    // 200OKなら認証済み、401なら未認証として状態を初期化
    try {
      await dispatch(initializeAuthThunk()).unwrap();
      console.log('Authorized.');

      if (onAfterGetMe) onAfterGetMe(true);
    } catch (error) {
      console.log('Unauthorized.');
      if (onAfterGetMe) onAfterGetMe(false);
    }
  };

  return { initializeAuth };
};
