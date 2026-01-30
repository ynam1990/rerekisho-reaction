import type { Meta, StoryObj } from '@storybook/react';
import { Button, BUTTON_TYPES } from './Button';
import { theme } from '@/shared/styles/theme';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Button',
    styleType:'solid',
    color:'primary',
    size: 'md',
    loading: false,
  },
  argTypes: {
    styleType: {
      control: { type: 'select' },
      options: BUTTON_TYPES,
    },
    color: {
      control: { type: 'select' },
      options: Object.keys(theme.color),
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(theme.typography.fontSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
