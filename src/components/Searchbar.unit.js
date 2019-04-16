import { shallowMount } from "@vue/test-utils";
import Searchbar from "./Searchbar";

const searchBarComponent = {
	components: { Searchbar },
	data: () => ({
		value: "",
		placeholder: "Suche nach...",
	}),
	template: '<searchbar v-model="value" :placeholder="placeholder" />',
};

describe("@components/Searchbar", () => {
	it("exports a valid component", () => {
		expect(Searchbar).toBeAComponent();
	});

	it("Test if defaults render", () => {
		const wrapper = mount(searchBarComponent);
		expect(wrapper.find("input").exists()).toBe(true);
		expect(wrapper.find(".clear-btn").exists()).toBe(false);
	});

	it("Test clearing", () => {
		const testString = "test string";
		const wrapper = mount(searchBarComponent);
		expect(wrapper.find(".clear-btn").exists()).toBe(false);
		const inputField = wrapper.find("input");
		inputField.trigger("focus");
		inputField.setValue(testString);
		expect(wrapper.vm.value).toBe(testString);
		const clearButton = wrapper.find(".clear-btn");
		expect(clearButton.exists()).toBe(true);
		clearButton.trigger("click");
		expect(inputField.element.value).toBe("");
	});
});
