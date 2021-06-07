//const { Configuration } = require('@hpi-schul-cloud/commons');

const module = {
	state() {
		return {
			systems: [],
			setRequestSuccessful: false,
			error: null,
		};
	},
	actions: {
		async fetchSetOfSystems({ commit }, systemIds) {
			commit("setRequestSuccessful", false);
			console.log(systemIds);

			try {
				/* if (!Configuration.has("LDAP_PASSWORD_ENCRYPTION_KEY")) {
					throw new Error(
						"You need to set LDAP_PASSWORD_ENCRYPTION_KEY to encrypt the old key!"
					);
				} */
				const requests = systemIds.map((systemId) =>
					this.$axios.$get(`systems/${systemId}`)
				);
				const response = await Promise.all(requests);
				console.log("bsldka", response);

				commit("setDataProtectionPolicies", response.data);
				commit("setRequestSuccessful", true);
			} catch (error) {
				commit("setError", error);
				commit("setRequestSuccessful", false);
				// TODO what is supposed to happen on error?
			}
		},
	},
	mutations: {
		setSystems(state, systems) {
			state.systems = systems;
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
