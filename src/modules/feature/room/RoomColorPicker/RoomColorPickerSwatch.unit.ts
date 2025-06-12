import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomColorPickerSwatch from "./RoomColorPickerSwatch.vue";
import { RoomColor } from "@/types/room/Room";

describe("@feature-room/RoomColorPicker/RoomColorPickerSwatch", () => {
	const setup = (props?: ComponentProps<typeof RoomColorPickerSwatch>) => {
		const wrapper = mount(RoomColorPickerSwatch, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper };
	};

	describe("when color prop is not set", () => {
		it("should render default color", () => {
			const { wrapper } = setup();

			const selectedColor = wrapper.findComponent(
				"[data-testid=color-swatch-blue-grey]"
			);
			const otherColor = wrapper.findComponent(
				"[data-testid=color-swatch-red]"
			);

			expect(selectedColor.exists()).toStrictEqual(true);
			expect(otherColor.exists()).toStrictEqual(false);
		});
	});

	describe("when color is set", () => {
		it("should render with given color", () => {
			const { wrapper } = setup({ color: RoomColor.Red, isSelected: true });

			const selectedColor = wrapper.findComponent(
				"[data-testid=color-swatch-red]"
			);

			expect(selectedColor.exists()).toStrictEqual(true);
		});

		it("should render selected icon", () => {
			const { wrapper } = setup({ color: RoomColor.Red, isSelected: true });

			const selectedColor = wrapper.findComponent(
				"[data-testid=color-swatch-red]"
			);

			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = wrapper.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);
		});
	});

	describe("when selecting this color", () => {
		it("should emit update:color event", async () => {
			const { wrapper } = setup();

			const selectedColor = wrapper.findComponent(
				"[data-testid=color-swatch-blue-grey]"
			);

			await selectedColor.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("update:color");
			expect(wrapper.emitted()["update:color"]).toHaveLength(1);
			expect(wrapper.emitted()["update:color"][0]).toEqual(["blue-grey"]);
		});
	});
});
