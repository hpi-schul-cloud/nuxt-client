import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { DOMWrapper, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import ContextMenu from "./ContextMenu.vue";

const actions = [
	{ event: "event1", text: "testText1" },
	{ event: "event2", text: "testText2" },
	{ event: "event3", text: "testText3" },
];

const hasWrapperFocus = (wrapper?: DOMWrapper<Element>) => {
	return wrapper?.element === document.activeElement;
};

const getWrapper = ({ options = {}, additionalProps = {} } = {}) => {
	return mount(ContextMenu, {
		global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		props: {
			show: true,
			actions,
			...additionalProps,
		},
		...options,
	});
};

const getAttachToOptions = () => {
	const div = document.createElement("div");
	document.body.appendChild(div);
	return { options: { attachTo: div } };
};

describe("@/components/molecules/ContextMenu", () => {
	it("Renders all action buttons", () => {
		const wrapper = getWrapper();

		expect(
			wrapper.findAll(".context-menu__button:not(.context-menu__button-close)")
		).toHaveLength(actions.length);
	});

	it("Emits defined event when clicked", () => {
		// avoid vue warn that test events are not declared
		const consoleWarnSpy = vi
			.spyOn(console, "warn")
			.mockImplementation(vi.fn());

		const wrapper = getWrapper();

		expect.assertions(2 * actions.length);
		const buttons = wrapper.findAll(
			".context-menu__button:not(.context-menu__button-close)"
		);

		for (let i = 0; i < buttons.length; i += 1) {
			const button = buttons.at(i);
			const event = actions.find((a) => a.text === button?.text())?.event;
			button?.trigger("click");
			expect(wrapper.emitted(event ?? "")).toHaveLength(1);
			expect(wrapper.emitted(event ?? "")?.[0][0]).toBeUndefined();
		}

		consoleWarnSpy.mockRestore();
	});

	it("emits (update:show false) event when button gets clicked", async () => {
		// avoid vue warn that test event is not declared
		const consoleWarnSpy = vi
			.spyOn(console, "warn")
			.mockImplementation(vi.fn());

		vi.useFakeTimers();
		const wrapper = getWrapper();
		await wrapper.find(".context-menu__button").trigger("click");

		vi.runAllTimers();

		const emitted = wrapper.emitted("update:show");
		expect(emitted).toHaveLength(1);
		expect(emitted).toStrictEqual([[false]]);

		consoleWarnSpy.mockRestore();
	});

	it("emits (update:show false) event when ESC Keys gets pressed", async () => {
		const wrapper = getWrapper(getAttachToOptions());
		expect(wrapper.emitted("update:show")).toBeUndefined();
		window.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", keyCode: 27 })
		);
		expect(wrapper.emitted("update:show")).toHaveLength(1);
		expect(wrapper.emitted("update:show")).toStrictEqual([[false]]);
	});

	describe("click outside", () => {
		it("triggers event on click outside d", async () => {
			// Mount Menu wrapper to have something to click outside
			const emptyNode = "<!--v-if-->";
			const wrapper = mount(
				{
					template: `
					<div id="container">
						<div data-testid="outside" class="outside">Outside</div>
						<ContextMenu data-testid="testid" class="ctxmenu" :actions="actions" :show.sync="show"></ContextMenu>
					</div>
				`,
				},
				{
					data() {
						return { show: true, actions };
					},
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
						components: { ContextMenu },
					},
					...getAttachToOptions(),
				}
			);

			const outsideElement = wrapper.find(".outside");
			await outsideElement.trigger("click");
			const contextElement = wrapper.find(".ctxmenu");

			expect(contextElement.element.innerHTML).toContain(emptyNode);
		});

		it("does not trigger event on click outside if noClose=true", async () => {
			// Mount Menu wrapper to have something to click outside
			const wrapper = mount(
				{
					template: `
					<div>
					<div class="outside">Outside</div>
					<ContextMenu class="ctxmenu" :actions="actions" :show.sync="show" :noClose="true"></ContextMenu>
					</div>
				`,
				},
				{
					data() {
						return { show: true, actions };
					},
					global: {
						plugins: [createTestingVuetify(), createTestingI18n()],
						components: { ContextMenu },
					},
					...getAttachToOptions(),
				}
			);
			const menu = wrapper.findComponent(ContextMenu);
			const outsideElement = wrapper.find(".outside");
			await outsideElement.trigger("click");
			expect(menu.emitted("update:show")).toBeUndefined();
		});
	});

	describe("anchor positions", () => {
		it.each([
			["bottom-left", "", "0px", "0px", ""],
			["top-left", "0px", "", "0px", ""],
			["top-right", "0px", "", "", "0px"],
			["bottom-right", "", "0px", "", "0px"],
		])(
			"menu gets positioned correctly by anchor attribute %s",
			async (anchor, top, bottom, left, right) => {
				const wrapper = getWrapper({
					additionalProps: { anchor },
				});
				const menuElement = wrapper.find(".context-menu").element;
				const menuStyles = window.getComputedStyle(menuElement);

				expect(menuStyles.top).toContain(top);
				expect(menuStyles.bottom).toContain(bottom);
				expect(menuStyles.left).toContain(left);
				expect(menuStyles.right).toContain(right);
			}
		);

		it("should throw an error for invalid anchor positions", async () => {
			const consoleWarnSpy = vi
				.spyOn(console, "warn")
				.mockImplementation(vi.fn());

			expect(() => {
				getWrapper({
					additionalProps: { anchor: "top-bottom" },
				});
			}).toThrow(new Error("anchor is not defined"));

			consoleWarnSpy.mockRestore();
		});
	});

	describe("a11y", () => {
		it("first element get's focused on mount", async () => {
			const wrapper = getWrapper(getAttachToOptions());
			await nextTick();
			await nextTick();
			const button = wrapper.find(".context-menu__button");
			expect(hasWrapperFocus(button)).toBe(true);
		});

		it("arrow up keeps focus on first element if already focused", async () => {
			const wrapper = getWrapper(getAttachToOptions());
			await nextTick();
			const button = wrapper.find(".context-menu__button");
			button.trigger("focus");
			expect(hasWrapperFocus(button)).toBe(true);
			button.trigger("keydown.up");
			await nextTick();
			expect(hasWrapperFocus(button)).toBe(true);
		});

		it("arrow up focuses previous button", async () => {
			const wrapper = getWrapper(getAttachToOptions());
			await nextTick();
			const buttons = wrapper.findAll(".context-menu__button");

			expect(buttons).toHaveLength(3);

			for (let i = buttons.length - 1; i > 1; i -= 1) {
				const currentButton = buttons.at(i);
				const prevButton = buttons.at(i - 1);

				currentButton?.trigger("keydown.up");
				await nextTick();
				expect(hasWrapperFocus(currentButton)).toBe(false);
				expect(hasWrapperFocus(prevButton)).toBe(true);
			}
		});

		it("arrow down focuses next button", async () => {
			const wrapper = getWrapper(getAttachToOptions());
			await nextTick();
			const buttons = wrapper.findAll(".context-menu__button");

			// - 2 (-1 for length offset and another -1 for close button)
			for (let i = 0; i < buttons.length - 2; i += 1) {
				const currentButton = buttons.at(i);
				const nextButton = buttons.at(i + 1);
				expect(hasWrapperFocus(currentButton)).toBe(true);
				expect(hasWrapperFocus(nextButton)).toBe(false);
				currentButton?.trigger("keydown.down");
				await nextTick();
				expect(hasWrapperFocus(currentButton)).toBe(false);
				expect(hasWrapperFocus(nextButton)).toBe(true);
			}
		});
	});
});
