import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { InlineEditInteractionEvent } from "@/types/board/InlineEditInteractionEvent.symbol";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { flushPromises } from "@vue/test-utils";
import { Ref, ref } from "vue";

describe("BoardFocusHandler composable", () => {
	const columnId = "testColumnId";

	let target: Ref<HTMLButtonElement>;
	beforeEach(() => {
		target = ref(document.createElement("button"));
		target.value.tabIndex = 0;
		target.value.id = "targetId";
		document.body.appendChild(target.value);
	});

	it("should be defined", async () => {
		const { isFocused, isFocusWithin, isFocusContained } = mountComposable(() =>
			useBoardFocusHandler(columnId, target)
		);

		expect(isFocused).toBeDefined();
		expect(isFocusWithin).toBeDefined();
		expect(isFocusContained).toBeDefined();
	});

	it("should extract 'setFocus' and 'focusedId' if only 'id' is passed", async () => {
		const { setFocus, focusedId } = mountComposable(() => useBoardFocusHandler(columnId));

		expect(setFocus).toBeDefined();
		expect(focusedId).toBeDefined();
	});

	describe("forceFocus method", () => {
		const mockGetElementById = vi.fn();
		Object.defineProperty(global.document, "getElementById", {
			value: mockGetElementById,
		});
		it("should be extracted", async () => {
			const { forceFocus } = mountComposable(() => useBoardFocusHandler());

			expect(forceFocus).toBeDefined();
		});

		it("should call getElementById with 'targetId as argument", async () => {
			const { forceFocus } = mountComposable(() => useBoardFocusHandler());

			forceFocus("targetId");

			expect(mockGetElementById).toHaveBeenCalledWith("targetId");
		});
	});

	it("should be defined", async () => {
		const { isFocused, isFocusWithin, isFocusContained } = mountComposable(() =>
			useBoardFocusHandler(columnId, target)
		);

		expect(isFocused).toBeDefined();
		expect(isFocusWithin).toBeDefined();
		expect(isFocusContained).toBeDefined();
	});

	it("should focusable values be 'false' as default", async () => {
		const { isFocusWithin, isFocusContained } = mountComposable(() => useBoardFocusHandler(columnId, target));

		expect(isFocusWithin.value).toBe(false);
		expect(isFocusContained.value).toBe(false);
	});

	it("should set focusable values", async () => {
		const { isFocused, isFocusWithin, isFocusContained } = mountComposable(() =>
			useBoardFocusHandler(columnId, target)
		);

		expect(isFocused.value).toBe(false);
		expect(isFocusWithin.value).toBe(false);
		expect(isFocusContained.value).toBe(false);

		target.value.focus();

		expect(isFocused.value).toBe(true);
		expect(isFocusWithin.value).toBe(true);
		expect(isFocusContained.value).toBe(true);
	});

	describe("when onFocusReceived callback is provided", () => {
		describe("when the element is the currently focused board element on mount", () => {
			it("should call the callback", async () => {
				const elementId = "focus-handler-test-callback";
				const onFocusReceived = vi.fn();

				mountComposable(() => {
					const { setFocus } = useBoardFocusHandler();
					setFocus(elementId);
					return useBoardFocusHandler(elementId, target, onFocusReceived);
				});

				await flushPromises();

				expect(onFocusReceived).toHaveBeenCalledTimes(1);
			});

			it("should still focus the tracked DOM element", async () => {
				const elementId = "focus-handler-test-dom";
				const onFocusReceived = vi.fn();

				mountComposable(() => {
					const { setFocus } = useBoardFocusHandler();
					setFocus(elementId);
					return useBoardFocusHandler(elementId, target, onFocusReceived);
				});

				await flushPromises();

				expect(document.activeElement).toBe(target.value);
			});
		});

		describe("when the element is not the currently focused board element on mount", () => {
			it("should not call the callback", async () => {
				const onFocusReceived = vi.fn();

				mountComposable(() => useBoardFocusHandler("other-element-id", target, onFocusReceived));

				await flushPromises();

				expect(onFocusReceived).not.toHaveBeenCalled();
			});
		});
	});

	describe("when an inline interaction event fires within the element boundary", () => {
		it("should call onFocusReceived callback when provided", async () => {
			const interactionEvent = ref<{ x: number; y: number } | undefined>(undefined);
			const onFocusReceived = vi.fn();

			mountComposable(() => useBoardFocusHandler("interaction-test-callback", target, onFocusReceived), {
				global: { provide: { [InlineEditInteractionEvent]: interactionEvent } },
			});

			interactionEvent.value = { x: 0, y: 0 };
			await flushPromises();

			expect(onFocusReceived).toHaveBeenCalledTimes(1);
		});

		it("should not give DOM focus to the tracked element (callback case)", async () => {
			const interactionEvent = ref<{ x: number; y: number } | undefined>(undefined);
			const onFocusReceived = vi.fn();

			mountComposable(() => useBoardFocusHandler("interaction-test-dom-callback", target, onFocusReceived), {
				global: { provide: { [InlineEditInteractionEvent]: interactionEvent } },
			});

			interactionEvent.value = { x: 0, y: 0 };
			await flushPromises();

			expect(document.activeElement).not.toBe(target.value);
		});

		it("should not give DOM focus to the tracked element when no callback is provided (container case)", async () => {
			const interactionEvent = ref<{ x: number; y: number } | undefined>(undefined);

			mountComposable(() => useBoardFocusHandler("interaction-test-dom-no-callback", target), {
				global: { provide: { [InlineEditInteractionEvent]: interactionEvent } },
			});

			interactionEvent.value = { x: 0, y: 0 };
			await flushPromises();

			expect(document.activeElement).not.toBe(target.value);
		});

		it("should update focus tracking even when no callback is provided (container case)", async () => {
			const elementId = "interaction-test-setfocus-no-callback";
			const interactionEvent = ref<{ x: number; y: number } | undefined>(undefined);

			mountComposable(() => useBoardFocusHandler(elementId, target), {
				global: { provide: { [InlineEditInteractionEvent]: interactionEvent } },
			});

			interactionEvent.value = { x: 0, y: 0 };
			await flushPromises();

			const { focusedId } = mountComposable(() => useBoardFocusHandler(elementId));
			expect(focusedId?.value).toBe(elementId);
		});
	});
});
