import type { Meta, StoryObj } from '@storybook/react';
import { TextArea, TEXTAREA_STYLE_TYPES } from './TextArea';
import { useState } from 'react';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  args: {
    styleType: 'default',
  },
  argTypes: {
    styleType: {
      control: { type: 'select' },
      options: TEXTAREA_STYLE_TYPES,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('sample');

    return (
      <TextArea { ...args } value={ value } onChange={ (e) => setValue(e.target.value) } />
    );
  },
};
