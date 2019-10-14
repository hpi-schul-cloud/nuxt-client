import BaseModalActionSymbol from "./BaseModalActionSymbol";
import { shallowMount } from "@vue/test-utils";

describe("@components/BaseModalActionSymbol", () => {
	it(...isValidComponent(BaseModalActionSymbol));
});

it("Render with some slots", () => {
	const wrapper = shallowMount(BaseModalActionSymbol, {
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
	const wrapper = shallowMount(BaseModalActionSymbol);

	expect(wrapper.contains("base-modal-stub")).toBe(true);
});
