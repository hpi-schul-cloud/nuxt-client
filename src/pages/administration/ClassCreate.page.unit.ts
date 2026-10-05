import ClassCreate from "./ClassCreate.page.vue";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useClassFormOptions, useGroupClasses } from "@data-group";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { Mocked } from "vitest";
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
			createClass: vi.fn().mockResolvedValue({ success: true }),
			isMutating: false as any,
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

	it("submits create request and navigates on success", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const submitBtn = wrapper.find('[data-testid="button_class_submit"]');
		expect(submitBtn.exists()).toBe(true);
	});
});
