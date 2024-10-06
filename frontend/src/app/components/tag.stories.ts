import type { Meta, StoryObj } from "@storybook/angular";
import { argsToTemplate } from "@storybook/angular";
import TagComponent from "./TagComponent";

const meta: Meta<TagComponent> = {
  title: "Tag",
  component: TagComponent,
  excludeStories: /.*Data$/,
  tags: ["autodocs"],
  render: (args) => ({
    props: {
      ...args,
    },
    template: `<app-tag ${argsToTemplate(args)}></app-tag>`,
  }),
};

export default meta;
type Story = StoryObj<TagComponent>;

export const NotSelected: Story = {
  args: {
    tag: {
      id: 1,
      title: "Haskell",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg",
      selected: false,
    },
  },
};

export const Selected: Story = {
  args: {
    tag: {
      id: 1,
      title: "Haskell",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg",
      selected: true,
    },
  },
};
