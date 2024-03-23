import { mount } from "@vue/test-utils";
import LineClamp from "@/modules/ui/board/LineClamp.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe(LineClamp.name, () => {
	const setup = (defaultSlotContent: string) => {
		const icon = "mdi-test";
		const wrapper = mount(LineClamp, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			slots: {
				default: defaultSlotContent,
			},
		});

		return {
			wrapper,
			icon,
		};
	};

	it("renders correctly", () => {
		const defaultSlotContent = "Marmelade";
		const { wrapper } = setup(defaultSlotContent);

		expect(wrapper.text()).toBe(defaultSlotContent);
	});
});
