import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
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
});
