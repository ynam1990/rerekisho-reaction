import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetMe, usePostSignIn } from "@/features/auth";
import { Button, Paragraph, Text } from "@/shared/ui/atoms";
import { SignInFormWrapper, StyledInput, StyledLabel, StyledSignInForm, FormFooterWrapper, LogoImg } from "./SignInForm.styles"
import logoImg from '@/shared/assets/logos/logo.png'

export const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { postSignIn } = usePostSignIn();
  const { initializeAuth } = useGetMe();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username') || '');
    const password = String(formData.get('password') || '');

    await postSignIn({ username, password }, async () => {
      // 認証状態を確認してから移動します
      await initializeAuth((isAuthorized: boolean) => {
        navigate(isAuthorized ? (location.state?.from?.pathname || '/resumes') : '/auth/signin');
      });
    });
  };

  return (
    <SignInFormWrapper>
      <LogoImg src={ logoImg } alt="ロゴ画像はAI生成です" />

      <StyledSignInForm
        name="sign_in_form"
        onSubmit={ onSubmit }
      >
        <StyledLabel>
          ユーザ名
          <StyledInput
            styleType="transparent"
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="on"
          />
        </StyledLabel>

        <StyledLabel>
          パスワード
          <StyledInput
            styleType="transparent"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
          />
        </StyledLabel>

        <FormFooterWrapper>
          <Button styleType="solid">ログイン</Button>

          <Paragraph align="left" lineHeight="tight" size="sm">
            新規登録は
            <Link to="/auth/signup">
              <Text decoration="underline">こちら</Text>
            </Link>
          </Paragraph>

          <Paragraph align="left" lineHeight="tight" size="sm">
            パスワード再設定機能はありません。ログインできない場合は新規にご登録ください。<br />
            ※3ヶ月間ログインの無い場合、登録は自動的に抹消されます
          </Paragraph>
        </FormFooterWrapper>
        
      </StyledSignInForm>
    </SignInFormWrapper>
  );
};
