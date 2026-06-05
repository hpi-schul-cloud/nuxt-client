import { unchangedPassword } from "../../../utils/ldapConstants";
import { LdapFormData, useLdapConfigStore, VerifiedData } from "./ldap-config.store";
import { initializeAxios } from "@/utils/api";
import { mockAxiosInstance } from "@@/tests/test-utils/mockAxiosInstance";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

const serverMockData = {
	providerOptions: {
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
		userPathAdditions: "ou=users",
		classPathAdditions: "ou=classes,ou=groups",
		roleType: "group",
		schoolName: "Paul-Gerhardt-Gymnasium",
	},
	url: "ldaps://ldap.hpi-schul-cloud.de",
	rootPath: "dc=schul-cloud,dc=org",
	searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
	provider: "general",
	active: true,
};

const clientMockData: LdapFormData = {
	url: "ldaps://ldap.hpi-schul-cloud.de",
	basisPath: "dc=schul-cloud,dc=org",
	searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
	searchUserPassword: unchangedPassword,
	userPath: "ou=users",
	firstName: "givenName",
	familyName: "sn",
	email: "mail",
	uid: "uid",
	uuid: "uidNumber",
	groupOption: "group",
	member: "description",
	student: "cn=student,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	teacher: "cn=teacher,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	admin: "cn=admin,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	user: "no-sc",
	classPath: "ou=classes,ou=groups",
	nameAttribute: "description",
	participantAttribute: "member",
};

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

describe("ldap-config.store", () => {
	let axiosMock: Mocked<AxiosInstance>;
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});
	describe("initializeStore", () => {
		describe("when initialized with id", () => {
			it("should not fetch ldap config if systemId is the same as id", async () => {
				const store = useLdapConfigStore();
				store.systemId = "id";

				await store.initializeStore("id");

				expect(axiosMock.get).not.toHaveBeenCalledWith("/v1/ldap-config/id");
			});
			it("call fetch ldap config", async () => {
				axiosMock.get.mockResolvedValueOnce({ data: serverMockData });

				await useLdapConfigStore().initializeStore("id");

				expect(axiosMock.get).toHaveBeenCalledWith("/v1/ldap-config/id");
			});

			it("should set orignal ldap config correctly", async () => {
				axiosMock.get.mockResolvedValueOnce({ data: serverMockData });

				const store = useLdapConfigStore();
				await store.initializeStore("id");

				expect(store.originalLdapConfig).toEqual(clientMockData);
			});
		});
		describe("when initialized without id", () => {
			it("should set orignal ldap config to empty config", async () => {
				const store = useLdapConfigStore();
				store.systemId = "someId";

				store.originalLdapConfig = { ...clientMockData };
				await store.initializeStore();

				expect(store.originalLdapConfig).toEqual(emptyLdapConfig);
			});
		});

		it("should reset store data", async () => {
			const verifiedData: VerifiedData = {
				ok: true,
				errors: [],
				users: {
					total: 0,
					admin: 0,
					teacher: 0,
					student: 0,
					sample: { roles: [], lastName: "", firstName: "", email: "", ldapUID: "", ldapUUID: "" },
				},
				classes: { total: 0, sample: {} },
			};

			const store = useLdapConfigStore();
			store.systemId = "someId";
			store.verified = { ...verifiedData };
			store.submitted = { ...verifiedData };
			store.ldapFormData = { ...clientMockData };

			await store.initializeStore();

			expect(store.verified).toBeUndefined();
			expect(store.submitted).toBeUndefined();
			expect(store.ldapFormData).toEqual(store.originalLdapConfig);
		});

		it.todo("should notify error if fetching ldap config fails");
	});

	describe("verifyNewLdapConfig", () => {
		it.todo("should call ldap-config api");
		it.todo("should set verified data and form data on success");
		it.todo("should notify error if api request fails");
	});
	describe("verifyExistingLdapConfig", () => {
		it.todo("should call ldap-config api");
		it.todo("should set verified and form data on success");
		it.todo("should notify error if api request fails");
	});
	describe("createLdapConfig", () => {
		it.todo("should call ldap-config api");
		it.todo("should set submitted data on success");
		it.todo("should notify error if api request fails");
	});
	describe("updateLdapConfig", () => {
		it.todo("should call ldap-config api");
		it.todo("should set submitted data on success");
		it.todo("should notify error if api request fails");
	});
});
