import { useClassFormOptions } from "./class-form-options.composable";
import { createTestSchoolStore, mockComposable } from "@@/tests/test-utils";
import { RoleName } from "@api-server";
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
		createTestSchoolStore({
			schoolDetails: {
				years: {
					activeYear: { _id: "year1", name: "2023/2024" } as any,
					schoolYears: [
						{ _id: "year1", name: "2023/2024" },
						{ _id: "year2", name: "2024/2025" },
					] as any,
				},
			},
		});

		useUsersMockHandler = mockComposable(useUsersStore, {
			userList: [
				{ _id: "teacher1", firstName: "Max", lastName: "Mustermann", email: "max@example.com" },
				{ _id: "teacher2", firstName: "", lastName: "", email: "anna@example.com" },
			] as any,
			fetchUsers: vi.fn().mockResolvedValue({}),
			init: vi.fn(),
		});
		useUsersMock.mockReturnValue(useUsersMockHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("initializes teacher store and returns formatted school years and teachers", () => {
		const { schoolYearOptions, activeYearId, teacherOptions } = useClassFormOptions();

		expect(useUsersMockHandler.init).toHaveBeenCalledWith(RoleName.TEACHER);
		expect(activeYearId.value).toBe("year1");
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
});
