import ColorPicker from "./ColorPicker";

describe("@components/atoms/ColorPicker", () => {
	it(...isValidComponent(ColorPicker));

	it("passes colors prop to library", async () => {
		const testColors = ["#123456", "#778899", "#AABBCC", "#DDEEFF"];
		const wrapper = mount(ColorPicker, {
			...createComponentMocks({
				stubs: {
					"color-picker": true,
				},
			}),
			propsData: {
				colors: testColors,
			},
		});
		expect(
			wrapper.get("color-picker-stub").attributes().swatches
		).toStrictEqual(testColors.join(","));
	});

	it("defines default set of colors", async () => {
		const wrapper = mount(ColorPicker, {
			...createComponentMocks({
				stubs: {
					"color-picker": true,
				},
			}),
		});
		expect(
			wrapper.get("color-picker-stub").attributes().swatches.length
		).toBeGreaterThan(0);
	});
});
