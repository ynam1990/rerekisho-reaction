import { useRef, useState } from "react";
import styled from "styled-components";
import { Hamburger } from "@/shared/ui/atoms/Hamburger";
import type { ColorKey } from "@/shared/styles/theme";

export const POPOVER_TYPES = [
  'hamburger',
] as const;
type PopoverTypes = typeof POPOVER_TYPES[number];

type Props = {
  id: string;
  content: React.ReactNode;
  type?: PopoverTypes;
  color?: ColorKey;
};

export const Popover = (props: Props) => {
  const {
    id,
    content,
    type = 'hamburger',
    color = 'tertiary',
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const onIconToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    setIsOpen(!isOpen);
    // ポップオーバーの表示中フラグを立てます
    contentWrapperRef.current?.showPopover();
  };

  let icon = null;
  switch (type) {
    case 'hamburger':
    default: {
      icon = (
        <Hamburger
          isOpen={ isOpen }
          color={ color }
          onToggle={ onIconToggle }
        />
      );
    }
  }

  return (
    <PopoverWrapper $id={ id }>
      <IconWrapper>
        { icon }
      </IconWrapper>

      <ContentWrapper
        ref={ contentWrapperRef }
        popover="auto"
        $id={ id }
        $isOpen={ isOpen }
        onToggle={ () => {
          const isPopoverOpen = contentWrapperRef.current?.matches(':popover-open');
          if (!isPopoverOpen) setIsOpen(false);
        } }
        onClick={ (e) => e.stopPropagation() }
      >
        { content }
      </ContentWrapper>
    </PopoverWrapper>
  );
};

const popoverAnchorName = (id: string) => `--popover-${ id }`;

const PopoverWrapper = styled.div<{ $id: string }>`
  display: flex;
  width: fit-content;
  height: fit-content;

  position: relative;
  
  /* アンカーポジショニングのlint対応待ち */
  /* stylelint-disable-next-line property-no-unknown */
  anchor-name: ${ ({ $id }) => popoverAnchorName($id) };
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div<{ $id: string, $isOpen: boolean }>`
  display: ${ ({ $isOpen }) => $isOpen ? 'flex' : 'none' };
  padding: 0;
  
  inset: auto;
  position: fixed;
  overflow: visible;
  /* アンカーポジショニングのlint対応待ち */
  /* stylelint-disable-next-line property-no-unknown */
  position-anchor: ${ ({ $id }) => popoverAnchorName($id) };
  top: anchor(bottom);
  right: anchor(right);
`;
