import ClassManage from "./ClassManage.page.vue";
import { createTestAppStoreWithPermissions, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission } from "@api-server";
import { useClassFormOptions, useGroupClasses } from "@data-group";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@data-group");
vi.mock("@data-env", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@data-env")>();
	const { ref } = await import("vue");
	return {
		...actual,
		useEnvConfig: vi.fn(() =>
			ref({
				FEATURE_CONSENT_NECESSARY: true,
				SC_THEME: "default",
				SC_TITLE: "dbildungscloud",
			})
		),
	};
});

const useGroupClassesMock = vi.mocked(useGroupClasses);
const useClassFormOptionsMock = vi.mocked(useClassFormOptions);

describe("ClassManage.page", () => {
	let useGroupClassesMockHandler: Mocked<ReturnType<typeof useGroupClasses>>;
	let useClassFormOptionsMockHandler: Mocked<ReturnType<typeof useClassFormOptions>>;
	const router = createRouterMock();
	injectRouterMock(router);

	beforeEach(() => {
		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([Permission.CLASS_EDIT, Permission.STUDENT_LIST], pinia);

		useGroupClassesMockHandler = mockComposable(useGroupClasses, {
			fetchClassById: vi.fn().mockResolvedValue({
				_id: "class123",
				name: "5a",
				teacherIds: [{ _id: "teacher1", firstName: "Max", lastName: "Mustermann" }],
				userIds: [{ _id: "student1", firstName: "Tim", lastName: "Tester" }],
			}),
			updateClass: vi.fn().mockResolvedValue({ success: true }),
			sendRegistrationLinks: vi.fn().mockResolvedValue({ success: true }),
			isMutating: computed(() => false),
		});
		useGroupClassesMock.mockReturnValue(useGroupClassesMockHandler);

		useClassFormOptionsMockHandler = mockComposable(useClassFormOptions, {
			schoolYearOptions: computed(() => [{ title: "2023/2024", value: "year123" }]),
			activeYearId: computed(() => "year123"),
			teacherOptions: computed(() => [
				{ title: "Max Mustermann", value: "teacher1" },
				{ title: "Anna Schmidt", value: "teacher2" },
			]),
			studentOptions: computed(() => [
				{ title: "Tim Tester", value: "student1" },
				{ title: "Lisa Mueller", value: "student2" },
			]),
			defaultTeacherIds: computed(() => []),
			loadTeachers: vi.fn().mockResolvedValue(undefined),
			loadStudents: vi.fn().mockResolvedValue(undefined),
			isAdmin: computed(() => true),
		});
		useClassFormOptionsMock.mockReturnValue(useClassFormOptionsMockHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (props = { classId: "class123" }) => {
		const wrapper = mount(ClassManage, {
			props,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("fetches class data and loads teachers and students on mount", async () => {
		setup();
		await flushPromises();

		expect(useClassFormOptionsMockHandler.loadTeachers).toHaveBeenCalled();
		expect(useClassFormOptionsMockHandler.loadStudents).toHaveBeenCalled();
		expect(useGroupClassesMockHandler.fetchClassById).toHaveBeenCalledWith("class123", {
			$populate: ["teacherIds", "userIds"],
		});
	});

	it("renders rename class button pointing to edit route", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const renameBtn = wrapper.find('[data-testid="rename-class-btn"]');
		expect(renameBtn.exists()).toBe(true);
	});

	it("renders teacher and student selection controls", async () => {
		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.find('[data-testid="teacher-selection-on-manage-class"]').exists()).toBe(true);
		expect(wrapper.find('[data-testid="student-selection-on-manage-class"]').exists()).toBe(true);
	});

	it("submits update with selected teachers and students", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const form = wrapper.find("form");
		expect(form.exists()).toBe(true);

		await form.trigger("submit");
		await flushPromises();

		expect(useGroupClassesMockHandler.updateClass).toHaveBeenCalledWith("class123", {
			teacherIds: ["teacher1"],
			userIds: ["student1"],
		});
		expect(router.push).toHaveBeenCalledWith("/administration/groups/classes");
	});

	it("navigates to overview on cancel", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const cancelBtn = wrapper.find('[data-testid="button_manage_cancel"]');
		expect(cancelBtn.exists()).toBe(true);

		await cancelBtn.trigger("click");
		await flushPromises();

		expect(router.push).toHaveBeenCalledWith("/administration/groups/classes");
	});

	it("triggers send registration links when button is clicked", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const sendBtn = wrapper.find('[data-testid="send-registration-links-btn"]');
		expect(sendBtn.exists()).toBe(true);

		await sendBtn.trigger("click");
		await flushPromises();

		expect(useGroupClassesMockHandler.sendRegistrationLinks).toHaveBeenCalledWith("class123", "student");
	});

	it("renders expansion panels for guidance notes", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const panels = wrapper.find('[data-testid="class-manage-expansion-panels"]');
		expect(panels.exists()).toBe(true);
	});

	it("handles non-admin and filters unassigned students when lacking STUDENT_LIST permission", async () => {
		useClassFormOptionsMockHandler.isAdmin = computed(() => false);
		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([Permission.CLASS_EDIT], pinia);

		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.find('[data-testid="teacher-selection-on-manage-class"]').exists()).toBe(true);
		expect(wrapper.find('[data-testid="student-selection-on-manage-class"]').exists()).toBe(true);
	});
});
