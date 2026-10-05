import ClassEdit from "./ClassEdit.page.vue";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useClassFormOptions, useGroupClasses } from "@data-group";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@data-group");

const useGroupClassesMock = vi.mocked(useGroupClasses);
const useClassFormOptionsMock = vi.mocked(useClassFormOptions);

describe("ClassEdit.page", () => {
	let useGroupClassesMockHandler: Mocked<ReturnType<typeof useGroupClasses>>;
	let useClassFormOptionsMockHandler: Mocked<ReturnType<typeof useClassFormOptions>>;
	const router = createRouterMock();
	injectRouterMock(router);

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		useGroupClassesMockHandler = mockComposable(useGroupClasses, {
			fetchClassById: vi.fn().mockResolvedValue({
				_id: "class123",
				name: "a",
				gradeLevel: 5,
				year: "year123",
				teacherIds: ["teacher1"],
			}),
			updateClass: vi.fn().mockResolvedValue({ success: true }),
			isMutating: ref(false),
		});
		useGroupClassesMock.mockReturnValue(useGroupClassesMockHandler);

		useClassFormOptionsMockHandler = mockComposable(useClassFormOptions, {
			schoolYearOptions: computed(() => [{ title: "2023/2024", value: "year123" }]),
			activeYearId: computed(() => "year123"),
			teacherOptions: computed(() => [{ title: "Max Mustermann", value: "teacher1" }]),
			loadTeachers: vi.fn().mockResolvedValue(undefined),
		});
		useClassFormOptionsMock.mockReturnValue(useClassFormOptionsMockHandler);
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

	it("fetches class data and loads teachers on mount", async () => {
		setup();
		await flushPromises();

		expect(useClassFormOptionsMockHandler.loadTeachers).toHaveBeenCalled();
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
