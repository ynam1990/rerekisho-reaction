import type { ColorKey } from '@/shared/styles/theme';
import { pickWhite } from '@/shared/utils/style';
import { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components'

type Props =  {
  id?: string;
  name: string;
  value?: boolean;
  disabled?: boolean;
  color?: ColorKey;
  onChange?: (e: React.MouseEvent<HTMLDivElement>, newValue: boolean) => void;
};

export const Checkbox = forwardRef<HTMLDivElement, Props>((
  props: Props,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) => {
  const [value, setValue] = useState(!!props.value);

  return (
    <CheckboxWrapper
      ref={ forwardedRef }
      role="checkbox"
      aria-checked={ value }
      tabIndex={ 0 }
      $checked={ value }
      $disabled={ !!props.disabled }
      $color={ props.color ?? 'tertiary' }
      onClick={ (e) => {
        e.stopPropagation();
        setValue(!value);

        props.onChange?.(e, !value);
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
      background-color: ${ pickWhite(theme) };

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
