import { Link, useNavigate } from "react-router-dom";
import { Button, Paragraph, Text } from "@/shared/ui/atoms";
import { CheckboxWithLabel } from "@/shared/ui/molecules";
import { SignUpFormWrapper, StyledInput, StyledLabel, StyledSignUpForm, FormFooterWrapper, StyledHeading } from "./SignUpForm.styles"
import { usePostSignUp } from "@/features/auth";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { postSignUp } = usePostSignUp();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username') || '');
    const password = String(formData.get('password') || '');
    const passwordConfirmation = String(formData.get('password_confirmation') || '');
    const agreement = formData.get('agreement') === 'true';

    await postSignUp({ username, password, passwordConfirmation, agreement }, () => {
      navigate('/resumes');
    });
  };

  return (
    <SignUpFormWrapper>
      <StyledHeading>新規登録</StyledHeading>

      <StyledSignUpForm
        name="sign_in_form"
        onSubmit={ onSubmit }
      >

        <StyledLabel>
          ユーザ名
          <StyledInput
            styleType="transparent"
            outlineColor="secondary"
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
            outlineColor="secondary"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
          />
        </StyledLabel>

        <StyledLabel>
          パスワードの確認
          <StyledInput
            styleType="transparent"
            outlineColor="secondary"
            type="password"
            name="password_confirmation"
            placeholder="確認のため再入力ください"
            autoComplete="on"
          />
        </StyledLabel>

        <FormFooterWrapper>
          <Paragraph align="left" lineHeight="tight" size="sm">
            3ヶ月間ログインの無い場合、ユーザー登録は自動的に抹消され、データは削除されます。<br />
            本アプリは動作確認用です。ご利用は自己責任にてお願いいたします。<br />
            法に定められた手続きによる場合を除き、当方はユーザーの履歴書データを利用することはありません。<br />
            本アプリは予告なく停止される可能性があり、その場合はユーザーデータも削除されます。<br />
          </Paragraph>

          <CheckboxWithLabel
            name="agreement"
            label={ '同意する' }
          />

          <Button styleType="solid" color="secondary">登録実行</Button>

          <Paragraph align="left" lineHeight="tight" size="sm">
            ログインは
            <Link to="/auth/signin">
              <Text decoration="underline">こちら</Text>
            </Link>
          </Paragraph>
        </FormFooterWrapper>
        
      </StyledSignUpForm>
    </SignUpFormWrapper>
  );
};
