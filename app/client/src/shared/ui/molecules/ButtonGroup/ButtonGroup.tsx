import styled, { css } from 'styled-components'
import { Button } from '@/shared/ui/atoms/Button';
import { theme } from '@/shared/styles/theme';

export type GroupedButtonProps = typeof Button.defaultProps;

type Props = {
  size?: keyof typeof theme.spacing;
  buttonPropsList: GroupedButtonProps[];
};

const ButtonGroupWrapper = styled.div<{ size: Props['size'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${ ({ size }) => {
    const spacing = theme.spacing[size ?? 'md'];

    return css`
      column-gap: ${ spacing.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
          column-gap: ${ spacing.sp };
        }
    `;
  } }
`

export const ButtonGroup = (props: Props) => (
  <ButtonGroupWrapper size={ props.size }>
    {
      props.buttonPropsList.map((buttonProps, index: number) => {
        return <Button key={ index } { ...buttonProps } />
      })
    }
  </ButtonGroupWrapper>
);
