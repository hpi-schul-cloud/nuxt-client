import { mount, MountOptions } from "@vue/test-utils";
import vCustomSwitch from "./vCustomSwitch.vue";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";

describe("vCustomSwitch", () => {
	it("should take property value true", () => {
		const wrapper = mount(vCustomSwitch as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				value: true,
				label: "mock label",
			},
		});
		const customSwitch = wrapper.find("input").element as HTMLInputElement;
		expect(customSwitch.checked).toBeTruthy();
	});
	it("should take property value false", () => {
		const wrapper = mount(vCustomSwitch as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				value: false,
				label: "mock label",
			},
		});
		const customSwitch = wrapper.find("input").element as HTMLInputElement;
		expect(customSwitch.checked).toBeFalsy();
	});

	it("should display externally changing value", async () => {
		const wrapper = mount(vCustomSwitch as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				value: true,
				label: "mock label",
			},
		});
		const customSwitch = wrapper.find("input").element as HTMLInputElement;
		expect(customSwitch.checked).toBeTruthy();

		await wrapper.setProps({ value: false });
		expect(customSwitch.checked).toBeFalsy();

		await wrapper.setProps({ value: true });
		expect(customSwitch.checked).toBeTruthy();
	});

	it("should show the label", () => {
		const wrapper = mount(vCustomSwitch as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				value: false,
				label: "mock label",
			},
		});
		const customSwitch = wrapper.find("label");
		expect(customSwitch.text()).toBe("mock label");
	});

	it("should emit events", async () => {
		const wrapper = mount(vCustomSwitch as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				value: false,
				label: "mock label",
			},
		});
		const customSwitch = wrapper.find("input");
		customSwitch.trigger("click");
		await wrapper.vm.$nextTick();

		let emitted = wrapper.emitted();
		expect(emitted["input-changed"]).toHaveLength(1);
		expect(
			emitted["input-changed"] && emitted["input-changed"][0]
		).toHaveLength(1);
		expect(
			emitted["input-changed"] &&
				emitted["input-changed"][0] &&
				emitted["input-changed"][0][0]
		).toBeTruthy();

		customSwitch.trigger("click");
		await wrapper.vm.$nextTick();

		emitted = wrapper.emitted();
		expect(emitted["input-changed"]).toHaveLength(2);
		expect(
			emitted["input-changed"] && emitted["input-changed"][1]
		).toHaveLength(1);
		expect(
			emitted["input-changed"] &&
				emitted["input-changed"][1] &&
				emitted["input-changed"][1][0]
		).toBeFalsy();
	});
});
