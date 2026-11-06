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
			pagination: { limit: 1000, skip: 0, total: 2 },
			fetchUsers: vi.fn().mockResolvedValue({}),
			resetState: vi.fn(),
			init: vi.fn(),
		});
		useUsersMock.mockReturnValue(useUsersMockHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("initializes teacher store and returns formatted school years and teachers", async () => {
		const { schoolYearOptions, activeYearId, teacherOptions, defaultTeacherIds, loadTeachers } = useClassFormOptions();
		await loadTeachers();

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

		expect(useUsersMockHandler.init).toHaveBeenCalledWith(RoleName.TEACHER);
		expect(useUsersMockHandler.fetchUsers).toHaveBeenCalledWith({
			$limit: 1000,
			$skip: 0,
			$sort: { lastName: 1 },
		});
	});

	it("calls init and fetchUsers when loadStudents is called", async () => {
		const { loadStudents, studentOptions } = useClassFormOptions();
		useUsersMockHandler.userList = [
			userResponseFactory.build({ _id: "student1", firstName: "Tim", lastName: "Tester", email: "tim@example.com" }),
		];
		useUsersMockHandler.pagination = { limit: 1000, skip: 0, total: 1 };
		await loadStudents();

		expect(useUsersMockHandler.init).toHaveBeenCalledWith(RoleName.STUDENT);
		expect(useUsersMockHandler.fetchUsers).toHaveBeenCalledWith({
			$limit: 1000,
			$skip: 0,
			$sort: { lastName: 1 },
		});
		expect(studentOptions.value).toEqual([{ title: "Tim Tester", value: "student1" }]);
	});

	describe("paging", () => {
		it("fetches all pages until the total is reached", async () => {
			const firstPage = Array.from({ length: 1000 }, (_, i) => userResponseFactory.build({ _id: `s${i}` }));
			const secondPage = [userResponseFactory.build({ _id: "s1000" })];
			useUsersMockHandler.fetchUsers = vi.fn().mockImplementation(async ({ $skip }: { $skip: number }) => {
				useUsersMockHandler.userList = $skip === 0 ? firstPage : secondPage;
				useUsersMockHandler.pagination = { limit: 1000, skip: $skip, total: 1001 };
			});

			const { loadStudents, studentOptions } = useClassFormOptions();
			await loadStudents();

			expect(useUsersMockHandler.fetchUsers).toHaveBeenCalledTimes(2);
			expect(useUsersMockHandler.fetchUsers).toHaveBeenNthCalledWith(1, {
				$limit: 1000,
				$skip: 0,
				$sort: { lastName: 1 },
			});
			expect(useUsersMockHandler.fetchUsers).toHaveBeenNthCalledWith(2, {
				$limit: 1000,
				$skip: 1000,
				$sort: { lastName: 1 },
			});
			expect(studentOptions.value).toHaveLength(1001);
		});

		it("stops when a page comes back empty", async () => {
			useUsersMockHandler.fetchUsers = vi.fn().mockImplementation(async () => {
				useUsersMockHandler.userList = [];
				useUsersMockHandler.pagination = { limit: 1000, skip: 0, total: 50 };
			});

			const { loadTeachers, teacherOptions } = useClassFormOptions();
			await loadTeachers();

			expect(useUsersMockHandler.fetchUsers).toHaveBeenCalledTimes(1);
			expect(teacherOptions.value).toEqual([]);
		});

		it("does not offer students as teachers after the students were loaded", async () => {
			const { loadTeachers, loadStudents, teacherOptions } = useClassFormOptions();
			await loadTeachers();
			const teachersBefore = [...teacherOptions.value];

			useUsersMockHandler.userList = [userResponseFactory.build({ _id: "student1" })];
			useUsersMockHandler.pagination = { limit: 1000, skip: 0, total: 1 };
			await loadStudents();

			expect(teacherOptions.value).toEqual(teachersBefore);
		});
	});

	describe("defaultTeacherIds", () => {
		it("preselects the current user for non-admin users", () => {
			const { defaultTeacherIds } = useClassFormOptions();

			expect(defaultTeacherIds.value).toHaveLength(1);
		});

		it("is empty for admin users", () => {
			createTestAppStoreWithRole(RoleName.ADMINISTRATOR);

			const { defaultTeacherIds, isAdmin } = useClassFormOptions();

			expect(isAdmin.value).toBe(true);
			expect(defaultTeacherIds.value).toEqual([]);
		});
	});
});
