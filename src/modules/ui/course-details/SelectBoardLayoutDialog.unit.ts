import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import SelectBoardLayoutDialog from "./SelectBoardLayoutDialog.vue";

describe("@ui-course-details/SelectBoardLayoutDialog", () => {
	const setup = () => {
		const wrapper = mount(SelectBoardLayoutDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				modelValue: true,
			},
		});

		return { wrapper };
	};

	it("should be rendered correctly", async () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should emit correct event on select", async () => {
		const { wrapper } = setup();

		const multiColumnButton = wrapper.findComponent(
			"[data-testid=dialog-add-multi-column-board]"
		);
		await multiColumnButton.trigger("click");

		expect(wrapper.emitted("select:multi-column")).toHaveLength(1);
	});

	it("should close dialog", async () => {
		const { wrapper } = setup();

		const closeBtn = wrapper.findComponent("[data-testid=dialog-close]");
		await closeBtn.trigger("click");

		expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
	});
});
