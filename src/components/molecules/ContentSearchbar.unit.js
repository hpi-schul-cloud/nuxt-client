import ContentSearchbar from "./ContentSearchbar";

const getWrapper = () => {
	return mount(ContentSearchbar, {
		...createComponentMocks({ i18n: true, vuetify: true }),
		template:
			'<content-searchbar v-model="value" :placeholder="placeholder" />',
	});
};

describe("@components/molecules/ContentSearchbar", () => {
	it(...isValidComponent(ContentSearchbar));

	it("Defaults render", async () => {
		const wrapper = getWrapper();
		expect(wrapper.find("input").exists()).toBe(true);
		expect(wrapper.find(".search__container--icon").exists()).toBe(true);
	});

	it("Emits input event on any input value change", async () => {
		const testInput = "some test input";
		const wrapper = getWrapper();
		const input = wrapper.find('input[type="text"]');
		input.setValue(testInput);
		expect(wrapper.emitted("input")[0]).toStrictEqual([testInput]);
	});

	it("Emits keyup:enter event on ENTER keydown", async () => {
		const wrapper = getWrapper();
		const input = wrapper.find('input[type="text"]');
		input.trigger("keyup.enter");
		expect(wrapper.emitted("keyup:enter")).toHaveLength(1);
	});

	it("Switches to active input and clears value when ESCAPE key is pressed", async () => {
		const wrapper = getWrapper();
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

	it("renders search icon when input is empty", async () => {
		const wrapper = getWrapper();
		expect(wrapper.find(".v-icon").exists()).toBe(true);
	});
});
