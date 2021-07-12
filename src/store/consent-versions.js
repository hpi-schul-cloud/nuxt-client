const module = {
	state() {
		return {
			consentVersions: [],
			loading: false,
			error: null,
		};
	},
	actions: {
		// TODO - figure out why it fetches a consentversion without a schoolId
		async fetchConsentVersions(
			{ commit },
			{ schoolId, consentTypes, withFile }
		) {
			commit("setLoading", true);
			try {
				const response = await this.$axios.$get("/consentVersions", {
					params: {
						schoolId,
						consentTypes,
						$limit: 100,
						"$sort[publishedAt]": -1, // -> read more at https://docs.feathersjs.com/api/databases/querying.html#sort
					},
				});

				if (!withFile) {
					commit("setConsentVersions", response.data);
					commit("setLoading", false);
				} else {
					const consentVersions = await Promise.all(
						response.data.map(async (consentVersion) => {
							if (consentVersion.consentDataId) {
								const fileData = await this.$axios.$get(
									`/base64Files/${consentVersion.consentDataId}`
								);
								return { ...consentVersion, fileData };
							} else {
								return consentVersion;
							}
						})
					);
					commit("setConsentVersions", consentVersions);
					commit("setLoading", false);
				}
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
		async addConsentVersion({ commit, state }, payload) {
			commit("setLoading", true);

			try {
				const data = await this.$axios.$post("/consentVersions", payload);
				const newConsentVersionsArray = [...state.consentVersions];
				newConsentVersionsArray.unshift(data);

				commit("setConsentVersions", newConsentVersionsArray);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setConsentVersions(state, consentVersions) {
			state.consentVersions = consentVersions;
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
		setError(state, error) {
			state.error = error;
		},
	},
	getters: {
		getConsentVersions(state) {
			return state.consentVersions;
		},
		getLoading(state) {
			return state.loading;
		},
		getError(state) {
			return state.error;
		},
	},
};
export default module;
