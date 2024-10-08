import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import CanvasComponent from '../../canvas/src/canvas/canvas.component';

export const ActionsData = {};

const meta: Meta<CanvasComponent> = {
  title: 'Canvas',
  component: CanvasComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
};

export default meta;

type Story = StoryObj<CanvasComponent>;

export const Default: Story = {
  args: {},
};

export const Active: Story = {
  args: {},
};
