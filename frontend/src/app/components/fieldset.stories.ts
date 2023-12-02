import type { Meta, StoryObj } from "@storybook/angular";
import { argsToTemplate, moduleMetadata } from "@storybook/angular";

import FieldsetComponent from "./FieldsetComponent";
import * as TagStories from "./tag.stories";
import TagComponent from "./TagComponent";

const meta: Meta<FieldsetComponent> = {
  component: FieldsetComponent,
  excludeStories: /.*Data$/,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      declarations: [FieldsetComponent, TagComponent],
    }),
  ],
  render: (args: FieldsetComponent) => ({
    props: {
      ...args,
    },
    template: `<app-fieldset ${argsToTemplate(args)}></app-fieldset>`,
  }),
};

export default meta;
type Story = StoryObj<FieldsetComponent>;

export const DefaultLanguages: Story = {
  args: {
    fieldsetType: "languages",
    availableTags: [
      {
        id: 1,
        title: "Haskell",
        src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg",
        selected: false,
      },
      {
        id: 2,
        title: "C",
        src: "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
        selected: false,
      },
    ],
  },
};

export const SelectedLanguages: Story = {
  args: {
    fieldsetType: DefaultLanguages.args?.fieldsetType,
    availableTags: DefaultLanguages.args?.availableTags?.map((tag) => ({
      ...tag,
      selected: true,
    })),
  },
};

export const DefaultAlgorithms: Story = {
  args: {
    fieldsetType: "algorithm",
    availableTags: [
      {
        id: 1,
        title: `Recursion`.toUpperCase(),
        src: undefined,
        selected: false,
      },
      {
        id: 2,
        title: `Dynamic Programming`.toUpperCase(),
        src: undefined,
        selected: false,
      },
    ],
  },
};

export const SelectedAlgorithms: Story = {
  args: {
    fieldsetType: DefaultAlgorithms.args?.fieldsetType,
    availableTags: DefaultAlgorithms.args?.availableTags?.map((tag) => ({
      ...tag,
      selected: true,
    })),
  },
};
