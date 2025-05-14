import { H5PContentParentType } from "@/h5pEditorApi/v3";
import { H5pElementResponse } from "@/serverApi/v3";
import { h5pElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { RouteLocationResolved, useRouter } from "vue-router";
import H5pElement from "./H5pElement.vue";
import H5pElementMenu from "./H5pElementMenu.vue";

jest.mock("@data-board");
jest.mock("vue-router");

describe("H5pElement", () => {
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let useRouterMock: DeepMocked<ReturnType<typeof useRouter>>;

	beforeEach(() => {
		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		useRouterMock = createMock<ReturnType<typeof useRouter>>();

		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		jest.mocked(useRouter).mockReturnValue(useRouterMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (propsData: {
		element: H5pElementResponse;
		isEditMode: boolean;
	}) => {
		const wrapper = mount(H5pElement, {
			global: {
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
		jest.resetAllMocks();
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
				jest.spyOn(window, "open").mockImplementation(() => windowMock);

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
				jest.spyOn(window, "open").mockImplementation(() => windowMock);

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
				jest.spyOn(window, "open").mockImplementation(() => windowMock);

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
});
