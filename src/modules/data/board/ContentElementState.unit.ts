import { useContentElementState } from "./ContentElementState.composable";
import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { Router, useRouter } from "vue-router";

vi.mock("@util-board/InlineEditInteractionHandler.composable");

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

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

describe("useContentElementState composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});
	const setup = (options = { isEditMode: false, element: TEST_ELEMENT }) =>
		mountComposable(() => useContentElementState(options), {
			global: {
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});
	it("should unwrap element model data", async () => {
		const { modelValue } = setup();

		expect(modelValue.value).toStrictEqual(TEST_ELEMENT.content);
	});

	it("should call saving function after debounced change of modelValue", async () => {
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
