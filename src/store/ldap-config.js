export const actions = {
	// async getData({commit}) {
	// },
	async verifyData({ commit }, payload) {
		const {
			url,
			basisPath,
			searchUser,
			searchUserPassword,
			userPath,
			firstName,
			familyName,
			email,
			uid,
			uuid,
			groupOption,
			member,
			student,
			teacher,
			admin,
			user,
			classPath,
			nameAttribute,
			participantAttribute,
		} = payload;

		const data = {
			url,
			rootPath: basisPath,
			searchUser,
			searchUserPassword,
			// provider: "general",
			providerOptions: {
				userPathAdditions: userPath,
				classPathAdditions: classPath,
				roleType: groupOption,
				userAttributeNameMapping: {
					// dn: "dn",
					givenName: firstName,
					sn: familyName,
					uuid,
					uid,
					mail: email,
					role: member,
				},
				roleAttributeNameMapping: {
					roleStudent: student,
					roleTeacher: teacher,
					roleAdmin: admin,
					roleNoSc: user,
				},
				classAttributeNameMapping: {
					// dn: "dn",
					description: nameAttribute,
					uniqueMember: participantAttribute,
				},
			},
		};

		try {
			const verification = await this.$axios.$post(
				"/ldap-config?verifyOnly=true",
				data
			);
			console.log(verification);
			if (!verification.ok) {
				verification.errors.forEach((err) => {
					// placeholders for translations
					this.$toast.error(err.message);
				});
				return;
			}
			// placeholders for translations
			this.$toast.success("The verification was succesfull");
			commit("setSystemVerificationData", verification);

			this.$router.push({
				path: `/administration/ldap/config/save`,
			});
		} catch (error) {
			this.$toast.error(error);
			console.log(error);
		}
	},
	// async submitData({ commit }, patload) {
	// }
};

export const getters = {};

export const mutations = {
	// setSystemData(sata, payload) {
	// },
	setSystemVerificationData(state, payload) {
		state.systemVerificationData = payload;
	},
};

export const state = () => {
	return {
		systemData: null,
		systemVerificationData: null,
	};
};
