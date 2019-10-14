import BaseModalScroll from "./BaseModalScroll";
import { shallowMount } from "@vue/test-utils";

describe("@components/BaseModalScroll", () => {
	it(...isValidComponent(BaseModalScroll));
});

it("Render with some slots", () => {
	const wrapper = shallowMount(BaseModalScroll, {
		slots: {
			header: "header",
			body: "body",
			footer: "footer",
		},
	});
	expect(wrapper.find(".modal-header").text()).toBe("header");
	expect(wrapper.find(".modal-body").text()).toBe("body");
	expect(wrapper.find(".modal-footer").text()).toBe("footer");
});

it("Renders BaseModal", () => {
	const wrapper = shallowMount(BaseModalScroll);
	expect(wrapper.contains("base-modal-stub")).toBe(true);
});
