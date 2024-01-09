import { MountOptions, mount } from "@vue/test-utils";
import Vue from "vue";
import LineClamp from "@/components/ui-board/LineClamp.vue";

describe(LineClamp.name, () => {
	const setup = (defaultSlotContent: string) => {
		document.body.setAttribute("data-app", "true");

		const icon = "mdi-test";
		const wrapper = mount(LineClamp as MountOptions<Vue>, {
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
