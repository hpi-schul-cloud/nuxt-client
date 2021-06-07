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
								console.log(fileData, "sdsfsdf")
								return { ...consentVersion, fileData };
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
