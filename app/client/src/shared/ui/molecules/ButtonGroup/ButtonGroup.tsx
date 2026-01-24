import styled, { css } from 'styled-components'
import { Button } from '@/shared/ui/atoms';
import { theme } from '@/shared/styles/theme';

export type GroupedButtonProps = typeof Button.defaultProps;

type Props = {
  $size?: keyof typeof theme.spacing;
  $isBreakWhenSP?: boolean;
  $flexDirection?: 'row' | 'column';
  buttonPropsList: GroupedButtonProps[];
};


const ButtonGroupWrapper = styled.div<Omit<Props, 'buttonPropsList'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${ ({ $size, $isBreakWhenSP, $flexDirection }) => {
    const spacingSelected = theme.spacing[$size ?? 'md'];

    return css`
      flex-direction: ${ $flexDirection };
      column-gap: ${ spacingSelected.pc };
      row-gap: ${ spacingSelected.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
          column-gap: ${ spacingSelected.sp };
          row-gap: ${ spacingSelected.sp };
          
          ${ $isBreakWhenSP ? `
            flex-direction: column;
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
  <ButtonGroupWrapper
    $size={ props.$size }
    $isBreakWhenSP={ props.$isBreakWhenSP }
    $flexDirection={ props.$flexDirection }
  >
    {
      props.buttonPropsList.map((buttonProps, index: number) => {
        return <Button key={ index } { ...buttonProps } />
      })
    }
  </ButtonGroupWrapper>
);
