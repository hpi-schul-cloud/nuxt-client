import DirectoryVisibilityCard from "./DirectoryVisibilityCard.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

describe("DirectoryVisibilityCard.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({ SC_TITLE: "Schul-Cloud" });
	});

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

	it("renders the legacy checkbox and save button test ids", () => {
		const wrapper = setup();

		expect(wrapper.find('input[data-testid="checkbox-show-in-directory"]').exists()).toBe(true);
		expect(wrapper.find('[data-testid="submit_visibility_settings_btn"]').exists()).toBe(true);
	});

	it("emits the current value when saved", async () => {
		const wrapper = setup(false);
		await wrapper.find('[data-testid="submit_visibility_settings_btn"]').trigger("click");

		expect(wrapper.emitted("submit")?.[0][0]).toBe(false);
	});

	it("emits the toggled value after the checkbox is checked", async () => {
		const wrapper = setup(false);
		await wrapper.find('input[data-testid="checkbox-show-in-directory"]').setValue(true);
		await wrapper.find('[data-testid="submit_visibility_settings_btn"]').trigger("click");

		expect(wrapper.emitted("submit")?.[0][0]).toBe(true);
	});
});
