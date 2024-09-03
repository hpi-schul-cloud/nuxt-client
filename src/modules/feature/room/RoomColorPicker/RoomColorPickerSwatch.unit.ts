import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomColorPickerSwatch from "./RoomColorPickerSwatch.vue";
import { RoomColorEnum } from "./types";

describe("@feature-room/RoomColorPicker/RoomColorPickerSwatch", () => {
	const setup = (props?: ComponentProps<typeof RoomColorPickerSwatch>) => {
		const wrapper = mount(RoomColorPickerSwatch, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props,
		});

		return { wrapper };
	};

	describe("when color prop is not set", () => {
		it("should render default color", () => {
			const { wrapper } = setup();

			const selectedColor = wrapper.findComponent(
				".color-swatch--color-blue-grey"
			);
			const otherColor = wrapper.findComponent(".color-swatch--color-red");

			expect(selectedColor.exists()).toStrictEqual(true);
			expect(otherColor.exists()).toStrictEqual(false);
		});
	});

	describe("when color is set", () => {
		it("should render with given color", () => {
			const { wrapper } = setup({ color: RoomColorEnum.RED, isSelected: true });

			const selectedColor = wrapper.findComponent(".color-swatch--color-red");

			expect(selectedColor.exists()).toStrictEqual(true);
		});

		it("should render selected icon", () => {
			const { wrapper } = setup({ color: RoomColorEnum.RED, isSelected: true });

			const selectedColor = wrapper.findComponent(".color-swatch--color-red");

			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = wrapper.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);
		});
	});

	describe("when selecting this color", () => {
		it("should emit update:color event", async () => {
			const { wrapper } = setup();

			const selectedColor = wrapper.findComponent(
				".color-swatch--color-blue-grey"
			);

			await selectedColor.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("update:color");
			expect(wrapper.emitted()["update:color"]).toHaveLength(1);
			expect(wrapper.emitted()["update:color"][0]).toEqual(["blue-grey"]);
		});
	});
});
