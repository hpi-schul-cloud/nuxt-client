const formatData = (data = {}, action) => {
	if (action === "verify") {
		return {
			url: data.url,
			rootPath: data.basisPath,
			searchUser: data.searchUser,
			searchUserPassword: data.searchUserPassword,
			// provider: "general",
			providerOptions: {
				userPathAdditions: data.userPath,
				classPathAdditions: data.classPath,
				roleType: data.groupOption,
				userAttributeNameMapping: {
					// dn: "dn",
					givenName: data.firstName,
					sn: data.familyName,
					uuid: data.uuid,
					uid: data.uid,
					mail: data.email,
					role: data.member,
				},
				roleAttributeNameMapping: {
					roleStudent: data.student,
					roleTeacher: data.teacher,
					roleAdmin: data.admin,
					roleNoSc: data.user,
				},
				classAttributeNameMapping: {
					// dn: "dn",
					description: data.nameAttribute,
					uniqueMember: data.participantAttribute,
				},
			},
		};
	}

	const { providerOptions } = data;
	const {
		userAttributeNameMapping,
		roleAttributeNameMapping,
		classAttributeNameMapping,
	} = providerOptions;
	return {
		url: data.url,
		basisPath: data.rootPath,
		searchUser: data.searchUser,
		searchUserPassword: data.searchUserPassword,
		userPath: providerOptions.userPathAdditions,
		firstName: userAttributeNameMapping.givenName,
		familyName: userAttributeNameMapping.sn,
		email: userAttributeNameMapping.mail,
		uid: userAttributeNameMapping.uid,
		uuid: userAttributeNameMapping.uuid,
		groupOption: providerOptions.roleType,
		member: userAttributeNameMapping.role,
		student: roleAttributeNameMapping.roleStudent,
		teacher: roleAttributeNameMapping.roleTeacher,
		admin: roleAttributeNameMapping.roleAdmin,
		user: roleAttributeNameMapping.roleNoSc,
		classPath: providerOptions.classPathAdditions,
		nameAttribute: classAttributeNameMapping.description,
		participantAttribute: classAttributeNameMapping.uniqueMember,
	};
};

export const actions = {
	async getData({ commit }) {
		try {
			// const data = await this.$axios.get("/ldap-config");
			const data = formatData({
				url: "ldaps://ldap.schul-cloud.org",
				rootPath: "dc=schul-cloud,dc=org",
				searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
				searchUserPassword: "Naivi4Ahghee",
				provider: "general",
				providerOptions: {
					userPathAdditions: "ou=users",
					classPathAdditions: "ou=classes,ou=groups",
					roleType: "ldap_group",
					userAttributeNameMapping: {
						givenName: "givenName",
						sn: "sn",
						dn: "dn",
						uuid: "uidNumber",
						uid: "uid",
						mail: "mail",
						role: "description",
					},
					roleAttributeNameMapping: {
						roleStudent: "cn=student,ou=roles,ou=groups,dc=schul-cloud,dc=org",
						roleTeacher: "cn=teacher,ou=roles,ou=groups,dc=schul-cloud,dc=org",
						roleAdmin: "cn=admin,ou=roles,ou=groups,dc=schul-cloud,dc=org",
						roleNoSc: "no-sc",
					},
					classAttributeNameMapping: {
						description: "description",
						dn: "dn",
						uniqueMember: "member",
					},
				},
			});
			commit("setSystemData", data);
		} catch (error) {
			console.log(error);
			this.$toast.error(error);
		}
	},
	async verifyData({ commit }, payload) {
		try {
			const data = formatData(payload, "verify");
			const verification = await this.$axios.$post(
				"/ldap-config?verifyOnly=true",
				data
			);
			if (!verification.ok) {
				verification.errors.forEach((err) => {
					// placeholders for translations
					this.$toast.error(err.message);
				});
				return;
			}
			// placeholders for translations
			this.$toast.success("The verification was succesfull");
			commit("setTempData", payload);
			commit("setSystemVerificationData", verification);

			this.$router.push({
				path: `/administration/ldap/config/save`,
			});
		} catch (error) {
			console.log(error);
			this.$toast.error(error);
		}
	},
	async submitData({ commit }, payload) {
		try {
			const submssion = await this.$axios.$post(
				"/ldap-config?verifyOnly=false",
				payload
			);
			if (!submssion.ok) {
				verification.errors.forEach((err) => {
					// placeholders for translations
					this.$toast.error(err.message);
				});
				this.$router.push({
					path: `/administration/ldap/config`,
				});
				return;
			}
			this.$toast.success("The submission was succesfull");
			commit("setDataSubmission", payload);
			this.$router.push({
				path: `/administration/school`,
			});
		} catch (error) {
			console.log(error);
			this.$toast.error(error);
		}
	},
};

export const getters = {
	systemDataGetter: (state) => {
		return state.systemData;
	},
	tempDataGetter: (state) => {
		return state.temp;
	},
};

export const mutations = {
	setSystemData(state, payload) {
		state.systemData = payload;
	},
	setSystemVerificationData(state, payload) {
		state.systemVerificationData = payload;
	},
	setDataSubmission(state, payload) {
		state.dataSubmission = payload;
	},
	updateSystemData(state, payload) {
		state.temp = {
			...payload,
		};
	},
	setTempData(state, payload) {
		state.temp = payload;
	},
};

export const state = () => {
	return {
		systemData: null,
		systemVerificationData: null,
		dataSubmission: null,
		temp: null,
	};
};
