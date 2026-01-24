import { useNavigate } from "react-router-dom";
import { useAuthSelector } from "@/app/store/hooks";
import { HomePageWrapper, LogoImg, LogoTextImg } from "./HomePage.styles"
import logoImg from '@/shared/assets/logos/logo.png'
import logoTextImg from '@/shared/assets/logos/logo_text.gif'
import { Paragraph } from "@/shared/ui/atoms";
import { ButtonGroup, type GroupedButtonProps } from "@/shared/ui/molecules";
import { urlWithCacheBuster } from "@/shared/utils/url";

export const HomePage = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthSelector();

  const buttonPropsList: GroupedButtonProps[] = isAuthenticated
    ? [
      {
        styleType: 'solid',
        color: 'primary',
        size: 'xl',
        children: '履歴書一覧',
        onClick: () => {
          navigate('/resumes');
        },
      },
    ]
    : [
      {
        styleType: 'solid',
        color: 'primary',
        size: 'xl',
        children: 'ログイン',
        onClick: () => {
          navigate('/auth/signin');
        },
      },
      {
        styleType: 'outline',
        color: 'primary',
        size: 'xl',
        children: '新規登録',
        onClick: () => {
          navigate('/auth/signup');
        },
      },
    ];

  return (
    <HomePageWrapper>
      <LogoImg src={ logoImg } alt="ロゴ画像はAI生成です" />

      <LogoTextImg src={ urlWithCacheBuster(logoTextImg) } alt="ロゴテキストのアニメーションGIFです" />

      <Paragraph align="center" lineHeight="relaxed">
        Rerekishonはブラウザ上でA4履歴書を作成するアプリです。<br />
        ユーザー登録することで履歴書を作成し、PDFとして保存できます。<br />
      </Paragraph>

      <ButtonGroup
        $size='xl'
        $isBreakWhenSP={ true }
        buttonPropsList={ buttonPropsList }
      />

      <Paragraph align="center" lineHeight="relaxed">
        ※本アプリは動作確認用です。予告なく停止・再開・変更される可能性があります
      </Paragraph>
      
    </HomePageWrapper>
  );
};
