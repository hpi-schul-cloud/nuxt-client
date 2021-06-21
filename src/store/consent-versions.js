const module = {
	state() {
		return {
			consentVersions: [],
			setRequestSuccessful: false,
			error: null,
		};
	},
	actions: {
		// TODO - get file on button click
		async fetchConsentVersions(
			{ commit },
			{ schoolId, consentTypes, withFile }
		) {
			commit("setRequestSuccessful", false);
			try {
				const response = await this.$axios.$get("/consentVersions", {
					params: {
						schoolId,
						consentTypes,
						$limit: 100,
						"$sort[publishedAt]": -1, // -> https://docs.feathersjs.com/api/databases/querying.html#sort
					},
				});

				commit("setConsentVersions", response.data);
				commit("setRequestSuccessful", true);

				if (!withFile) {
					commit("setConsentVersions", response.data);
					commit("setRequestSuccessful", true);
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
					commit("setRequestSuccessful", true);
				}
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
		async addConsentVersion({ commit, state }, payload) {
			commit("setRequestSuccessful", false);

			try {
				const data = await this.$axios.$post("/consentVersions", payload);

				commit("setConsentVersions", [...state.consentVersions, data]);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setConsentVersions(state, consentVersions) {
			state.consentVersions = consentVersions;
		},
		setRequestSuccessful(state, successful) {
			state.requestSuccessful = successful;
		},
		setError(state, error) {
			state.error = error;
		},
	},
};
export default module;
