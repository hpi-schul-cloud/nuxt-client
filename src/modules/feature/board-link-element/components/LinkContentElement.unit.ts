import {
	ConfigResponse,
	LinkElementContent,
	LinkElementResponse,
} from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { linkElementContentFactory } from "@@/tests/test-utils/factory/linkElementContentFactory";

import { linkElementResponseFactory } from "@@/tests/test-utils/factory/linkElementResponseFactory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { LinkContentElement } from "@feature-board-link-element";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { BoardMenu } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import { computed, nextTick, ref } from "vue";
import {
	MetaTagResult,
	useMetaTagExtractorApi,
} from "../composables/MetaTagExtractorApi.composable";
import { usePreviewGenerator } from "../composables/PreviewGenerator.composable";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";

jest.mock("@data-board/ContentElementState.composable");

jest.mock("@data-board/BoardFocusHandler.composable");
jest.mock("../composables/MetaTagExtractorApi.composable");
jest.mock("../composables/PreviewGenerator.composable");

const mockedUseContentElementState = jest.mocked(useContentElementState);

let defaultElement = linkElementResponseFactory.build();
const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<ConfigResponse>({
		FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
		FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
		FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
	}),
});

describe("LinkContentElement", () => {
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
		element: LinkElementResponse;
		isEditMode: boolean;
		isDetailView: boolean;
		isNotFirstElement?: boolean;
		isNotLastElement?: boolean;
		columnIndex: number;
		rowIndex: number;
		elementIndex: number;
	}) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const wrapper = shallowMount(LinkContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
			},
			props: { ...props },
		});

		return { wrapper };
	};

	const setupWrapper = (
		options: {
			content?: LinkElementContent;
			isEditMode: boolean;
			isDetailView?: boolean;
			isNotFirstElement?: boolean;
			isNotLastElement?: boolean;
		} = {
			content: undefined,
			isEditMode: true,
			isDetailView: false,
			isNotFirstElement: true,
			isNotLastElement: true,
		}
	) => {
		const element = {
			...defaultElement,
			content: linkElementContentFactory.build({
				url: undefined,
				title: "test-title",
				...options.content,
			}),
		};

		mockedUseContentElementState.mockReturnValue({
			modelValue: ref(element.content),
			computedElement: computed(() => element),
			isLoading: ref(false),
		});

		useMetaTagExtractorApiMock.getMetaTags.mockImplementation(
			async (url: string) => ({
				url,
				title: "Super duper mega page title",
				description: "This page is sooo cool!",
				originalImageUrl: "https://imagestock.com/great-image.jpg",
				imageUrl: "https://imagestock.com/great-image.jpg",
			})
		);

		usePreviewGeneratorMock.createPreviewImage.mockResolvedValue(
			"https://some.schulcloud.de/my-upload-preview-image.jpg"
		);

		const { wrapper } = getWrapper({
			element,
			isEditMode: options.isEditMode,
			isDetailView: false,
			isNotFirstElement: true,
			isNotLastElement: true,
			columnIndex: 0,
			rowIndex: 1,
			elementIndex: 2,
		});

		return {
			element,
			wrapper,
		};
	};

	describe("when link element is displayed", () => {
		describe("when content url is undefined", () => {
			it("should not render display of link content", () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
				});

				const linkElementDisplay = wrapper.findComponent(
					LinkContentElementDisplay
				);

				expect(linkElementDisplay.exists()).toBe(false);
			});

			it("should not render link element menu", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const linkElementMenu = wrapper.findComponent(BoardMenu);

				expect(linkElementMenu.exists()).toBe(false);
			});

			it("should not have an aria-label", () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
				});

				const linkElement = wrapper.find('[data-testid="board-link-element"]');

				expect(linkElement.attributes("aria-label")).toBeUndefined();
			});
		});

		describe("when content url is defined", () => {
			it("should render display of link content with correct props", () => {
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper, element } = setupWrapper({
					content: linkElementContent,
					isEditMode: true,
				});

				const linkElementDisplay = wrapper.findComponent(
					LinkContentElementDisplay
				);

				expect(linkElementDisplay.props().url).toEqual(element.content.url);
				expect(linkElementDisplay.props().title).toEqual(element.content.title);
				expect(linkElementDisplay.props().isEditMode).toEqual(true);
			});

			it("should have the correct aria-label", () => {
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper, element } = setupWrapper({
					content: linkElementContent,
					isEditMode: true,
				});

				const linkElement = wrapper.findComponent(
					'[data-testid="board-link-element"]'
				);

				expect(linkElement.attributes("aria-label")).toEqual(
					`${element.content.url}, common.ariaLabel.newTab`
				);
			});

			describe("when element is in edit mode", () => {
				it.each(["up", "down"])(
					"should 'emit move-keyboard:edit' when arrow key %s is pressed",
					async (key) => {
						const linkElementContent = linkElementContentFactory.build();
						const { wrapper } = setupWrapper({
							content: linkElementContent,
							isEditMode: true,
						});

						const linkElement = wrapper.findComponent(
							'[data-testid="board-link-element"]'
						);

						await linkElement.trigger(`keydown.${key}`);

						expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
					}
				);
			});

			describe("when element is in view mode", () => {
				it.each(["up", "down"])(
					"should not 'emit move-keyboard:edit' when arrow key %s is pressed and element is in view mode",
					async (key) => {
						const linkElementContent = linkElementContentFactory.build();
						const { wrapper } = setupWrapper({
							content: linkElementContent,
							isEditMode: false,
						});

						const linkElement = wrapper.findComponent(
							'[data-testid="board-link-element"]'
						);

						await linkElement.trigger(`keydown.${key}`);

						expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
					}
				);
			});

			describe("link element menu", () => {
				it("should render link element menu", () => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					const linkElementMenu = wrapper.findComponent(BoardMenu);

					expect(linkElementMenu.exists()).toBe(true);
				});

				it("should emit 'move-down:edit' event when move down menu item is clicked", async () => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-down:edit");
				});

				it("should emit 'move-up:edit' event when move up menu item is clicked", async () => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-up:edit");
				});

				it("should emit 'delete:element' event when delete menu item is clicked", async () => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionDelete);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("delete:element");
				});
			});

			describe("when the link references a different page", () => {
				const setup = () => {
					const url = new URL("https://dbildungscloud.test/path");
					const linkElementContent = linkElementContentFactory.build({
						url: url.toString(),
					});
					Object.defineProperty(window, "location", {
						get: () =>
							createMock<Location>({
								host: url.host,
								pathname: "/otherPath",
							}),
					});

					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: false,
					});

					return {
						wrapper,
					};
				};

				it("should open in a new tab", () => {
					const { wrapper } = setup();

					const linkElement = wrapper.findComponent(
						'[data-testid="board-link-element"]'
					);

					expect(linkElement.attributes("target")).toEqual("_blank");
				});
			});

			describe("when the link references the same page", () => {
				const setup = () => {
					const url = new URL("https://dbildungscloud.test/path");
					const linkElementContent = linkElementContentFactory.build({
						url: url.toString(),
					});
					Object.defineProperty(window, "location", {
						get: () =>
							createMock<Location>({
								host: url.host,
								pathname: url.pathname,
							}),
					});

					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: false,
					});

					return {
						wrapper,
					};
				};

				it("should open in the same tab", () => {
					const { wrapper } = setup();

					const linkElement = wrapper.findComponent(
						'[data-testid="board-link-element"]'
					);

					expect(linkElement.attributes("target")).toEqual("_self");
				});
			});
		});
	});

	describe("when link element is being created", () => {
		describe("when element is in view mode", () => {
			it("should hide link element in view mode when no url was entered", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const linkElement = wrapper.findComponent(
					'[data-testid="board-link-element"]'
				);

				expect(linkElement.attributes("class")).toContain("d-none");
			});

			it("should not render link element menu in view mode", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const linkElementMenu = wrapper.findComponent(BoardMenu);

				expect(linkElementMenu.exists()).toBe(false);
			});
		});

		describe("when element is in edit mode", () => {
			it("should render LinkContentElementCreate component when in editmode", () => {
				const { wrapper } = setupWrapper({ isEditMode: true });

				const linkCreateComponent = wrapper.findComponent(
					LinkContentElementCreate
				);

				expect(linkCreateComponent.exists()).toBe(true);
			});

			it.each(["up", "down"])(
				"should not 'emit move-keyboard:edit' when arrow key %s is pressed and element is in edit mode",
				async (key) => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const linkElement = wrapper.findComponent(
						'[data-testid="board-link-element"]'
					);

					await linkElement.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
				}
			);

			describe("link element menu", () => {
				it("should render link element menu", () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const linkElementMenu = wrapper.findComponent(BoardMenu);

					expect(linkElementMenu.exists()).toBe(true);
				});

				it("should emit 'move-down:edit' event when move down menu item is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-down:edit");
				});

				it("should emit 'move-up:edit' event when move up menu item is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-up:edit");
				});

				it("should emit 'delete:element' event when delete menu item is clicked", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionDelete);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("delete:element");
				});
			});
		});

		describe("onCreateUrl", () => {
			it("should request meta tags for the given url", async () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
					isDetailView: false,
				});

				const component = wrapper.getComponent(LinkContentElementCreate);
				component.vm.$emit(
					"create:url",
					"https://abc.de/bravo-fox-delta-ohhh-mega"
				);

				expect(useMetaTagExtractorApiMock.getMetaTags).toHaveBeenCalled();
			});

			describe("when no protocol was provided", () => {
				it("should add https-protocol", async () => {
					const { wrapper } = setupWrapper({
						isEditMode: true,
						isDetailView: false,
					});
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
						const { wrapper } = setupWrapper({
							isEditMode: true,
							isDetailView: false,
						});
						const url = "https://abc.de/my-article";
						const fakeMetaTags: MetaTagResult = {
							url,
							title: "my title",
							description: "",
							originalImageUrl: "https://abc.de/foto.png",
							imageUrl: "https://abc.de/foto.png",
						};

						useMetaTagExtractorApiMock.getMetaTags.mockResolvedValue(
							fakeMetaTags
						);

						const component = wrapper.getComponent(LinkContentElementCreate);
						component.vm.$emit("create:url", url);
						await nextTick();
						await nextTick();
						await nextTick();

						expect(
							usePreviewGeneratorMock.createPreviewImage
						).toHaveBeenCalledWith(fakeMetaTags.imageUrl);
					});
				});

				it("should sanitize the url", async () => {
					const VALID_UNSANITIZED_URL =
						"&#104;&#116;&#116;&#112;&#115;&#0000058//&#101;&#120;&#97;&#109;&#112;&#108;&#101;&#46;&#99;&#111;&#109;";
					const { wrapper } = setupWrapper({
						content: linkElementContentFactory.build({
							url: VALID_UNSANITIZED_URL,
						}),
						isEditMode: false,
						isDetailView: false,
					});

					const expectedUrl = "https://example.com";
					expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
				});

				it("should sanitize a javascript-url", async () => {
					const INVALID_UNSANITIZED_URL =
						"javascript" + ":" + "alert(document.domain)";
					const { wrapper } = setupWrapper({
						content: linkElementContentFactory.build({
							url: INVALID_UNSANITIZED_URL,
						}),
						isEditMode: false,
						isDetailView: false,
					});

					const expectedUrl = "about:blank";
					expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
				});

				it("should display the hostname ", async () => {
					const INVALID_UNSANITIZED_URL = "https://de.wikipedia.org/dachs";
					const { wrapper } = setupWrapper({
						content: linkElementContentFactory.build({
							url: INVALID_UNSANITIZED_URL,
						}),
						isEditMode: false,
						isDetailView: false,
					});

					const expectedUrl = "de.wikipedia.org";
					expect(wrapper.html()).toEqual(expect.stringContaining(expectedUrl));
				});
			});
		});
	});
});
