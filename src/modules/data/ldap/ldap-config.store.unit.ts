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

const ldapFormDataMock: LdapFormData = {
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

				expect(store.originalLdapConfig).toEqual(ldapFormDataMock);
			});
		});
		describe("when initialized without id", () => {
			it("should set original ldap config to empty config", async () => {
				const store = useLdapConfigStore();
				store.systemId = "someId";

				store.originalLdapConfig = { ...ldapFormDataMock };
				await store.initializeStore();

				expect(store.originalLdapConfig).toEqual(emptyLdapConfig);
			});
		});

		it("should reset store data", async () => {
			const store = useLdapConfigStore();
			store.systemId = "someId";
			store.verified = { ...verifiedData };
			store.submitted = { ...verifiedData };
			store.ldapFormData = { ...ldapFormDataMock };

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
			await store.verifyNewLdapConfig(ldapFormDataMock);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/ldap-config?verifyOnly=true", {
				...serverMockData,
				searchUserPassword: unchangedPassword,
			});
		});
		it("should set verified data and form data on success", async () => {
			axiosMock.post.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.verifyNewLdapConfig(ldapFormDataMock);

			expect(store.verified).toEqual(verifiedData);
			expect(store.ldapFormData).toEqual(ldapFormDataMock);
		});
		it("should notify error if api request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.post.mockRejectedValueOnce(new Error("network"));

			const store = useLdapConfigStore();
			await store.verifyNewLdapConfig(ldapFormDataMock);

			expectNotification("error");
			consoleErrorSpy.mockRestore();
		});
	});
	describe("verifyExistingLdapConfig", () => {
		it("should call ldap-config api", async () => {
			const id = "id";
			axiosMock.patch.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.verifyExistingLdapConfig(id, ldapFormDataMock);

			expect(axiosMock.patch).toHaveBeenCalledWith(`/v1/ldap-config/${id}?verifyOnly=true`, {
				...serverMockData,
				searchUserPassword: unchangedPassword,
			});
		});
		it("should set verified and form data on success", async () => {
			const id = "id";
			axiosMock.patch.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.verifyExistingLdapConfig(id, ldapFormDataMock);

			expect(store.verified).toEqual(verifiedData);
			expect(store.ldapFormData).toEqual(ldapFormDataMock);
		});

		it("should set searchUserPassword to unchangedPassword if password is not provided in payload", async () => {
			const id = "id";
			const payloadWithoutPassword = { ...ldapFormDataMock, searchUserPassword: undefined };
			axiosMock.patch.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.verifyExistingLdapConfig(id, payloadWithoutPassword);

			expect(store.ldapFormData.searchUserPassword).toBe(unchangedPassword);
		});

		it("should notify error if api request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.patch.mockRejectedValueOnce(new Error("network"));

			const store = useLdapConfigStore();
			await store.verifyExistingLdapConfig("id", ldapFormDataMock);

			expectNotification("error");
			consoleErrorSpy.mockRestore();
		});
	});
	describe("createLdapConfig", () => {
		it("should call ldap-config api", async () => {
			axiosMock.post.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.createLdapConfig(ldapFormDataMock);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/ldap-config?verifyOnly=false&activate=true", {
				...serverMockData,
				searchUserPassword: unchangedPassword,
			});
		});

		it("should set submitted data on success", async () => {
			axiosMock.post.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.createLdapConfig(ldapFormDataMock);

			expect(store.submitted).toEqual(verifiedData);
		});

		it("should notify error if api request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.post.mockRejectedValueOnce(new Error("network"));

			const store = useLdapConfigStore();
			await store.createLdapConfig(ldapFormDataMock);

			expectNotification("error");
			consoleErrorSpy.mockRestore();
		});
	});
	describe("updateLdapConfig", () => {
		it("should call ldap-config api", async () => {
			const id = "id";
			axiosMock.patch.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.updateLdapConfig(ldapFormDataMock, id);

			expect(axiosMock.patch).toHaveBeenCalledWith(`/v1/ldap-config/${id}?verifyOnly=false&activate=true`, {
				...serverMockData,
				searchUserPassword: unchangedPassword,
			});
		});

		it("should set submitted data on success", async () => {
			const id = "id";
			axiosMock.patch.mockResolvedValueOnce({ data: verifiedData });

			const store = useLdapConfigStore();
			await store.updateLdapConfig(ldapFormDataMock, id);

			expect(store.submitted).toEqual(verifiedData);
		});

		it("should notify error if api request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.patch.mockRejectedValueOnce(new Error("network"));

			const store = useLdapConfigStore();
			await store.updateLdapConfig(ldapFormDataMock, "id");

			expectNotification("error");
			consoleErrorSpy.mockRestore();
		});
	});

	describe("resetLdapFormData", () => {
		it("should reset ldap form data to original ldap config", () => {
			const store = useLdapConfigStore();
			store.ldapFormData = ldapFormDataMock;

			store.resetLdapFormData();

			expect(store.ldapFormData).toEqual(store.originalLdapConfig);
		});
	});
});
