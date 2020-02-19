import ResponsiveIconButton from "./ResponsiveIconButton";

describe("@components/ResponsiveIconButton", () => {
	it(...isValidComponent(ResponsiveIconButton));

	it("Renders a button with an icon", () => {
		const testProps = {
			source: "material",
			design: "primary",
			icon: "add",
		};
		const wrapper = mount(ResponsiveIconButton, {
			propsData: testProps,
			stubs: {
				BaseIcon: true,
			},
		});
		expect(wrapper.get("button").exists()).toBe(true);
		const icon = wrapper.find("baseicon-stub");
		expect(icon.attributes("source")).toBe(testProps.source);
		expect(icon.attributes("icon")).toBe(testProps.icon);
	});

	it("throws an error for invalid designs", async () => {
		expect(() => {
			mount(ResponsiveIconButton, {
				propsData: {
					source: "material",
					design: "some Invalid Design",
					icon: "add",
				},
			});
		}).toThrow(/the design .* is not available/);
	});

	const slotContent = "<p>random slot content</p>";

	it("Renders slot content visually hidden on mobile", () => {
		const wrapper = mount(ResponsiveIconButton, {
			propsData: {
				source: "material",
				design: "primary",
				icon: "add",
			},
			computed: {
				$mq: () => "mobile",
			},
			slots: {
				default: slotContent,
			},
		});
		expect(wrapper.find(".visually-hidden").html()).toContain(slotContent);
	});

	it("Renders slot content visible on tablet+ devices", () => {
		const wrapper = mount(ResponsiveIconButton, {
			propsData: {
				source: "material",
				design: "primary",
				icon: "add",
			},
			computed: {
				$mq: () => "tablet",
			},
			slots: {
				default: slotContent,
			},
		});
		expect(wrapper.find(".visually-hidden").exists()).toBe(false);
		expect(wrapper.html()).toContain(slotContent);
	});
});
