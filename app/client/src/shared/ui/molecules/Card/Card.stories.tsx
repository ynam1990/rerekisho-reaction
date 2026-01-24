import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  args: {
    title: <span>タイトル</span>,
    body: <div>本文</div>,
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};
