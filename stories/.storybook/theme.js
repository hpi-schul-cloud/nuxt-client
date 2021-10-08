import { create } from "@storybook/theming/create";

import SCLogo from "../../src/assets/img/logo/logo-dBildungscloud.svg";

const baseThemeConfig = {
	fontBase:
		'"PT Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Arial, sans-serif',
	fontCode:
		'"Source Code Pro", "Operator Mono", "Fira Code Retina", "Fira Code", FiraCode-Retina, "Andale Mono", "Lucida Console", Consolas, Monaco, monospace',

	brandTitle: "HPI Schul-Cloud Storybook",
	brandImage: SCLogo,
};

export const light = create({
	base: "light",
	...baseThemeConfig,

	colorSecondary: "#e98404",
});

// https://github.com/hipstersmoothie/storybook-dark-mode
// export const dark = create({
// 	base: "dark",
// 	...baseThemeConfig,
// 	textColor: "black",
// 	appContentBg: "white",
// 	colorSecondary: "#e98404",
// });

export default light;
