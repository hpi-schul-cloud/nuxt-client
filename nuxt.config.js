const pkg = require("./package");
const themeName = process.env.SC_THEME || "default";

module.exports = {
	mode: "spa",
	srcDir: "src/",
	theme: "default",
	env: {
		API_URL: process.env.API_URL || "http://localhost:3030",
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

	router: {
		middleware: ["is-authenticated"],
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{
			src: "@plugins/authenticate",
			ssr: false,
		},
		"@plugins/global",
		"@plugins/axios",
		"@plugins/i18n",
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		/* other options */

		// Doc: https://github.com/nuxt-community/axios-module#usage
		"@nuxtjs/axios",
		"@nuxtjs/toast",
	],

	toast: {
		duration: 3000,
	},
	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		baseUrl: process.env.BASE_URL || "https://localhost:3030",
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
