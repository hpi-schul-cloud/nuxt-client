const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { devServer } = require("./webpack-config/dev-server-config");

const themeName = process.env.SC_THEME || "default";
const TSCONFIG_PATH = path.resolve(__dirname, "./tsconfig.build.json");

module.exports = defineConfig({
	transpileDependencies: ["vuetify"],

	configureWebpack: {
		resolve: {
			alias: {
				// NUXT_REMOVE change the paths so they align with @/<name>
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

	// use custom tsconfig for webpack builds
	// to e.g. exclude test files
	// https://github.com/vuejs/vue-cli/issues/2421
	chainWebpack: (config) => {
		config.module
			.rule("ts")
			.use("ts-loader")
			.merge({
				options: {
					configFile: TSCONFIG_PATH,
				},
			});
		config.plugin("fork-ts-checker").tap((args) => {
			args[0].typescript.configFile = TSCONFIG_PATH;
			return args;
		});
	},

	pluginOptions: {
		i18n: {
			locale: "de",
			fallbackLocale: "de",
			localeDir: "locales",
			enableInSFC: true,
			enableBridge: false,
		},
	},

	devServer,
});
