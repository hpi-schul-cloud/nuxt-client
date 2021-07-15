require("dotenv").config();

const pkg = require("./package");
const webpack = require("webpack");

const sentryConfig = require("./sentry.config.js");

const themeName = process.env.SC_THEME || "default";
const DEFAULT_PORT = 4000;
const DEFAULT_HOST =
	process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"; // NODE_ENV=production for all travis build

const serverMiddlewareList = [
	"@serverMiddleware/nuxtversion",
	"@serverMiddleware/proxy",
	"@serverMiddleware/csp/cors",
	"@serverMiddleware/csp/security_headers",
];

module.exports = {
	mode: "spa",
	srcDir: "src/",
	theme: "default",
	buildModules: [
		"@nuxt/typescript-build",
		[
			"@nuxtjs/vuetify",
			{
				/* module options */
			},
		],
	],
	// to make ENV variables available in components, they need to be defined here
	env: {
		SC_THEME: process.env.SC_THEME,
		// NODE_ENV=production for all travis build
	},

	publicRuntimeConfig: {
		FALLBACK_DISABLED: process.env.FALLBACK_DISABLED || false,
		axios: {
			browserBaseURL: process.env.API_URL || "http://localhost:3030",
		},
		FEATURE_MATRIX_MESSENGER_ENABLED:
			process.env.FEATURE_MATRIX_MESSENGER_ENABLED,
		MATRIX_MESSENGER__EMBED_URI: process.env.MATRIX_MESSENGER__EMBED_URI,
		MATRIX_MESSENGER__URI: process.env.MATRIX_MESSENGER__URI,
		MATRIX_MESSENGER__DISCOVER_URI: process.env.MATRIX_MESSENGER__DISCOVER_URI,
		// env vars needed at runtime for server middleware:
		LERNSTORE_MODE: process.env.LERNSTORE_MODE,
		// CORS_ENABLED: process.env.CORS_ENABLED || false,
		// SECURITY_HEADERS_ENABLED: process.env.SECURITY_HEADERS_ENABLED || false,
		// LEGACY_CLIENT_URL
		// PROXY_LOG_LEVEL
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
				href: `/themes/${themeName}/favicon.png`,
			},
		],
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: "#fff",
	},

	/*
	 ** Global CSS
	 */
	cssSourceMap: true,

	/*
	 ** Nuxt.js (server)middleware
	 */
	server: {
		port: DEFAULT_PORT,
		host: DEFAULT_HOST,
	},

	serverMiddleware: serverMiddlewareList,

	router: {
		middleware: [
			// "is-authenticated",
			"links-fallback",
			"permission-check",
			"externally-managed-check",
		],
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		// configInit need to be first so that the env vars are available for following plugins
		"@plugins/configInit",
		"@plugins/global",
		"@plugins/axios",
		"@plugins/authenticate",
		"@plugins/user",
		"@plugins/sentry",
		"@plugins/i18n",
		"@plugins/datetime",
		"@plugins/vuelidate",
		"@plugins/iconfonts",
		"@plugins/axios-accessor",
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
	sentry: sentryConfig,
	toast: {
		duration: 3000,
	},

	/*
	 ** Build configuration
	 */
	build: {
		transpile: ["vue-echarts", "resize-detector", "vuex-module-decorators"],
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
		vendor: ["vue-i18n", "jquery"],
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
			}),
		],
	},
	generate: {
		dir: "dist/nuxt",
	},
	vuetify: {
		customVariables: ["@styles-base/vuetify-custom.scss"],
		defaultAssets: false,
		treeShake: true,
		optionsPath: "@/themes/" + themeName + "/vuetify.options.js",
		options: {
			customProperties: true,
		},
	},
};
