const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { createDevServerConfig } = require("./webpack-config/dev-server-config");
const generateAliases = require("./webpack-config/theme-aliases");
const ThemeResolverPlugin = require("./webpack-config/theme-resolver-plugin");
const NoncePlaceholderPlugin = require("./webpack-config/nonce-placeholder-plugin");

const TSCONFIG_PATH = path.resolve(__dirname, "./tsconfig.build.json");

const replacements = generateAliases(__dirname);

const getDir = (subPath) => path.resolve(__dirname, subPath);

module.exports = defineConfig({
	assetsDir: "_nuxt",

	transpileDependencies: ["vuetify"],

	configureWebpack: {
		plugins: [new NoncePlaceholderPlugin()],
		resolve: {
			alias: {
				"@data-board": getDir("src/components/data-board"),
				"@feature-board-file-element": getDir(
					"src/components/feature-board-file-element"
				),
				"@feature-board-submission-element": getDir(
					"src/components/feature-board-submission-element"
				),
				"@feature-board-text-element": getDir(
					"src/components/feature-board-text-element"
				),
				"@feature-board-link-element": getDir(
					"src/components/feature-board-link-element"
				),
				"@feature-board-external-tool-element": getDir(
					"src/components/feature-board-external-tool-element"
				),
				"@feature-board": getDir("src/components/feature-board"),
				"@feature-date-time-picker": getDir(
					"src/components/feature-date-time-picker"
				),
				"@feature-editor": getDir("src/components/feature-editor"),
				"@feature-render-html": getDir("src/components/feature-render-html"),
				"@ui-alert": getDir("src/components/ui-alert"),
				"@ui-board": getDir("src/components/ui-board"),
				"@ui-confirmation-dialog": getDir(
					"src/components/ui-confirmation-dialog"
				),
				"@ui-light-box": getDir("src/components/ui-light-box"),
				"@util-board": getDir("src/components/util-board"),
				"@util-validators": getDir("src/components/util-validators"),
				"@page-board": getDir("src/components/page-board"),
				"@page-class-members": getDir("src/components/page-class-members"),
			},
			extensions: [".js", ".ts", ".vue", ".json"],
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
		// avoid auto format on vue-loader to fix prettier errors
		config.module
			.rule("vue")
			.use("vue-loader")
			.tap((options) => {
				options.prettify = false;
				return options;
			});
		config.plugin("fork-ts-checker").tap((args) => {
			args[0].typescript.configFile = TSCONFIG_PATH;
			return args;
		});
		config.plugin("html").tap((args) => {
			args[0].title = "Deine digitale Lernumgebung";
			args[0].favicon = `./public/themes/${
				process.env.SC_THEME || "default"
			}/favicon.png`;
			return args;
		});
		config.plugin("copy").tap((args) => {
			args[0].patterns[0].globOptions.ignore.push(
				path.resolve(__dirname, "./public/themes/**/*")
			);
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
