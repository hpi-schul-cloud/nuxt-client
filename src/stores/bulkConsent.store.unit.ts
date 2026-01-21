import { type Student, useBulkConsentStore } from "./bulkConsent.store";
import { $axios } from "@/utils/api";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the $axios module
vi.mock("@/utils/api", () => ({
	$axios: {
		get: vi.fn(),
		patch: vi.fn(),
	},
}));

// Mock the datetime plugin
vi.mock("@/plugins/datetime", () => ({
	inputDateFormat: vi.fn((date) => date),
}));

const consentDataMock = {
	_id: "60c220d9d03a60006502f137",
	firstName: "John",
	lastName: "Doe",
	fullName: "John Doe",
	email: "john.doe@example.com",
	birthday: "2017-06-15",
	password: "auto8178",
	consentStatus: "missing",
	classes: [],
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

const mockStudentsData = [
	{
		_id: "60c8689dfa9e25030445595c",
		firstName: "James",
		lastName: "Hetfield",
		email: "james@example.com",
		birthday: null,
		consentStatus: "missing",
		classes: [],
	},
	{
		_id: "60c8689dfa9e25030445595d",
		firstName: "Lars",
		lastName: "Ulrich",
		email: "lars@example.com",
		birthday: "31.05.2017",
		consentStatus: "missing",
		classes: [],
	},
];

describe("bulkConsent store", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		vi.clearAllMocks();
	});

	describe("actions", () => {
		describe("register", () => {
			it("should process array of students and set registered students", async () => {
				const store = useBulkConsentStore();
				const mockStudents = [consentDataMock];

				vi.mocked($axios.patch).mockResolvedValue({ data: {} });

				await store.register(mockStudents);

				expect($axios.patch).toHaveBeenCalledWith("/v1/users/admin/students/" + consentDataMock._id, {
					...consentDataMock,
					createAccount: true,
				});
				expect(store.registeredStudents).toEqual([consentDataMock._id]);
			});

			it("should handle errors during registration", async () => {
				const store = useBulkConsentStore();
				const mockStudents = [consentDataMock];
				const mockError = new Error("Registration failed");

				vi.mocked($axios.patch).mockRejectedValue(mockError);

				await store.register(mockStudents);

				expect(store.registerError.promiseErrors).toEqual([{ updateError: mockError }]);
			});

			it("should set mapError when payload is not an array", async () => {
				const store = useBulkConsentStore();

				await store.register(consentDataMock as unknown as Student[]);

				expect(store.registerError.mapError).toBe(true);
			});
		});

		describe("findConsentUsers", () => {
			it("should fetch and set students data", async () => {
				const store = useBulkConsentStore();
				store.selectedStudents = ["60c8689dfa9e25030445595c"];

				vi.mocked($axios.get).mockResolvedValue({
					data: {
						data: mockStudentsData,
					},
				});

				await store.findConsentUsers({ $sort: { firstName: 1 } });

				expect($axios.get).toHaveBeenCalledWith("/v3/users/admin/students", {
					params: {
						$sort: { firstName: 1 },
						users: ["60c8689dfa9e25030445595c"],
					},
				});

				expect(store.selectedStudentsData).toHaveLength(2);
				expect(store.selectedStudentsData[0]).toMatchObject({
					...mockStudentsData[0],
					fullName: "James Hetfield",
				});
			});

			it("should set empty array when no data is returned", async () => {
				const store = useBulkConsentStore();

				vi.mocked($axios.get).mockResolvedValue({ data: {} });

				await store.findConsentUsers({});

				expect(store.selectedStudentsData).toEqual([]);
			});

			it("should filter out students with 'ok' consent status", async () => {
				const store = useBulkConsentStore();
				const studentsWithOkStatus = [
					...mockStudentsData,
					{
						_id: "60c8689dfa9e25030445595e",
						firstName: "Kirk",
						lastName: "Hammett",
						email: "kirk@example.com",
						birthday: "18.11.1962",
						consentStatus: "ok",
						classes: [],
					},
				];

				vi.mocked($axios.get).mockResolvedValue({
					data: {
						data: studentsWithOkStatus,
					},
				});

				await store.findConsentUsers({});

				expect(store.selectedStudentsData).toHaveLength(2);
				expect(store.selectedStudentsData.every((student) => student.consentStatus !== "ok")).toBe(true);
			});
		});

		describe("updateStudent", () => {
			it("should update student birthday", () => {
				const store = useBulkConsentStore();
				store.selectedStudentsData = [consentDataMock];

				store.updateStudent({
					id: "60c220d9d03a60006502f137",
					birthDate: "2010-10-10",
				});

				expect(store.selectedStudentsData[0].birthday).toBe("2010-10-10");
			});

			it("should update student password", () => {
				const store = useBulkConsentStore();
				store.selectedStudentsData = [consentDataMock];

				store.updateStudent({
					id: "60c220d9d03a60006502f137",
					pass: "newpassword123",
				});

				expect(store.selectedStudentsData[0].password).toBe("newpassword123");
			});

			it("should not update if student id is not found", () => {
				const store = useBulkConsentStore();
				store.selectedStudentsData = [consentDataMock];
				const originalBirthday = consentDataMock.birthday;

				store.updateStudent({
					id: "nonexistent-id",
					birthDate: "2010-10-10",
				});

				expect(store.selectedStudentsData[0].birthday).toBe(originalBirthday);
			});
		});

		describe("setStudents", () => {
			it("should set students data", () => {
				const store = useBulkConsentStore();
				const mockData = [consentDataMock];

				store.setStudents(mockData);

				expect(store.selectedStudentsData).toEqual(mockData);
			});
		});

		describe("setSelectedStudents", () => {
			it("should set selected students", () => {
				const store = useBulkConsentStore();
				const mockIds = ["id1", "id2"];

				store.setSelectedStudents({ students: mockIds });

				expect(store.selectedStudents).toEqual(mockIds);
			});
		});

		describe("setRegisteredStudents", () => {
			it("should set registered students", () => {
				const store = useBulkConsentStore();
				const mockIds = ["id1", "id2"];

				store.setRegisteredStudents(mockIds);

				expect(store.registeredStudents).toEqual(mockIds);
			});
		});

		describe("setRegisterError", () => {
			it("should set register error", () => {
				const store = useBulkConsentStore();
				const mockError = { message: "Some error occurred" };

				store.setRegisterError(mockError);

				expect(store.registerError).toMatchObject(mockError);
			});
		});
	});

	describe("getters", () => {
		describe("getSelectedStudents", () => {
			it("should return selected students array", () => {
				const store = useBulkConsentStore();
				const userIds = ["5f2987e020834114b8efd6f1", "5f2987e020834114b8efd6f2"];
				store.selectedStudents = userIds;

				const retrievedState = store.getSelectedStudents();

				expect(retrievedState).toEqual(userIds);
			});
		});

		describe("getSelectedStudentsData", () => {
			it("should return selected students data array", () => {
				const store = useBulkConsentStore();
				store.selectedStudentsData = [consentDataMock];

				const retrievedState = store.getSelectedStudentsData();

				expect(retrievedState).toEqual([consentDataMock]);
			});
		});
	});
});
