import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from './Paragraph';
import { theme } from '@/shared/styles/theme';
import { LINE_HEIGHT_TYPES, TEXT_ALIGN_TYPES } from '@/shared/styles/constants';

const meta: Meta<typeof Paragraph> = {
  title: 'Atoms/Paragraph',
  component: Paragraph,
  args: {
    children: 'Paragraph',
    size: 'xxxl',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.keys(theme.typography.fontSize),
    },
    align: {
      control: { type: 'select' },
      options: TEXT_ALIGN_TYPES,
    },
    line_height: {
      control: { type: 'select' },
      options: LINE_HEIGHT_TYPES,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {};
