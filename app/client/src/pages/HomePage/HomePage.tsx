import { HomePageWrapper, LogoImg } from "./HomePage.styles"
import logoImg from '@/shared/assets/logos/logo.png'
import { Heading } from "@/shared/ui/atoms/Heading";
import { Paragraph } from "@/shared/ui/atoms/Paragraph";
import { ButtonGroup, type GroupedButtonProps } from "@/shared/ui/molecules/ButtonGroup";

export const HomePage = () => {
  const buttonPropsList: GroupedButtonProps[] = [
    {
      type: 'primary',
      size: 'xl',
      children: 'ログイン',
    },
    {
      type: 'secondary',
      size: 'xl',
      children: '新規登録',
    },
  ];

  return (
    <HomePageWrapper>
      <LogoImg src={ logoImg } alt="ロゴ画像はAI生成です" />

      <Heading size="xxxl">RerekishoReaction</Heading>

      <Paragraph align="center" line_height="relaxed">
        RerekishoReactionはブラウザ上でA4履歴書を作成するアプリです。<br />
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
