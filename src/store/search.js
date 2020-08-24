export const actions = {
	async getBySearch({ commit }, payload = {}) {
		const res = await this.$axios.$get("users");

		const filtered = (searchItem, arr) => {
			const query = searchItem.toLowerCase();
			return arr.filter((item) => {
				return (
					(item.firstName.toLowerCase().indexOf(query) >= 0 ||
						item.lastName.toLowerCase().indexOf(query) >= 0 ||
						item.email.toLowerCase().indexOf(query) >= 0) &&
					item.roles.find((id) => id == payload.query.role.id)
				);
			});
		};

		const result = filtered(payload.query.searchText, res.data);

		commit("setSearchData", result);
	},
};

export const mutations = {
	setSearchData(state, payload) {
		state.searchResult = payload;
	},
};

const initialState = () => ({
	searchResult: [],
});

export const state = initialState();
