import { ColorOverlay } from "@ui-color-overlay";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("ColorOverlay", () => {
	const setup = (props: {
		isOverlayDisabled: boolean;
		color?: string;
		opacity?: number;
	}) => {
		document.body.setAttribute("data-app", "true");

		const slotContent = "<div class='slot-content'>test-slot-content</div>";
		const propsData = {
			isOverlayDisabled: props.isOverlayDisabled,
			color: props.color,
			opacity: props.opacity,
		};
		const wrapper = shallowMount(ColorOverlay, {
			attachTo: document.body,
			propsData,
			slots: {
				default: slotContent,
			},
		});

		return {
			wrapper,
			...propsData,
		};
	};

	describe("when isOverlayDisabled is false", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isOverlayDisabled: false });

			const colorOverlay = wrapper.findComponent(ColorOverlay);

			expect(colorOverlay.exists()).toBe(true);
		});

		it("should render slot content", () => {
			const { wrapper } = setup({ isOverlayDisabled: false });

			expect(wrapper.text()).toContain("test-slot-content");
		});

		describe("when the container is clicked", () => {
			it("should emit on:action event", () => {
				const { wrapper } = setup({ isOverlayDisabled: false });

				const container = wrapper.find(".display-container");
				container.trigger("click");

				expect(wrapper.emitted("on:action")).toHaveLength(1);
			});
		});

		describe("when the overlay is clicked", () => {
			it("should emit on:action event", async () => {
				const { wrapper } = setup({ isOverlayDisabled: false });

				wrapper.trigger("focusin");
				await nextTick();

				const overlay = wrapper.find(".display-overlay");

				expect(overlay.exists()).toBe(true);
				expect(overlay.isVisible()).toBe(true);

				overlay.trigger("click");

				expect(wrapper.emitted("on:action")).toHaveLength(1);
			});
		});

		describe("when the image is focused (using focusin and focusout)", () => {
			it("should show overlay and hide it, when not ", async () => {
				const { wrapper } = setup({ isOverlayDisabled: false });

				wrapper.trigger("focusin");
				await nextTick();

				const overlayFocusIn = wrapper.find(".display-overlay");

				expect(overlayFocusIn.exists()).toBe(true);
				expect(overlayFocusIn.isVisible()).toBe(true);

				wrapper.trigger("focusout");
				await nextTick();

				const overlayFocusOut = wrapper.find(".display-overlay");

				expect(overlayFocusOut.exists()).toBe(false);
			});
		});

		describe("when the container is focused (using focus and blur)", () => {
			it("should show overlay and hide it, when not ", async () => {
				const { wrapper } = setup({ isOverlayDisabled: false });

				const container = wrapper.find(".display-container")
					.element as HTMLDivElement;

				expect(document.activeElement).toBe(document.body);

				container.focus();
				await nextTick();

				expect(document.activeElement).toBe(container);

				const overlay = wrapper.find(".display-overlay");

				expect(overlay.exists()).toBe(true);
				expect(overlay.isVisible()).toBe(true);

				container.blur();
				await nextTick();

				expect(document.activeElement).toBe(document.body);

				const overlayBlur = wrapper.find(".display-overlay");

				expect(overlayBlur.exists()).toBe(false);
			});
		});

		describe("when Enter key is pressed", () => {
			it("should emit on:action event", async () => {
				const { wrapper } = setup({ isOverlayDisabled: false });

				const container = wrapper.find(".display-container");
				container.trigger("keydown.enter");
				await nextTick();

				expect(wrapper.emitted("on:action")).toHaveLength(1);
			});
		});

		describe("when Space key is pressed", () => {
			it("should emit on:action event", async () => {
				const { wrapper } = setup({ isOverlayDisabled: false });

				const container = wrapper.find(".display-container");
				container.trigger("keydown.space");
				await nextTick();

				expect(wrapper.emitted("on:action")).toHaveLength(1);
			});
		});

		describe("when the user hovers over the image", () => {
			it("should show overlay and hide it, when not", async () => {
				const { wrapper } = setup({ isOverlayDisabled: false });

				wrapper.trigger("mouseenter");
				await nextTick();

				const overlayEnter = wrapper.find(".display-overlay");

				expect(overlayEnter.exists()).toBe(true);
				expect(overlayEnter.isVisible()).toBe(true);

				wrapper.trigger("mouseleave");
				await nextTick();

				const overlayLeave = wrapper.find(".display-overlay");

				expect(overlayLeave.exists()).toBe(false);
			});
		});

		describe("when color property is undefined", () => {
			it("should use default color value", async () => {
				// default color should be "var(--v-black-base)", BUT as these is
				// unknown here, we need to use "real" color values
				const color = "rgb(27, 27, 27)"; // equivalent to #1b1b1b
				const { wrapper } = setup({ isOverlayDisabled: false });

				wrapper.trigger("mouseenter");
				await nextTick();

				const overlay = wrapper.find(".display-overlay");

				expect(overlay.exists()).toBe(true);
				expect(overlay.isVisible()).toBe(true);

				const style = getComputedStyle(overlay.element);

				expect(style.getPropertyValue("background-color")).toBe(color);
			});
		});

		describe("when color property is defined", () => {
			it("should use defined color value", async () => {
				const color = "white";
				const { wrapper } = setup({ isOverlayDisabled: false, color });

				wrapper.trigger("mouseenter");
				await nextTick();

				const overlay = wrapper.find(".display-overlay");

				expect(overlay.exists()).toBe(true);
				expect(overlay.isVisible()).toBe(true);

				const style = getComputedStyle(overlay.element);

				expect(style.getPropertyValue("background-color")).toBe(color);
			});
		});

		describe("when opacity property is undefined", () => {
			it("should use default opacity value", async () => {
				const { wrapper } = setup({ isOverlayDisabled: false });
				const defaultOpacity = "0.2";

				wrapper.trigger("mouseenter");
				await nextTick();

				const overlay = wrapper.find(".display-overlay");

				expect(overlay.exists()).toBe(true);
				expect(overlay.isVisible()).toBe(true);

				const style = getComputedStyle(overlay.element);

				expect(style.getPropertyValue("opacity")).toBe(defaultOpacity);
			});
		});

		describe("when opacity property is defined", () => {
			it("should use defined opacity value", async () => {
				const opacity = 0.8;
				const { wrapper } = setup({ isOverlayDisabled: false, opacity });

				wrapper.trigger("mouseenter");
				await nextTick();

				const overlay = wrapper.find(".display-overlay");

				expect(overlay.exists()).toBe(true);
				expect(overlay.isVisible()).toBe(true);

				const style = getComputedStyle(overlay.element);

				expect(style.getPropertyValue("opacity")).toBe(opacity.toString());
			});
		});
	});

	describe("when isOverlayDisabled is true", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isOverlayDisabled: true });

			const colorOverlay = wrapper.findComponent(ColorOverlay);

			expect(colorOverlay.exists()).toBe(true);
		});

		it("should render slot content", () => {
			const { wrapper } = setup({ isOverlayDisabled: true });

			expect(wrapper.text()).toContain("test-slot-content");
		});

		describe("when the container is clicked", () => {
			it("should not emit on:action event", () => {
				const { wrapper } = setup({ isOverlayDisabled: true });

				const container = wrapper.find(".display-container");
				container.trigger("click");

				expect(wrapper.emitted("on:action")).toBeUndefined();
			});
		});

		describe("when the image is clicked", () => {
			it("should not emit on:action event, ", () => {
				const { wrapper } = setup({ isOverlayDisabled: true });

				const slotContent = wrapper.find(".slot-content");
				slotContent.trigger("click");

				expect(wrapper.emitted("on:action")).toBeUndefined();
			});
		});

		describe("when the image is focused (using focusin and focusout)", () => {
			it("should not show overlay", async () => {
				const { wrapper } = setup({ isOverlayDisabled: true });

				wrapper.trigger("focusin");
				await nextTick();

				const overlayFocusIn = wrapper.find(".display-overlay");

				expect(overlayFocusIn.exists()).toBe(false);

				wrapper.trigger("focusout");
				await nextTick();

				const overlayFocusOut = wrapper.find(".display-overlay");

				expect(overlayFocusOut.exists()).toBe(false);
			});
		});

		describe("when the image is focused (using focus and blur)", () => {
			it("should not show overlay", async () => {
				const { wrapper } = setup({ isOverlayDisabled: true });

				const container = wrapper.find(".display-container")
					.element as HTMLDivElement;

				expect(document.activeElement).toBe(document.body);

				container.focus();
				await nextTick();

				expect(document.activeElement).toBe(container);

				const overlayFocus = wrapper.find(".display-overlay");

				expect(overlayFocus.exists()).toBe(false);

				container.blur();
				await nextTick();

				expect(document.activeElement).toBe(document.body);

				const overlayBlur = wrapper.find(".display-overlay");

				expect(overlayBlur.exists()).toBe(false);
			});
		});

		describe("when Enter key is pressed", () => {
			it("should not emit on:action event", async () => {
				const { wrapper } = setup({ isOverlayDisabled: true });

				const container = wrapper.find(".display-container");
				container.trigger("keydown.enter");
				await nextTick();

				expect(wrapper.emitted("on:action")).toBeUndefined();
			});
		});

		describe("when Space key is pressed", () => {
			it("should not emit on:action event", async () => {
				const { wrapper } = setup({ isOverlayDisabled: true });

				const container = wrapper.find(".display-container");
				container.trigger("keydown.space");
				await nextTick();

				expect(wrapper.emitted("on:action")).toBeUndefined();
			});
		});

		describe("when the user hovers over the image", () => {
			it("should not show overlay", async () => {
				const { wrapper } = setup({ isOverlayDisabled: true });

				wrapper.trigger("mouseenter");
				await nextTick();

				const overlayEnter = wrapper.find(".display-overlay");

				expect(overlayEnter.exists()).toBe(false);

				wrapper.trigger("mouseleave");
				await nextTick();

				const overlayLeave = wrapper.find(".display-overlay");

				expect(overlayLeave.exists()).toBe(false);
			});
		});
	});
});
