import { useRef, type ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components'
import { Checkbox } from '@/shared/ui/atoms/Checkbox';

type Props = ComponentPropsWithoutRef<typeof Checkbox> & {
  label?: React.ReactNode;
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

const LabelWrapper = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
`;

export const CheckboxWithLabel = (props: Props) => {
  const { label, ...rest } = props;
  const checkboxRef = useRef<HTMLDivElement>(null);

  return (
    <CheckboxWithLabelWrapper>
      <Checkbox ref={ checkboxRef } { ...rest } />
      <LabelWrapper
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
