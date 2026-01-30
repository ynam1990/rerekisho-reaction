import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { boxShadow } from "@/shared/styles/mixins";
import logoImg from '@/shared/assets/logos/logo.png'
import successImg from '@/shared/assets/icons/icon_success.png'
import errorImg from '@/shared/assets/icons/icon_error.png'
import { isUndefined } from "@/shared/utils/check";
import { pickWhite } from "@/shared/utils/style";

export const TOAST_ICONS = [
  'none',
  'default',
  'success',
  'error',
] as const;
type ToastIcons = typeof TOAST_ICONS[number];

export type ToastOptions = {
  content?: React.ReactNode;
  icon?: ToastIcons;
};

type Props = ToastOptions;

export type ToastHandle = {
  show: () => void;
  hide: () => void;
  setOptions: (options: Props) => void;
};

const ToastWrapper = styled.div<{ $isShow: boolean }>`
  display: flex;
  padding: 0;
  width: fit-content;
  max-width: 240px;
  height: fit-content;
  position: fixed;
  z-index: ${ ({ theme }) => theme.zIndex.toast };
  top: 10%;
  right: 0;
  overflow: visible;
  ${ boxShadow }
  background-color: ${ ({ theme }) => pickWhite(theme) };

  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.sm.pc };
      padding: ${ theme.spacing.md.pc } ${ theme.spacing.md.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        column-gap: ${ theme.spacing.sm.sp };
        padding: ${ theme.spacing.md.sp } ${ theme.spacing.md.sp };
      }
    `;
  } }
  
  transition: all 600ms ease-in-out;
  transform: translateX(20px);
  ${ ({ $isShow }) => {
    if ($isShow) {
      return css`
        opacity: 1;
        visibility: visible;
        transform: translateX(0px);
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

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &> img {
    ${ ({ theme }) => {
      return css`
        width: 36px;
        
        @media (max-width: ${ theme.breakpoints.sp}) {
          width: 24px;
        }
      `;
    } }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Toast = forwardRef<ToastHandle, Props>((props: Props, ref: React.Ref<ToastHandle>) => {
  const [content, setContent] = useState<React.ReactNode>(props.content);
  const [icon, setIcon] = useState<ToastIcons>(props.icon || 'none');

  const [isShow, setIsShow] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const hide = () => {
    setIsShow(false);
    clearTimer();
  };
  
  useImperativeHandle(ref, () => ({
    show: () => {
      setIsShow(true);

      clearTimer();
      
      timerRef.current = window.setTimeout(() => {
        setIsShow(false);
      }, 5000);
    },
    hide,
    setOptions: (options: Props) => {
      if (!isUndefined(options.content)) {
        setContent(options.content);
      }
      if (!isUndefined(options.icon)) {
        setIcon(options.icon);
      }
    },
  }));
  
  let iconEl = null;
  switch (icon) {
    case 'none': {
      break;
    }
    case 'success': {
      iconEl = <img src={ successImg } alt="アイコンはAI生成です" />;
      break;
    }
    case 'error': {
      iconEl = <img src={ errorImg } alt="アイコンはAI生成です" />;
      break;
    }
    case 'default': 
    default: {
      iconEl = <img src={ logoImg } alt="アイコンはAI生成です" />;
    }
  }

  return (
    <ToastWrapper
      $isShow={ isShow }
      onClick={ (e) => {
        e.stopPropagation();
        hide();
      } }
    >
      {
        iconEl &&
          <IconWrapper>
            { iconEl }
          </IconWrapper>
      }

      <ContentWrapper>
        { content }
      </ContentWrapper>
    </ToastWrapper>
  );
});
