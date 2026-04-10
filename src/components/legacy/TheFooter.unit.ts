import TheFooter from "./TheFooter.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";
import { VBtn } from "vuetify/components";

describe("TheFooter.vue", () => {
	const dummyUrl = "dummy-url.org";
	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({ ALERT_STATUS_URL: dummyUrl });
	});

	const setup = () => {
		const theme = {
			name: "instance name",
		};

		const wrapper = shallowMount(TheFooter, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		return { wrapper, theme };
	};

	it("Env-Variable sets the status page link correctly", () => {
		const { wrapper } = setup();
		expect(wrapper.html()).toContain(dummyUrl);
	});

	it("check that all links are rendered in the footer", () => {
		const { wrapper } = setup();
		const links = wrapper.findAllComponents(VBtn);

		expect(links).toHaveLength(6);
	});
});
