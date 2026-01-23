import type { Meta, StoryObj } from '@storybook/react';
import { MonthInput } from './MonthInput';
import { useState } from 'react';

const meta: Meta<typeof MonthInput> = {
  title: 'Atoms/MonthInput',
  component: MonthInput,
  args: {
  },
};

export default meta;

type Story = StoryObj<typeof MonthInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState({ year: '2000', month: '1' });

    return (
      <MonthInput name='sample' value={ value } onChange={ ({ dateString, ...newValue }) => {
        console.log('Selected month:', dateString);
        setValue(newValue);
      } } />
    );
  },
};
