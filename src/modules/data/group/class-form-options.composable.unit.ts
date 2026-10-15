import { useClassFormOptions } from "./class-form-options.composable";
import {
	createTestAppStoreWithRole,
	createTestSchoolStore,
	mockComposable,
	userResponseFactory,
} from "@@/tests/test-utils";
import { RoleName, SchoolYearResponse } from "@api-server";
import { useUsersStore } from "@data-users";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@data-users");

const useUsersMock = vi.mocked(useUsersStore);

describe("useClassFormOptions", () => {
	let useUsersMockHandler: Mocked<ReturnType<typeof useUsersStore>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStoreWithRole(RoleName.TEACHER);
		createTestSchoolStore({
			schoolDetails: {
				years: {
					activeYear: { id: "year1", name: "2023/2024" } as unknown as SchoolYearResponse,
					schoolYears: [
						{ id: "year1", name: "2023/2024" },
						{ id: "year2", name: "2024/2025" },
					] as unknown as SchoolYearResponse[],
				},
			},
		});

		useUsersMockHandler = mockComposable(useUsersStore, {
			userList: [
				userResponseFactory.build({
					_id: "teacher1",
					firstName: "Max",
					lastName: "Mustermann",
					email: "max@example.com",
				}),
				userResponseFactory.build({ _id: "teacher2", firstName: "", lastName: "", email: "anna@example.com" }),
			],
			fetchUsers: vi.fn().mockResolvedValue({}),
			init: vi.fn(),
		});
		useUsersMock.mockReturnValue(useUsersMockHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("initializes teacher store and returns formatted school years and teachers", () => {
		const { schoolYearOptions, activeYearId, teacherOptions, defaultTeacherIds } = useClassFormOptions();

		expect(useUsersMockHandler.init).toHaveBeenCalledWith(RoleName.TEACHER);
		expect(activeYearId.value).toBe("year1");
		expect(defaultTeacherIds.value.length).toBeGreaterThan(0);
		expect(schoolYearOptions.value).toEqual([
			{ title: "2023/2024", value: "year1" },
			{ title: "2024/2025", value: "year2" },
		]);
		expect(teacherOptions.value).toEqual([
			{ title: "Max Mustermann", value: "teacher1" },
			{ title: "anna@example.com", value: "teacher2" },
		]);
	});

	it("calls fetchUsers when loadTeachers is called", async () => {
		const { loadTeachers } = useClassFormOptions();
		await loadTeachers();

		expect(useUsersMockHandler.fetchUsers).toHaveBeenCalledWith({
			$limit: 200,
			$skip: 0,
			$sort: { lastName: 1 },
		});
	});

	it("calls init and fetchUsers when loadStudents is called", async () => {
		const { loadStudents, studentOptions } = useClassFormOptions();
		useUsersMockHandler.userList = [
			userResponseFactory.build({ _id: "student1", firstName: "Tim", lastName: "Tester", email: "tim@example.com" }),
		];
		await loadStudents();

		expect(useUsersMockHandler.init).toHaveBeenCalledWith(RoleName.STUDENT);
		expect(useUsersMockHandler.fetchUsers).toHaveBeenCalledWith({
			$limit: 1000,
			$skip: 0,
			$sort: { lastName: 1 },
		});
		expect(studentOptions.value).toEqual([{ title: "Tim Tester", value: "student1" }]);
	});
});
