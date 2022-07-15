import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ImpressumNew from "../ImpressumNew.vue";

describe("ImpressumNew", () => {
	it("renders properly", () => {
		const wrapper = mount(ImpressumNew);
		expect(wrapper.text()).toContain("Impressum");
	});
});
