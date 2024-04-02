const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { createDevServerConfig } = require("./config/webpack/dev-server-config");
const generateAliases = require("./webpack-config/theme-aliases");
const ThemeResolverPlugin = require("./webpack-config/theme-resolver-plugin");
const NoncePlaceholderPlugin = require("./config/webpack/nonce-placeholder-plugin");
const { VuetifyPlugin } = require("webpack-plugin-vuetify");

const TSCONFIG_PATH = path.resolve(__dirname, "./tsconfig.build.json");

const replacements = generateAliases(__dirname);

const getDir = (subPath) => path.resolve(__dirname, subPath);

module.exports = defineConfig({
	assetsDir: "_nuxt",

	runtimeCompiler: true,

	transpileDependencies: ["vuetify"],

	configureWebpack: {
		plugins: [
			new VuetifyPlugin({ styles: { configFile: "src/styles/settings.scss" } }),
			new NoncePlaceholderPlugin(),
		],
		resolve: {
			alias: {
				"@data-board": getDir("src/modules/data/board"),
				"@data-external-tool": getDir("src/modules/data/external-tool"),
				"@data-group": getDir("src/modules/data/group"),
				"@data-system": getDir("src/modules/data/system"),
				"@data-provisioning-options": getDir(
					"src/modules/data/provisioning-options"
				),
				"@data-room": getDir("src/modules/data/room"),
				"@feature-board-file-element": getDir(
					"src/modules/feature/board-file-element"
				),
				"@feature-board-submission-element": getDir(
					"src/modules/feature/board-submission-element"
				),
				"@feature-board-text-element": getDir(
					"src/modules/feature/board-text-element"
				),
				"@feature-board-link-element": getDir(
					"src/modules/feature/board-link-element"
				),
				"@feature-board-external-tool-element": getDir(
					"src/modules/feature/board-external-tool-element"
				),
				"@feature-board-drawing-element": getDir(
					"src/modules/feature/board-drawing-element"
				),
				"@feature-course-sync": getDir("src/modules/feature/course-sync"),
				"@feature-board": getDir("src/modules/feature/board"),
				"@feature-editor": getDir("src/modules/feature/editor"),
				"@feature-render-html": getDir("src/modules/feature/render-html"),
				"@feature-news-form": getDir("src/modules/feature/news-form"),
				"@ui-alert": getDir("src/modules/ui/alert"),
				"@ui-board": getDir("src/modules/ui/board"),
				"@ui-preview-image": getDir("src/modules/ui/preview-image"),
				"@ui-confirmation-dialog": getDir("src/modules/ui/confirmation-dialog"),
				"@ui-date-time-picker": getDir("src/modules/ui/date-time-picker"),
				"@ui-light-box": getDir("src/modules/ui/light-box"),
				"@ui-speed-dial-menu": getDir("src/modules/ui/speed-dial-menu"),
				"@ui-room-details": getDir("src/modules/ui/room-details"),
				"@util-board": getDir("src/modules/util/board"),
				"@util-validators": getDir("src/modules/util/validators"),
				"@util-vue": getDir("src/modules/util/vue"),
				"@util-input-masks": getDir("src/modules/util/input-masks"),
				"@util-device-detection": getDir("src/modules/util/device-detection"),
				"@page-board": getDir("src/modules/page/board"),
				"@page-class-members": getDir("src/modules/page/class-members"),
			},
			extensions: [".js", ".ts", ".vue", ".json"],
			plugins: [new ThemeResolverPlugin(__dirname, replacements)],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					type: "javascript/auto",
					loader: path.resolve(__dirname, "webpack-config/vue-i18n-loader.js"),
					include: [path.resolve(__dirname, "src/locales")],
				},
			],
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
				options.compilerOptions = {
					...(options.compilerOptions || {}),
					isCustomElement: (tag) => tag.startsWith("h5p-"),
				};
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
