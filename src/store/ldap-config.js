const formatData = (data = {}, action) => {
	if (action === "verify" || action === "submit") {
		return {
			url: data.url,
			rootPath: data.basisPath,
			searchUser: data.searchUser,
			searchUserPassword: data.searchUserPassword,
			providerOptions: {
				userPathAdditions: data.userPath,
				classPathAdditions: data.classPath,
				roleType: data.groupOption,
				userAttributeNameMapping: {
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

const errorHandler = (error) => {
	const errorMessages = [];

	error.forEach((err) => {
		switch (err.type) {
			case "WRONG_CREDENTIALS":
				errorMessages.push(
					this.$t("pages.administration.ldap.errors.credentials")
				);
				break;
			case "CONNECTION_ERROR":
				errorMessages.push(err.message);
				break;
			case "WRONG_SEARCH_PATH":
				errorMessages.push(this.$t("pages.administration.ldap.errors.path"));
				break;
			case "INVALID_CONFIGURATION_OBJECT":
				errorMessages.push(
					this.$t("pages.administration.ldap.errors.configuration")
				);
				break;
		}
	});

	return errorMessages;
};

export const actions = {
	async getData({ commit }, id) {
		try {
			const { data } = await this.$axios.get(`/ldap-config/${id}`);
			commit("setSystemData", formatData(data));
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
				errorHandler(verification.errors).forEach((message) => {
					this.$toast.error(message);
				});
				return;
			}
			this.$toast.success(this.$t("pages.administration.ldap.index.verified"));
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
			const data = formatData(payload, "submit");
			const submission = await this.$axios.$post(
				"/ldap-config?verifyOnly=false",
				data
			);
			if (!submission.ok) {
				errorHandler(submission.errors).forEach((message) => {
					this.$toast.error(message);
				});
				this.$router.push({
					path: `/administration/ldap/config`,
				});
				return;
			}
			commit("setDataSubmission", submission);
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
	clearData(state) {
		state.temp = state.systemData;
		Object.keys(state.temp).forEach((key) => {
			if (key !== "groupOption") state.temp[key] = "";
		});
	},
};

export const state = () => {
	return {
		systemData: {},
		systemVerificationData: null,
		dataSubmission: {},
		temp: {},
	};
};
