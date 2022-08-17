import { mount } from "@vue/test-utils";

import HelloWorld from "./HelloWorld.vue";

// import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";

describe("HelloWorld", () => {
	it("renders properly", () => {
		// const vuetify = createVuetify({ components, directives });

		const wrapper = mount(
			HelloWorld
			// {
			// 	global: {
			// 		plugins: [vuetify],
			// 	},
			// }
		);
		expect(wrapper.text()).toContain("Vuetify");
	});
});
