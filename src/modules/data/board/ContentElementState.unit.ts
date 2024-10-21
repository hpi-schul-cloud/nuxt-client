import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { envsFactory } from "@@/tests/test-utils";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import setupStores from "@@/tests/test-utils/setupStores";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { useContentElementState } from "./ContentElementState.composable";
import { Router, useRouter } from "vue-router";
import { createMock } from "@golevelup/ts-jest";

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

vi.mock("vue-i18n", () => {
	return {
		...jest.requireActual("@vueuse/core"),
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

vi.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

describe("useContentElementState composable", () => {
	beforeEach(() => {
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: false,
		});
		envConfigModule.setEnvs(envs);
		setActivePinia(createTestingPinia());

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
	});
	const setup = (options = { isEditMode: false, element: TEST_ELEMENT }) => {
		return mountComposable(() => useContentElementState(options), {
			global: {
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});
	};
	it("should unwrap element model data", async () => {
		const { modelValue } = setup();

		expect(modelValue.value).toStrictEqual(TEST_ELEMENT.content);
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
