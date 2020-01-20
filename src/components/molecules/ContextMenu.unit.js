import ContextMenu from "./ContextMenu";

const actions = [
	{ event: "event1", text: "testText1" },
	{ event: "event2", text: "testText2" },
	{ event: "event3", text: "testText3" },
];

const wait = (duration) =>
	new Promise((resolve) => {
		setTimeout(resolve, duration);
	});

const hasWrapperFocus = (wrapper) => {
	return wrapper.element.matches(":focus");
};

const getWrapper = (options = {}) =>
	mount(ContextMenu, {
		...createComponentMocks({ i18n: true }),
		propsData: {
			show: true,
			actions,
		},
		...options,
	});

describe("@components/CardContextMenu", () => {
	it(...isValidComponent(ContextMenu));

	it("Renders all action buttons", () => {
		const wrapper = mount(ContextMenu, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				show: true,
				actions,
			},
		});

		expect(wrapper.findAll(".context-menu__button")).toHaveLength(
			actions.length
		);
	});

	it("Emits defined event when clicked", () => {
		const wrapper = getWrapper();

		expect.assertions(2 * actions.length);
		const buttons = wrapper.findAll(".context-menu__button");
		for (let i = 0; i < buttons.length; i += 1) {
			const button = buttons.at(i);
			const { event } = actions.find((a) => a.text === button.text());
			button.trigger("click");
			expect(wrapper.emitted(event)).toHaveLength(1);
			expect(wrapper.emitted(event)[0][0]).toBeUndefined();
		}
	});

	it("emits update:show event when button gets clicked", async () => {
		const wrapper = getWrapper();
		wrapper.vm.show = true;
		const button = wrapper.find(".context-menu__button");
		button.trigger("click");
		// close even is delayed by 300ms
		await wait(350);
		expect(wrapper.emitted("update:show")).toHaveLength(1);
		expect(wrapper.emitted("update:show")).toStrictEqual([[false]]);
	});

	describe("a11y", () => {
		it("has a focusable close button", () => {
			const wrapper = getWrapper();
			const closeButton = wrapper.find(".context-menu__button-close");
			closeButton.element.focus();
			closeButton.trigger("click");
			expect(wrapper.emitted("update:show")).toHaveLength(1);
			expect(wrapper.emitted("update:show")).toStrictEqual([[false]]);
		});

		it("first element get's focused on mount", async () => {
			const wrapper = getWrapper();
			await wrapper.vm.$nextTick();
			const buttons = wrapper.findAll(".context-menu__button");
			expect(hasWrapperFocus(buttons.at(0))).toBe(true);
		});

		it("arrow up keeps focus on first element if already focused", async () => {
			const wrapper = getWrapper();
			await wrapper.vm.$nextTick();
			const buttons = wrapper.findAll(".context-menu__button");
			buttons.at(0).element.focus();
			expect(hasWrapperFocus(buttons.at(0))).toBe(true);
			buttons.at(0).trigger("keydown.up");
			expect(hasWrapperFocus(buttons.at(0))).toBe(true);
		});

		it("arrow up focuses previous button", async () => {
			const wrapper = getWrapper();
			await wrapper.vm.$nextTick();
			const buttons = wrapper.findAll(".context-menu__button");
			buttons.at(buttons.length - 1).element.focus();
			await wrapper.vm.$nextTick();

			for (let i = buttons.length - 2; i > 1; i -= 1) {
				expect(hasWrapperFocus(buttons.at(i))).toBe(true);
				expect(hasWrapperFocus(buttons.at(i - 1))).toBe(false);
				buttons.at(i).trigger("keydown.up");
				expect(hasWrapperFocus(buttons.at(i))).toBe(false);
				expect(hasWrapperFocus(buttons.at(i - 1))).toBe(true);
			}
		});

		it("arrow down focuses next button", async () => {
			const wrapper = getWrapper();
			await wrapper.vm.$nextTick();
			const buttons = wrapper.findAll(".context-menu__button");
			for (let i = 1; i < buttons.length - 2; i += 1) {
				expect(hasWrapperFocus(buttons.at(i - 1))).toBe(true);
				expect(hasWrapperFocus(buttons.at(i))).toBe(false);
				buttons.at(i - 1).trigger("keydown.down");
				expect(hasWrapperFocus(buttons.at(i))).toBe(true);
				expect(hasWrapperFocus(buttons.at(i - 1))).toBe(false);
			}
		});
	});
});
