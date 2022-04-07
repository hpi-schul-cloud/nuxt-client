import { mount } from "@vue/test-utils";
import PopupIconInitials from "./PopupIconInitials";

const getWrapper = (props, options) => {
	return mount(PopupIconInitials, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/legacy/PopupIconInitials", () => {
	it(...isValidComponent(PopupIconInitials));

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
