import { useRef } from 'react';
import styled from 'styled-components'
import { useToast } from '@/shared/hooks/useToast';
import { Button } from '@/shared/ui/atoms';

type Props = {
  name: string;
  value?: string;
  onChange?: (newValue: string) => void;
  dataset?: any;
};

export const ImgInput = (props: Props) => {
  const {
    name,
    value,
    onChange,
  } = props;

  const showToastWithOptions = useToast();

  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 画像ファイルであることを確認
    if (!file.type.startsWith('image/')) return;

    // 500KB以下のファイルサイズ制限
    const maxSizeInBytes = 500 * 1024;
    if (file.size > maxSizeInBytes) {
      // fileの選択状態を解除
      e.target.value = '';

      showToastWithOptions({
        content: 'ファイルサイズが500KBを超えています',
        icon: 'error',
      });
      return;
    }
    
    // ファイルをBase64画像に変換してonChangeに渡す
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        onChange?.(result);
      }
    };
    reader.readAsDataURL(file);
  };
        

  return (
    <ImgInputWrapper>
      { value && (
        <PreviewImg
          src={ value }
          alt="画像プレビュー"
        />
      ) }

      <Button
        size='sm'
        color='tertiary'
        type="button"
        onClick={ () => {
          imgInputRef.current?.click();
        } }
      >
        画像ファイルを選択
      </Button>

      <input
        ref={ imgInputRef }
        name={ name }
        type="file"
        accept="image/*"
        onChange={ handleImgChange }
        { ...props.dataset }
      />
    </ImgInputWrapper>
  );
};

const ImgInputWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: ${ ({ theme }) => theme.spacing.xxs.pc };

  @media (max-width: ${ ({ theme }) => theme.breakpoints.sp}) {
    row-gap: ${ ({ theme }) => theme.spacing.xxs.sp };
  }

  /* ファイルインプットはwidthが固定となる場合があり、スタイル崩れうるため非表示にしています */
  &> input {
    display: none;
  }
`;

const PreviewImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  object-position: left;
`;
