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
        component: 'Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
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

export const DisabledInput: Story = {
  render: () => (
    <Input
      disabled
      style={{
        width: '300px'
      }}></Input>
  )
}

export const IconInput: Story = {
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

export const InputWithSize: Story = {
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

export const PandInput: Story = {
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

DefaultInput.storyName = '默认的 Input'
DisabledInput.storyName = '被禁用的 Input'
IconInput.storyName = '带图标的 Alert'
InputWithSize.storyName = '大小不同的 Input'
PandInput.storyName = '带前后缀的 Input'
