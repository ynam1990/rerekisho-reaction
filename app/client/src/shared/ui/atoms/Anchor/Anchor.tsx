import type { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components'

type Props = ComponentPropsWithoutRef<'a'>;

const StyledAnchor = styled.a`
  &:hover {
    opacity: ${ ({ theme }) => theme.opacity.hover };
  }
`;

export const Anchor = ({ children, ...rest }: Props) => (
  <StyledAnchor
    { ...rest }
    rel="noopener noreferrer"
    referrerPolicy="no-referrer"
  >{ children }</StyledAnchor>
)
