import { Text, Anchor } from '@/shared/ui/atoms'
import { FooterWrapper } from './Footer.styles';

type Props = {
  ref: React.Ref<HTMLDivElement>;
};

export const Footer = (props: Props) => (
  <FooterWrapper ref={ props.ref }>
    <Text size='sm'>© { new Date().getFullYear() } Rerekishon</Text>
    <Text size='sm'>/</Text>
    <Text size='sm'>
      <Anchor href='https://github.com/ynam1990/rerekisho-reaction'>githubリポジトリ</Anchor>
    </Text>
  </FooterWrapper>
);
