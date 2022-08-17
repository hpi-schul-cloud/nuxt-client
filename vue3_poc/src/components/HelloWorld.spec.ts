import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import HelloWorld from "./HelloWorld.vue";

describe("HelloWorld", () => {
	const vuetify = createVuetify({ components, directives });

	it("renders properly", () => {
		const wrapper = mount(HelloWorld, {
			global: {
				plugins: [vuetify],
			},
		});
		expect(wrapper.text()).toContain("Vuetify");
	});
});
