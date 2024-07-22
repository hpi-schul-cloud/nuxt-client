import { mount } from "@vue/test-utils";
import PopupIconInitials from "./PopupIconInitials.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("@/components/topbar/PopupIconInitials", () => {
	const setup = (props: object, options?: object) => {
		const wrapper = mount(PopupIconInitials, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			...options,
		});

		return { wrapper };
	};

	it("computes the initals from first- and lastname", () => {
		const { wrapper } = setup({
			firstName: "Max",
			lastName: "Mustermann",
			userRole: "teacher",
		});
		expect(wrapper.findComponent({ name: "v-btn" }).text()).toBe("MM");
	});

	it("it pops up when it is clicked", async () => {
		const { wrapper } = setup({
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
