import Vue from "vue";
import { MountOptions, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import PopupIcon from "./PopupIcon.vue";

const testProps = {
	icon: "qrcode",
	color: "red",
	centered: true,
};

describe("@/components/topbar/PopupIcon", () => {
	it("contains an icon", () => {
		const wrapper = mount(PopupIcon as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});
		expect(wrapper.find(".v-icon").exists()).toBe(true);
	});

	it("it pops up when it is clicked", async () => {
		const wrapper = mount(PopupIcon, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: testProps,
		});

		wrapper.find(".popup .icon-button").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".popup-content").classes()).toContain("visible");
		wrapper.find(".popup .icon-button").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".popup-content").classes()).not.toContain("visible");
	});
});
