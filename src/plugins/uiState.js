let store;

const set = (key, identifier, data) => {
	store?.commit("uiState/set", {
		key,
		identifier,
		object: data,
	});
};

const get = (key, identifier) => {
	return store?.getters["uiState/get"]({ key, identifier });
};

export default {
	install(Vue) {
		(Vue.prototype.$uiState = {
			set,
			get,
		}),
			Vue.mixin({
				created() {
					store = this.$store;
				},
			});
	},
};
