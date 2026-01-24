import type { Meta, StoryObj } from '@storybook/react';
import { ImgInput } from './ImgInput';
import { useState } from 'react';

const meta: Meta<typeof ImgInput> = {
  title: 'Atoms/ImgInput',
  component: ImgInput,
  args: {
  },
};

export default meta;

type Story = StoryObj<typeof ImgInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <ImgInput name='sample' value={ value } onChange={ (newValue) => {
        console.log('Base64 image:', newValue);
        setValue(newValue);
      } } />
    );
  },
};
