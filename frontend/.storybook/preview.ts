import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        // nameOfTheme: 'dataAttributeForTheme',
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-mode",
    }),
  ],
};

export default preview;
