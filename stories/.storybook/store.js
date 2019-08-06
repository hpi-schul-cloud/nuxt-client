import Vuex from "vuex";
// insipred by https://github.com/nuxt/nuxt.js/blob/31f5729828e1009a6db28fe90296c178451f9efd/packages/vue-app/template/store.js

// import all store modules automatically
const modules = {};
const req = require.context("@store", true, /.js$/);
req.keys().forEach((filename) => {
	const moduleName = filename.replace(/^.*[\\\/]/, "").replace(/\.js$/, "");
	const module = req(filename).default || {};
	module.namespaced = true;
	modules[moduleName] = module;
});

const createStore = () => {
	return new Vuex.Store({
		namespaced: true,
		modules,
	});
};

export default createStore;
