import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonType, ButtonSize } from './index';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const defaultButton: Story = {
  render: () => (
    <>
      <Button onClick={() => alert('hello world!')}>Primary</Button>
      <Button disabled>Primary</Button>
    </>
  )

};
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