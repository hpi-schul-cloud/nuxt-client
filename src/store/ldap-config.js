import { unchangedPassword } from "../utils/ldapConstants";

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
		searchUserPassword: unchangedPassword,
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
			commit("setStatus", "pending");
			const { data } = await this.$axios.get(`/ldap-config/${id}`);
			commit("setData", formatServerData(data));
			commit("setStatus", "completed");
		} catch (error) {
			this.$toast.error(error);
		}
	},
	async verifyData({ commit }, payload) {
		try {
			commit("setStatus", "pending");
			const data = formatClientData(payload);
			const verification = await this.$axios.$post(
				"/ldap-config?verifyOnly=true",
				data
			);
			commit("setTemp", payload);
			commit("setVerified", verification);
			commit("setStatus", "completed");
		} catch (error) {
			this.$toast.error(error);
		}
	},
	async verifyExisting({ commit }, { systemId, systemData }) {
		try {
			commit("setStatus", "pending");
			const data = formatClientData(systemData);
			const verification = await this.$axios.$patch(
				`/ldap-config/${systemId}?verifyOnly=true`,
				data
			);
			if (!systemData.searchUserPassword) {
				systemData.searchUserPassword = unchangedPassword;
			}
			commit("setTemp", systemData);
			commit("setVerified", verification);
			commit("setStatus", "completed");
		} catch (error) {
			this.$toast.error(error);
		}
	},
	async submitData({ commit }, payload) {
		try {
			commit("setStatus", "pending");
			const data = formatClientData(payload);
			const submission = await this.$axios.$post(
				"/ldap-config?verifyOnly=false&activate=true",
				data
			);
			commit("setSubmitted", submission);
			commit("setStatus", "completed");
		} catch (error) {
			this.$toast.error(error);
		}
	},
	async patchData({ commit }, { systemData, systemId }) {
		try {
			commit("setStatus", "pending");
			const data = formatClientData(systemData);
			const submission = await this.$axios.$patch(
				`/ldap-config/${systemId}?verifyOnly=false&activate=true`,
				data
			);
			commit("setSubmitted", submission);
			commit("setStatus", "completed");
		} catch (error) {
			this.$toast.error(error);
		}
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
	setTemp(state, payload) {
		state.temp = payload;
	},
	updateData(state, payload) {
		state.temp = {
			...payload,
		};
	},
	clearData(state) {
		state.temp = state.data;
		Object.keys(state.temp).forEach((key) => {
			if (key !== "groupOption") state.temp[key] = "";
		});
	},
	setStatus(state, status) {
		state.status = status;
	},
};

export const getters = {
	getData: (state) => {
		return state.data;
	},
	getVerified: (state) => {
		return state.verified;
	},
	getSubmitted: (state) => {
		return state.submitted;
	},
	getTemp: (state) => {
		return state.temp;
	},
	getStatus: (state) => {
		return state.status;
	},
};

export const state = () => {
	return {
		data: {},
		verified: {},
		submitted: {},
		temp: {},
		status: null,
	};
};
