const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { VuetifyPlugin } = require("webpack-plugin-vuetify");
const NoncePlaceholderPlugin = require("./nonce-placeholder-plugin");
const { DefinePlugin, ProgressPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const generateAliases = require("./theme-aliases");
const ThemeResolverPlugin = require("./theme-resolver-plugin");

const __base = path.resolve(__dirname, "../..");
const __src = path.resolve(__base, "src");

const replacements = generateAliases(__base);

const getDir = (subPath) => path.resolve(__base, subPath);

module.exports = {
	devtool: false, // "source-map", see https://webpack.js.org/configuration/devtool/

	// Entry: main file
	entry: {
		app: [path.resolve(__src, "main.ts")],
	},

	// Output
	output: {
		filename: "_nuxt/js/[name]-[contenthash:6].js",
		chunkFilename: "_nuxt/js/[name]-[contenthash:6].js",
		path: path.resolve(__base, "dist"),
		publicPath: "/",
		clean: true,
	},

	// Optimizations
	optimization: {
		realContentHash: false,
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					name: "chunk-vendors",
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: "initial",
				},
				common: {
					name: "chunk-common",
					minChunks: 2,
					priority: -20,
					chunks: "initial",
					reuseExistingChunk: true,
				},
			},
		},
	},

	// Plugins
	plugins: [
		new DefinePlugin({
			__VUE_OPTIONS_API__: "true",
			__VUE_PROD_DEVTOOLS__: "false",
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
		}),

		new ProgressPlugin(),

		new VueLoaderPlugin(),
		new VuetifyPlugin({ styles: { configFile: "src/styles/settings.scss" } }),

		new NoncePlaceholderPlugin(),

		new HtmlWebpackPlugin({
			title: "Deine digitale Lernumgebung",
			scriptLoading: "defer",
			favicon: path.resolve(
				__base,
				"public",
				"themes",
				process.env.SC_THEME || "default",
				"favicon.png"
			),

			template: path.resolve(__base, "public", "index.html"),
		}),

		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__base, "public"),
					to: path.resolve(__base, "dist"),
					toType: "dir",
					noErrorOnMissing: true,
					globOptions: {
						ignore: [
							"**/.DS_Store",
							path.resolve(__base, "public/index.html"),
							path.resolve(__base, "public/themes/**/*"),
						],
					},
					info: {
						minimized: true,
					},
				},
			],
		}),

		new ESLintWebpackPlugin({
			extensions: [".js", ".jsx", ".vue", ".ts", ".tsx"],
			failOnWarning: false,
			failOnError: true,
		}),
	],

	resolve: {
		alias: {
			"@": path.resolve(__src),
			"@data-file": path.resolve(__src, "modules/data/file"),
			"@data-board": path.resolve(__src, "modules/data/board"),
			"@data-external-tool": getDir("src/modules/data/external-tool"),
			"@data-group": getDir("src/modules/data/group"),
			"@data-system": getDir("src/modules/data/system"),
			"@data-provisioning-options": getDir(
				"src/modules/data/provisioning-options"
			),
			"@data-room": getDir("src/modules/data/room"),
			"@data-folder": getDir("src/modules/data/folder"),
			"@data-license": getDir("src/modules/data/license"),
			"@feature-board-file-element": getDir(
				"src/modules/feature/board-file-element"
			),
			"@feature-board-folder-element": getDir(
				"src/modules/feature/board-folder-element"
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
			"@feature-board-collaborative-text-editor-element": getDir(
				"src/modules/feature/board-collaborative-text-editor-element"
			),
			"@feature-board-video-conference-element": getDir(
				"src/modules/feature/board-video-conference-element"
			),
			"@feature-board-h5p-element": getDir(
				"src/modules/feature/board-h5p-element"
			),
			"@feature-board-deleted-element": getDir(
				"src/modules/feature/board-deleted-element"
			),
			"@feature-course-sync": getDir("src/modules/feature/course-sync"),
			"@feature-board": getDir("src/modules/feature/board"),
			"@feature-editor": getDir("src/modules/feature/editor"),
			"@feature-render-html": getDir("src/modules/feature/render-html"),
			"@feature-news-form": getDir("src/modules/feature/news-form"),
			"@feature-media-shelf": getDir("src/modules/feature/media-shelf"),
			"@feature-room": getDir("src/modules/feature/room"),
			"@feature-folder": getDir("src/modules/feature/folder"),
			"@icons": getDir("src/components/icons"),
			"@ui-alert": getDir("src/modules/ui/alert"),
			"@ui-board": getDir("src/modules/ui/board"),
			"@ui-breadcrumbs": getDir("src/modules/ui/breadcrumbs"),
			"@ui-chip": getDir("src/modules/ui/chip"),
			"@ui-confirmation-dialog": getDir("src/modules/ui/confirmation-dialog"),
			"@ui-data-table": getDir("src/modules/ui/data-table"),
			"@ui-date-time-picker": getDir("src/modules/ui/date-time-picker"),
			"@ui-extended-icon-btn": getDir("src/modules/ui/extended-icon-btn"),
			"@ui-kebab-menu": getDir("src/modules/ui/kebab-menu"),
			"@ui-layout": getDir("src/modules/ui/layout"),
			"@ui-light-box": getDir("src/modules/ui/light-box"),
			"@ui-line-clamp": getDir("src/modules/ui/line-clamp"),
			"@ui-preview-image": getDir("src/modules/ui/preview-image"),
			"@ui-room-details": getDir("src/modules/ui/room-details"),
			"@ui-skip-link": getDir("src/modules/ui/skip-link"),
			"@ui-speed-dial-menu": getDir("src/modules/ui/speed-dial-menu"),
			"@ui-qr-code": getDir("src/modules/ui/qr-code"),
			"@ui-video-conference-configuration-dialog": getDir(
				"src/modules/ui/video-conference-configuration-dialog"
			),
			"@ui-empty-state": getDir("src/modules/ui/empty-state"),
			"@util-board": getDir("src/modules/util/board"),
			"@util-validators": getDir("src/modules/util/validators"),
			"@util-vue": getDir("src/modules/util/vue"),
			"@util-input-masks": getDir("src/modules/util/input-masks"),
			"@util-device-detection": getDir("src/modules/util/device-detection"),
			"@util-error-notification": getDir("src/modules/util/error-notification"),
			"@util-logger": getDir("src/modules/util/logger"),
			"@page-board": getDir("src/modules/page/board"),
			"@page-class-members": getDir("src/modules/page/class-members"),
			"@page-media-shelf": getDir("src/modules/page/media-shelf"),
			"@page-room": getDir("src/modules/page/room"),
			"@page-folder": getDir("src/modules/page/folder"),
		},
		extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx", ".vue", ".json"],
		plugins: [new ThemeResolverPlugin(__base, replacements)],
	},

	//Webpack dosent know how to handler all type of files and what to do with them, so this section
	//we can capture and configure a specific type of file and determine a loader plugin to process it
	module: {
		rules: [
			// Javascript
			{
				test: /\.m?jsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			// Typescript
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "babel-loader",
					},
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
							appendTsSuffixTo: [/\.vue$/],
							happyPackMode: false,
							configFile: path.resolve(__base, "tsconfig.build.json"),
						},
					},
				],
			},
			// I18n - TS, JSON
			{
				test: /\.(ts|mjs)$/,
				type: "javascript/auto",
				loader: path.resolve(__dirname, "vue-i18n-loader.js"),
				include: [
					path.resolve(__src, "locales"),
					path.resolve(__base, "node_modules/vuetify/lib/locale"),
				],
				exclude: [
					path.resolve(__base, "node_modules/vuetify/lib/locale/adapters"),
				],
			},
			// Vue
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					compilerOptions: {
						isCustomElement: (tag) => tag.startsWith("h5p-"),
					},
				},
			},
			// SVG
			{
				test: /\.(svg)(\?.*)?$/,
				type: "asset/resource",
				generator: {
					filename: "_nuxt/img/[name].[hash:8][ext]",
				},
			},
			// Images
			{
				test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
				type: "asset",
				generator: {
					filename: "_nuxt/img/[name].[hash:8][ext]",
				},
			},
			// Media
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				type: "asset",
				generator: {
					filename: "_nuxt/media/[name].[hash:8][ext]",
				},
			},
			// Fonts
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				type: "asset",
				generator: {
					filename: "_nuxt/fonts/[name].[hash:8][ext]",
				},
			},
			// CSS, SCSS
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"],
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ["vue-style-loader", "css-loader", "sass-loader"],
			},
		],
	},
};
