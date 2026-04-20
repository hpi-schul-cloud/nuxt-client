import { MetaTagResult, useMetaTagExtractorApi } from "../composables/MetaTagExtractorApi.composable";
import { usePreviewGenerator } from "../composables/PreviewGenerator.composable";
import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import LinkContentElementDisplay from "./LinkContentElementDisplay.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { linkElementContentFactory } from "@@/tests/test-utils/factory/linkElementContentFactory";
import { linkElementResponseFactory } from "@@/tests/test-utils/factory/linkElementResponseFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { LinkElementContent, LinkElementResponse } from "@api-server";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { LinkContentElement } from "@feature-board-link-element";
import { BoardMenu } from "@ui-board";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import { Mocked } from "vitest";
import { computed, ref } from "vue";

vi.mock("@data-board/ContentElementState.composable");

vi.mock("@data-board/BoardFocusHandler.composable");
vi.mock("../composables/MetaTagExtractorApi.composable");
vi.mock("../composables/PreviewGenerator.composable");
const mockedUseContentElementState = vi.mocked(useContentElementState);

let defaultElement = linkElementResponseFactory.build();

describe("LinkContentElement", () => {
	let useBoardFocusHandlerMock: Mocked<ReturnType<typeof useBoardFocusHandler>>;
	let useMetaTagExtractorApiMock: Mocked<ReturnType<typeof useMetaTagExtractorApi>>;
	let usePreviewGeneratorMock: Mocked<ReturnType<typeof usePreviewGenerator>>;

	beforeAll(() => {
		Object.defineProperty(URL, "canParse", {
			value: vi.fn().mockReturnValue(true),
		});
	});

	beforeEach(() => {
		useBoardFocusHandlerMock = {
			isAnythingFocused: ref(false),
			setFocus: vi.fn(),
			forceFocus: vi.fn(),
		};
		useMetaTagExtractorApiMock = {
			getMetaTags: vi.fn(),
		};
		usePreviewGeneratorMock = {
			createPreviewImage: vi.fn(),
			uploadFromUrl: vi.fn(),
		};

		vi.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		vi.mocked(useMetaTagExtractorApi).mockReturnValue(useMetaTagExtractorApiMock);
		vi.mocked(usePreviewGenerator).mockReturnValue(usePreviewGeneratorMock);

		defaultElement = linkElementResponseFactory.build();
		vi.useFakeTimers();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
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
		const wrapper = shallowMount(LinkContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
		});

		useMetaTagExtractorApiMock.getMetaTags.mockResolvedValue({
			url: "https://imagestock.com/great-article",
			title: "Super duper mega page title",
			description: "This page is sooo cool!",
			originalImageUrl: "https://imagestock.com/great-image.jpg",
			imageUrl: "https://imagestock.com/great-image.jpg",
		});

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

	describe("when content url is undefined", () => {
		it("should not render LinkContentElementDisplay", () => {
			const { wrapper } = setupWrapper({ isEditMode: true });

			expect(wrapper.findComponent(LinkContentElementDisplay).exists()).toBe(false);
		});

		it("should not have an aria-label", () => {
			const { wrapper } = setupWrapper({ isEditMode: true });

			const linkElement = wrapper.find('[data-testid="board-link-element"]');

			expect(linkElement.attributes("aria-label")).toBeUndefined();
		});

		describe("when element is in view mode", () => {
			it("should hide the element", () => {
				const { wrapper } = setupWrapper({ isEditMode: false });

				const linkElement = wrapper.findComponent('[data-testid="board-link-element"]');

				expect(linkElement.attributes("class")).toContain("d-none");
			});

			it("should not render the element menu", () => {
				const { wrapper } = setupWrapper({ isEditMode: false });

				expect(wrapper.findComponent(BoardMenu).exists()).toBe(false);
			});
		});

		describe("when element is in edit mode", () => {
			it("should render LinkContentElementCreate with an empty existing-url", () => {
				const { wrapper } = setupWrapper({ isEditMode: true });

				const linkCreate = wrapper.findComponent(LinkContentElementCreate);

				expect(linkCreate.exists()).toBe(true);
				expect(linkCreate.props().existingUrl).toBe("");
			});

			it("should render the element menu", () => {
				const { wrapper } = setupWrapper({ isEditMode: true });

				expect(wrapper.findComponent(BoardMenu).exists()).toBe(true);
			});

			it.each(["up", "down"])(
				"should not emit 'move-keyboard:edit' when arrow key %s is pressed and no url exists",
				async (key) => {
					const { wrapper } = setupWrapper({ isEditMode: true });

					await wrapper.findComponent('[data-testid="board-link-element"]').trigger(`keydown.${key}`);

					expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
				}
			);
		});
	});

	describe("when content url is defined", () => {
		it("should have the correct aria-label", () => {
			const linkElementContent = linkElementContentFactory.build();
			const { wrapper, element } = setupWrapper({
				content: linkElementContent,
				isEditMode: true,
			});

			const linkElement = wrapper.findComponent('[data-testid="board-link-element"]');

			expect(linkElement.attributes("aria-label")).toEqual(`${element.content.url}, common.ariaLabel.newTab`);
		});

		describe("when element is in edit mode", () => {
			it("should render LinkContentElementCreate with the existing url for editing", () => {
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper, element } = setupWrapper({
					content: linkElementContent,
					isEditMode: true,
				});

				const linkCreate = wrapper.findComponent(LinkContentElementCreate);

				expect(linkCreate.exists()).toBe(true);
				expect(linkCreate.props().existingUrl).toEqual(element.content.url);
			});

			it("should not render LinkContentElementDisplay", () => {
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper } = setupWrapper({
					content: linkElementContent,
					isEditMode: true,
				});

				expect(wrapper.findComponent(LinkContentElementDisplay).exists()).toBe(false);
			});

			it("should not have href and target attributes", () => {
				// The card should not be a link in edit mode otherwise the three dot menu would not be accessible for screen readers,
				// because of nested interactive elements
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper } = setupWrapper({
					content: linkElementContent,
					isEditMode: true,
				});
				const linkElement = wrapper.findComponent('[data-testid="board-link-element"]');

				expect(linkElement.attributes("href")).toBeUndefined();
				expect(linkElement.attributes("target")).toBeUndefined();
			});

			it.each(["click", "keydown.enter", "keydown.space"])("should not open a new tab on %s", async (event) => {
				vi.spyOn(globalThis, "open").mockImplementation(() => null);

				const linkElementContent = linkElementContentFactory.build();
				const { wrapper } = setupWrapper({
					content: linkElementContent,
					isEditMode: true,
				});

				await wrapper.findComponent('[data-testid="board-link-element"]').trigger(event);

				expect(window.open).not.toHaveBeenCalled();
			});

			it.each(["up", "down"])(
				"should emit 'move-keyboard:edit' when arrow key %s is pressed and a url exists",
				async (key) => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					await wrapper.findComponent('[data-testid="board-link-element"]').trigger(`keydown.${key}`);

					expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
				}
			);

			describe("element menu", () => {
				it("should render the element menu", () => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					expect(wrapper.findComponent(BoardMenu).exists()).toBe(true);
				});

				it("should emit 'move-down:edit' when move down is clicked", async () => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					await wrapper.findComponent(KebabMenuActionMoveDown).trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-down:edit");
				});

				it("should emit 'move-up:edit' when move up is clicked", async () => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					await wrapper.findComponent(KebabMenuActionMoveUp).trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-up:edit");
				});

				it("should emit 'delete:element' when delete is clicked", async () => {
					vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: true,
					});

					await wrapper.findComponent(KebabMenuActionDelete).trigger("click");

					expect(wrapper.emitted()).toHaveProperty("delete:element");
				});
			});
		});

		describe("when element is in view mode", () => {
			it("should render LinkContentElementDisplay with correct props", () => {
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper, element } = setupWrapper({
					content: linkElementContent,
					isEditMode: false,
				});

				const linkDisplay = wrapper.findComponent(LinkContentElementDisplay);

				expect(linkDisplay.props().url).toEqual(element.content.url);
				expect(linkDisplay.props().title).toEqual(element.content.title);
				expect(linkDisplay.props().isEditMode).toEqual(false);
			});

			it("should not render LinkContentElementCreate", () => {
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper } = setupWrapper({
					content: linkElementContent,
					isEditMode: false,
				});

				expect(wrapper.findComponent(LinkContentElementCreate).exists()).toBe(false);
			});

			it("should have href and target attributes for native navigation", () => {
				const linkElementContent = linkElementContentFactory.build();
				const { wrapper } = setupWrapper({
					content: linkElementContent,
					isEditMode: false,
				});
				const linkElement = wrapper.findComponent('[data-testid="board-link-element"]');

				expect(linkElement.attributes("href")).toBe(linkElementContent.url);
				expect(linkElement.attributes("target")).toBe("_blank");
			});

			it.each(["up", "down"])(
				"should not emit 'move-keyboard:edit' when arrow key %s is pressed in view mode",
				async (key) => {
					const linkElementContent = linkElementContentFactory.build();
					const { wrapper } = setupWrapper({
						content: linkElementContent,
						isEditMode: false,
					});

					await wrapper.findComponent('[data-testid="board-link-element"]').trigger(`keydown.${key}`);

					expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
				}
			);

			describe("when the link references a different page", () => {
				it("should open in a new tab", () => {
					const url = new URL("https://dbildungscloud.test/path");
					const linkElementContent = linkElementContentFactory.build({ url: url.toString() });
					Object.defineProperty(window, "location", {
						get: () => ({ host: url.host, pathname: "/otherPath" }),
					});

					const { wrapper } = setupWrapper({ content: linkElementContent, isEditMode: false });

					expect(wrapper.findComponent('[data-testid="board-link-element"]').attributes("target")).toEqual("_blank");
				});
			});

			describe("when the link references the same page", () => {
				const setup = () => {
					const url = new URL("https://dbildungscloud.test/path#card-12345");
					const linkElementContent = linkElementContentFactory.build({ url: url.toString() });
					Object.defineProperty(window, "location", {
						get: () => ({
							host: url.host,
							pathname: url.pathname,
							hash: url.hash,
							href: url.href,
						}),
					});

					const domElementMock = {
						scrollIntoView: vi.fn(),
						focus: vi.fn(),
					} as unknown as HTMLElement;
					vi.spyOn(document, "querySelector").mockReturnValue(domElementMock);

					const { wrapper } = setupWrapper({ content: linkElementContent, isEditMode: false });

					return { wrapper, domElementMock };
				};

				it("should open in the same tab", () => {
					const { wrapper } = setup();

					expect(wrapper.findComponent('[data-testid="board-link-element"]').attributes("target")).toEqual("_self");
				});

				it("should scroll to and focus the element when clicked", async () => {
					const { wrapper, domElementMock } = setup();

					await wrapper.findComponent('[data-testid="board-link-element"]').trigger("click");
					vi.runAllTimers();

					expect(domElementMock.scrollIntoView).toHaveBeenCalledWith({ block: "center", inline: "center" });
					expect(domElementMock.focus).toHaveBeenCalled();
				});
			});
		});
	});

	describe("onCreateUrl", () => {
		it("should request meta tags for the given url", () => {
			const { wrapper } = setupWrapper({ isEditMode: true });

			wrapper.getComponent(LinkContentElementCreate).vm.$emit("create:url", "https://abc.de/bravo-fox-delta-ohhh-mega");

			expect(useMetaTagExtractorApiMock.getMetaTags).toHaveBeenCalled();
		});

		it("should add https protocol when none is provided", () => {
			const { wrapper } = setupWrapper({ isEditMode: true });
			const url = "abc.de/my-article";

			wrapper.getComponent(LinkContentElementCreate).vm.$emit("create:url", url);

			expect(useMetaTagExtractorApiMock.getMetaTags).toHaveBeenCalledWith(`https://${url}`);
		});

		it("should create a preview image when imageUrl is present in meta tags", async () => {
			const { wrapper } = setupWrapper({ isEditMode: true });
			const url = "https://abc.de/my-article";
			const fakeMetaTags: MetaTagResult = {
				url,
				title: "my title",
				description: "",
				originalImageUrl: "https://abc.de/foto.png",
				imageUrl: "https://abc.de/foto.png",
			};

			useMetaTagExtractorApiMock.getMetaTags.mockResolvedValue(fakeMetaTags);

			await wrapper.getComponent(LinkContentElementCreate).vm.$emit("create:url", url);

			expect(usePreviewGeneratorMock.createPreviewImage).toHaveBeenCalledWith(fakeMetaTags.imageUrl);
		});

		it("should sanitize html-encoded urls", () => {
			const VALID_UNSANITIZED_URL =
				"&#104;&#116;&#116;&#112;&#115;&#0000058//&#101;&#120;&#97;&#109;&#112;&#108;&#101;&#46;&#99;&#111;&#109;";
			const { wrapper } = setupWrapper({
				content: linkElementContentFactory.build({ url: VALID_UNSANITIZED_URL }),
				isEditMode: false,
			});

			expect(wrapper.html()).toEqual(expect.stringContaining("https://example.com"));
		});

		it("should sanitize javascript urls to about:blank", () => {
			const INVALID_UNSANITIZED_URL = "javascript" + ":" + "alert(document.domain)";
			const { wrapper } = setupWrapper({
				content: linkElementContentFactory.build({ url: INVALID_UNSANITIZED_URL }),
				isEditMode: false,
			});

			expect(wrapper.html()).toEqual(expect.stringContaining("about:blank"));
		});

		it("should display the hostname", () => {
			const { wrapper } = setupWrapper({
				content: linkElementContentFactory.build({ url: "https://de.wikipedia.org/dachs" }),
				isEditMode: false,
			});

			expect(wrapper.html()).toEqual(expect.stringContaining("de.wikipedia.org"));
		});
	});
});
