import type { StorybookConfig } from "@storybook/angular";
import { withThemeByDataAttribute } from "@storybook/addon-themes/*";

const config: StorybookConfig = {
  stories: ["../src/app/components/**/*.stories.ts"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@storybook/themes",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
