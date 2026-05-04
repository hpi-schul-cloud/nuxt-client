import DetailViewButton from "./DetailViewButton.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("DetailViewButton", () => {
	const setup = () => {
		const wrapper = mount(DetailViewButton, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(DetailViewButton).exists()).toBe(true);
		});
	});

	describe("when button is clicked", () => {
		it("should emit 'open-detail-view' event", async () => {
			const { wrapper } = setup();

			await wrapper.trigger("click");

			expect(wrapper.emitted("open-detail-view")).toBeTruthy();
		});
	});
});
