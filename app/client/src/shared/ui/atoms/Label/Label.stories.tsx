import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '@/shared/ui/atoms/Input'
import { useState } from 'react';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  args: {
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('sample');

    return (
      <Label { ...args} >
        サンプル
        <Input value={ value } onChange={ (e) => setValue(e.target.value) } />
      </Label>
    );
  },
};
