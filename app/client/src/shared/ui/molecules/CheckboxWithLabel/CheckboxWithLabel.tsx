import { useRef, type ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components'
import { Checkbox } from '@/shared/ui/atoms';
import type { ColorKey } from '@/shared/styles/theme';

type Props = ComponentPropsWithoutRef<typeof Checkbox> & {
  label?: React.ReactNode;
  labelColor?: ColorKey;
};

export const CheckboxWithLabel = (props: Props) => {
  const { label, labelColor, ...rest } = props;
  const checkboxRef = useRef<HTMLDivElement>(null);

  return (
    <CheckboxWithLabelWrapper>
      <Checkbox ref={ checkboxRef } { ...rest } />
      <LabelWrapper
        $labelColor={ labelColor }
        onClick={ (e) => {
          e.stopPropagation();
          checkboxRef.current?.click();
        } }
      >
        { label }
      </LabelWrapper>
    </CheckboxWithLabelWrapper>
  );
};

const CheckboxWithLabelWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.xs.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        column-gap: ${ theme.spacing.xs.sp };
      }
    `;
  } }
`;

const LabelWrapper = styled.div<{ $labelColor?: ColorKey }>`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  color: ${ ({ theme, $labelColor }) => $labelColor ? theme.color[$labelColor] : 'inherit' };
  cursor: pointer;
`;
