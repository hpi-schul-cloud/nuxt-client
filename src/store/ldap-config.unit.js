import { actions, mutations } from "../../src/store/ldap-config";
import { unchangedPassword } from "../utils/ldapConstants";
import { initializeAxios } from "@/utils/api";

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

const clientMockData = {
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

const state = {
	data: {
		testDataKey: "dataTest",
	},
	verified: {
		testVerifiedKey: "verifiedTest",
	},
	submitted: {
		testSubmmittedKey: "submmitedTest",
	},
	temp: {
		testTempKey: "tempTest",
	},
};

describe("store/ldap-config", () => {
	describe("actions", () => {
		describe("getData", () => {
			it("it commits setData mutation", async () => {
				const requestData = {
					data: {
						...serverMockData,
					},
				};
				let receivedUrl;
				initializeAxios({
					get: (url) => {
						receivedUrl = url;
						return Promise.resolve(requestData);
					},
				});

				const spyCommit = vi.fn();
				await actions.getData({ commit: spyCommit }, "id");
				expect(receivedUrl).toBe("/v1/ldap-config/id");
				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[1][0]).toBe("setData");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(clientMockData);
			});
		});
		describe("verifyData", () => {
			it("it commits setTemp mutation", async () => {
				let receivedUrl;
				initializeAxios({
					post: (url) => {
						receivedUrl = url;
						return Promise.resolve({ data: clientMockData });
					},
				});

				const spyCommit = vi.fn();
				await actions.verifyData({ commit: spyCommit }, clientMockData);
				expect(receivedUrl).toBe("/v1/ldap-config?verifyOnly=true");
				expect(spyCommit.mock.calls).toHaveLength(4);
				expect(spyCommit.mock.calls[1][0]).toBe("setTemp");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(clientMockData);
				expect(spyCommit.mock.calls[2][1]).toStrictEqual(clientMockData);
			});
			it("it commits setVerified mutation", async () => {
				let receivedUrl;
				initializeAxios({
					post: (url) => {
						receivedUrl = url;
						return Promise.resolve({ data: clientMockData });
					},
				});

				const spyCommit = vi.fn();
				await actions.verifyData({ commit: spyCommit }, clientMockData);
				expect(receivedUrl).toBe("/v1/ldap-config?verifyOnly=true");
				expect(spyCommit.mock.calls).toHaveLength(4);
				expect(spyCommit.mock.calls[2][0]).toBe("setVerified");
				expect(spyCommit.mock.calls[2][1]).toStrictEqual(clientMockData);
			});
		});
		describe("verifyExisting", () => {
			it("it commits setTemp mutation", async () => {
				let receivedUrl;
				initializeAxios({
					patch: (url) => {
						receivedUrl = url;
						return Promise.resolve({ data: clientMockData });
					},
				});

				const spyCommit = vi.fn();
				await actions.verifyExisting({ commit: spyCommit }, { systemId: "systemId", systemData: clientMockData });
				expect(receivedUrl).toBe("/v1/ldap-config/systemId?verifyOnly=true");
				expect(spyCommit.mock.calls).toHaveLength(4);
				expect(spyCommit.mock.calls[1][0]).toBe("setTemp");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(clientMockData);
				expect(spyCommit.mock.calls[2][1]).toStrictEqual(clientMockData);
			});
			it("it commits setVerified mutation", async () => {
				let receivedUrl;
				initializeAxios({
					patch: (url) => {
						receivedUrl = url;
						return Promise.resolve({ data: clientMockData });
					},
				});

				const spyCommit = vi.fn();
				await actions.verifyExisting({ commit: spyCommit }, { systemId: "systemId", systemData: clientMockData });
				expect(receivedUrl).toBe("/v1/ldap-config/systemId?verifyOnly=true");
				expect(spyCommit.mock.calls).toHaveLength(4);
				expect(spyCommit.mock.calls[2][0]).toBe("setVerified");
				expect(spyCommit.mock.calls[2][1]).toStrictEqual(clientMockData);
			});
		});
		describe("submitData", () => {
			it("it commits setSubmitted mutation", async () => {
				let receivedUrl;
				initializeAxios({
					post: (url) => {
						receivedUrl = url;
						return Promise.resolve({ data: clientMockData });
					},
				});
				const spyCommit = vi.fn();
				await actions.submitData({ commit: spyCommit }, clientMockData);
				expect(receivedUrl).toBe("/v1/ldap-config?verifyOnly=false&activate=true");
				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[1][0]).toBe("setSubmitted");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(clientMockData);
			});
		});
		describe("patchData", () => {
			it("it commits setSubmitted mutation", async () => {
				let receivedUrl;
				initializeAxios({
					patch: (url) => {
						receivedUrl = url;
						return Promise.resolve({ data: clientMockData });
					},
				});
				const spyCommit = vi.fn();
				await actions.patchData({ commit: spyCommit }, { systemId: "systemId", systemData: clientMockData });
				expect(receivedUrl).toBe("/v1/ldap-config/systemId?verifyOnly=false&activate=true");
				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[1][0]).toBe("setSubmitted");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(clientMockData);
			});
		});
	});
	describe("mutations", () => {
		describe("setData", () => {
			it("sets data values correctly", async () => {
				mutations.setData(state, { testDataKey: "newDataValue" });
				expect(state.data).toStrictEqual({ testDataKey: "newDataValue" });
			});
		});
		describe("setVerified", () => {
			it("sets verified values correctly", async () => {
				mutations.setVerified(state, { testVerifiedKey: "newVerifiedValue" });
				expect(state.verified).toStrictEqual({
					testVerifiedKey: "newVerifiedValue",
				});
			});
		});
		describe("setSubmmited", () => {
			it("sets submitted values correctly", async () => {
				mutations.setSubmitted(state, {
					testSubmmittedKey: "newSubmittedValue",
				});
				expect(state.submitted).toStrictEqual({
					testSubmmittedKey: "newSubmittedValue",
				});
			});
		});
		describe("setTemp", () => {
			it("sets temp values correctly", async () => {
				mutations.setTemp(state, { testTempKey: "newTempValue" });
				expect(state.temp).toStrictEqual({
					testTempKey: "newTempValue",
				});
			});
		});
	});
});
