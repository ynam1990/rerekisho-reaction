import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Atoms/Header',
  component: Header,
  args: {
    isAuthenticated: false,
  },
  argTypes: {
    isAuthenticated: {
      control: { type: 'boolean'},
    }
  }
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
