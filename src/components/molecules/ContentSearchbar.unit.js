import ContentSearchbar from "./ContentSearchbar";

// const searchBarComponent = {
// 	components: { ContentSearchbar },
// 	data: () => ({
// 		value: "",
// 		placeholder: "Suche nach...",
// 	}),
// 	template: '<searchbar v-model="value" :placeholder="placeholder" />',
// };

describe("@components/molecules/ContentSearchbar", () => {
	it(...isValidComponent(ContentSearchbar));

	// it("Test if defaults render", async () => {
	// 	const wrapper = mount(searchBarComponent);
	// 	expect(wrapper.find("input").exists()).toBe(true);
	// 	expect(wrapper.find(".clear-btn").exists()).toBe(false);
	// });
	//
	// it("typing updates the v-model", async () => {
	// 	const testString = "teststring";
	// 	const wrapper = mount(searchBarComponent);
	// 	const inputField = wrapper.find("input");
	// 	expect(wrapper.vm.value).toBe("");
	// 	inputField.trigger("focus");
	// 	inputField.setValue(testString);
	// 	expect(wrapper.vm.value).toBe(testString);
	// });
	//
	// it("clear button should only be visible when input is focused", async () => {
	// 	const wrapper = mount(searchBarComponent);
	// 	wrapper.vm.value = "test string";
	// 	expect(wrapper.find(".clear-btn").exists()).toBe(false);
	// 	wrapper.find("input").trigger("focus");
	// 	await wrapper.vm.$nextTick();
	// 	expect(wrapper.find(".clear-btn").exists()).toBe(true);
	// });
	//
	// it("clear button should only be visible when input has text", async () => {
	// 	const wrapper = mount(searchBarComponent, {
	// 		...createComponentMocks({ stubs: { transition: true } }),
	// 	});
	// 	wrapper.find("input").trigger("focus");
	// 	wrapper.vm.value = "testString";
	// 	await wrapper.vm.$nextTick();
	// 	expect(wrapper.find(".clear-btn").exists()).toBe(true);
	// 	wrapper.vm.value = "";
	// 	await wrapper.vm.$nextTick();
	// 	expect(wrapper.find(".clear-btn").exists()).toBe(false);
	// });
	//
	// it("test clearing", async () => {
	// 	const wrapper = mount(searchBarComponent);
	// 	wrapper.vm.value = "test string";
	// 	wrapper.find("input").trigger("focus");
	// 	await wrapper.vm.$nextTick();
	// 	const clearButton = wrapper.find(".clear-btn");
	// 	clearButton.trigger("click");
	// 	expect(wrapper.vm.value).toBe("");
	// });
});
