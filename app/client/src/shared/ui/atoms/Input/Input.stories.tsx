import type { Meta, StoryObj } from '@storybook/react';
import { Input, INPUT_STYLE_TYPES } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    $type: 'default',
    type: 'text',
  },
  argTypes: {
    $type: {
      control: { type: 'select' },
      options: INPUT_STYLE_TYPES,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('sample');

    return (
      <Input { ...args } value={ value } onChange={ (e) => setValue(e.target.value) } />
    );
  },
};
