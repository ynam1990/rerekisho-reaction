import type { Meta, StoryObj } from '@storybook/react';
import { Toast, TOAST_ICONS, type ToastHandle } from './Toast';
import { useRef } from 'react';

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: (props) => {
    const ref = useRef<ToastHandle>(null);
    
    return (
      <>
        <button onClick={() => ref.current?.show()}>Show</button>
        <br />
        <button onClick={() => ref.current?.hide()}>Hide</button>

        <Toast
          ref={ ref }
          { ...props }
        />
      </>
    );
  },
  args: {
    icon: 'success',
    content: 'トーストの内容',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: TOAST_ICONS,
    },
  }
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {};
