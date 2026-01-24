import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { boxShadow } from "@/shared/styles/mixins";
import { Heading } from "@/shared/ui/atoms/Heading";
import { pickWhite } from "@/shared/utils/style";
import { isUndefined } from "@/shared/utils/check";

type Props = {
  title?: React.ReactNode;
  content?: React.ReactNode;
  footerContent?: React.ReactNode;
  onEnterPress?: () => void;
};

export type ModalHandle = {
  show: () => void;
  hide: () => void;
  setContent: (args: {
    title?: React.ReactNode,
    content?: React.ReactNode,
    footerContent?: React.ReactNode,
  }) => void;
};

const ModalBackground = styled.div<{ $isShow: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${ ({ theme }) => theme.zIndex.modal };
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  visibility: ${ ({ $isShow }) => ($isShow ? 'visible' : 'hidden') };
`;

const ModalWrapper = styled.div<{ $isShow: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(600px, 90%);
  height: min(400px, 90%);
  overflow: hidden;
  ${ boxShadow }
  background-color: ${ ({ theme }) => pickWhite(theme) };

  ${ ({ theme }) => {
    return css`
      padding: ${ theme.spacing.xxl.pc } ${ theme.spacing.xxl.pc };
      row-gap: ${ theme.spacing.sm.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.xxl.sp } ${ theme.spacing.xxl.sp };
        row-gap: ${ theme.spacing.sm.sp };
      }
    `;
  } }
  
  transition: 600ms ease-in-out;
  transition-property: opacity, transform;
  transform: translateY(-20px);
  ${ ({ $isShow }) => {
    if ($isShow) {
      return css`
        opacity: 1;
        visibility: visible;
        transform: translateY(0px);
      `;
    } else {
      return css`
        opacity: 0;
        visibility: hidden;
        transition: none;
      `;
    }
  } }
`;

const ModalTitle = styled.div`
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid ${ ({ theme }) => theme.color.borderGray };

  ${ ({ theme }) => css`
    font-size: ${ theme.typography.fontSize.lg.pc };
    padding-bottom: ${ theme.spacing.sm.pc };

    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ theme.typography.fontSize.lg.sp };
      padding-bottom: ${ theme.spacing.sm.sp };
    }
  ` }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  width: 100%;
`;

const FooterContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = forwardRef<ModalHandle, Props>((props: Props, ref: React.Ref<ModalHandle>) => {
  const [isShow, setIsShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState<React.ReactNode>(props.title || null);
  const [content, setContent] = useState<React.ReactNode>(props.content || null);
  const [footerContent, setFooterContent] = useState<React.ReactNode>(props.footerContent || null);

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsShow(true);

      window.setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    },
    hide: () => setIsShow(false),
    setContent: ({ title, content, footerContent }) => {
      if (!isUndefined(title)) setTitle(title);
      if (!isUndefined(content)) setContent(content);
      if (!isUndefined(footerContent)) setFooterContent(footerContent);
    },
  }));
  
  return (
    <ModalBackground
      ref={ modalRef }
      tabIndex={ 0 }
      $isShow={ isShow }
      onClick={ (e) => {
        e.stopPropagation();
        setIsShow(false);
      } }
      onKeyDown={ (e) => {
        // ターゲットが自分かどうか判定します
        if (e.target !== e.currentTarget) return;

        if (e.key === 'Escape') {
          e.stopPropagation();
          setIsShow(false);
        }
        if (e.key === 'Enter') {
          e.stopPropagation();
          props.onEnterPress?.();
          setIsShow(false);
        }
      } }
    >
      <ModalWrapper
        $isShow={ isShow }
        onClick={ (e) => e.stopPropagation() }
      >
        <ModalTitle>
          <Heading size="lg">
            { title }
          </Heading>
        </ModalTitle>

        <ContentWrapper>
          { content }
        </ContentWrapper>

        { footerContent && (
          <FooterContentWrapper>
            { footerContent }
          </FooterContentWrapper>
        ) }
      </ModalWrapper>
    </ModalBackground>
  );
});
