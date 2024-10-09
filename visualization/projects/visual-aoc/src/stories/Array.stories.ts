import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import ArrayComponent from 'projects/visual-aoc/canvas/src/array/array.component';

export const ActionsData = {};

const meta: Meta<ArrayComponent> = {
  title: 'Array',
  component: ArrayComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;

type Story = StoryObj<ArrayComponent>;

export const Default: Story = {
  args: {},
};

export const Active: Story = {
  args: {},
};
