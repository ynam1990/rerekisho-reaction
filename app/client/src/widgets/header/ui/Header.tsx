import styled, { css } from 'styled-components'
import logoImg from '@/shared/assets/logos/logo.png'
import { Button, Anchor, Heading, Text } from '@/shared/ui/atoms';
import { Popover, ModalButtonsWrapper } from '@/shared/ui/molecules';
import { pickWhite } from '@/shared/utils/style';
import { boxShadow, hideOnMin, postItStickLeft } from '@/shared/styles/mixins';
import { useAppDispatch } from '@/app/store/hooks';
import { useToast } from '@/shared/hooks/useToast';
import { deleteUserThunk, signOutThunk } from '@/features/auth';
import { hasMessage } from '@/shared/utils/check';
import { moveToUrl } from '@/shared/utils/url';
import { useModal } from '@/shared/hooks/useModal';

type Props = {
  ref: React.Ref<HTMLDivElement>;
  isInitialized: boolean;
  isAuthenticated: boolean;
  currentUserName?: string;
};

const LogoWrapperAnchor = styled(Anchor)`
  display: inline-flex;
  justify-content: left;
  align-items: center;
  margin-right: auto;

  cursor: pointer;
  * {
    pointer-events: none;
    user-select: none;
  }

  ${ ({ theme }) => css`
    column-gap: ${ theme.spacing.sm.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      column-gap: ${ theme.spacing.xs.sp };
    }
  ` }
`;

const LogoImg = styled.img`
  max-height: 100%;
  aspect-ratio: 579 / 640;

  ${ ({ theme }) => css`
    height: 46px;

    @media (max-width: ${ theme.breakpoints.sp}) {
      height: 38px;
    }
  ` }
`;

const ColoredHeading = styled(Heading)`
  font-weight: normal;
  color: ${ ({ theme }) => pickWhite(theme) };

  ${ hideOnMin }

  transform: translateY(2px);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: right;
  ${ boxShadow };

  ${ ({ theme }) => {
    const { color, spacing } = theme;

    return css`
      background-color: ${ color.primary };
      padding: ${ `${ spacing.sm.pc } ${ spacing.lg.pc }` };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ `${ spacing.sm.sp } ${ spacing.lg.sp }` };
      }
    `;
  } };
`

const HeaderRightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* フラッシュを避けるため、最初はopacityを0にしています */
  opacity: 0;
  animation: fadeIn 0.6s ease-in-out forwards;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const HamburgerMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  ${ boxShadow }
  ${ postItStickLeft }
  
  ${ ({ theme }) => {
    return css`
      background-color: ${ pickWhite(theme) };
      padding: ${ theme.spacing.md.pc } ${ theme.spacing.sm.pc };
      row-gap: ${ theme.spacing.md.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.md.pc } ${ theme.spacing.sm.pc };
        row-gap: ${ theme.spacing.md.sp };
      }
    `;
  } }
`;

export const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  const { showModalWithOptions, hideModal } = useModal();

  const onSignOutButtonClick = async () => {
    try {
      await dispatch(signOutThunk()).unwrap();

      showToastWithOptions({
        icon: 'success',
        content: 'ログアウトしました',
      });

      // トップページへ遷移してリロード
      moveToUrl('/');
    } catch (error) {
      showToastWithOptions({
        icon: 'error',
        content: (hasMessage(error) && error.message) || 'ログアウトに失敗しました。ページをリロードして再度お試しください',
      });
    }
  };

  const onDeleteUserButtonClick = async () => {
    const execDelete = async () => {
      try {
        await dispatch(deleteUserThunk()).unwrap();

        showModalWithOptions({
          title: 'ユーザー登録の削除が完了しました',
          content: 'ユーザー登録の削除が完了しました。ご利用いただきありがとうございました',
          footerContent: (
            <ModalButtonsWrapper>
              <Button
                styleType="solid"
                color="tertiary"
                size="md"
                onClick={ () => {
                  moveToUrl('/');
                } }
              >
                閉じる
              </Button>
            </ModalButtonsWrapper>
          ),
          onEnterPress: () => {
            moveToUrl('/');
          },
        });
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: (hasMessage(error) && error.message) || 'ユーザー削除に失敗しました。ページをリロードして再度お試しください',
        });
      }
    };
    
    showModalWithOptions({
      title: 'ユーザー登録の削除',
      content: 'ユーザー登録を削除すると、作成した履歴書データも全て削除されます。削除してもよろしいですか？',
      footerContent: (
        <ModalButtonsWrapper>
          <Button
            styleType="solid"
            color="tertiary"
            size="md"
            onClick={ () => hideModal() }
          >
            キャンセル
          </Button>
          <Button
            styleType="solid"
            color="primary"
            size="md"
            onClick={ () => {
              hideModal();
              execDelete();
            } }
          >
            削除する
          </Button>
        </ModalButtonsWrapper>
      ),
      onEnterPress: () => {
        execDelete();
      },
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
