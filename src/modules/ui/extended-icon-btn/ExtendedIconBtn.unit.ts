import { ComponentMountingOptions, mount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import ExtendedIconBtn from "./ExtendedIconBtn.vue";

describe("@components/DataFilter/filterComponents/FilterActionButtons.vue", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof ExtendedIconBtn> = {}
	) => {
		return mount(ExtendedIconBtn, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});
	};
	it("should render component", () => {
		const wrapper = mountComponent({
			props: { icon: "example-icon", label: "example-label" },
		});
		expect(wrapper.findComponent(ExtendedIconBtn).exists()).toEqual(true);
	});
});
