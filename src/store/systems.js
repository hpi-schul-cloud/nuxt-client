const module = {
	state() {
		return {
			systems: [],
			loading: false,
			error: null,
		};
	},
	actions: {
		async fetchSchoolSystems({ commit }, systemIds) {
			commit("setLoading", true);

			try {
				// TODO - ask if I need to check for process.env.LDAP... here
				/* if (!Configuration.has("LDAP_PASSWORD_ENCRYPTION_KEY")) {
					throw new Error(
						"You need to set LDAP_PASSWORD_ENCRYPTION_KEY to encrypt the old key!"
					);
				} */
				const requests = systemIds.map((systemId) =>
					this.$axios.$get(`systems/${systemId}`)
				);
				const response = await Promise.all(requests);

				commit("setSystems", response);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
		async deleteSystem({ commit }, systemId) {
			commit("setLoading", true);

			try {
				this.$axios.$delete(`systems/${systemId}`);

				// TODO - what should we commit here?
				//				commit("setSystems", response);
				commit("setLoading", false);
			} catch (error) {
				commit("setError", error);
				commit("setLoading", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setSystems(state, systems) {
			state.systems = systems;
		},
		setLoading(state) {
			state.loading = true;
		},
		setError(state, error) {
			state.error = error;
		},
	},
	getters: {
		getSystems(state) {
			return state.systems;
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
