import Searchbar from "./Searchbar";

const searchBarComponent = {
	components: { Searchbar },
	data: () => ({
		value: "",
		placeholder: "Suche nach...",
	}),
	template: '<searchbar v-model="value" :placeholder="placeholder" />',
};

describe("@components/molecules/Searchbar", () => {
	it(...isValidComponent(Searchbar));

	it("Test if defaults render", () => {
		const wrapper = mount(searchBarComponent);
		expect(wrapper.find("input").exists()).toBe(true);
		expect(wrapper.find(".clear-btn").exists()).toBe(false);
	});

	it("typing updates the v-model", () => {
		const testString = "teststring";
		const wrapper = mount(searchBarComponent);
		const inputField = wrapper.find("input");
		expect(wrapper.vm.value).toBe("");
		inputField.trigger("focus");
		inputField.setValue(testString);
		expect(wrapper.vm.value).toBe(testString);
	});

	it("clear button should only be visible when input is focused", () => {
		const wrapper = mount(searchBarComponent);
		wrapper.vm.value = "test string";
		expect(wrapper.find(".clear-btn").exists()).toBe(false);
		wrapper.find("input").trigger("focus");
		expect(wrapper.find(".clear-btn").exists()).toBe(true);
	});

	it("clear button should only be visible when input has text", () => {
		const wrapper = mount(searchBarComponent);
		wrapper.find("input").trigger("focus");
		wrapper.vm.value = "testString";
		expect(wrapper.find(".clear-btn").exists()).toBe(true);
		wrapper.vm.value = "";
		expect(wrapper.find(".clear-btn").exists()).toBe(false);
	});

	it("test clearing", () => {
		const wrapper = mount(searchBarComponent);
		wrapper.vm.value = "test string";
		wrapper.find("input").trigger("focus");
		const clearButton = wrapper.find(".clear-btn");
		clearButton.trigger("click");
		expect(wrapper.vm.value).toBe("");
	});
});
