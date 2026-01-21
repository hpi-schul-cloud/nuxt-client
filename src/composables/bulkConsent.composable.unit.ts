import { type Student, useBulkConsent } from "./bulkConsent.composable";
import { $axios } from "@/utils/api";
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

const consentDataMock: Student = {
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

describe("bulkConsent composable", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("actions", () => {
		describe("register", () => {
			it("should process array of students and set registered students", async () => {
				const { register, registeredStudents } = useBulkConsent();
				const mockStudents = [consentDataMock];

				vi.mocked($axios.patch).mockResolvedValue({ data: {} });

				await register(mockStudents);

				expect($axios.patch).toHaveBeenCalledWith("/v1/users/admin/students/" + consentDataMock._id, {
					...consentDataMock,
					createAccount: true,
				});
				expect(registeredStudents.value).toEqual([consentDataMock._id]);
			});

			it("should handle errors during registration", async () => {
				const { register, registerError } = useBulkConsent();
				const mockStudents = [consentDataMock];
				const mockError = new Error("Registration failed");

				vi.mocked($axios.patch).mockRejectedValue(mockError);

				await register(mockStudents);

				expect(registerError.value.promiseErrors).toEqual([{ updateError: mockError }]);
			});

			it("should set mapError when payload is not an array", async () => {
				const { register, registerError } = useBulkConsent();

				await register(consentDataMock as unknown as Student[]);

				expect(registerError.value.mapError).toBe(true);
			});
		});

		describe("findConsentUsers", () => {
			it("should fetch and set students data", async () => {
				const { findConsentUsers, selectedStudents, selectedStudentsData } = useBulkConsent();
				selectedStudents.value = ["60c8689dfa9e25030445595c"];

				vi.mocked($axios.get).mockResolvedValue({
					data: {
						data: mockStudentsData,
					},
				});

				await findConsentUsers({ $sort: { firstName: 1 } });

				expect($axios.get).toHaveBeenCalledWith("/v3/users/admin/students", {
					params: {
						$sort: { firstName: 1 },
						users: ["60c8689dfa9e25030445595c"],
					},
				});

				expect(selectedStudentsData.value).toHaveLength(2);
				expect(selectedStudentsData.value[0]).toMatchObject({
					...mockStudentsData[0],
					fullName: "James Hetfield",
				});
			});

			it("should set empty array when no data is returned", async () => {
				const { findConsentUsers, selectedStudentsData } = useBulkConsent();

				vi.mocked($axios.get).mockResolvedValue({ data: {} });

				await findConsentUsers({});

				expect(selectedStudentsData.value).toEqual([]);
			});

			it("should filter out students with 'ok' consent status", async () => {
				const { findConsentUsers, selectedStudentsData } = useBulkConsent();
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

				await findConsentUsers({});

				expect(selectedStudentsData.value).toHaveLength(2);
				expect(selectedStudentsData.value.every((student) => student.consentStatus !== "ok")).toBe(true);
			});
		});

		describe("updateStudent", () => {
			it("should update student birthday", () => {
				const { updateStudent, selectedStudentsData } = useBulkConsent();
				selectedStudentsData.value = [consentDataMock];

				updateStudent({
					id: "60c220d9d03a60006502f137",
					birthDate: "2010-10-10",
				});

				expect(selectedStudentsData.value[0].birthday).toBe("2010-10-10");
			});

			it("should update student password", () => {
				const { updateStudent, selectedStudentsData } = useBulkConsent();
				selectedStudentsData.value = [consentDataMock];

				updateStudent({
					id: "60c220d9d03a60006502f137",
					pass: "newpassword123",
				});

				expect(selectedStudentsData.value[0].password).toBe("newpassword123");
			});

			it("should not update if student id is not found", () => {
				const { updateStudent, selectedStudentsData } = useBulkConsent();
				selectedStudentsData.value = [consentDataMock];
				const originalBirthday = consentDataMock.birthday;

				updateStudent({
					id: "nonexistent-id",
					birthDate: "2010-10-10",
				});

				expect(selectedStudentsData.value[0].birthday).toBe(originalBirthday);
			});
		});

		describe("setStudents", () => {
			it("should set students data", () => {
				const { setStudents, selectedStudentsData } = useBulkConsent();
				const mockData = [consentDataMock];

				setStudents(mockData);

				expect(selectedStudentsData.value).toEqual(mockData);
			});
		});

		describe("setSelectedStudents", () => {
			it("should set selected students", () => {
				const { setSelectedStudents, selectedStudents } = useBulkConsent();
				const mockIds = ["id1", "id2"];

				setSelectedStudents({ students: mockIds });

				expect(selectedStudents.value).toEqual(mockIds);
			});
		});

		describe("setRegisteredStudents", () => {
			it("should set registered students", () => {
				const { setRegisteredStudents, registeredStudents } = useBulkConsent();
				const mockIds = ["id1", "id2"];

				setRegisteredStudents(mockIds);

				expect(registeredStudents.value).toEqual(mockIds);
			});
		});

		describe("setRegisterError", () => {
			it("should set register error", () => {
				const { setRegisterError, registerError } = useBulkConsent();
				const mockError = { message: "Some error occurred" };

				setRegisterError(mockError);

				expect(registerError.value).toMatchObject(mockError);
			});
		});

		describe("reset", () => {
			it("should reset all state to initial values", () => {
				const { reset, selectedStudents, registeredStudents, selectedStudentsData, registerError } = useBulkConsent();

				// Set some values
				selectedStudents.value = ["id1", "id2"];
				registeredStudents.value = ["id1"];
				selectedStudentsData.value = [consentDataMock];
				registerError.value = { error: "test error" };

				// Reset
				reset();

				// Check all values are reset
				expect(selectedStudents.value).toEqual([]);
				expect(registeredStudents.value).toEqual([]);
				expect(selectedStudentsData.value).toEqual([]);
				expect(registerError.value).toEqual({});
			});
		});
	});
});
