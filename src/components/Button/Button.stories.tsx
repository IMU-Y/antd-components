import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonType, ButtonSize, IButtonProps } from './index';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    onClick: {
      description: 'The on click event handler for the button',
      action: 'clicked', // 在 Actions panel 显示点击事件
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'This is a general Button component.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const defaultButton: Story = {
  render: (args: IButtonProps) => <Button {...args} />,
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the Button component.',
      },
    },
  },
}

export const buttonWithSize: Story = {
  render: () => (
    <>
      <Button size={ButtonSize.Large}>Large</Button>
      <Button size={ButtonSize.Small}>Small</Button>
    </>
  )
}
export const buttonWithType: Story = {
  render: () => (
    <>
      <Button btnType={ButtonType.Primary}>Primary</Button>
      <Button btnType={ButtonType.Danger} >Danger</Button>
      <Button btnType={ButtonType.Link} href={'https://www.baidu.com/'}>百度</Button>
    </>
  )
}

defaultButton.storyName = '默认 Button'
buttonWithSize.storyName = '不同尺寸的 Button'
buttonWithType.storyName = '不同类型的 Button'