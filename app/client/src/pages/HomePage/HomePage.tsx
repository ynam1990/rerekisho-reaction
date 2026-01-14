import { useNavigate } from "react-router-dom";
import { HomePageWrapper, LogoImg, LogoTextImg } from "./HomePage.styles"
import logoImg from '@/shared/assets/logos/logo.png'
import logoTextImg from '@/shared/assets/logos/logo_text.gif'
import { Paragraph } from "@/shared/ui/atoms/Paragraph";
import { ButtonGroup, type GroupedButtonProps } from "@/shared/ui/molecules/ButtonGroup";
import { urlWithCacheBuster } from "@/shared/utils/url";

export const HomePage = () => {
  const navigate = useNavigate();

  const buttonPropsList: GroupedButtonProps[] = [
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

      <Paragraph align="center" line_height="relaxed">
        Rerekishonはブラウザ上でA4履歴書を作成するアプリです。<br />
        ユーザー登録することで履歴書を作成、保存、公開することができます。<br />
      </Paragraph>

      <ButtonGroup
        size='xl'
        isBreakWhenSP={ true }
        buttonPropsList={ buttonPropsList }
      />

      <Paragraph align="center" line_height="relaxed">
        ※本アプリはサンプルアプリです。予告なく停止・再開・変更される可能性があります
      </Paragraph>
      
    </HomePageWrapper>
  );
};
