import type { ColorKey } from "@/shared/styles/theme";
import styled, { css } from "styled-components";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color: ColorKey;
};

export const Close = (props: Props) => {
  const {
    onClick,
    color = 'tertiary',
  } = props;

  return (
    <Button
      type="button"
      onClick={ onClick }
    >
      <Icon>
        <Line
          $pos="top"
          $color={ color }
        />
        <Line
          $pos="bot"
          $color={ color }
        />
      </Icon>
    </Button>
  );
};

const Button = styled.button `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
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
  $pos: "top" | "bot",
  $color: ColorKey;
}>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: ${ ({ theme, $color }) => theme.color[$color] };
  transform-origin: center;

  ${({ $pos }) => {
    switch ($pos) {
      case 'top': {
        return css`
          top: 0;
          transform: translateY(7px) rotate(45deg);
        `;
      }
      case 'bot': {
        return css`
          top: 14px;
          transform: translateY(-7px) rotate(-45deg);
        `;
      }
    }
  } }
`;
