import type { Meta, StoryObj } from '@storybook/react';
import Progress, { IProgressProps } from './index';

const meta: Meta<typeof Progress> = {
  component: Progress,
  argTypes: {
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
type Story = StoryObj<typeof Progress>;

export const defaultProgress: Story = {
  render: (args: IProgressProps) => <Progress {...args} />,
  args: {
    percent: 30,
    styles: {
      width: 300
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a basic usage of the Button component.',
      },
    },
  },
}
export const progressWithTheme: Story = {
  render: () => (
    <>
      <Progress percent={35} theme='primary' styles={{ width: 200 }}></Progress>
      <Progress percent={35} theme='secondary' styles={{ width: 200 }}></Progress>
      <Progress percent={35} theme='success' styles={{ width: 200 }}></Progress>
      <Progress percent={35} theme='info' styles={{ width: 200 }}></Progress>
      <Progress percent={35} theme='warning' styles={{ width: 200 }}></Progress>

      <Progress percent={35} theme='danger' styles={{ width: 200 }}></Progress>
      <Progress percent={35} theme='light' styles={{ width: 200 }}></Progress>
      <Progress percent={35} theme='dark' styles={{ width: 200 }}></Progress>
    </>
  )
}
defaultProgress.storyName = '默认 Progress'
progressWithTheme.storyName = '不同主题的 Progress'