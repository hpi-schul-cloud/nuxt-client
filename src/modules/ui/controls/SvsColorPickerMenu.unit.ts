import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SvsColorPickerMenu } from "@ui-controls";
import { defineComponent, h } from "vue";
import { VList } from "vuetify/lib/components/index";

const SvsColorPickerMenuContainer = defineComponent({
	setup: () => () => h(VList, null, { default: () => h(SvsColorPickerMenu) }),
});

describe("SvsColorPickerMenu", () => {
	const setup = () => {
		const wrapper = mount(SvsColorPickerMenuContainer, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	it("renders the component", () => {
		const { wrapper } = setup();
		expect(wrapper.findComponent(SvsColorPickerMenu).exists()).toBe(true);
	});
});
