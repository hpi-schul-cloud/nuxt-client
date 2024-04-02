const WebpackBar = require("webpackbar");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { VuetifyPlugin } = require("webpack-plugin-vuetify");
const NoncePlaceholderPlugin = require("./nonce-placeholder-plugin");

//Just to help us with directories and folders path
const __base = path.resolve(__dirname, "../..");
const __src = path.resolve(__base, "src");

// const replacements = generateAliases(__dirname);

const getDir = (subPath) => path.resolve(__base, subPath);

module.exports = {
	devtool: "source-map",

	//Entry: main file that init our application
	entry: path.resolve(__src, "main.ts"),

	//Output: result of the bundle after webpack run
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__base, "dist"),
		clean: true,
	},

	//Plugins to help and include additionals functionalities to webpack
	plugins: [
		new WebpackBar(),

		new VueLoaderPlugin(),
		new VuetifyPlugin({ styles: { configFile: "src/styles/settings.scss" } }),
		new NoncePlaceholderPlugin(),

		new HtmlWebpackPlugin({
			title: "Deine digitale Lernumgebung",
			favicon: path.resolve(
				__base,
				"public",
				"themes",
				process.env.SC_THEME || "default",
				"favicon.png"
			),

			template: path.resolve(__base, "public", "index.html"),
		}),
	],

	resolve: {
		alias: {
			"@": getDir("src"),
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
		extensions: [
			".tsx",
			".ts",
			".mjs",
			".js",
			".jsx",
			".vue",
			".json",
			".js",
			".ts",
			".vue",
			".json",
		],
		// extensions: [".js", ".ts", ".vue", ".json"],
		// plugins: [new ThemeResolverPlugin(__dirname, replacements)],
	},

	//Webpack dosent know how to handler all type of files and what to do with them, so this section
	//we can capture and configure a specific type of file and determine a loader plugin to process it
	module: {
		rules: [
			// {
			// 	test: /\.(js|jsx)$/,
			// 	exclude: /node_modules/,
			// 	use: ["babel-loader"],
			// },
			{
				test: /\.m?jsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
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
			//Vue loader. Says to webpack that files with .vue extension need to be processed by the vue-loader plugin
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			//CSS loaders. Make possible import css files as js modules
			{
				test: /\.css$/,
				use: ["vue-style-loader", "css-loader"],
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ["vue-style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(svg)(\?.*)?$/,
				type: "asset/resource",
			},
			//Indicates that png files are assets to be processed by webpack
			{
				test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
				type: "asset/resource",
			},
		],
	},
};
