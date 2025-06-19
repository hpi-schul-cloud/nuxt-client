import { h5pElementResponseFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import NotifierModule from "@/store/notifier";
import { H5pElementResponse } from "@/serverApi/v3";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useBoardFocusHandler } from "@data-board";
import { useH5PEditorApi } from "@data-h5p";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { ContentElementBar } from "@ui-board";
import { LineClamp } from "@ui-line-clamp";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { RouteLocationResolved, useRouter } from "vue-router";
import { VImg } from "vuetify/components";
import H5pElement from "./H5pElement.vue";
import H5pElementMenu from "./H5pElementMenu.vue";

vi.mock("@data-board");
vi.mock("@data-h5p");
vi.mock("vue-router");

describe("H5pElement", () => {
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let useRouterMock: DeepMocked<ReturnType<typeof useRouter>>;
	let useH5PEditorMock: DeepMocked<ReturnType<typeof useH5PEditorApi>>;

	beforeEach(() => {
		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		useRouterMock = createMock<ReturnType<typeof useRouter>>();

		vi.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		vi.mocked(useRouter).mockReturnValue(useRouterMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const getWrapper = (propsData: {
		element: H5pElementResponse;
		isEditMode: boolean;
		contentTitle?: string;
		isListBoard?: boolean;
	}) => {
		useH5PEditorMock = createMock<ReturnType<typeof useH5PEditorApi>>();
		vi.mocked(useH5PEditorApi).mockReturnValue(useH5PEditorMock);
		useH5PEditorMock.getContentTitle.mockResolvedValueOnce(
			propsData.contentTitle
		);

		const wrapper = mount(H5pElement, {
			global: {
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
					[BOARD_IS_LIST_LAYOUT as symbol]: propsData.isListBoard ?? false,
				},
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				...propsData,
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("Visibility", () => {
		describe("when in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should show the card", async () => {
				const { wrapper } = setup();

				const card = wrapper.getComponent({ ref: "elementCard" });

				expect(card.isVisible()).toEqual(true);
			});
		});

		describe("when content is linked", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: "contentId" },
					}),
					isEditMode: false,
				});

				return {
					wrapper,
				};
			};

			it("should show the card", async () => {
				const { wrapper } = setup();

				const card = wrapper.getComponent({ ref: "elementCard" });

				expect(card.isVisible()).toEqual(true);
			});
		});

		describe("when no content is linked and not in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: false,
				});

				return {
					wrapper,
				};
			};

			it("should hide the card", async () => {
				const { wrapper } = setup();

				const card = wrapper.getComponent({ ref: "elementCard" });

				expect(card.isVisible()).toEqual(false);
			});
		});
	});

	describe("Keyboard navigation", () => {
		describe("when moving the element with arrow keys while in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it.each(["up", "down"])(
				"should emit 'move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setup();

					const card = wrapper.getComponent({ ref: "elementCard" });
					await card.trigger(`keydown.${key}`);

					expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(1);
				}
			);
		});
	});

	describe("Menu", () => {
		describe("when the element is moved up", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should emit 'move-up:edit'", async () => {
				const { wrapper } = setup();

				const menu = wrapper.getComponent(H5pElementMenu);

				menu.vm.$emit("move-up:element");
				await nextTick();

				expect(wrapper.emitted("move-up:edit")).toBeDefined();
			});
		});

		describe("when the element is moved down", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should emit 'move-down:edit'", async () => {
				const { wrapper } = setup();

				const menu = wrapper.getComponent(H5pElementMenu);

				menu.vm.$emit("move-down:element");
				await nextTick();

				expect(wrapper.emitted("move-down:edit")).toBeDefined();
			});
		});

		describe("when the element is being deleted", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should emit 'delete:element'", async () => {
				const { wrapper } = setup();

				const menu = wrapper.getComponent(H5pElementMenu);

				menu.vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toBeDefined();
			});
		});
	});

	describe("Editor window", () => {
		describe("when clicking an element without linked content", () => {
			const setup = () => {
				const element = h5pElementResponseFactory.build({
					content: { contentId: null },
				});

				const { wrapper } = getWrapper({
					element,
					isEditMode: true,
				});
				const resolvedUrl = "https://test.com";

				const windowMock = createMock<Window>();
				vi.spyOn(window, "open").mockImplementation(() => windowMock);

				useRouterMock.resolve.mockReturnValue(
					createMock<RouteLocationResolved>({
						href: resolvedUrl,
					})
				);

				return {
					wrapper,
					resolvedUrl,
					element,
				};
			};

			it("should open the editor window", async () => {
				const { wrapper, resolvedUrl, element } = setup();

				const card = wrapper.getComponent({ ref: "elementCard" });

				await card.trigger("click");

				expect(useRouterMock.resolve).toHaveBeenCalledWith({
					name: "h5pEditor",
					params: {
						contentId: undefined,
					},
					query: {
						parentType: H5PContentParentType.BOARD_ELEMENT,
						parentId: element.id,
					},
				});
				expect(window.open).toHaveBeenCalledWith(resolvedUrl, "_blank");
			});
		});

		describe("when clicking an element with linked content", () => {
			const setup = () => {
				const contentId = "contentId";
				const element = h5pElementResponseFactory.build({
					content: { contentId },
				});

				const { wrapper } = getWrapper({
					element,
					isEditMode: false,
				});
				const resolvedUrl = "https://test.com";

				const windowMock = createMock<Window>();
				vi.spyOn(window, "open").mockImplementation(() => windowMock);

				useRouterMock.resolve.mockReturnValue(
					createMock<RouteLocationResolved>({
						href: resolvedUrl,
					})
				);

				return {
					wrapper,
					resolvedUrl,
					element,
					contentId,
				};
			};

			it("should open the player window", async () => {
				const { wrapper, resolvedUrl, contentId } = setup();

				const card = wrapper.getComponent({ ref: "elementCard" });

				await card.trigger("click");

				expect(useRouterMock.resolve).toHaveBeenCalledWith({
					name: "h5pPlayer",
					params: {
						contentId,
					},
					query: {
						parentType: H5PContentParentType.BOARD_ELEMENT,
					},
				});
				expect(window.open).toHaveBeenCalledWith(resolvedUrl, "_blank");
			});
		});

		describe("when clicking the edit option in the menu", () => {
			const setup = () => {
				const element = h5pElementResponseFactory.build({
					content: { contentId: "testId" },
				});

				const { wrapper } = getWrapper({
					element,
					isEditMode: true,
				});
				const resolvedUrl = "https://test.com";

				const windowMock = createMock<Window>();
				vi.spyOn(window, "open").mockImplementation(() => windowMock);

				useRouterMock.resolve.mockReturnValue(
					createMock<RouteLocationResolved>({
						href: resolvedUrl,
					})
				);

				return {
					wrapper,
					element,
					resolvedUrl,
				};
			};

			it("should open the editor window", async () => {
				const { wrapper, element, resolvedUrl } = setup();

				const menu = wrapper.getComponent(H5pElementMenu);

				menu.vm.$emit("edit:element");
				await nextTick();

				expect(useRouterMock.resolve).toHaveBeenCalledWith({
					name: "h5pEditor",
					params: {
						contentId: element.content.contentId,
					},
					query: {
						parentType: H5PContentParentType.BOARD_ELEMENT,
						parentId: element.id,
					},
				});
				expect(window.open).toHaveBeenCalledWith(resolvedUrl, "_blank");
			});
		});
	});

	describe("Title", () => {
		describe("when there is no linked h5p content", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should show the text for creating an h5p element", async () => {
				const { wrapper } = setup();

				await nextTick();
				await nextTick();

				const titleLine = wrapper
					.getComponent(ContentElementBar)
					.getComponent(LineClamp);

				expect(titleLine.text()).toBe(
					"components.cardElement.h5pElement.create"
				);
			});
		});

		describe("when there is a linked h5p content", () => {
			describe("when the content title is fetched", () => {
				const setup = () => {
					const contentTitle = "test-title";

					const { wrapper } = getWrapper({
						element: h5pElementResponseFactory.build({
							content: { contentId: "test-id" },
						}),
						isEditMode: false,
						contentTitle,
					});

					return {
						wrapper,
						contentTitle,
					};
				};

				it("should show the content title", async () => {
					const { wrapper, contentTitle } = setup();

					await nextTick();
					await nextTick();

					const titleLine = wrapper
						.getComponent(ContentElementBar)
						.getComponent(LineClamp);

					expect(titleLine.text()).toBe(contentTitle);
				});
			});

			describe("when the content title could not be fetched", () => {
				const setup = () => {
					const { wrapper } = getWrapper({
						element: h5pElementResponseFactory.build({
							content: { contentId: "test-id" },
						}),
						isEditMode: false,
						contentTitle: undefined,
					});

					return {
						wrapper,
					};
				};

				it("should show the default h5p title", async () => {
					const { wrapper } = setup();

					await nextTick();
					await nextTick();

					const titleLine = wrapper
						.getComponent(ContentElementBar)
						.getComponent(LineClamp);

					expect(titleLine.text()).toBe("components.cardElement.h5pElement");
				});
			});
		});

		describe("when the content id of the h5p element is updated", () => {
			describe("when the content title is fetched", () => {
				const setup = () => {
					const contentTitle = "test-title";

					const { wrapper } = getWrapper({
						element: h5pElementResponseFactory.build({
							content: { contentId: null },
						}),
						contentTitle,
						isEditMode: false,
					});

					return {
						wrapper,
						contentTitle,
					};
				};

				it("should show the new content title", async () => {
					const { wrapper, contentTitle } = setup();

					await nextTick();
					await nextTick();

					await wrapper.setProps({
						element: h5pElementResponseFactory.build({
							content: { contentId: "test-id" },
						}),
					});
					await nextTick();

					const titleLine = wrapper
						.getComponent(ContentElementBar)
						.getComponent(LineClamp);

					expect(titleLine.text()).toBe(contentTitle);
				});
			});

			describe("when the content title could not be fetched", () => {
				const setup = () => {
					const { wrapper } = getWrapper({
						element: h5pElementResponseFactory.build({
							content: { contentId: null },
						}),
						isEditMode: false,
						contentTitle: undefined,
					});

					return {
						wrapper,
					};
				};

				it("should show the default h5p title", async () => {
					const { wrapper } = setup();

					await nextTick();
					await nextTick();

					await wrapper.setProps({
						element: h5pElementResponseFactory.build({
							content: { contentId: "test-id" },
						}),
					});
					await nextTick();

					const titleLine = wrapper
						.getComponent(ContentElementBar)
						.getComponent(LineClamp);

					expect(titleLine.text()).toBe("components.cardElement.h5pElement");
				});
			});
		});
	});

	describe("Display", () => {
		describe("when there is no linked h5p content", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should not show the h5p display image", () => {
				const { wrapper } = setup();

				const image = wrapper.findComponent(VImg);

				expect(image.exists()).toBe(false);
			});
		});

		describe("when there is a linked h5p content", () => {
			afterEach(() => {
				Object.defineProperty(window, "innerWidth", {
					writable: true,
					configurable: true,
					value: 1600,
				});
			});

			const setup = (isListBoard: boolean, windowWidth?: number) => {
				Object.defineProperty(window, "innerWidth", {
					writable: true,
					configurable: true,
					value: windowWidth ?? 1280,
				});

				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: "test-id" },
					}),
					isEditMode: false,
					isListBoard,
				});

				return {
					wrapper,
				};
			};

			it("should show the h5p display image", () => {
				const { wrapper } = setup(false);

				const image = wrapper.getComponent(VImg);

				expect(image.isVisible()).toBe(true);
			});

			describe("when board is a list board", () => {
				it.each`
					screenSize  | px
					${"small"}  | ${600}
					${"medium"} | ${960}
					${"large"}  | ${1280}
				`(
					"content should have row style for $screenSize display sizes when image url is given",
					({ px: windowWidth }) => {
						const { wrapper } = setup(true, windowWidth);

						expect(wrapper.find(".content-element-bar").classes()).toContain(
							"flex-row"
						);
					}
				);

				it("content should have column style when display size is smaller than 600px", () => {
					const { wrapper } = setup(true, 599);

					expect(wrapper.find(".content-element-bar").classes()).toContain(
						"flex-column"
					);
				});
			});

			describe("when board is not a list board", () => {
				it.each`
					screenSize  | px
					${"xs"}     | ${590}
					${"small"}  | ${600}
					${"medium"} | ${960}
					${"large"}  | ${1280}
				`(
					"content should have column style for $screenSize display sizes when image url is given",
					({ px: windowWidth }) => {
						const { wrapper } = setup(false, windowWidth);

						expect(wrapper.find(".content-element-bar").classes()).toContain(
							"flex-column"
						);
					}
				);
			});
		});
	});
});
