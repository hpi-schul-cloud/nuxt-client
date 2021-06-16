const module = {
	state() {
		return {
			consentVersions: [],
			setRequestSuccessful: false,
			error: null,
		};
	},
	actions: {
		async fetchConsentVersions({ commit }, params) {
			commit("setRequestSuccessful", false);
			try {
				const response = await this.$axios.$get("/consentVersions", {
					params: params.queryParams,
				});
				commit("setConsentVersions", response.data);
				commit("setRequestSuccessful", true);

				if (!params.withFile) {
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
								return consentVersion
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
		async addConsentVersion({ commit }, payload) {
			commit("setRequestSuccessful", false);
			console.log(payload)
			try {
				const data = await this.$axios.$post(
					'/consentVersions',
					payload
				);
				console.log("data", data);
				//commit("setSchool", data);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		}
	},
	mutations: {
		setConsentVersions(state, consentVersions) {
			state.consentVersions = consentVersions;
		},
		setRequestSuccessful(state) {
			state.setRequestSuccessful = true;
		},
		setError(state, error) {
			state.error = error;
		},
	},
};
export default module;
