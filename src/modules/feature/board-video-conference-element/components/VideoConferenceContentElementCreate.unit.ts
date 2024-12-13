import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";

const title = "video conference title";

describe("VideoConferenceContentElementCreate", () => {
	const setup = () => {
		const wrapper = mount(VideoConferenceContentElementCreate, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when valid title was entered", () => {
		describe("and enter is pressed", () => {
			it("should not show error-message", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "VTextarea" }).setValue(title);
				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]');

				expect(alerts.text()).toBe("");
			});

			it("should emit create:title event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "VTextarea" }).setValue(title);
				await wrapper
					.findComponent({ name: "VTextarea" })
					.trigger("keydown.enter");
				await nextTick();

				expect(wrapper.emitted("create:title")).toEqual([[title]]);
			});
		});
	});

	describe("when title field is empty", () => {
		describe("and submit button is clicked", () => {
			it("should show required-error-message", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "VTextarea" }).setValue("");
				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]').text();

				expect(alerts).toEqual("common.validation.required2");
			});

			it("should not emit create:title event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "VTextarea" }).setValue("");
				await wrapper.find("form").trigger("submit.prevent");

				expect(wrapper.emitted("create:title")).toBeUndefined();
			});
		});
	});
});
