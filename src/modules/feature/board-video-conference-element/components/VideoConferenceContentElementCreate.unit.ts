import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { mount } from "@vue/test-utils";

const setupWrapper = ({
	propsData = {},
}: {
	propsData?: object;
} = {}) => {
	const wrapper = mount(VideoConferenceContentElementCreate, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[BOARD_IS_LIST_LAYOUT as symbol]: false,
			},
		},
		props: {
			isDetailView: false,
			...propsData,
		},
	});
	return wrapper;
};

const title = "video conference title";

describe("VideoConferenceContentElementCreate", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when component is unmounted", () => {
		it("should emit create:title event with valid title", async () => {
			const wrapper = setupWrapper();
			await wrapper.findComponent({ name: "VTextField" }).setValue(title);

			wrapper.unmount();

			expect(wrapper.emitted("create:title")).toEqual([[title]]);
		});

		it("should not emit create:title event when title is empty", async () => {
			const wrapper = setupWrapper();
			await wrapper.findComponent({ name: "VTextField" }).setValue("");

			wrapper.unmount();

			expect(wrapper.emitted("create:title")).toBeUndefined();
		});

		it("should not emit create:title event when title is unchanged", async () => {
			const existingTitle = "Existing Title";
			const wrapper = setupWrapper({ propsData: { existingTitle } });

			wrapper.unmount();

			expect(wrapper.emitted("create:title")).toBeUndefined();
		});

		it("should emit create:title event when title is changed from existing title", async () => {
			const existingTitle = "Existing Title";
			const newTitle = "New Title";
			const wrapper = setupWrapper({ propsData: { existingTitle } });

			await wrapper.findComponent({ name: "VTextField" }).setValue(newTitle);

			wrapper.unmount();

			expect(wrapper.emitted("create:title")).toEqual([[newTitle]]);
		});
	});

	describe("validation", () => {
		it("should show required-error-message when title is empty and field is blurred", async () => {
			const wrapper = setupWrapper();
			const textField = wrapper.findComponent({ name: "VTextField" });

			await textField.setValue("");
			await textField.trigger("blur");

			const alerts = wrapper.find('[role="alert"]');
			expect(alerts.text()).toEqual("common.validation.required2");
		});

		it("should not show error-message when title is valid", async () => {
			const wrapper = setupWrapper();
			await wrapper.findComponent({ name: "VTextField" }).setValue(title);

			const alerts = wrapper.find('[role="alert"]');
			expect(alerts.text()).toBe("");
		});
	});

	describe("when detail view is enabled", () => {
		it("should have list style", () => {
			const wrapper = setupWrapper({
				propsData: {
					isDetailView: true,
				},
			});

			const element = wrapper.findComponent("[data-testid='board-video-conference-element-create']");
			expect(element.exists()).toBe(true);
			expect(element.classes()).toContain("flex-row");
		});
	});
});
