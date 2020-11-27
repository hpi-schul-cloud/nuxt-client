const formatServerData = (data) => {
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

const formatClientData = (data) => {
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
};

export const actions = {
	async getData({ commit }, id) {
		try {
			const { data } = await this.$axios.get(`/ldap-config/${id}`);
			commit("setData", formatServerData(data));
		} catch (error) {
			console.log(error);
			this.$toast.error(error);
		}
	},
	async verifyData({ commit }, payload) {
		try {
			const data = formatClientData(payload, "verify");
			const verification = await this.$axios.$post(
				"/ldap-config?verifyOnly=true",
				data
			);
			commit("setTemp", payload);
			commit("setVerified", verification);
		} catch (error) {
			console.log(error);
			this.$toast.error(error);
		}
	},
	async submitData({ commit }, payload) {
		try {
			const data = formatClientData(payload, "submit");
			const submission = await this.$axios.$post(
				"/ldap-config?verifyOnly=false",
				data
			);
			commit("setSubmitted", submission);
		} catch (error) {
			console.log(error);
			this.$toast.error(error);
		}
	},
};

export const getters = {
	dataGetter: (state) => {
		return state.data;
	},
	tempGetter: (state) => {
		return state.temp;
	},
};

export const mutations = {
	setData(state, payload) {
		state.data = payload;
	},
	setVerified(state, payload) {
		state.verified = payload;
	},
	setSubmitted(state, payload) {
		state.submitted = payload;
	},
	updateData(state, payload) {
		state.temp = {
			...payload,
		};
	},
	setTemp(state, payload) {
		state.temp = payload;
	},
	clearData(state) {
		state.temp = state.data;
		Object.keys(state.temp).forEach((key) => {
			if (key !== "groupOption") state.temp[key] = "";
		});
	},
};

export const state = () => {
	return {
		data: {},
		verified: {},
		submitted: {},
		temp: {},
	};
};
