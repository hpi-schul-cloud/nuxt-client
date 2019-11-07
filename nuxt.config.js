require("dotenv").config();
const pkg = require("./package");

const sentryConfig = require("./sentry.config.js");

const themeName = process.env.SC_THEME || "default";
const API_URL = process.env.API_URL || "http://localhost:3030";
const DEFAULT_PORT = 4000;
const DEFAULT_HOST =
	process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

const GIT_INFO = require("./git-info.js");

module.exports = {
	mode: "spa",
	srcDir: "src/",
	theme: "default",
	// to make ENV variables available in components, they need to be defined here
	env: {
		FALLBACK_DISABLED: process.env.FALLBACK_DISABLED || false,
		FEATURE_EXTENSIONS_ENABLED: process.env.FEATURE_EXTENSIONS_ENABLED || false,
		FEATURE_TEAMS_ENABLED: process.env.FEATURE_TEAMS_ENABLED || false,
		GIT_INFO: JSON.stringify(GIT_INFO, null, "\t"),
	},
	/*
	 ** Headers of the page
	 */
	head: {
		title: pkg.name,
		meta: [
			{
				charset: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				hid: "description",
				name: "description",
				content: pkg.description,
			},
		],
		link: [
			{
				rel: "icon",
				type: "image/png",
				href: "/images/logo/favicon-32.png",
			},
		],
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: "#fff",
	},

	css: ["@/themes/" + themeName + "/styles"],

	/*
	 ** Global CSS
	 */
	cssSourceMap: true,

	server: {
		port: process.env.PORT || DEFAULT_PORT,
		host: process.env.HOST || DEFAULT_HOST,
	},
	serverMiddleware: ["@serverMiddleware/proxy"],

	router: {
		middleware: [
			// "is-authenticated",
			"links-fallback",
			"permission-check",
		],
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		"@plugins/global",
		"@plugins/axios",
		"@plugins/i18n",
		"@plugins/authenticate",
		"@plugins/user",
		"@plugins/sentry",
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		"@nuxtjs/dotenv",
		// Doc: https://github.com/nuxt-community/axios-module#usage
		"@nuxtjs/axios",
		"@nuxtjs/sentry",
		"@nuxtjs/toast",
		"cookie-universal-nuxt",
		"nuxt-babel",
	],
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		baseURL: API_URL,
	},
	sentry: sentryConfig,
	toast: {
		duration: 3000,
	},

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			Object.assign(config.resolve.alias, require("./aliases.config").webpack);

			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: "pre",
					test: /\.(js|vue)$/,
					loader: "eslint-loader",
					exclude: /(node_modules)/,
					options: {
						fix: true,
					},
				});
			}
		},
		postcss: {
			plugins: [require("postcss-color-mod-function")()],
			preset: {
				autoprefixer: {},
			},
		},
		extractCSS: true,
		vendor: ["vue-i18n"],
	},
	generate: {
		dir: "dist/nuxt",
	},
};
