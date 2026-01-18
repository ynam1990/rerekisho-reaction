import styled, { css } from 'styled-components'
import { Button } from '@/shared/ui/atoms';
import { theme } from '@/shared/styles/theme';

export type GroupedButtonProps = typeof Button.defaultProps;

type Props = {
  $size?: keyof typeof theme.spacing;
  $isBreakWhenSP?: boolean;
  buttonPropsList: GroupedButtonProps[];
};

const ButtonGroupWrapper = styled.div<{ $size: Props['$size'], $isBreakWhenSP: Props['$isBreakWhenSP'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${ ({ $size, $isBreakWhenSP }) => {
    const spacing = theme.spacing[$size ?? 'md'];

    return css`
      column-gap: ${ spacing.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
          column-gap: ${ spacing.sp };
          
          ${ $isBreakWhenSP ? `
            flex-direction: column;
            row-gap: ${ theme.spacing.md.sp };
            width: 100%;

            button {
              width: 100%;
              text-align: center;
            }
          ` : '' }
        }
    `;
  } }
`

export const ButtonGroup = (props: Props) => (
  <ButtonGroupWrapper $size={ props.$size } $isBreakWhenSP={ props.$isBreakWhenSP }>
    {
      props.buttonPropsList.map((buttonProps, index: number) => {
        return <Button key={ index } { ...buttonProps } />
      })
    }
  </ButtonGroupWrapper>
);
