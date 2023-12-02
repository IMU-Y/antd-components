import type { Meta, StoryObj } from '@storybook/react';
import Alert from './index';
import type { IAlertProps } from './index';

const meta: Meta<typeof Alert> = {
  component: Alert,
  argTypes: {

  },
  parameters: {
    docs: {
      description: {
        component: '用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const DefaultAlert: Story = {
  render: (args: IAlertProps) => <Alert {...args} />,
  args: {
    title: 'this is alert!',
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the Alert component.',
      },
    },
  },
}

export const AlertWithType: Story = {
  render: () => (
    <>
      <Alert type='danger' title='This is danger.'></Alert>
      <Alert type='success' title='This is success.'></Alert>
      <Alert type='warning' title='This is warning.' closeable></Alert>
    </>
  )
}
export const AlertWithDesc: Story = {
  render: () => (
    <Alert title='标题' description='this is a long description'></Alert>
  )
}

DefaultAlert.storyName = '基本样式 Alert'
AlertWithType.storyName = '不同样式的 Alert'
AlertWithDesc.storyName = '带描述的 Alert'