import type { ColorKey, SpacingKey } from '@/shared/styles/theme';
import { pickMainSubColors } from '@/shared/utils/style';
import styled, { css } from 'styled-components'

type Props = {
  color?: ColorKey;
  paddingY?: SpacingKey;
  paddingX?: SpacingKey;
  title: React.ReactNode;
  body: React.ReactNode;
};

const StyledCard = styled.div< Omit<Props, 'title' | 'body'> >`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${ ({ theme, color = 'primary', paddingY = 'lg', paddingX = 'md' }) => {
    const { mainColor, subColor } = pickMainSubColors(theme, color);
    const borderRadius = theme.radius.md;
    const { spacing } = theme;

    return css`
      &> div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        
        &:first-child {
          justify-content: center;
          background-color: ${ mainColor };
          color: ${ subColor };
          border-top-right-radius: ${ borderRadius };
          border-top-left-radius: ${ borderRadius };
        }
        
        &:last-child {
          flex: 1;
          justify-content: flex-start;
          background-color: ${ subColor };
          border: solid 2px ${ mainColor };
          border-top: none;
          border-bottom-right-radius: ${ borderRadius };
          border-bottom-left-radius: ${ borderRadius };
        }

        padding: ${ `${ spacing[paddingY].pc } ${ spacing[paddingX].pc }` };

        @media (max-width: ${ theme.breakpoints.sp}) {
          padding: ${ `${ spacing[paddingY].sp } ${ spacing[paddingX].sp }` };
        }
      }
    `;
  } }
`;

export const Card = (props: Props) => {
  const { title, body, ...rest } = props;

  return (
    <StyledCard { ...rest }>
      <div>
        { props.title }
      </div>
      <div>
        { props.body }
      </div>
    </StyledCard>
  );
};
