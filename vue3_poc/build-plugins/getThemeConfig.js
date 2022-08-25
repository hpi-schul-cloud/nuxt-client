export default function getThemeConfig(usedTheme) {
	return import(`./src/themes/${usedTheme}/config.mjs`);
}
