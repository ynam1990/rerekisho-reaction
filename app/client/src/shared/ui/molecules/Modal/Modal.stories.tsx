import type { Meta, StoryObj } from '@storybook/react';
import { Modal, type ModalHandle } from './Modal';
import { useRef } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: (props) => {
    const ref = useRef<ModalHandle>(null);
    
    return (
      <>
        <button onClick={() => ref.current?.show()}>Show</button>
        <br />
        <button onClick={() => ref.current?.hide()}>Hide</button>

        <Modal
          ref={ ref }
          { ...props }
        />
      </>
    );
  },
  args: {
    title: 'モーダルのタイトル',
    content: 'モーダルの内容',
    footerContent: (
      <button>閉じる</button>
    ),
    onEnterPress: () => {
      alert('Enterキーが押されました');
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};
