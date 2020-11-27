/* eslint-disable jest/no-focused-tests */
import { getters, mutations, actions } from "../../src/store/ldap-config";

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
	url: "ldaps://ldap.schul-cloud.org",
	rootPath: "dc=schul-cloud,dc=org",
	searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
	provider: "general",
	active: true,
};

const clientMockData = {
	url: "ldaps://ldap.schul-cloud.org",
	basisPath: "dc=schul-cloud,dc=org",
	searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
	searchUserPassword: undefined,
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
	describe("getters", () => {
		describe("dataGetter", () => {
			it("it returns data state", () => {
				expect(getters.dataGetter(state)).toStrictEqual({
					testDataKey: "dataTest",
				});
			});
		});
		describe("tempGetter", () => {
			it("it returns data state", () => {
				expect(getters.tempGetter(state)).toStrictEqual({
					testTempKey: "tempTest",
				});
			});
		});
	});
	describe("actions", () => {
		describe.only("getData", () => {
			it("it commits setData mutation", async () => {
				const requestData = {
					data: {
						...serverMockData,
					},
				};
				let receivedUrl;
				actions.$axios = {
					get: (url) => {
						receivedUrl = url;
						return Promise.resolve(requestData);
					},
				};
				const spyCommit = jest.fn();
				await actions.getData({ commit: spyCommit }, "id");
				expect(receivedUrl).toBe("/ldap-config/id");
				expect(spyCommit.mock.calls).toHaveLength(1);
				expect(spyCommit.mock.calls[0][0]).toBe("setData");
				expect(spyCommit.mock.calls[0][1]).toStrictEqual(clientMockData);
			});
		});
		describe.only("verifyData", () => {
			it("it commits setTemp mutation", async () => {
				let receivedUrl;
				actions.$axios = {
					$post: (url) => {
						receivedUrl = url;
						return Promise.resolve(clientMockData);
					},
				};
				const spyCommit = jest.fn();
				await actions.verifyData({ commit: spyCommit }, clientMockData);
				expect(receivedUrl).toBe("/ldap-config?verifyOnly=true");
				expect(spyCommit.mock.calls).toHaveLength(2);
				expect(spyCommit.mock.calls[0][0]).toBe("setTemp");
				expect(spyCommit.mock.calls[0][1]).toStrictEqual(clientMockData);
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(clientMockData);
			});
			it("it commits setVerified mutation", async () => {
				let receivedUrl;
				actions.$axios = {
					$post: (url) => {
						receivedUrl = url;
						return Promise.resolve(clientMockData);
					},
				};
				const spyCommit = jest.fn();
				await actions.verifyData({ commit: spyCommit }, clientMockData);
				expect(receivedUrl).toBe("/ldap-config?verifyOnly=true");
				expect(spyCommit.mock.calls).toHaveLength(2);
				expect(spyCommit.mock.calls[1][0]).toBe("setVerified");
				expect(spyCommit.mock.calls[1][1]).toStrictEqual(clientMockData);
			});
		});
		describe.only("submitData", () => {
			it("it commits setSubmitted mutation", async () => {
				let receivedUrl;
				actions.$axios = {
					$post: (url) => {
						receivedUrl = url;
						return Promise.resolve(clientMockData);
					},
				};
				const spyCommit = jest.fn();
				await actions.submitData({ commit: spyCommit }, clientMockData);
				expect(receivedUrl).toBe("/ldap-config?verifyOnly=false");
				expect(spyCommit.mock.calls).toHaveLength(1);
				expect(spyCommit.mock.calls[0][0]).toBe("setSubmitted");
				expect(spyCommit.mock.calls[0][1]).toStrictEqual(clientMockData);
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
		describe("updateData", () => {
			it("updates temp values correctly", async () => {
				mutations.updateData(state, { testTempKey: "updatedTempValue" });
				expect(state.temp).toStrictEqual({
					testTempKey: "updatedTempValue",
				});
			});
		});
		describe("clearData", () => {
			it("clears temp values correctly", async () => {
				const clearDataState = {
					...state,
					temp: { testTempKey: "tempValue" },
					data: { testDataKey: "dataValue" },
				};
				expect(clearDataState.temp).toStrictEqual({
					testTempKey: "tempValue",
				});
				expect(clearDataState.data).toStrictEqual({
					testDataKey: "dataValue",
				});

				mutations.clearData(clearDataState);
				expect(clearDataState.temp).toStrictEqual({
					testDataKey: "",
				});
			});
		});
	});
});
