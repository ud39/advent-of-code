import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: ["../src/app/components/**/*.stories.ts"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@storybook/themes",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {},
};

export default config;
