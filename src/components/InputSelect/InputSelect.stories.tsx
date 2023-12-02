import type { Meta, StoryObj } from '@storybook/react';

import InputSelect, { IInputSelectProps, DataSourceType } from './index';
const meta: Meta<typeof InputSelect> = {
  component: InputSelect,
  argTypes: {
    onSelect: { action: 'selected' },
  },
  parameters: {
    docs: {
      description: {
        component: '带搜索框的Select，展开后可对选项进行搜索。支持 Input 组件的所有属性，支持键盘事件选择。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputSelect>;


interface IFruitsProps {
  value: string;
  icon: string;
}
const fruits = [
  { value: 'apple', icon: '🍎' },
  { value: 'orange', icon: '🍊' },
  { value: 'pear', icon: '🍐' },
  { value: 'watermelon', icon: '🍉' },
  { value: 'grape', icon: '🍇' },
  { value: 'peach', icon: '🍑' }];

const fetchDataList = (input: string) => {
  return fruits.filter(fruit => fruit.value.includes(input));
}
const fetchDropdownList = (input: string) => {
  return fetch(`https://api.github.com/search/users?q=${input}`)
    .then(res => res.json())
    .then(({ items }) => {
      if (items) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      }
    })
}
const renderOption = (item: DataSourceType<IFruitsProps>) => {
  return (
    <div>
      <span>{item.icon}</span>
      <span>{item.value}</span>
    </div>
  )
}

export const DefaultInputSelect: Story = {
  render: (args: IInputSelectProps) => <InputSelect {...args} />,
  args: {
    fetchDropdownList: fetchDataList,
    placeholder: "placeholder",
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the InputSelect component.',
      },
    },
  },
}

export const TemplateInputSelect: Story = {
  render: () => (
    <InputSelect renderOption={renderOption} fetchDropdownList={fetchDataList}></InputSelect>
  )
}

export const AsyncInputSelect: Story = {
  render: () => (
    <InputSelect fetchDropdownList={fetchDropdownList}></InputSelect>
  )
}

DefaultInputSelect.storyName = '基础版 InputSelect';
TemplateInputSelect.storyName = '自定义搜索结果模板';
AsyncInputSelect.storyName = '支持异步搜索';