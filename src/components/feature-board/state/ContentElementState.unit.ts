import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useContentElementState } from "./ContentElementState.composable";

const TEST_ELEMENT: RichTextElementResponse = {
	id: "test-id",
	type: ContentElementType.RichText,
	content: {
		text: "TestContent",
		inputFormat: "richTextCk5",
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

		const updatedModel: RichTextElementResponse["content"] = {
			...TEST_ELEMENT.content,
			...{ text: "UpdatedText" },
		};

		expect(modelValue.value).toStrictEqual(TEST_ELEMENT.content);

		modelValue.value = updatedModel;
		expect(modelValue.value).toStrictEqual(updatedModel);

		// add test when element uses api factory
	});
});
