import ContextMenu from "./ContextMenu";
import mergeDeep from "@utils/merge-deep";

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
	return wrapper.element === document.activeElement;
};

const getWrapper = (options = {}) =>
	mount(
		ContextMenu,
		mergeDeep(
			{
				...createComponentMocks({ i18n: true }),
				propsData: {
					show: true,
					actions,
				},
			},
			options
		)
	);

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

		expect(
			wrapper.findAll(".context-menu__button:not(.context-menu__button-close)")
		).toHaveLength(actions.length);
		expect(wrapper.findAll(".context-menu__button-close")).toHaveLength(1);
	});

	it("Emits defined event when clicked", () => {
		const wrapper = getWrapper();

		expect.assertions(2 * actions.length);
		const buttons = wrapper.findAll(
			".context-menu__button:not(.context-menu__button-close)"
		);
		for (let i = 0; i < buttons.length; i += 1) {
			const button = buttons.at(i);
			const { event } = actions.find((a) => a.text === button.text());
			button.trigger("click");
			expect(wrapper.emitted(event)).toHaveLength(1);
			expect(wrapper.emitted(event)[0][0]).toBeUndefined();
		}
	});

	it("emits (update:show false) event when button gets clicked", async () => {
		const wrapper = getWrapper();
		const button = wrapper.find(".context-menu__button");
		button.trigger("click");
		// close event is delayed by 300ms
		await wait(350);
		expect(wrapper.emitted("update:show")).toHaveLength(1);
		expect(wrapper.emitted("update:show")).toStrictEqual([[false]]);
	});

	it("emits (update:show false) event when ESC Keys gets pressed", async () => {
		const wrapper = getWrapper({
			attachToDocument: true,
		});
		expect(wrapper.emitted("update:show")).toBeUndefined();
		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", keyCode: 27 })
		);
		expect(wrapper.emitted("update:show")).toHaveLength(1);
		expect(wrapper.emitted("update:show")).toStrictEqual([[false]]);
		wrapper.destroy();
	});

	describe("click outside", () => {
		it("triggers event on click outside", async () => {
			// Mount Menu wrapper to have something to click outside
			const wrapper = mount(
				{
					data: () => ({ show: true, actions }),
					template: `
					<div>
					<div class="outside">Outside</div>
					<ContextMenu class="ctxmenu" :actions="actions" :show.sync="show"></ContextMenu>
					</div>
				`,
					components: { ContextMenu },
					...createComponentMocks({ i18n: true }),
				},
				{ attachToDocument: true }
			);
			const Menu = wrapper.find(".ctxmenu");
			// wait because ctxmenu is not reacting to clicks outside immediatly
			await wait(0);
			wrapper.find(".outside").trigger("click");
			expect(Menu.emitted("update:show")).toHaveLength(1);
			expect(Menu.emitted("update:show")).toStrictEqual([[false]]);
			wrapper.destroy();
		});

		it("does not trigger event on click outside if noClose=true", async () => {
			// Mount Menu wrapper to have something to click outside
			const wrapper = mount(
				{
					data: () => ({ show: true, actions }),
					template: `
					<div>
					<div class="outside">Outside</div>
					<ContextMenu class="ctxmenu" :actions="actions" :show.sync="show" :noClose="true"></ContextMenu>
					</div>
				`,
					components: { ContextMenu },
					...createComponentMocks({ i18n: true }),
				},
				{ attachToDocument: true }
			);
			const Menu = wrapper.find(".ctxmenu");
			// wait because ctxmenu is not reacting to clicks outside immediatly
			await wait(0);
			wrapper.find(".outside").trigger("click");
			expect(Menu.emitted("update:show")).toBeUndefined();
			wrapper.destroy();
		});
	});

	describe("anchor positions", () => {
		it.each([
			["bottom-left", "", 0, 0, ""],
			["top-left", 0, "", 0, ""],
			["top-right", 0, "", "", 0],
			["bottom-right", "", 0, "", 0],
		])(
			"menu gets positioned correctly by anchor attribute %s",
			async (anchor, top, bottom, left, right) => {
				const wrapper = getWrapper({
					propsData: {
						anchor,
					},
				});
				const menuStyles = wrapper.find(".context-menu").element.style;
				expect(menuStyles.top).toContain(top);
				expect(menuStyles.bottom).toContain(bottom);
				expect(menuStyles.left).toContain(left);
				expect(menuStyles.right).toContain(right);
			}
		);

		it("should throw an error for invalid anchor positions", async () => {
			const consoleError = jest.spyOn(console, "error").mockImplementation();
			try {
				getWrapper({
					propsData: {
						anchor: "top-bottom",
					},
				});
			} catch (error) {
				expect(error).toStrictEqual(new Error("anchor is not defined"));
			}
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringMatching(
					/^\[Vue warn\]\: Invalid prop\: custom validator check failed for prop \"anchor\"\./
				)
			);
		});
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
			// wait 2 times because nextTick is also used in the component itself
			await wrapper.vm.$nextTick();
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

			expect(buttons.wrappers).toHaveLength(4);

			buttons.at(buttons.length - 1).element.focus();
			await wrapper.vm.$nextTick();

			for (let i = buttons.length - 1; i > 1; i -= 1) {
				const currentButton = buttons.at(i);
				const prevButton = buttons.at(i - 1);

				expect(hasWrapperFocus(currentButton)).toBe(true);
				expect(hasWrapperFocus(prevButton)).toBe(false);
				currentButton.trigger("keydown.up");
				expect(hasWrapperFocus(currentButton)).toBe(false);
				expect(hasWrapperFocus(prevButton)).toBe(true);
			}
		});

		it("arrow down focuses next button", async () => {
			const wrapper = getWrapper();
			await wrapper.vm.$nextTick();
			const buttons = wrapper.findAll(".context-menu__button");
			// - 2 (-1 for length offset and another -1 for close button)
			for (let i = 0; i < buttons.length - 2; i += 1) {
				const currentButton = buttons.at(i);
				const nextButton = buttons.at(i + 1);
				expect(hasWrapperFocus(currentButton)).toBe(true);
				expect(hasWrapperFocus(nextButton)).toBe(false);
				currentButton.trigger("keydown.down");
				expect(hasWrapperFocus(currentButton)).toBe(false);
				expect(hasWrapperFocus(nextButton)).toBe(true);
			}
		});
	});
});
