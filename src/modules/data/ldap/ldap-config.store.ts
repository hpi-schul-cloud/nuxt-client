import { unchangedPassword } from "../../../utils/ldapConstants";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { LdapError } from "@/utils/ldap-error-handling.utils";
import { notifyError } from "@data-app";
import { defineStore } from "pinia";
import { ref } from "vue";

type LdapFormData = {
	url: string;
	basisPath: string;
	searchUser: string;
	searchUserPassword: string | undefined;
	userPath: string;
	groupOption: string;
	firstName: string;
	familyName: string;
	email: string;
	uid: string;
	uuid: string;
	member: string;
	student: string;
	teacher: string;
	admin: string;
	user: string;
	classPath: string | undefined;
	nameAttribute: string | undefined;
	participantAttribute: string | undefined;
};

type VerifiedData = {
	ok: boolean;
	errors: LdapError[];
	users: {
		total: number;
		admin: number;
		teacher: number;
		student: number;
		sample: {
			roles: string[];
			lastName: string;
			firstName: string;
			email: string;
			ldapUID: string;
			ldapUUID: string;
		};
	};
	classes: {
		total: number;
		sample: Record<string, unknown>;
	};
};

const formatClientData = (data: LdapFormData) => ({
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
});

const emptyLdapConfig: Readonly<LdapFormData> = {
	url: "",
	basisPath: "",
	searchUser: "",
	searchUserPassword: "",
	userPath: "",
	groupOption: "group",
	firstName: "",
	familyName: "",
	email: "",
	uid: "",
	uuid: "",
	member: "memberOf",
	student: "",
	teacher: "",
	admin: "",
	user: "",
	classPath: "",
	nameAttribute: "",
	participantAttribute: "",
};

export const useLdapConfigStore = defineStore("ldapConfig", () => {
	const { t } = useI18nGlobal();

	const systemId = ref<string | undefined>(undefined);
	const originalLdapConfig = ref<LdapFormData>({ ...emptyLdapConfig });
	const ldapFormData = ref<LdapFormData>({ ...originalLdapConfig.value });
	const verified = ref<VerifiedData | undefined>(undefined);
	const submitted = ref<VerifiedData | undefined>(undefined);

	const { execute, status } = useSafeAxiosTask();

	const initializeStore = async (id?: string) => {
		if (systemId.value === id) return;

		systemId.value = id;
		if (id) {
			await getLdapConfig(id);
		} else {
			originalLdapConfig.value = { ...emptyLdapConfig };
		}
		resetLdapFormData();
		verified.value = undefined;
		submitted.value = undefined;
	};

	const getLdapConfig = async (id: string) => {
		const { result, success } = await execute(() => $axios.get(`/v1/ldap-config/${id}`), t("error.load"));

		if (success) {
			const { providerOptions, url, rootPath, searchUser } = result.data;
			const {
				userAttributeNameMapping,
				roleAttributeNameMapping,
				classAttributeNameMapping,
				userPathAdditions,
				classPathAdditions,
				roleType,
			} = providerOptions;

			originalLdapConfig.value = {
				url,
				basisPath: rootPath,
				searchUser,
				searchUserPassword: unchangedPassword,
				userPath: userPathAdditions,
				firstName: userAttributeNameMapping.givenName,
				familyName: userAttributeNameMapping.sn,
				email: userAttributeNameMapping.mail,
				uid: userAttributeNameMapping.uid,
				uuid: userAttributeNameMapping.uuid,
				groupOption: roleType,
				member: userAttributeNameMapping.role,
				student: roleAttributeNameMapping.roleStudent,
				teacher: roleAttributeNameMapping.roleTeacher,
				admin: roleAttributeNameMapping.roleAdmin,
				user: roleAttributeNameMapping.roleNoSc,
				classPath: classPathAdditions,
				nameAttribute: classAttributeNameMapping.description,
				participantAttribute: classAttributeNameMapping.uniqueMember,
			};
		}
	};

	const verifyNewLdapConfig = async (payload: LdapFormData) => {
		const { result, success, error } = await execute(() =>
			$axios.post("/v1/ldap-config?verifyOnly=true", formatClientData(payload))
		);
		if (success) {
			ldapFormData.value = payload;
			verified.value = result.data;
		} else {
			notifyError(String(error));
		}
	};

	const verifyExistingLdapConfig = async (systemId: string, payload: LdapFormData) => {
		const { result, success, error } = await execute(() =>
			$axios.patch(`/v1/ldap-config/${systemId}?verifyOnly=true`, formatClientData(payload))
		);
		if (success) {
			if (!payload.searchUserPassword) {
				payload.searchUserPassword = unchangedPassword;
			}
			ldapFormData.value = payload;
			verified.value = result.data;
		} else {
			notifyError(String(error));
		}
	};

	const createLdapConfig = async (payload: LdapFormData) => {
		const { result, success, error } = await execute(() =>
			$axios.post("/v1/ldap-config?verifyOnly=false&activate=true", formatClientData(payload))
		);
		if (success) {
			submitted.value = result.data;
		} else {
			notifyError(String(error));
		}
	};

	const updateLdapConfig = async (payload: LdapFormData, systemId: string) => {
		const { result, success, error } = await execute(() =>
			$axios.patch(`/v1/ldap-config/${systemId}?verifyOnly=false&activate=true`, formatClientData(payload))
		);
		if (success) {
			submitted.value = result.data;
		} else {
			notifyError(String(error));
		}
	};

	const resetLdapFormData = () => {
		ldapFormData.value = { ...originalLdapConfig.value };
	};

	return {
		systemId,
		originalLdapConfig,
		verified,
		submitted,
		ldapFormData,
		status,
		initializeStore,
		resetLdapFormData,
		verifyNewLdapConfig,
		verifyExistingLdapConfig,
		createLdapConfig,
		updateLdapConfig,
	};
});
