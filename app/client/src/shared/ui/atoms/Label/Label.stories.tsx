import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '@/shared/ui/atoms/Input'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  args: {
    children: (
    <>
      サンプル
      <Input />
    </>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};
