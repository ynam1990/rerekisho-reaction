import { Link } from "react-router-dom";
import { Button, Paragraph, Text } from "@/shared/ui/atoms";
import { SignInFormWrapper, StyledInput, StyledLabel, StyledSignInForm, FormFooterWrapper, LogoImg } from "./SignInForm.styles"
import logoImg from '@/shared/assets/logos/logo.png'

const onSubmit = (formData: FormData) => {
  console.log(formData)
};

export const SignInForm = () => {

  return (
    <SignInFormWrapper>
      <LogoImg src={ logoImg } alt="ロゴ画像はAI生成です" />

      <StyledSignInForm name="sign_in_form" action={ onSubmit }>

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
