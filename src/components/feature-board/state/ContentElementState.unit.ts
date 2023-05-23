import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import { ContentElementType, TextElementResponse } from "@/serverApi/v3";
import { useContentElementState } from "./ContentElementState.composable";

let wrapper: Wrapper<Vue>;

const TEST_ELEMENT: TextElementResponse = {
	id: "test-id",
	type: ContentElementType.Text,
	content: {
		text: "TestContent",
	},
	timestamps: {
		lastUpdatedAt: new Date().toString(),
		createdAt: new Date().toString(),
	},
};

/**
 * Call this function during test to mock a CardHostInteraction targeting the Hosting Component
 */
// let mockCardHostInteraction: () => void;

// jest.mock("../CardHostInteractionHandler.composable", () => ({
// 	useCardHostInteractionHandler: (callback: () => void) => {
// 		mockCardHostInteraction = () => callback();
// 		return {};
// 	},
// }));

const mountComposable = <R>(composable: () => R): R => {
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

describe("useContentElementState composable", () => {
	it("should unwrap element model data", async () => {
		const { modelValue } = mountComposable(() =>
			useContentElementState({ isEditMode: false, element: TEST_ELEMENT })
		);

		expect(modelValue.value).toStrictEqual(TEST_ELEMENT.content);
	});

	it.skip("should set isAutoFocus on element interaction", async () => {
		const { isAutoFocus } = mountComposable(() =>
			useContentElementState({ isEditMode: false, element: TEST_ELEMENT })
		);

		expect(isAutoFocus.value).toStrictEqual(false);
		// mockCardHostInteraction();
		expect(isAutoFocus.value).toStrictEqual(true);
	});

	it("should call saving function after debounced change of modelValue", async () => {
		jest.useFakeTimers();
		const { modelValue } = mountComposable(() =>
			useContentElementState({ isEditMode: true, element: TEST_ELEMENT })
		);

		const updatedModel: TextElementResponse["content"] = {
			...TEST_ELEMENT.content,
			...{ text: "UpdatedText" },
		};

		expect(modelValue.value).toStrictEqual(TEST_ELEMENT.content);

		modelValue.value = updatedModel;
		expect(modelValue.value).toStrictEqual(updatedModel);

		// add test when element uses api factory
	});
});
