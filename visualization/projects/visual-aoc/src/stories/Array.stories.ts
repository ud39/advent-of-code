import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import ArrayComponent from 'projects/visual-aoc/canvas/src/array/array.component';
import { fn } from '@storybook/test';

export const ActionsData = {};

const meta: Meta<ArrayComponent> = {
  title: 'Array',
  component: ArrayComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
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
