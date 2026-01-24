import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from './Anchor';

const meta: Meta<typeof Anchor> = {
  title: 'Atoms/Anchor',
  component: Anchor,
  args: {
    children: 'Anchor',
  },
};

export default meta;

type Story = StoryObj<typeof Anchor>;

export const Default: Story = {};
