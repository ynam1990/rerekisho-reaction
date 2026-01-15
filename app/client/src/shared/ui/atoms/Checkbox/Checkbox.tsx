import type { ColorKey } from '@/shared/styles/theme';
import { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components'

type Props =  {
  id?: string;
  name: string;
  value?: boolean;
  disabled?: boolean;
  color?: ColorKey;
};

const CheckboxWrapper = styled.div<{
  $checked: boolean,
  $disabled: boolean,
  $color: ColorKey
}>`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  
  ${ ({ theme, $checked, $disabled, $color }) => {
    return css`
      width: 22px;
      height: 22px;
      opacity: ${ $disabled ? theme.opacity.disabled : 1 };
      border: solid 2px ${ theme.color.tertiary };

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline-block;
        width: 8px;
        height: 12px;
        transform: translate(-45%, -65%) rotate(45deg);
        border-right: solid 2px ${({ theme }) => theme.color[$color]};
        border-bottom: solid 2px ${({ theme }) => theme.color[$color]};
        opacity: ${ $checked ? 1 : 0 };
        transition: opacity 100ms ease;
      }
    `;
  } }

  * {
    pointer-events: none;
  }
`;

export const Checkbox = forwardRef<HTMLDivElement, Props>((
  props: Props,
  fowardedRef: React.ForwardedRef<HTMLDivElement>
) => {
  const [value, setValue] = useState(!!props.value);

  return (
    <CheckboxWrapper
      ref={ fowardedRef }
      $checked={ value }
      $disabled={ !!props.disabled }
      $color={ props.color ?? 'tertiary' }
      onClick={ (e) => {
        e.stopPropagation();
        setValue(!value);
      } }
    >
      { value && (
        <input
          type='hidden'
          id={ props.id }
          name={ props.name }
          value={ value.toString() }
          disabled={ props.disabled }
        />
      ) }
    </CheckboxWrapper>
  );
});
