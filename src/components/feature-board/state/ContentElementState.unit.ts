import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useContentElementState } from "./ContentElementState.composable";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";

jest.mock("../shared/InlineEditInteractionHandler.composable");

const notifierModule = createModuleMocks(NotifierModule);
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
	const setup = (options = { isEditMode: false, element: TEST_ELEMENT }) => {
		return mountComposable(() => useContentElementState(options), {
			[I18N_KEY.valueOf()]: { t: (key: string) => key },
			[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
		});
	};
	it("should unwrap element model data", async () => {
		const { modelValue } = setup();

		expect(modelValue.value).toStrictEqual(TEST_ELEMENT.content);
	});

	it.skip("should set isAutoFocus on element interaction", async () => {
		const { isAutoFocus } = setup();

		expect(isAutoFocus.value).toStrictEqual(false);
		// mockCardHostInteraction();
		expect(isAutoFocus.value).toStrictEqual(true);
	});

	it("should call saving function after debounced change of modelValue", async () => {
		jest.useFakeTimers();
		const { modelValue } = setup({ isEditMode: true, element: TEST_ELEMENT });

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
