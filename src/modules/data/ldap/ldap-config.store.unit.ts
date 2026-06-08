import { unchangedPassword } from "../../../utils/ldapConstants";
import { emptyLdapConfig, LdapFormData, useLdapConfigStore, VerifiedData } from "./ldap-config.store";
import { initializeAxios } from "@/utils/api";
import { expectNotification } from "@@/tests/test-utils/factory/application-test.utils";
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
			uniqueMember: "member",
		},
		userPathAdditions: "ou=users",
		classPathAdditions: "ou=classes,ou=groups",
		roleType: "group",
	},
	url: "ldaps://ldap.hpi-schul-cloud.de",
	rootPath: "dc=schul-cloud,dc=org",
	searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
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

const verifiedData: VerifiedData = {
	ok: true,
	errors: [],
	users: {
		total: 8,
		admin: 2,
		teacher: 2,
		student: 4,
		sample: {
			email: "sample@example.com",
			firstName: "Sample",
			lastName: "User",
			ldapUID: "sampleUID",
			ldapUUID: "sampleUUID",
			roles: ["student"],
		},
	},
	classes: {
		total: 2,
		sample: {
			name: "Sample Class",
			ldapUUID: "sampleClassUUID",
		},
	},
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
			it("should call fetch ldap config", async () => {
				axiosMock.get.mockResolvedValueOnce({ data: serverMockData });

				await useLdapConfigStore().initializeStore("id");

				expect(axiosMock.get).toHaveBeenCalledWith("/v1/ldap-config/id");
			});

			it("should set original ldap config correctly", async () => {
				axiosMock.get.mockResolvedValueOnce({ data: serverMockData });

				const store = useLdapConfigStore();
				await store.initializeStore("id");

				expect(store.originalLdapConfig).toEqual(clientMockData);
			});
		});
		describe("when initialized without id", () => {
			it("should set original ldap config to empty config", async () => {
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

		it("should notify error if fetching ldap config fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.get.mockRejectedValueOnce(new Error("network"));

			const { initializeStore } = useLdapConfigStore();
			await initializeStore("id");

			expectNotification("error");
			consoleErrorSpy.mockRestore();
		});
	});

	describe("verifyNewLdapConfig", () => {
		it("should call ldap-config api", async () => {
			axiosMock.post.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.verifyNewLdapConfig(clientMockData);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/ldap-config?verifyOnly=true", {
				...serverMockData,
				searchUserPassword: unchangedPassword,
			});
		});
		it("should set verified data and form data on success", async () => {
			axiosMock.post.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.verifyNewLdapConfig(clientMockData);

			expect(store.verified).toEqual(verifiedData);
			expect(store.ldapFormData).toEqual(clientMockData);
		});
		it("should notify error if api request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.post.mockRejectedValueOnce(new Error("network"));

			const store = useLdapConfigStore();
			await store.verifyNewLdapConfig(clientMockData);

			expectNotification("error");
			consoleErrorSpy.mockRestore();
		});
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
