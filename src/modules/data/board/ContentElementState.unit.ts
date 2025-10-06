import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { useContentElementState } from "./ContentElementState.composable";
import { Router, useRouter } from "vue-router";
import { createMock } from "@golevelup/ts-vitest";
import { Mock } from "vitest";

vi.mock("@util-board/InlineEditInteractionHandler.composable");

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

vi.mock("vue-i18n", () => {
	return {
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

describe("useContentElementState composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
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
