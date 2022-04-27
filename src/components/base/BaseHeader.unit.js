import BaseHeader from "./BaseHeader";
import BaseButton from "./BaseButton";

const title = "Mathe";
const actions = [
	{
		text: "Add",
		event: "add",
		icon: "add",
	},
];

describe("@components/base/BaseHeader", () => {
	it(...isValidComponent(BaseHeader));
	it(
		...rendersSlotContent(BaseHeader, ["default"], {
			propsData: {
				title: title,
			},
		})
	);

	it("renders title of header", () => {
		const wrapper = shallowMount(BaseHeader, {
			propsData: {
				title: title,
			},
		});
		expect(wrapper.text()).toContain(title);
	});

	it("context menu is displayed if actions are passed", () => {
		const wrapper = shallowMount(BaseHeader, {
			propsData: {
				title: title,
				actions: actions,
				source: "material",
			},
		});
		expect(wrapper.find(".ctx-menu").exists()).toBe(true);
	});

	it("context menu is not displayed if actions are empty", () => {
		const wrapper = shallowMount(BaseHeader, {
			propsData: {
				title: title,
			},
		});
		expect(wrapper.find(".ctx-menu").exists()).toBe(false);
	});

	it("clicking on menu button opens up context menu", async () => {
		const wrapper = mount(BaseHeader, {
			propsData: {
				title: title,
				actions: actions,
				source: "material",
			},
			mocks: {
				$t: (msg) => msg,
			},
		});

		const button = wrapper.findComponent(BaseButton);
		expect(button.exists()).toBe(true);
		await button.trigger("click");
		expect(wrapper.vm.active).toBe(true);
	});

	it("context menu is hidden by default", async () => {
		const wrapper = shallowMount(BaseHeader, {
			propsData: {
				title: title,
			},
		});
		expect(wrapper.vm.active).toBe(false);
	});
});
