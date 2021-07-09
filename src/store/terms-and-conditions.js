const module = {
	state: () => ({ consentVersion: null }),
	actions: {
		schoolTermsPresent: async function ({ commit }, schoolId) {
			const params = `?$limit=1&$sort[publishedAt]=-1&schoolId=${schoolId}`;
			const data = await this.$axios.$get("/consentVersions" + params);
			commit("setSchoolTermsPresent", data);
		},
	},
	mutations: {
		setSchoolTermsPresent(state, consentVersion) {
			state.consentVersion = consentVersion.data[0];
		},
	},
	getters: {
		getConsentVersion(state) {
			return state.consentVersion;
		},
	},
};

export default module;
