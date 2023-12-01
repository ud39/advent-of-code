import type { Meta, StoryObj } from "@storybook/angular";
import { argsToTemplate, moduleMetadata } from "@storybook/angular";

import FieldsetComponent from "./FieldsetComponent";
import * as TagStories from "./tag.stories";
import TagComponent from "./TagComponent";
import { CommonModule } from "@angular/common";

const meta: Meta<FieldsetComponent> = {
  component: FieldsetComponent,
  excludeStories: /.*Data$/,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      declarations: [FieldsetComponent, TagComponent],
      imports: [CommonModule],
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

export const Languages: Story = {
  args: {
    fieldsetType: "languages",
    availableTags: [
      {
        id: 1,
        title: "Haskell",
        src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg",
        selected: false,
      },
    ],
  },
};

export const Algorithms: Story = {
  args: {
    fieldsetType: "algorithm",
    availableTags: [
      {
        id: 1,
        title: "Haskell",
        src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Haskell-Logo.svg",
        selected: false,
      },
    ],
  },
};
