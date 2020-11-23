export const actions = {
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
			providerOptions: {
				userPathAdditions: userPath,
				classPathAdditions: classPath,
				roleType: groupOption,
				userAttributeNameMapping: {
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
			if (!verification.ok) {
				verification.errors.forEach((err) => {
					// placeholders for translations
					this.$toast.error(err);
				});
				return;
			}
			// placeholders for translations
			this.$toast.success("The verification was succesfull");
			commit("setSystemVerificationData", verification);

			// disabled until page implementation
			// this.$router.push({
			// 	path: `/administration/ldap/ldap-save?id=${id}`,
			// });
		} catch (error) {
			this.$toast.error(error);
		}
	},
};

export const getters = {};

export const mutations = {
	setSystemVerificationData(state, payload) {
		state.systemVerificationData = payload;
	},
};

export const state = () => {
	return {
		systemVerificationData: null,
	};
};
