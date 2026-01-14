import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components'

type Props = ComponentPropsWithoutRef<'label'>;

const StyledLabel = styled.label`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${ ({ theme }) => theme.color.tertiary};

  ${ ({ theme }) => {
    const { typography, spacing } = theme;
    const { fontSize, lineHeight, letterSpacing } = typography;

    return css`
      font-size: ${ fontSize.md.pc };
      letter-spacing: ${ letterSpacing.body.pc };
      line-height: ${ lineHeight.tight.pc };
      row-gap: ${ spacing.xxs.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        font-size: ${ fontSize.md.sp };
        letter-spacing: ${ letterSpacing.body.sp };
        line-height: ${ lineHeight.tight.sp };
        row-gap: ${ spacing.xxs.sp };
      }
    `;
  }}
`;

export const Label = forwardRef<HTMLLabelElement, Props>((props: Props, ref) => (
  <StyledLabel ref={ ref } { ...props } />
));
