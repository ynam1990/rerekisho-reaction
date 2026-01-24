import type { Meta, StoryObj } from '@storybook/react';
import { Hamburger } from './Hamburger';

const meta: Meta<typeof Hamburger> = {
  title: 'Atoms/Hamburger',
  component: Hamburger,
  args: {
  },
};

export default meta;

type Story = StoryObj<typeof Hamburger>;

export const Default: Story = {};
