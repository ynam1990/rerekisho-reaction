import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { theme } from '@/shared/styles/theme';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  args: {
    children: 'Heading',
    size: 'xxxl',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.keys(theme.typography.fontSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};
