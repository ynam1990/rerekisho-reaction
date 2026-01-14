import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxWithLabel } from './CheckboxWithLabel';

const meta: Meta<typeof CheckboxWithLabel> = {
  title: 'Molecules/CheckboxWithLabel',
  component: CheckboxWithLabel,
  args: {
    name: 'sample',
    label: 'sample',
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxWithLabel>;

export const Default: Story = {};
