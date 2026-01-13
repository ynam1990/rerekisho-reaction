import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { theme } from '@/shared/styles/theme';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  args: {
    size: 'md',
    buttonPropsList: [
      {
        type: 'primary',
        children: 'button1'
      },
      {
        type: 'tertiary',
        children: 'button2',
      },
    ],
  },
  argTypes: {
    size: {
      control: { type: 'select'},
      options: Object.keys(theme.spacing),
    }
  }
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {};
