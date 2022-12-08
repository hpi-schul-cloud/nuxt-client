const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { createDevServerConfig } = require("./webpack-config/dev-server-config");
const generateAliases = require("./webpack-config/theme-aliases");
const ThemeResolverPlugin = require("./webpack-config/theme-resolver-plugin");

const TSCONFIG_PATH = path.resolve(__dirname, "./tsconfig.build.json");

const replacements = generateAliases(__dirname);

module.exports = defineConfig({
	assetsDir: "_nuxt",

	transpileDependencies: ["vuetify"],

	configureWebpack: {
		resolve: {
			plugins: [new ThemeResolverPlugin(__dirname, replacements)],
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
		config.plugin("html").tap((args) => {
			args[0].title = "dBildungscloud - Deine digitale Lernumgebung";
			args[0].favicon = `./public/themes/${
				process.env.SC_THEME || "default"
			}/favicon.png`;
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

	devServer:
		process.env.NODE_ENV === "development" ? createDevServerConfig() : {},
});
