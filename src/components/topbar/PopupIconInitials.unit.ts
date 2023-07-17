import Vue from "vue";
import { MountOptions, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import PopupIconInitials from "./PopupIconInitials.vue";

const getWrapper = (props: object, options?: object) => {
	return mount(PopupIconInitials as MountOptions<Vue>, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@/components/topbar/PopupIconInitials", () => {
	it("computes the initals from first- and lastname", () => {
		const wrapper = getWrapper({
			firstName: "Max",
			lastName: "Mustermann",
			userRole: "teacher",
		});
		expect(wrapper.find(".icon").text()).toBe("MM");
	});

	it("it pops up when it is clicked", async () => {
		const wrapper = getWrapper({
			firstName: "Max",
			lastName: "Mustermann",
			userRole: "teacher",
		});

		const btn = wrapper.find("[data-testid='initials']");
		expect(wrapper.find("[data-testid='initials-popup']").exists()).toBe(false);

		await btn.trigger("click");
		expect(wrapper.find("[data-testid='initials-popup']").exists()).toBe(true);

		await btn.trigger("click");
		expect(wrapper.find("[data-testid='initials-popup']").exists()).toBe(false);
	});
});
