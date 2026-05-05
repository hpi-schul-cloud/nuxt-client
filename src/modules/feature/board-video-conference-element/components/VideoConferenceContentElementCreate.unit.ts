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

	describe("when a valid title is entered", () => {
		describe("and enter is pressed", () => {
			it("should not show error-message", async () => {
				const wrapper = setupWrapper();

				await wrapper.findComponent({ name: "VTextarea" }).setValue(title);
				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]');
				expect(alerts.text()).toBe("");
			});

			it("should emit create:title event", async () => {
				const wrapper = setupWrapper();

				await wrapper.findComponent({ name: "VTextarea" }).setValue(title);
				await wrapper.findComponent({ name: "VTextarea" }).trigger("keydown.enter");

				expect(wrapper.emitted("create:title")).toEqual([[title]]);
			});
		});
	});

	describe("when the title field is empty", () => {
		describe("and the submit button is clicked", () => {
			it("should show required-error-message", async () => {
				const wrapper = setupWrapper();

				await wrapper.findComponent({ name: "VTextarea" }).setValue("");
				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]').text();
				expect(alerts).toEqual("common.validation.required2");
			});

			it("should not emit create:title event", async () => {
				const wrapper = setupWrapper();

				await wrapper.findComponent({ name: "VTextarea" }).setValue("");
				await wrapper.find("form").trigger("submit.prevent");

				expect(wrapper.emitted("create:title")).toBeUndefined();
			});
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
