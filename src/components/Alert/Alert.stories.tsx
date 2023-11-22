import type { Meta, StoryObj } from '@storybook/react';

import Alert, { AlertType, IAlertProps } from './index';

const meta: Meta<typeof Alert> = {
  component: Alert,
  argTypes: {

  },
  parameters: {
    docs: {
      description: {
        component: 'This is a general Alert component.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const defaultAlert: Story = {
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

export const alertWithType: Story = {
  render: () => (
    <>
      <Alert type={AlertType.Danger} title='This is danger.'></Alert>
      <Alert type={AlertType.Success} title='This is success.'></Alert>
      <Alert type={AlertType.Warning} title='This is warning.' closeable></Alert>
    </>
  )
}
export const alertWithDesc: Story = {
  render: () => (
    <Alert title='标题' description='this is a long description'></Alert>
  )
}

defaultAlert.storyName = '基本样式 Alert'
alertWithType.storyName = '不同样式的 Alert'
alertWithDesc.storyName = '带描述的 Alert'