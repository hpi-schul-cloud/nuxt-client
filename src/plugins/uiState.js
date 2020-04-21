let store;

const init = () => {
	try {
		store.commit("uiState/initialise");
	} catch (error) {
		throw new Error(error);
	}
};

const set = (key, value) => {
	store?.commit("uiState/alterState", {
		key,
		object: value,
	});
};

const get = (key) => {
	return store?.getters["uiState/getStateByKey"]({ key });
};

const setPagination = (identifier, { currentPage, itemsPerPage }) => {
	let page = currentPage,
		limit = itemsPerPage;

	if (!currentPage) {
		page = getPagination(identifier)?.page;
	}
	if (!itemsPerPage) {
		limit = getPagination(identifier)?.limit;
	}

	store?.commit("uiState/alterState", {
		key: "pagination",
		identifier,
		object: { page, limit },
	});
};

const getPagination = (identifier) => {
	return (
		store?.getters["uiState/getStateByKey"]({
			key: "pagination",
			identifier,
		}) || { page: undefined, limit: undefined }
	);
};

const setFilter = (identifier, query) => {
	store?.commit("uiState/alterState", {
		key: "filter",
		identifier,
		object: query,
	});
};

const getFilter = (identifier) => {
	return (
		store?.getters["uiState/getStateByKey"]({
			key: "filter",
			identifier,
		})?.query || {}
	);
};

export default {
	install(Vue) {
		(Vue.prototype.$uiState = {
			set,
			get,
			setPagination: setPagination,
			getPagination,
			setFilter,
			getFilter,
			init,
		}),
			Vue.mixin({
				created() {
					store = this.$store;
				},
			});
	},
};
