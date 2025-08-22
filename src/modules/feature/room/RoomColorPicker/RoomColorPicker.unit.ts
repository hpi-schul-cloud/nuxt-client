import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomColorPicker from "./RoomColorPicker.vue";
import { RoomColor } from "@/types/room/Room";
import { VIcon, VRadio, VRadioGroup } from "vuetify/components";
import { mdiCheckCircleOutline } from "@icons/material";
import { nextTick } from "vue";

describe("@feature-room/RoomColorPicker", () => {
	const setup = (props?: ComponentProps<typeof RoomColorPicker>) => {
		const wrapper = mount(RoomColorPicker, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	it("should render properly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toStrictEqual(true);
	});

	it("should render color options", () => {
		const { wrapper } = setup();

		const radioGroup = wrapper.getComponent(VRadioGroup);
		const colorOptions = radioGroup.findAllComponents(VRadio);

		expect(colorOptions).toHaveLength(Object.keys(RoomColor).length);
	});

	it("should render room color label", async () => {
		const { wrapper } = setup();
		await nextTick();

		const roomColorLabelId = "room-color-label";

		const label = wrapper.find(`#${roomColorLabelId}`);
		expect(label.exists()).toBe(true);
		expect(label.text()).toBe("common.words.color");

		const radioGroup = wrapper.getComponent(VRadioGroup);
		const radioGroupAriaLabelledElement = radioGroup.get("[aria-labelledby]");

		expect(radioGroupAriaLabelledElement.attributes("aria-labelledby")).toBe(
			roomColorLabelId
		);
	});

	describe("when no color is given", () => {
		it("should render default color BLUE_GREY as selected", () => {
			const { wrapper } = setup();

			const radioGroup = wrapper.getComponent(VRadioGroup);

			expect(radioGroup.props().modelValue).toBe(RoomColor.BlueGrey);
		});
	});

	describe("when a color is given", () => {
		it("should render given color as selected", () => {
			const { wrapper } = setup({ color: RoomColor.Red });

			const radioGroup = wrapper.getComponent(VRadioGroup);

			expect(radioGroup.props().modelValue).toBe(RoomColor.Red);
		});

		it("should render true-icon when color is selected", () => {
			const { wrapper } = setup({ color: RoomColor.Red });

			const radioGroup = wrapper.getComponent(VRadioGroup);
			const redRadioButton = radioGroup.getComponent(
				`[data-testid=color-swatch-${RoomColor.Red}]`
			);
			const trueIcon = redRadioButton.getComponent(VIcon);

			expect(trueIcon.props("icon")).toEqual(mdiCheckCircleOutline);
		});

		it("should not render true-icon when color is not selected", () => {
			const { wrapper } = setup({ color: RoomColor.Orange });

			const radioGroup = wrapper.getComponent(VRadioGroup);
			const redRadioButton = radioGroup.getComponent(
				`[data-testid=color-swatch-${RoomColor.Red}]`
			);
			const trueIcon = redRadioButton.findComponent(VIcon);

			expect(trueIcon.exists()).toBe(false);
		});
	});

	describe("when selecting a new color", () => {
		it("should render newly selected color as selected", async () => {
			const { wrapper } = setup();

			const radioGroup = wrapper.getComponent(VRadioGroup);
			await radioGroup.setValue(RoomColor.Orange);

			expect(radioGroup.props().modelValue).toBe(RoomColor.Orange);
		});
	});
});
