import DirectoryVisibilityCard from "./DirectoryVisibilityCard.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("DirectoryVisibilityCard.vue", () => {
	const setup = (initialDiscoverable = false) =>
		mount(DirectoryVisibilityCard, {
			props: {
				initialDiscoverable,
				loading: false,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("renders checkbox and save button", () => {
		const wrapper = setup();
		expect(wrapper.find('[data-test-id="checkbox_directory_visibility"]').exists()).toBe(true);
		expect(wrapper.find('[data-testid="submit_visibility_settings_btn"]').exists()).toBe(true);
	});

	it("emits submit with new discoverable value when save button is clicked", async () => {
		const wrapper = setup(false);
		await wrapper.find('[data-testid="submit_visibility_settings_btn"]').trigger("click");

		expect(wrapper.emitted("submit")).toBeTruthy();
		expect(wrapper.emitted("submit")?.[0][0]).toBe(false);
	});
});
