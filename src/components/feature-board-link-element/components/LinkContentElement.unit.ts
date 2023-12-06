import { AnyContentElement } from "@/types/board/ContentElement";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { linkElementResponseFactory } from "@@/tests/test-utils/factory/linkElementResponseFactory";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { LinkContentElement } from "@feature-board-link-element";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { MountOptions, shallowMount } from "@vue/test-utils";
import { LinkElementContent, MetaTagExtractorResponse } from "@/serverApi/v3";
import { useMetaTagExtractorApi } from "../composables/MetaTagExtractorApi.composable";
import Vue, { computed, ref } from "vue";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import EnvConfigModule from "@/store/env-config";
import { Envs } from "@/store/types/env-config";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import { linkElementContentFactory } from "@@/tests/test-utils/factory/linkElementContentFactory";
import { usePreviewGenerator } from "../composables/PreviewGenerator.composable";

jest.mock("@data-board/ContentElementState.composable");

jest.mock("@data-board/BoardFocusHandler.composable");
jest.mock("../composables/MetaTagExtractorApi.composable");
jest.mock("../composables/PreviewGenerator.composable");
const mockedUseContentElementState = jest.mocked(useContentElementState);

let defaultElement = linkElementResponseFactory.build();
const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<Envs>({
		FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
		FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
		FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
	}),
});

describe(LinkContentElement.name, () => {
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let useMetaTagExtractorApiMock: DeepMocked<
		ReturnType<typeof useMetaTagExtractorApi>
	>;
	let usePreviewGeneratorMock: DeepMocked<
		ReturnType<typeof usePreviewGenerator>
	>;

	beforeEach(() => {
		useMetaTagExtractorApiMock =
			createMock<ReturnType<typeof useMetaTagExtractorApi>>();
		usePreviewGeneratorMock =
			createMock<ReturnType<typeof usePreviewGenerator>>();

		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		jest
			.mocked(useMetaTagExtractorApi)
			.mockReturnValue(useMetaTagExtractorApiMock);
		jest.mocked(usePreviewGenerator).mockReturnValue(usePreviewGeneratorMock);

		defaultElement = linkElementResponseFactory.build();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
	}) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const wrapper = shallowMount(LinkContentElement as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
			},
			propsData: { ...props },
		});

		return { wrapper };
	};

	const setup = (
		options: {
			content?: LinkElementContent;
			isEditMode: boolean;
		} = { content: undefined, isEditMode: true }
	) => {
		const element = {
			...defaultElement,
			content:
				options.content ?? linkElementContentFactory.build({ url: undefined }),
		};
		document.body.setAttribute("data-app", "true");

		mockedUseContentElementState.mockReturnValue({
			modelValue: ref(element.content),
			computedElement: computed(() => element),
			isLoading: ref(false),
		});

		const { wrapper } = getWrapper({
			element,
			isEditMode: true,
		});

		return {
			element,
			wrapper,
		};
	};

	describe("onCreateUrl", () => {
		it("should request meta tags for the given url", async () => {
			const { wrapper } = setup({ isEditMode: true });

			const component = wrapper.getComponent(LinkContentElementCreate);
			component.vm.$emit("create:url", "https://abc.de");

			expect(useMetaTagExtractorApiMock.getMetaTags).toHaveBeenCalled();
		});

		describe("when no protocol was provided", () => {
			it("should add https-protocol", async () => {
				const { wrapper } = setup({ isEditMode: true });
				const url = "abc.de/my-article";

				const component = wrapper.getComponent(LinkContentElementCreate);
				component.vm.$emit("create:url", url);

				const expected = `https://${url}`;
				expect(useMetaTagExtractorApiMock.getMetaTags).toHaveBeenCalledWith(
					expected
				);
			});
		});

		describe("when url was provided", () => {
			describe("when imageUrl was in metaTags", () => {
				it("should create a preview image", async () => {
					const { wrapper } = setup({ isEditMode: true });
					const url = "https://abc.de/my-article";
					const fakeMetaTags: MetaTagExtractorResponse = {
						url,
						title: "my title",
						description: "",
						imageUrl: "https://abc.de/foto.png",
						type: "unknown",
						parentTitle: "",
						parentType: "unknown",
					};

					useMetaTagExtractorApiMock.getMetaTags.mockResolvedValue(
						fakeMetaTags
					);

					const component = wrapper.getComponent(LinkContentElementCreate);
					component.vm.$emit("create:url", url);
					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(
						usePreviewGeneratorMock.createPreviewImage
					).toHaveBeenCalledWith(fakeMetaTags.imageUrl);
				});
			});

			it("should sanitize the url", async () => {
				const VALID_UNSANITIZED_URL =
					"&#104;&#116;&#116;&#112;&#115;&#0000058//&#101;&#120;&#97;&#109;&#112;&#108;&#101;&#46;&#99;&#111;&#109;";
				const { wrapper } = setup({
					content: linkElementContentFactory.build({
						url: VALID_UNSANITIZED_URL,
					}),
					isEditMode: false,
				});

				const expectedUrl = "https://example.com";
				expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
			});

			it("should sanitize a javascript-url", async () => {
				const INVALID_UNSANITIZED_URL =
					"javascript" + ":" + "alert(document.domain)";
				const { wrapper } = setup({
					content: linkElementContentFactory.build({
						url: INVALID_UNSANITIZED_URL,
					}),
					isEditMode: false,
				});

				const expectedUrl = "about:blank";
				expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
			});

			it("should display the hostname ", async () => {
				const INVALID_UNSANITIZED_URL = "https://de.wikipedia.org/dachs";
				const { wrapper } = setup({
					content: linkElementContentFactory.build({
						url: INVALID_UNSANITIZED_URL,
					}),
					isEditMode: false,
				});

				const expectedUrl = "de.wikipedia.org";
				expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
			});
		});
	});

	describe("when arrow key up is pressed", () => {
		describe("when component is in edit-mode", () => {
			it("should NOT emit 'move-keyboard:edit'", async () => {
				const { wrapper } = setup({
					isEditMode: true,
				});

				const element = wrapper.findComponent({ ref: "linkContentElement" });
				element.vm.$emit(
					"keydown",
					new KeyboardEvent("keydown", {
						key: "ArrowUp",
						keyCode: 38,
					})
				);

				expect(element.emitted("move-keyboard:edit")).toBeUndefined();
			});
		});
	});
});
