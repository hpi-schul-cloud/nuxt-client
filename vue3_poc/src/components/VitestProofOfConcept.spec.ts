import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VitestProofOfConcept from "./VitestProofOfConcept.vue";

describe("VitestProofOfConcept", () => {
	const vuetify = createVuetify({ components, directives });

	it("renders properly", () => {
		const wrapper = mount(VitestProofOfConcept, {
			global: {
				plugins: [vuetify],
			},
		});
		expect(wrapper.text()).toContain("Vuetify");
	});
});
