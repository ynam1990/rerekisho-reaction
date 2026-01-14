import { Button } from "@/shared/ui/atoms/Button";
import { SignInFormWrapper, StyledInput, StyledLabel, StyledSignInForm, FormFooterWrapper, LogoImg } from "./SignInForm.styles"
import { Paragraph } from "@/shared/ui/atoms/Paragraph";
import logoImg from '@/shared/assets/logos/logo.png'
import { Text } from "@/shared/ui/atoms/Text";
import { Link } from "react-router-dom";

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

          <Paragraph align="left" line_height="tight" size="sm">
            新規登録は
            <Link to="/auth/signup">
              <Text decoration="underline">こちら</Text>
            </Link>
          </Paragraph>

          <Paragraph align="left" line_height="tight" size="sm">
            パスワード再設定機能はありません。ログインできない場合は新規にご登録の上、ご利用ください。<br />
            ※30日間ログインの無い場合、登録は自動的に抹消されます
          </Paragraph>
        </FormFooterWrapper>
        
      </StyledSignInForm>
    </SignInFormWrapper>
  );
};
