import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { ITabsProps } from './Tabs';
import TabItem from './TabItem';
const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const DefaultTabs: Story = {
  render: (args: ITabsProps) => (
    <Tabs {...args} >
      <TabItem label='Tab1'><p>Tab1 content</p></TabItem>
      <TabItem label='Tab2'><p>Tab2 content</p></TabItem>
      <TabItem label='Tab3'><p>Tab3 content</p></TabItem>
    </Tabs>
  ),
  args: {
    defaultIndex: 0,
    // onSelect: (index) => { alert(index) },
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the Tabs component.',
      },
    },
  },
}

DefaultTabs.storyName = '默认 Tabs'