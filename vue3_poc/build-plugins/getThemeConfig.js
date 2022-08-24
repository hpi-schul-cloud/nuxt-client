export default function getThemeConfig() {
	// const usedTheme = dotenv.config().parsed.THEME;
	const usedTheme = process.env.THEME;
	return import(`./src/themes/${usedTheme}/config.mjs`);
}
