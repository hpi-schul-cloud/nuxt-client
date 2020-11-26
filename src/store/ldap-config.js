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
			commit("setTempData", payload);
			commit("setSystemVerificationData", verification);
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
		systemVerificationData: {},
		dataSubmission: {},
		temp: {},
	};
};
