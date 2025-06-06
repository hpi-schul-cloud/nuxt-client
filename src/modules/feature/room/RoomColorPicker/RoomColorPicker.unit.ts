import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import RoomColorPicker from "./RoomColorPicker.vue";
import { RoomColor } from "@/types/room/Room";

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

	describe("when no color is given", () => {
		it("should render default color BLUE_GREY as selected", () => {
			const { wrapper } = setup();

			const selectedColor = wrapper.findComponent(
				"[data-testid=color-swatch-blue-grey]"
			);

			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = wrapper.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);
		});
	});

	describe("when a color is given", () => {
		it("should render given color as selected", () => {
			const { wrapper } = setup({ color: RoomColor.Red });

			const selectedColor = wrapper.findComponent(
				"[data-testid=color-swatch-red]"
			);
			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = selectedColor.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);

			const defaultColor = wrapper.findComponent(
				"[data-testid=color-swatch-blue-grey]"
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
				"[data-testid=color-swatch-blue-grey]"
			);
			expect(selectedColor.exists()).toStrictEqual(true);

			const selectedIcon = wrapper.findComponent({ name: "VIcon" });
			expect(selectedIcon.exists()).toStrictEqual(true);
		});

		it("should emit update:color event", async () => {
			const { wrapper } = setup();

			const newColor = wrapper.findComponent(
				"[data-testid=color-swatch-green]"
			);

			await newColor.trigger("click");

			expect(wrapper.emitted()).toHaveProperty("update:color");
			expect(wrapper.emitted()["update:color"]).toHaveLength(1);
			expect(wrapper.emitted()["update:color"][0]).toEqual(["green"]);
		});
	});
});
