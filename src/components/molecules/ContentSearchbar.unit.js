import ContentSearchbar from "./ContentSearchbar";

const contentSearchbarComponent = {
	components: { ContentSearchbar },
	data: () => ({
		value: "",
		placeholder: "Suche nach...",
	}),
	template: '<content-searchbar v-model="value" :placeholder="placeholder" />',
};

describe("@components/molecules/ContentSearchbar", () => {
	it(...isValidComponent(ContentSearchbar));

	it("Defaults render", async () => {
		const wrapper = mount(contentSearchbarComponent);
		expect(wrapper.find("input").exists()).toBe(true);
		expect(wrapper.find(".search__container--icon").exists()).toBe(true);
	});

	it("Updates the v-model when typing", async () => {
		const testString = "teststring";
		const wrapper = mount(contentSearchbarComponent);
		const inputField = wrapper.find("input");
		expect(wrapper.vm.value).toBe("");
		inputField.trigger("focus");
		inputField.setValue(testString);
		expect(wrapper.vm.value).toBe(testString);
	});

	it("Emits input event on any input value change", async () => {
		const testInput = "some test input";
		const wrapper = mount(ContentSearchbar);
		const input = wrapper.find('input[type="text"]');
		input.setValue(testInput);
		expect(wrapper.emitted("input")[0]).toStrictEqual([testInput]);
	});

	it("Emits keyup:enter event on ENTER keydown", async () => {
		const wrapper = mount(ContentSearchbar);
		const input = wrapper.find('input[type="text"]');
		input.trigger("keyup.enter");
		expect(wrapper.emitted("keyup:enter")).toHaveLength(1);
	});

	it("Switches to active input and clears value when ESCAPE key is pressed", async () => {
		const wrapper = mount(ContentSearchbar, { attachToDocument: true });
		const testValue = "testValue";
		wrapper.setData({ isActive: false, inputValue: testValue });
		expect(wrapper.vm.isActive).toBe(false);
		expect(wrapper.vm.inputValue).toBe(testValue);
		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", keyCode: 27 })
		);
		expect(wrapper.vm.isActive).toBe(true);
		expect(wrapper.vm.inputValue).toBe("");
	});

	it("Switches to active input and clears value when BACKSPACE key is pressed", async () => {
		const wrapper = mount(ContentSearchbar, { attachToDocument: true });
		const testValue = "testValue";
		wrapper.setData({ isActive: false, inputValue: testValue });
		expect(wrapper.vm.isActive).toBe(false);
		expect(wrapper.vm.inputValue).toBe(testValue);
		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Backspace", keyCode: 8 })
		);
		expect(wrapper.vm.isActive).toBe(true);
		expect(wrapper.vm.inputValue).toBe("");
	});
});
