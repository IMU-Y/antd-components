import type { Meta, StoryObj } from '@storybook/react';
import Menu, { IMenuProps } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
const meta: Meta<typeof Menu> = {
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'This is a general Menu component.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

// TODO: 待补充 SubMenu 和 MenuItem 的文档类型定义
export const defaultMenu: Story = {
  render: (args: IMenuProps) => (
    <Menu {...args} >
      <MenuItem>MenuItem0</MenuItem>
      <MenuItem disabled>MenuItem1</MenuItem>
      <SubMenu title='下拉选项'>
        <MenuItem>SubItem1</MenuItem>
        <MenuItem>SubItem2</MenuItem>
        <MenuItem>SubItem3</MenuItem>
      </SubMenu>
      <MenuItem>MenuItem3</MenuItem>
    </Menu>
  ),
  args: {
    defaultIndex: '0',
    onSelect: (index) => { alert(index) },
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the Menu component.',
      },
    },
  },
}

export const verticalMenu: Story = {
  render: () => (
    <Menu defaultIndex='0' mode='vertical'>
      <MenuItem>MenuItem0</MenuItem>
      <MenuItem disabled>MenuItem1</MenuItem>
      <SubMenu title='点击下拉选项'>
        <MenuItem>SubItem1</MenuItem>
        <MenuItem>SubItem2</MenuItem>
        <MenuItem>SubItem3</MenuItem>
      </SubMenu>
      <MenuItem>MenuItem3</MenuItem>
    </Menu>
  )
}

export const verticalOpenedMenu: Story = {
  render: () => (
    <Menu defaultIndex='0' mode='vertical' defaultOpenMenus={['2']}>
      <MenuItem>MenuItem0</MenuItem>
      <MenuItem disabled>MenuItem1</MenuItem>
      <SubMenu title='默认展开下拉选项'>
        <MenuItem>SubItem1</MenuItem>
        <MenuItem>SubItem2</MenuItem>
        <MenuItem>SubItem3</MenuItem>
      </SubMenu>
      <MenuItem>MenuItem3</MenuItem>
    </Menu>
  )
}

defaultMenu.storyName = '默认 Menu'
verticalMenu.storyName = '纵向的 Menu'
verticalOpenedMenu.storyName = '默认展开的纵向 Menu'