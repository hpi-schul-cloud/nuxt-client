import { mount } from "@vue/test-utils";
import SpeedMenu from "./SpeedMenu.vue";

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
		const menu = wrapper.find("v-menu");

		expect(menu.exists()).toBe(true);
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

	it("should display correctly the default speed", () => {
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

	it("should display correctly the speed value", () => {
		const { wrapper } = setup();
		const title = wrapper.find("v-list-item-title");
		const speed = wrapper.find("v-list-item");

		wrapper.vm.$nextTick(() => {
			expect(title.text()).toBe("0.25");
			expect(speed).toBe(0.25);
		});
	});
});

describe("when picking a speed through select", () => {
	it("should emit rate on click", async () => {
		const wrapper = mount(SpeedMenu, {
			attachTo: document.body,
		});
		const listItem = wrapper.find("v-list-item");
		await listItem.trigger("click");

		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted("rate")).toBeTruthy();
			expect(wrapper.emitted("speedSelected")).toBeTruthy();
			expect(wrapper.emitted("speedSelected")).toHaveLength(1);
			expect(wrapper.vm.$data.speed).toBe(0.25);
		});
	});
});
