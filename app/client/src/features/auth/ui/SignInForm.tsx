import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { login } from "@/features/auth";
import { useToast } from "@/shared/hooks/useToast";
import { callAPI } from "@/shared/api/request";
import type { PostSignInAPIPair } from "@/shared/api/type";
import { Button, Paragraph, Text } from "@/shared/ui/atoms";
import { SignInFormWrapper, StyledInput, StyledLabel, StyledSignInForm, FormFooterWrapper, LogoImg } from "./SignInForm.styles"
import logoImg from '@/shared/assets/logos/logo.png'

export const SignInForm = () => {
  const showToastWithOptions = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username') || '');
    const password = String(formData.get('password') || '');

    if (username.length === 0 || password.length === 0) {
      showToastWithOptions({
        icon: 'error',
        content: 'ユーザ名とパスワードを入力してください',
      });
      return; 
    }

    const { promise } = callAPI<PostSignInAPIPair>(
      '/auth/signin',
      {
        method: 'POST',
        body: {
          username,
          password,
        },
      }
    );

    await promise.then(() => {
      showToastWithOptions({
        icon: 'success',
        content: 'ログインしました',
      });

      dispatch(login({ currentUserName: username }));
      
      navigate(location.state?.from?.pathname || '/resumes');
    }).catch((error) => {
      showToastWithOptions({
        icon: 'error',
        content: error.message || 'ログインに失敗しました。しばらく経ってから再度お試しください',
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
