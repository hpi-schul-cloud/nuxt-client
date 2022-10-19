const { defineConfig } = require("@vue/cli-service");
const path = require("path");

const themeName = process.env.SC_THEME || "default";

module.exports = defineConfig({
	transpileDependencies: ["vuetify"],
	configureWebpack: {
		resolve: {
			alias: {
				"@assets": path.resolve(__dirname, `src/assets`),
				"@styles": path.resolve(
					__dirname,
					`src/themes/${themeName}/styles/index.scss`
				),
				"@styles-base": path.resolve(__dirname, `src/themes/base/styles`),
				"@variables": path.resolve(
					__dirname,
					`src/themes/${themeName}/styles/variables.scss`
				),
			},
		},
	},
});
