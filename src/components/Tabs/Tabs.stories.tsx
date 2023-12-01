import type { Meta, StoryObj } from '@storybook/react';
import Tabs, { ITabsProps } from './Tabs';
import TabItem from './TabItem';
const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'This is a general Tabs component.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const defaultTabs: Story = {
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

defaultTabs.storyName = '默认 Tabs'