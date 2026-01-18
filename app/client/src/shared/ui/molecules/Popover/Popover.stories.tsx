import type { Meta, StoryObj } from '@storybook/react';
import { POP_OVER_TYPES, Popover } from './Popover';
import { color } from '@/shared/styles/theme/color';

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  args: {
    id: 'sample',
    content: (
      <div>
        ポップオーバーの内容
      </div>
    ),
  },
  argTypes: {
    type: {
      control: 'select',
      options: POP_OVER_TYPES,
    },
    color: {
      control: 'select',
      options: Object.keys(color),
    },
  }
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {};
