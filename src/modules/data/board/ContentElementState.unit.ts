import { useContentElementState } from "./ContentElementState.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { ContentElementType, RichTextElementResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@util-board/InlineEditInteractionHandler.composable");

const TEST_ELEMENT: RichTextElementResponse = {
	id: "test-id",
	type: ContentElementType.RICH_TEXT,
	content: {
		text: "TestContent",
		inputFormat: "richTextCk5",
	},
	timestamps: {
		lastUpdatedAt: new Date().toString(),
		createdAt: new Date().toString(),
	},
};

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

describe("useContentElementState composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		injectRouterMock(createRouterMock());
	});
	const setup = (options = { isEditMode: false, element: TEST_ELEMENT }) =>
		mountComposable(() => useContentElementState(options));

	it("should unwrap element model data", () => {
		const { modelValue } = setup();
		expect(modelValue.value).toStrictEqual(TEST_ELEMENT.content);
	});

	it("should call saving function after debounced change of modelValue", () => {
		vi.useFakeTimers();
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
