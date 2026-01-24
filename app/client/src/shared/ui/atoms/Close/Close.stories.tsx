import type { Meta, StoryObj } from '@storybook/react';
import { Close } from './Close';

const meta: Meta<typeof Close> = {
  title: 'Atoms/Close',
  component: Close,
  args: {
  },
};

export default meta;

type Story = StoryObj<typeof Close>;

export const Default: Story = {};
