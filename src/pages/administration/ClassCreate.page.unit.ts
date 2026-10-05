import ClassCreate from "./ClassCreate.page.vue";
import ClassForm from "@/components/administration/ClassForm.vue";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useClassFormOptions, useGroupClasses } from "@data-group";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@data-group");

const useGroupClassesMock = vi.mocked(useGroupClasses);
const useClassFormOptionsMock = vi.mocked(useClassFormOptions);

describe("ClassCreate.page", () => {
	let useGroupClassesMockHandler: Mocked<ReturnType<typeof useGroupClasses>>;
	let useClassFormOptionsMockHandler: Mocked<ReturnType<typeof useClassFormOptions>>;
	const router = createRouterMock();
	injectRouterMock(router);

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		useGroupClassesMockHandler = mockComposable(useGroupClasses, {
			createClass: vi.fn().mockResolvedValue({ success: true, data: { _id: "new-class-123" } }),
			isMutating: computed(() => false),
		});
		useGroupClassesMock.mockReturnValue(useGroupClassesMockHandler);

		useClassFormOptionsMockHandler = mockComposable(useClassFormOptions, {
			schoolYearOptions: computed(() => [{ title: "2023/2024", value: "year123" }]),
			activeYearId: computed(() => "year123"),
			teacherOptions: computed(() => [{ title: "Max Mustermann", value: "teacher1" }]),
			defaultTeacherIds: computed(() => ["teacher1"]),
			loadTeachers: vi.fn().mockResolvedValue(undefined),
			isAdmin: computed(() => true),
		});
		useClassFormOptionsMock.mockReturnValue(useClassFormOptionsMockHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(ClassCreate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("loads teachers on mount", async () => {
		setup();
		await flushPromises();

		expect(useClassFormOptionsMockHandler.loadTeachers).toHaveBeenCalled();
	});

	it("submits create request and navigates to overview on success for admin", async () => {
		const { wrapper } = setup();
		await flushPromises();

		await wrapper.findComponent(ClassForm).vm.$emit("submit", { name: "5a", gradeLevel: 5 });
		await flushPromises();

		expect(useGroupClassesMockHandler.createClass).toHaveBeenCalledWith({ name: "5a", gradeLevel: 5 });
		expect(router.push).toHaveBeenCalledWith("/administration/groups/classes");
	});

	it("submits create request and navigates to manage class page on success for non-admin", async () => {
		useClassFormOptionsMockHandler.isAdmin = computed(() => false);

		const { wrapper } = setup();
		await flushPromises();

		await wrapper.findComponent(ClassForm).vm.$emit("submit", { name: "5a", gradeLevel: 5 });
		await flushPromises();

		expect(useGroupClassesMockHandler.createClass).toHaveBeenCalledWith({ name: "5a", gradeLevel: 5 });
		expect(router.push).toHaveBeenCalledWith("/administration/classes/new-class-123/manage");
	});
});
