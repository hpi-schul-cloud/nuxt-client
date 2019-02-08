const pkg = require("./package");

module.exports = {
	mode: "spa",

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
				type: "image/x-icon",
				href: "/favicon.ico",
			},
			{
				rel: "stylesheet",
				href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
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
	css: ["~/styles/base.scss"],

	router: {
		middleware: ["is-authenticated"],
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{
			src: "~/plugins/authenticate",
			ssr: false,
		},
		"@plugins/global.js",
		"@plugins/directives.js",
		// '~/plugins/feathers',
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		/* other options */

		// Doc: https://github.com/nuxt-community/axios-module#usage
		"@nuxtjs/axios",
		"nuxt-babel",
	],
	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			config.resolve.alias = require("./aliases.config").webpack;
			const svgRule = config.module.rules.find((rule) =>
				rule.test.test(".svg")
			);

			svgRule.test = /\.(png|jpe?g|gif|webp)$/;

			config.module.rules.push({
				test: /\.svg$/,
				loader: "vue-svg-loader",
			});
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
	},
};
