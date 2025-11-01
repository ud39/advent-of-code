import type { Meta, StoryObj } from "@storybook/angular";

import { argsToTemplate } from "@storybook/angular";

import { action } from "storybook/actions";

import TaskComponent from "./TaskComponent";

export const actionsData = {
  onPinTask: action("onPinTask"),
  onArchiveTask: action("onArchiveTask"),
};

const meta: Meta<TaskComponent> = {
  title: "Task",
  component: TaskComponent,
  excludeStories: /.*Data$/,
  tags: ["autodocs"],
  render: (args) => ({
    props: {
      ...args,
      onPinTask: actionsData.onPinTask,
      onArchiveTask: actionsData.onArchiveTask,
    },
    template: `<app-task ${argsToTemplate(args)}></app-task>`,
  }),
};

export default meta;
type Story = StoryObj<TaskComponent>;

export const Default: Story = {
  args: {
    task: {
      id: "1",
      title: "Test Task",
      state: "TASK_INBOX",
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args?.task,
      state: "TASK_PINNED",
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...Default.args?.task,
      state: "TASK_ARCHIVED",
    },
  },
};
