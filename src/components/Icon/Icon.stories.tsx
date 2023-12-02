import type { Meta, StoryObj } from '@storybook/react';
import Icon, { IconProps } from './index';

const meta: Meta<typeof Icon> = {
  component: Icon,
  argTypes: {

  },
  parameters: {
    docs: {
      description: {
        component: `提供了一套基于 react-fontawesome 的图标集合

支持 react-fontawesome 的所有属性 可以在这里查询 https://github.com/FortAwesome/react-fontawesome#basic

支持 fontawesome 所有 free-solid-icons，可以在这里查看所有图标 https://fontawesome.com/icons?d=gallery&s=solid&m=free
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const DefaultIcon: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "angle-down"
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the Icon component.',
      },
    },
  },
}

export const ButtonWithTheme: Story = {
  render: () => (
    <>
      <Icon icon="check" theme="success" />
      <Icon icon="times" theme="danger" />
      <Icon icon="anchor" theme="primary" />
      <Icon icon="exclamation-circle" theme="warning" />
    </>
  )
}

export const ButtonWithSize: Story = {
  render: () => (
    <>
      <Icon icon="check" />
      <Icon icon="check" size="2x" />
    </>
  )
}
export const ButtonWithAction: Story = {
  render: () => (
    <>
      <Icon icon="spinner" theme="primary" spin />
      <Icon icon="spinner" theme="success" pulse />
    </>
  )
}

DefaultIcon.storyName = '默认 Icon 图标'
ButtonWithTheme.storyName = '不同主题的 Icon'
ButtonWithSize.storyName = '不同大小的 Icon'
ButtonWithAction.storyName = '不同行为的 Icon'