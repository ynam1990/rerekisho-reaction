import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { theme } from '@/shared/styles/theme';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Atoms/ButtonGroup',
  component: ButtonGroup,
  args: {
    size: 'md',
    buttonPropsList: [
      {
        type: 'proceed',
        children: 'button1'
      },
      {
        type: 'cancel',
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
