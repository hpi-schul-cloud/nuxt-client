import { actions, getters, mutations } from "./bulkConsent";

const consentDataMock = {
	_id: "60c220d9d03a60006502f137",
	birthday: "2017-06-15",
	password: "auto8178",
	consent: {
		userConsent: {
			form: "analog",
			privacyConsent: true,
			termsOfUseConsent: true,
		},
		parentConsents: [
			{
				form: "analog",
				privacyConsent: true,
				termsOfUseConsent: true,
			},
		],
	},
};

describe("store/bulkConsent", () => {
	describe("actions", () => {
		describe("register", () => {
			it("'register' action should commit mutation", async () => {
				const spyCommit = vi.fn();

				await actions.register({ commit: spyCommit }, consentDataMock);

				expect(spyCommit.mock.calls).toHaveLength(1);
			});

			it("'setStudents' action should commit mutation", async () => {
				const spyCommit = vi.fn();

				const userData = {
					_id: "60c8689dfa9e25030445595c",
					consent: { parentConsents: [] },
					firstName: "lars",
					lastName: "ulrich",
					email: "lars@de.de",
					birthday: "31.05.2017",
					createdAt: "2021-06-15T08:45:17.534Z",
					consentStatus: "missing",
					classes: [],
					fullName: "lars ulrich",
					password: "baum9516d",
				};

				await actions.setStudents({ commit: spyCommit }, userData);

				expect(spyCommit.mock.calls).toHaveLength(1);
			});

			it("'updateStudents' action should commit mutation", async () => {
				const spyCommit = vi.fn();

				const userData = {
					_id: "60c8689dfa9e25030445595c",
					birthday: "31.05.2017",
				};

				await actions.updateStudent({ commit: spyCommit }, userData);

				expect(spyCommit.mock.calls).toHaveLength(1);
			});
		});
	});
	describe("mutations", () => {
		describe("setConsentList", () => {
			it("sets selected students ids into state object", () => {
				const mockData = {
					students: ["5f2987e020834114b8efd6f1", "5f2987e020834114b8efd6f2"],
				};

				const payload = mockData;
				const state = { selectedStudents: [] };
				mutations.setSelectedStudents(state, payload);
				expect(state.selectedStudents).toStrictEqual(mockData.students);
			});
		});

		describe("setStudentData", () => {
			it("sets students data in selectedStudentsData state object", () => {
				const mockData = {
					_id: "60c8689dfa9e25030445595c",
					consent: {
						parentConsents: [],
					},
					firstName: "james",
					lastName: "hetfield",
					email: "mu@de.de",
					birthday: null,
					createdAt: "2021-06-15T08:45:17.534Z",
					consentStatus: "missing",
					classes: [],
					fullName: "james hetfield",
					password: "raupe9541",
				};

				const state = { selectedStudentsData: [] };
				mutations.setStudentsData(state, [mockData]);
				expect(state.selectedStudentsData[0]).toStrictEqual(mockData);
			});
		});

		describe("setRegisteredStudents", () => {
			it("sets registered students ids into registeredStudents state object", () => {
				const mockData = ["5f2987e020834114b8efd6f1", "5f2987e020834114b8efd6f2"];

				const payload = mockData;
				const state = { registeredStudents: [] };
				mutations.setRegisteredStudents(state, payload);
				expect(state.registeredStudents).toStrictEqual(mockData);
			});
		});

		describe("registerError", () => {
			it("sets error message into registerError state object", () => {
				const mockError = {
					message: "Some errors occured",
				};

				const payload = mockError;
				const state = { registerError: {} };
				mutations.setRegisterError(state, payload);
				expect(state.registerError).toStrictEqual(mockError);
			});
		});

		describe("updateStudentData", () => {
			it("updates students birthday in selectedStudentsData state object", () => {
				const birthdayData = {
					id: "60c220d9d03a60006502f137",
					birthDate: "2010-10-10",
				};

				const state = { selectedStudentsData: [consentDataMock] };
				mutations.updateStudentData(state, birthdayData);

				expect(state.selectedStudentsData[0].birthday).toStrictEqual(birthdayData.birthDate);
			});

			it("updates students password in selectedStudentsData state object", () => {
				const passData = {
					id: "60c220d9d03a60006502f137",
					pass: "abc",
				};

				const state = { selectedStudentsData: [consentDataMock] };

				mutations.updateStudentData(state, passData);

				expect(state.selectedStudentsData[0].password).toStrictEqual(passData.pass);
			});
		});
	});
	describe("getters", () => {
		describe("getSelectedStudents", () => {
			it("gets selectedStudents array from the state", () => {
				const userIds = ["5f2987e020834114b8efd6f1", "5f2987e020834114b8efd6f2"];
				const state = { selectedStudents: userIds };
				const retrievedState = getters.getSelectedStudents(state);
				expect(state.selectedStudents).toStrictEqual(retrievedState);
			});
		});
		describe("selectedStudentsData", () => {
			it("gets selectedStudentsData array from the state", () => {
				const state = { selectedStudentsData: consentDataMock };
				const retrievedState = getters.getSelectedStudentsData(state);
				expect(state.selectedStudentsData).toStrictEqual(retrievedState);
			});
		});
	});
});
