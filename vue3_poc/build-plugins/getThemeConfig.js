import getTheme from "./getTheme";

export default function getThemeConfig() {
	const usedTheme = getTheme();
	return import(`./src/themes/${usedTheme}/config.mjs`);
}
