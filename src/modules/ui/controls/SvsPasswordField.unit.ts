import SvsPasswordField from "./SvsPasswordField.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { nextTick } from "vue";
import { VTextField } from "vuetify/components";

describe("SvsPasswordField", () => {
	const setup = () =>
		mount(SvsPasswordField, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("should initially be of type password", () => {
		const wrapper = setup();
		const input = wrapper.find("input");

		expect(input.attributes("type")).toBe("password");
	});

	it("should toggle visibility when append icon is clicked", async () => {
		const wrapper = setup();
		const input = wrapper.find("input");

		wrapper.getComponent(VTextField).vm.$emit("click:append-inner");
		await nextTick();

		expect(input.attributes("type")).toBe("text");

		wrapper.getComponent(VTextField).vm.$emit("click:append-inner");
		await nextTick();

		expect(input.attributes("type")).toBe("password");
	});
});
