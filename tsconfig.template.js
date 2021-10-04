module.exports = {
	compilerOptions: {
		target: "ES5",
		module: "ESNext",
		moduleResolution: "Node",
		lib: ["ESNext", "ESNext.AsyncIterable", "DOM"],
		esModuleInterop: true,
		allowJs: true,
		sourceMap: true,
		strict: true,
		noImplicitThis: true,
		noEmit: true,
		baseUrl: ".",
		experimentalDecorators: true,
		// TODO downgrade to older JS version, this rule necesary because Set is not iterable, in use in auth.ts module
		downlevelIteration: true,
		types: [
			"@types/node",
			"@nuxt/types",
			"@nuxtjs/axios",
			"@nuxtjs/toast",
			"jest",
			"cookie-universal-nuxt",
		],
	},
	exclude: ["node_modules", ".nuxt", "dist"],
};
