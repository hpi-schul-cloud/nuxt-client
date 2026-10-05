import ClassEdit from "./ClassEdit.page.vue";
import { createTestAppStore, createTestSchoolStore, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName } from "@api-server";
import { useGroupClasses } from "@data-group";
import { useUsersStore } from "@data-users";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@data-group");
vi.mock("@data-users");

const useGroupClassesMock = vi.mocked(useGroupClasses);
const useUsersMock = vi.mocked(useUsersStore);

describe("ClassEdit.page", () => {
	let useGroupClassesMockHandler: Mocked<ReturnType<typeof useGroupClasses>>;
	let useUsersMockHandler: Mocked<ReturnType<typeof useUsersStore>>;
	const router = createRouterMock();
	injectRouterMock(router);

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
		createTestSchoolStore({
			schoolDetails: {
				years: {
					activeYear: { _id: "year123", name: "2023/2024" } as any,
					nextYear: { _id: "year456", name: "2024/2025" } as any,
					schoolYears: [
						{ _id: "year123", name: "2023/2024" },
						{ _id: "year456", name: "2024/2025" },
					] as any,
				},
			},
		});

		useGroupClassesMockHandler = mockComposable(useGroupClasses, {
			fetchClassById: vi.fn().mockResolvedValue({
				_id: "class123",
				name: "a",
				gradeLevel: 5,
				year: "year123",
				teacherIds: ["teacher1"],
			}),
			updateClass: vi.fn().mockResolvedValue({ success: true }),
			isMutating: false as any,
		});
		useGroupClassesMock.mockReturnValue(useGroupClassesMockHandler);

		useUsersMockHandler = mockComposable(useUsersStore, {
			userList: [
				{ _id: "teacher1", firstName: "Max", lastName: "Mustermann", email: "max@example.com" },
			] as any,
			fetchUsers: vi.fn().mockResolvedValue({}),
			init: vi.fn(),
		});
		useUsersMock.mockReturnValue(useUsersMockHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (props = { classId: "class123" }) => {
		const wrapper = mount(ClassEdit, {
			props,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("initializes usersStore and fetches class data on mount", async () => {
		setup();
		await flushPromises();

		expect(useUsersMockHandler.init).toHaveBeenCalledWith(RoleName.TEACHER);
		expect(useUsersMockHandler.fetchUsers).toHaveBeenCalled();
		expect(useGroupClassesMockHandler.fetchClassById).toHaveBeenCalledWith("class123");
	});

	it("renders link to class members", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const link = wrapper.find('[data-testid="link_manage_class_members"]');
		expect(link.exists()).toBe(true);
	});

	it("submits update with correct payload", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const submitBtn = wrapper.find('[data-testid="button_class_submit"]');
		expect(submitBtn.exists()).toBe(true);

		await submitBtn.trigger("submit");
		await flushPromises();

		expect(useGroupClassesMockHandler.updateClass).toHaveBeenCalled();
	});
});
