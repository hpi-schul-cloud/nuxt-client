import { mount } from "@vue/test-utils";
import PopupIcon from "./PopupIcon.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("@/components/topbar/PopupIcon", () => {
	const setup = () => {
		const wrapper = mount(PopupIcon, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				icon: "qrcode",
				color: "red",
				centered: true,
			},
		});

		return { wrapper };
	};
	it("contains an icon", () => {
		const { wrapper } = setup();
		expect(wrapper.find(".popup .v-icon").exists()).toBe(true);
	});

	it("it pops up when it is clicked", async () => {
		const { wrapper } = setup();
		wrapper.find(".popup .icon-button").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".popup-content").classes()).toContain("visible");
		wrapper.find(".popup .icon-button").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".popup-content").classes()).not.toContain("visible");
	});
});
