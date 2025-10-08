import InfoMessage from "./InfoMessage.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@/components/atoms/InfoMessage", () => {
	const expectedMessage = "This is some useful information";
	const setup = (type?: "bc-info" | "bc-success" | "bc-warning" | "bc-error") => {
		const wrapper = mount(InfoMessage, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: { message: expectedMessage, type },
		});

		return { wrapper };
	};

	it("shows the message", async () => {
		const defaultType = "bc-info";
		const { wrapper } = setup();

		expect(wrapper.element.className).toContain(defaultType);
		expect(wrapper.find("div.message").element.textContent?.trim()).toBe(expectedMessage);
	});

	it("has correct styling class", async () => {
		const expectedClass = "bc-error";
		const { wrapper } = setup(expectedClass);

		expect(wrapper.element.className).toContain(expectedClass);
	});
});
