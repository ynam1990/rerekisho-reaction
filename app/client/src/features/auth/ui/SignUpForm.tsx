import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/shared/hooks/useToast";
import { useAppDispatch } from "@/app/store/hooks";
import { signUpThunk } from "@/features/auth";
import { hasMessage } from "@/shared/utils/check";
import { Button, Paragraph, Text } from "@/shared/ui/atoms";
import { CheckboxWithLabel } from "@/shared/ui/molecules";
import { SignUpFormWrapper, StyledInput, StyledLabel, StyledSignUpForm, FormFooterWrapper, StyledHeading } from "./SignUpForm.styles"

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showToastWithOptions = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get('username') || '');
    const password = String(formData.get('password') || '');
    const passwordConfirmation = String(formData.get('password_confirmation') || '');
    const agreement = formData.get('agreement') === 'true';

    if (username.length < 4) {
      showToastWithOptions({
        icon: 'error',
        content: 'ユーザ名は4文字以上である必要があります',
      });
      return; 
    }
    if (password.length < 8) {
      showToastWithOptions({
        icon: 'error',
        content: 'パスワードは8文字以上である必要があります',
      });
      return;
    }
    if (password !== passwordConfirmation) {
      showToastWithOptions({
        icon: 'error',
        content: 'パスワードと確認用パスワードが一致しません',
      });
      return;
    }
    if (!agreement) {
      showToastWithOptions({
        icon: 'error',
        content: '同意チェックが必要です',
      });
      return;
    }

    try {
      await dispatch(signUpThunk({ username, password, agreement })).unwrap();

      showToastWithOptions({
        icon: 'success',
        content: '登録が完了しました。新規作成ボタンから、履歴書をご作成いただけます',
      });
      navigate('/resumes');

    } catch (error) {
      showToastWithOptions({
        icon: 'error',
        content: (hasMessage(error) && error.message) || '登録に失敗しました。しばらく経ってから再度お試しください',
      });
    }
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
