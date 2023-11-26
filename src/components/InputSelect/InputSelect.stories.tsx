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
        component: '带搜索框的Select，展开后可对选项进行搜索。',
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

const fetchDropdownList = (input: string) => {
  return fetch(`https://api.github.com/search/users?q=${input}`)
    .then(res => res.json())
    .then(({ items }) => {
      if (items) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      } else {
        return fruits.filter(fruit => fruit.value.includes(input))
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
export const defaultInputSelect: Story = {
  render: (args: IInputSelectProps) => <InputSelect {...args} />,
  args: {
    fetchDropdownList: fetchDropdownList,
    renderOption: renderOption,
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
defaultInputSelect.storyName = '基础版 InputSelect';
