import type { ColorKey } from "@/shared/styles/theme";
import styled, { css } from "styled-components";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  color: ColorKey;
};

export const Hamburger = (props: Props) => {
  const {
    isOpen,
    onToggle,
    color = 'tertiary',
  } = props;

  return (
    <Button
      type="button"
      $isOpen={ isOpen }
      onClick={ onToggle }
    >
      <Icon>
        <Line
          $pos="top"
          $open={ isOpen }
          $color={ color }
        />
        <Line
          $pos="mid"
          $open={ isOpen }
          $color={ color }
        />
        <Line
          $pos="bot"
          $open={ isOpen }
          $color={ color }
        />
      </Icon>
    </Button>
  );
};

const Button = styled.button<{ $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
`;

const Icon = styled.span`
  position: relative;
  width: 22px;
  height: 16px;
  display: inline-block;
  pointer-events: none;
`;

const Line = styled.span<{
  $pos: "top" | "mid" | "bot",
  $open: boolean,
  $color: ColorKey;
}>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: ${ ({ theme, $color }) => theme.color[$color] };
  transform-origin: center;
  transition:
    transform 120ms ease,
    opacity 120ms ease;

  ${({ $pos, $open }) => {
    switch ($pos) {
      case 'top': {
        return css`
          top: 0;
          transform: ${ $open ? 'translateY(7px) rotate(45deg)' : 'none' };
        `;
      }
      case 'mid': {
        return css`
          top: 7px;
          opacity: ${ $open ? 0 : 1 };
        `;
      }
      case 'bot': {
        return css`
          top: 14px;
          transform: ${ $open ? 'translateY(-7px) rotate(-45deg)' : 'none' };
        `;
      }
    }
  } }
`;
