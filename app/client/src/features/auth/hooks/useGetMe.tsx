import { useAppDispatch } from "@/app/store/hooks";
import { initializeAuthThunk } from "@/features/auth";

export const useGetMe = () => {
  const dispatch = useAppDispatch();
  
  const initializeAuth = async () => {
    // 200OKなら認証済み、401なら未認証として状態を初期化
    await dispatch(initializeAuthThunk());
  };

  return { initializeAuth };
};
