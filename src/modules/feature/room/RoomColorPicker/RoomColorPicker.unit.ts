import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomColorPicker from "./RoomColorPicker.vue";
import { RoomColorEnum } from "./types";

describe("@feature-room/RoomColorPicker/RoomColorPickerSwatch", () => {
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

	describe("when no color is given", () => {
		it("should render default color BLUE_GREY as selected", () => {
			const { wrapper } = setup();

			const selectedColor = wrapper.findComponent(
				".color-swatch--color-blue-grey"
			);

			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = wrapper.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);
		});
	});

	describe("when a color is given", () => {
		it("should render given color as selected", () => {
			const { wrapper } = setup({ selectedColor: RoomColorEnum.RED });

			const selectedColor = wrapper.findComponent(".color-swatch--color-red");
			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = selectedColor.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);

			const defaultColor = wrapper.findComponent(
				".color-swatch--color-blue-grey"
			);
			expect(defaultColor.exists()).toStrictEqual(true);

			const selectedIcon2 = defaultColor.findComponent({ name: "VIcon" });
			expect(selectedIcon2.exists()).toStrictEqual(false);
		});
	});

	describe("when selecting a new color", () => {
		it("should render current color as selected", () => {
			const { wrapper } = setup();

			const selectedColor = wrapper.findComponent(
				".color-swatch--color-blue-grey"
			);
			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = wrapper.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);
		});

		it("should emit update:color event", async () => {
			const { wrapper } = setup();

			const newColor = wrapper.findComponent(".color-swatch--color-green");

			await newColor.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("update:selectedColor");
			expect(wrapper.emitted()["update:selectedColor"]).toHaveLength(1);
			expect(wrapper.emitted()["update:selectedColor"][0]).toEqual(["green"]);
		});
	});
});
