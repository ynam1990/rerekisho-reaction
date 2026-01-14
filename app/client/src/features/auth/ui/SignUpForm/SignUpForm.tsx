import { Button } from "@/shared/ui/atoms/Button";
import { SignUpFormWrapper, StyledInput, StyledLabel, StyledSignUpForm, FormFooterWrapper, StyledHeading } from "./SignUpForm.styles"
import { Paragraph } from "@/shared/ui/atoms/Paragraph";
import { Text } from "@/shared/ui/atoms/Text";
import { Link } from "react-router-dom";
import { CheckboxWithLabel } from "@/shared/ui/molecules/CheckboxWithLabel";

const onSubmit = (formData: FormData) => {
  console.log(formData)
};

export const SignUpForm = () => {

  return (
    <SignUpFormWrapper>
      <StyledHeading>新規登録</StyledHeading>

      <StyledSignUpForm name="sign_in_form" action={ onSubmit }>

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
          <Paragraph align="left" line_height="tight" size="sm">
            30日間ログインの無い場合、ユーザー登録は自動的に抹消され、データは削除されます。<br />
            本アプリはサンプル用です。本アプリの利用により、もし何らかの損害が発生した場合、当方はその賠償責任を負えません。<br />
            ご利用は自己責任にてお願いいたします。<br />
            法に定められた手続きによる場合を除き、当方はユーザーの履歴書データを利用することはありません。また、当方はユーザーデータの保持義務を負いません。<br />
            本アプリは予告なく停止される可能性があり、その場合はユーザーデータも削除されます。<br />
          </Paragraph>

          <CheckboxWithLabel
            name="agreement"
            label={ '同意する' }
          />

          <Button styleType="solid" color="secondary">登録実行</Button>

          <Paragraph align="left" line_height="tight" size="sm">
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
