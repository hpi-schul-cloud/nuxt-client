import { useBulkConsent } from "./bulk-consent.composable";
import { initializeAxios } from "@/utils/api";
import { mockAxiosInstance, userResponseFactory } from "@@/tests/test-utils";
import { AxiosInstance } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { Mocked } from "vitest";

const TEST_PASSWORD = "test-fixture-password";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn(() => ({
			t: vi.fn((key: string) => key),
		})),
	};
});

describe("useBulkConsent", () => {
	let axiosMock: Mocked<AxiosInstance>;
	beforeEach(() => {
		setActivePinia(createPinia());
		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("findConsentUsers", () => {
		it("should fetch and update selectedStudentsData with students who do not have consent", async () => {
			const { findConsentUsers, selectedStudentsData } = useBulkConsent();
			const mockResponse = userResponseFactory.buildList(2, {
				consentStatus: "pending",
			});

			axiosMock.get.mockResolvedValueOnce({
				data: {
					data: mockResponse,
				},
			});

			await findConsentUsers({ $limit: 10, $skip: 0, $sort: {} });

			selectedStudentsData.value.forEach((student) => {
				expect(student.consentStatus).toBe("pending");
				expect(student.fullName).toBe(student.firstName + " " + student.lastName);
				expect(student.password).toBeDefined();
				expect(student.birthday).toBeDefined();
			});
		});

		it("should set selectedStudentsData to an empty array if no data is returned", async () => {
			const { findConsentUsers, selectedStudentsData } = useBulkConsent();

			axiosMock.get.mockResolvedValueOnce({
				data: undefined,
			});

			await findConsentUsers({ $limit: 10, $skip: 0, $sort: {} });

			expect(selectedStudentsData.value).toEqual([]);
		});
	});

	describe("register", () => {
		it("should update the consent status of selected students to 'ok'", async () => {
			const studentToBeRegistered = userResponseFactory.build();

			axiosMock.patch.mockResolvedValueOnce({ status: 200 });
			const { register, selectedIds, registeredStudents } = useBulkConsent();
			selectedIds.value = [studentToBeRegistered._id];

			axiosMock.patch.mockResolvedValueOnce({ status: 200 });

			await register([{ ...studentToBeRegistered, fullName: "John Doe", password: TEST_PASSWORD }]);

			expect(axiosMock.patch).toHaveBeenCalledWith(
				`/v1/users/admin/students/${studentToBeRegistered._id}`,
				expect.any(Object)
			);
			expect(registeredStudents.value).toEqual([studentToBeRegistered._id]);
		});
	});

	describe("updateStudent", () => {
		it("should update the birthday and password of the selected student", () => {
			const { updateStudent, selectedStudentsData } = useBulkConsent();
			const student = userResponseFactory.build({ birthday: new Date(1990, 0, 1).toISOString() });
			selectedStudentsData.value = [{ ...student, fullName: "John Doe", password: TEST_PASSWORD }];

			updateStudent({ id: student._id, birthDate: new Date(1995, 0, 1).toISOString(), pass: "updatedPass" });

			const updatedStudent = selectedStudentsData.value.find((st) => st._id === student._id);
			expect(updatedStudent?.birthday).toBe(new Date(1995, 0, 1).toISOString());
			expect(updatedStudent?.password).toBe("updatedPass");
		});
	});
});
