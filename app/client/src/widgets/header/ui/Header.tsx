import { ColoredHeading, HamburgerMenuContent, HeaderRightContent, HeaderWrapper, LogoImg, LogoWrapperAnchor } from './Header.styles';
import { Button, Text } from '@/shared/ui/atoms';
import { Popover } from '@/shared/ui/molecules';
import logoImg from '@/shared/assets/logos/logo.png'
import { useDeleteMe, usePostSignOut } from '@/features/auth';
import { moveToUrl } from '@/shared/utils/url';

type Props = {
  ref: React.Ref<HTMLDivElement>;
  isInitialized: boolean;
  isAuthenticated: boolean;
  currentUserName?: string;
};

export const Header = (props: Props) => {
  const { postSignOut } = usePostSignOut();
  const { deleteMe } = useDeleteMe();

  const onSignOutButtonClick = async () => {
    await postSignOut(() => {
      // トップページへ遷移してリロード
      moveToUrl('/');
    });
  };

  const onDeleteUserButtonClick = async () => {
    await deleteMe(() => {
      moveToUrl('/');
    });
  };
  
  return (
    <HeaderWrapper ref={ props.ref }>
      <LogoWrapperAnchor href='/'>
        <LogoImg src={ logoImg } alt="ロゴ画像はAI生成です" />
        <ColoredHeading size="xxxl">Rerekishon</ColoredHeading>
      </LogoWrapperAnchor>

      { props.isInitialized && <HeaderRightContent>
        {
          props.isAuthenticated ? (
            <Popover
              id='header_pop'
              type='hamburger'
              color='paperWhite'
              content={(
                <HamburgerMenuContent>
                  <Text>ユーザー名：{ props.currentUserName || '-' }</Text>

                  <Button
                    styleType='text'
                    color='tertiary'
                    noWrap={ true }
                    size='sm'
                    onClick={ onDeleteUserButtonClick }
                  >
                    ユーザー登録の削除
                  </Button>

                  <Button
                    styleType='solid'
                    color='primary'
                    noWrap={ true }
                    onClick={ () => {
                      moveToUrl('/resumes');
                    } }
                  >
                    履歴書一覧
                  </Button>

                  <Button
                    styleType='solid'
                    color='tertiary'
                    noWrap={ true }
                    onClick={ onSignOutButtonClick }
                  >
                    ログアウト
                  </Button>
                </HamburgerMenuContent>
              )}
            />
          ) : (
            <Button
              styleType='outline'
              color='primary'
              noWrap={ true }
              onClick={ () => {
                moveToUrl('/auth/signin');
              }}
            >
              ログイン
            </Button>
          )
        } </HeaderRightContent>
      }
    </HeaderWrapper>
  );
};
