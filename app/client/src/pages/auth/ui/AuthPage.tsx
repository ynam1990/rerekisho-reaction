import { Navigate, useParams } from "react-router-dom";
import { AuthPageWrapper } from "./AuthPage.styles"
import { SignInForm, SignUpForm } from "@/features/auth";

const AUTH_FORM_ACTIONS = [
  'signin',
  'signup',
] as const;
type AuthFormAction = typeof AUTH_FORM_ACTIONS[number];

export const AuthPage = () => {
  const { action } = useParams();

  // 正しいアクション以外はホーム画面へリダイレクト
  if (!AUTH_FORM_ACTIONS.includes(action as AuthFormAction)) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <AuthPageWrapper>
      { action === 'signin' && <SignInForm /> }
      { action === 'signup' && <SignUpForm /> }
    </AuthPageWrapper>
  );
};
