import { mount } from "@vue/test-utils";
import SpeedMenu from "./SpeedMenu.vue";

jest.mock("@/utils/fileHelper");

describe("SpeedMenu", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = mount(SpeedMenu, {
			attachTo: document.body,
		});
		return {
			wrapper,
		};
	};
	it("should be found in dom", () => {
		const { wrapper } = setup();

		const speedMenuElement = wrapper.findComponent(SpeedMenu);
		expect(speedMenuElement.exists()).toBe(true);
	});

	it("should have a menu", () => {
		const { wrapper } = setup();

		expect(wrapper.html()).toContain("v-menu");
	});

	it("should have a button and an icon", () => {
		const { wrapper } = setup();
		const button = wrapper.find("v-btn");
		const icon = wrapper.find("v-icon");
		wrapper.vm.$nextTick(() => {
			expect(button.exists()).toBe(true);
			expect(icon.exists()).toBe(true);
		});
	});

	it("should display the icon correctly", () => {
		const { wrapper } = setup();
		const icon = wrapper.find("v-icon");
		wrapper.vm.$nextTick(() => {
			expect(icon.text()).toBe("mdiPlaySpeed");
		});
	});

	it("should display a list of speeds", () => {
		const { wrapper } = setup();
		const list = wrapper.find("v-list");
		wrapper.vm.$nextTick(() => {
			expect(list.exists()).toBe(true);
		});
	});

	it("should display correctly the selected speed", () => {
		const { wrapper } = setup();
		const speed = wrapper.find("v-list-item");
		wrapper.vm.$nextTick(() => {
			expect(speed.text()).toBe("Normal");
		});
	});

	it("should display correctly the check icon when selected", () => {
		const { wrapper } = setup();
		const icon = wrapper.find("v-list-item-icon");
		wrapper.vm.$nextTick(() => {
			expect(icon.text()).toBe("mdiCheck");
		});
	});
});
