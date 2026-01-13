import { Navigate, useParams } from "react-router-dom";
import { AuthPageWrapper } from "./AuthPage.styles"
import { SignInForm } from "@/features/auth/ui/SignInForm";
import { SignUpForm } from "@/features/auth/ui/SignUpForm/SignUpForm";

const AUTH_FORM_ACTIONS = [
  'signin',
  'signup',
] as const;
type AuthFormAction = typeof AUTH_FORM_ACTIONS[number];

const formsByAction: Record<AuthFormAction, React.ReactNode> = {
  signin: <SignInForm />,
  signup: <SignUpForm />,
};

export const AuthPage = () => {
  const { action } = useParams();

  // 正しいアクション以外はホーム画面へリダイレクト
  if (!AUTH_FORM_ACTIONS.includes(action as AuthFormAction)) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <AuthPageWrapper>
      { formsByAction[action as AuthFormAction] }
    </AuthPageWrapper>
  );
};
