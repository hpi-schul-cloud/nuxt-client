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
		noEmit: true,
		baseUrl: ".",
		experimentalDecorators: true,
		types: ["@types/node", "@nuxt/types", "@nuxtjs/toast", "jest"],
	},
	exclude: ["node_modules", ".nuxt", "dist"],
};
