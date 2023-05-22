import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { Ref, ref } from "vue";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";

let wrapper: Wrapper<Vue>;

const mountComposable = (composable: () => unknown) => {
	const TestComponent = {
		template: "<div></div>",
	};

	wrapper = shallowMount(TestComponent, {
		setup() {
			const result = composable();
			return { result };
		},
	});
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return wrapper.vm.result;
};

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

	it("should focusable values be 'false' as default", async () => {
		const { isFocusWithin, isFocusContained } = mountComposable(() =>
			useBoardFocusHandler(columnId, target)
		);

		expect(isFocusWithin.value).toBe(false);
		expect(isFocusContained.value).toBe(false);
	});

	it("should set focusable values", async () => {
		target.value?.focus();
		const { isFocusWithin, isFocusContained } = mountComposable(() =>
			useBoardFocusHandler(columnId, target)
		);

		expect(isFocusWithin.value).toBe(true);
		expect(isFocusContained.value).toBe(true);
	});
});
