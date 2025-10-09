import CloudLogo from "./CloudLogo.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

describe("CloudLogo", () => {
	const setup = () => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({ SC_TITLE: "dBildungscloud" });
		const wrapper = shallowMount(CloudLogo, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	it("should render correctly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find("img").exists()).toBe(true);
	});
});
