import type { Meta, StoryObj } from '@storybook/react';

import Input, { InputProps } from './index';

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    disabled: {}
  },
  parameters: {
    docs: {
      description: {
        component: 'This is a general Input component.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const defaultInput: Story = {
  render: (args: InputProps) => <Input {...args} />,
  args: {
    placeholder: "placeholder",
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the Input component.',
      },
    },
  },
}

export const disabledInput: Story = {
  render: () => (
    <Input
      disabled
      style={{
        width: '300px'
      }}></Input>
  )
}

export const iconInput: Story = {
  render: () => (
    <Input
      icon="search"
      placeholder="input with icon"
      style={{
        width: '300px'
      }}
    ></Input>
  )
}

export const inputWithSize: Story = {
  render: () => (
    <>
      <Input
        placeholder="large size"
        size='lg'
        style={{
          width: '300px'
        }}
      ></Input>
      <Input
        placeholder="small size"
        size='sm'
        style={{
          width: '300px'
        }}
      ></Input>
    </>
  )
}

export const pandInput: Story = {
  render: () => (
    <>
      <Input
        style={{ width: '300px' }}
        defaultValue="prepend text"
        prepend="https://"
      />
      <Input
        style={{ width: '300px' }}
        defaultValue="google"
        append=".com"
      /></>
  )
}

defaultInput.storyName = '默认的 Input'
disabledInput.storyName = '被禁用的 Input'
iconInput.storyName = '带图标的 Alert'
inputWithSize.storyName = '大小不同的 Input'
pandInput.storyName = '带前后缀的 Input'
