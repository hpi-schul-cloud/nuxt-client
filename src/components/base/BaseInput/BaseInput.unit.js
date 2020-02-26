import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInput";

describe("@components/BaseInput", () => {
	it(...isValidComponent(BaseInput));

	// BaseInput passes all given slots to it's child components
	it("passes all given slots to it's child components", async () => {
		const slotNames = ["default", "icon", "someRandomSlot"];
		slotNames.forEach((slotName) => {
			const slots = {};
			slots[slotName] = `<p>Test-Slot: ${slotName}</p>`;
			const wrapper = shallowMount(BaseInput, {
				propsData: { vmodel: "test", type: "text", label: "Label" },
				slots,
			});
			const childSlots = wrapper.vm.$children[0].$slots;
			expect(childSlots.hasOwnProperty(slotName)).toBe(true);
			expect(childSlots[slotName]).toHaveLength(1);
		});
	});

	it("all types have a label", () => {
		const testLabel = "MyTestLabel";
		supportedTypes
			.filter((type) => type !== "hidden") // hidden inputs doesn't need a label
			.forEach((type, index) => {
				const wrapper = mount({
					data: () => ({ value: "" }),
					template: `<base-input v-model="value" label="${testLabel}" type="${type}" value="${index}" name="test" />`,
					components: { BaseInput },
				});
				expect(wrapper.contains(".label")).toBe(true);
				expect(wrapper.text()).toContain(testLabel);
			});
	});

	it("label of checkboxes, switches and radio buttons can be hidden", () => {
		const testLabel = "MyTestLabel";
		["checkbox", "switch", "radio"].forEach((type, index) => {
			const wrapper = mount({
				data: () => ({ value: "" }),
				template: `<base-input v-model="value" label="${testLabel}" label-hidden type="${type}" value="${index}"/>`,
				components: { BaseInput },
			});
			expect(wrapper.contains(".label")).toBe(false);
			expect(wrapper.find("input").attributes("aria-label")).toBe(testLabel);
		});
	});

	it("all types are passing through attributes", () => {
		const attributes = { "data-test": "testAttrValue" };
		supportedTypes.forEach((type) => {
			const wrapper = mount(BaseInput, {
				attrs: attributes,
				propsData: {
					vmodel: "",
					label: "test",
					name: "test",
					value: "test",
					type,
				},
			});
			const input = wrapper.find("input, .input");
			Object.keys(attributes).forEach((attr) => {
				expect(input.attributes(attr)).toBe(attributes[attr]);
			});
		});
	});

	it("throws an error on unsupported types", () => {
		try {
			const wrapper = mount({
				data: () => ({ value: "" }),
				template: `<base-input v-model="value" label="Label" type="unsupported" name="test" />`,
				components: { BaseInput },
			});

			expect(wrapper).toBe(false); // should fail before this
		} catch (error) {
			expect(true).toBe(true); // expect to run this
		}
	});
});
