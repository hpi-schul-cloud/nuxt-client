import { CollaborativeTextEditorParentType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { collaborativeTextEditorElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { CollaborativeTextEditorElement } from "@feature-board-collaborative-text-editor-element";
import { createMock } from "@golevelup/ts-jest";
import { ContentElementBar } from "@ui-board";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VCard } from "vuetify/lib/components/index";
import CollaborativeTextEditorElementMenu from "./components/CollaborativeTextEditorElementMenu.vue";
import { setupCollaborativeTextEditorApiMock } from "./test-utils/collaborativeTextEditorApiMock";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");
jest.mock("./composables/CollaborativeTextEditorApi.composable");

describe("CollaborativeTextEditorElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (options?: {
		getUrlHasError?: boolean;
		isEditMode?: boolean;
		isListBoard?: boolean;
		windowWidth?: number;
	}) => {
		const element = collaborativeTextEditorElementResponseFactory.build();

		const { isListBoard, windowWidth, getUrlHasError, isEditMode } = {
			getUrlHasError: false,
			isListBoard: false,
			isEditMode: false,
			windowWidth: 1280,
			...options,
		};

		const resolvedValue = getUrlHasError
			? undefined
			: `${CollaborativeTextEditorParentType.ContentElement}/${element.id}`;
		const getUrlMock = jest.fn().mockResolvedValueOnce(resolvedValue);

		const { getUrl } = setupCollaborativeTextEditorApiMock({
			getUrlMock,
		});

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		const wrapper = mount(CollaborativeTextEditorElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[BOARD_IS_LIST_LAYOUT as symbol]: isListBoard,
				},
			},
			propsData: {
				isEditMode,
				element,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
			},
		});

		const windowMock = createMock<Window>();
		jest.spyOn(window, "open").mockImplementation(() => windowMock);

		return {
			wrapper,
			isEditMode: true,
			element: element,
			getUrl,
			windowMock,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when component is not in edit-mode", () => {
		it("should render the element corrrectly", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});
			expect(
				wrapper.findComponent(CollaborativeTextEditorElement).isVisible()
			).toBe(true);
		});

		it("should render the ContentElementBar", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});
			expect(wrapper.findComponent(ContentElementBar).exists()).toBe(true);
		});

		it("should not render the BoardMenu", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});

			const boardMenu = wrapper.findComponent(
				CollaborativeTextEditorElementMenu
			);

			expect(boardMenu.exists()).toBe(false);
		});

		it("should have the correct aria-label", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});

			const elementCard = wrapper.findComponent(VCard);

			expect(elementCard.attributes("aria-label")).toEqual(
				"components.cardElement.collaborativeTextEditorElement, common.ariaLabel.newTab"
			);
		});

		describe("when element is focused", () => {
			it.each(["enter", "space"])(
				"should open element in new tab when %s is pressed",
				async (key) => {
					const { wrapper, windowMock, element } = setup({
						isEditMode: false,
					});

					const elementCard = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(window.open).toHaveBeenCalledTimes(1);
					expect(windowMock.location).toBe(
						`${CollaborativeTextEditorParentType.ContentElement}/${element.id}`
					);
				}
			);

			it.each(["enter", "space"])(
				"should not open element in new tab when %s is pressed and getUrl is undefined",
				async (key) => {
					const { wrapper, windowMock, element } = setup({
						isEditMode: false,
						getUrlHasError: true,
					});

					const elementCard = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(window.open).toHaveBeenCalledTimes(1);
					expect(windowMock.location).not.toBe(
						`${CollaborativeTextEditorParentType.ContentElement}/${element.id}`
					);
				}
			);

			it.each(["up", "down"])(
				"should not emit 'move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setup({
						isEditMode: false,
					});

					const elementCard = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
				}
			);
		});

		describe("when element is clicked", () => {
			describe("when getUrl returns successful", () => {
				it("should call getUrl", async () => {
					const { wrapper, element, getUrl } = setup({
						isEditMode: false,
					});

					const card = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await card.trigger("click");

					expect(getUrl).toHaveBeenCalledTimes(1);
					expect(getUrl).toHaveBeenCalledWith(
						element.id,
						CollaborativeTextEditorParentType.ContentElement
					);
				});

				it("should open collaborative text editor in new tab", async () => {
					const { wrapper, element, windowMock } = setup({
						isEditMode: false,
					});

					const card = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await card.trigger("click");

					expect(window.open).toHaveBeenCalledTimes(1);
					expect(windowMock.location).toBe(
						`${CollaborativeTextEditorParentType.ContentElement}/${element.id}`
					);
				});
			});

			describe("when getUrl returns undefined", () => {
				it("should not open new tab", async () => {
					const { wrapper, windowMock, element } = setup({
						isEditMode: false,
						getUrlHasError: true,
					});

					const card = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await card.trigger("click");

					expect(window.open).toHaveBeenCalledTimes(1);
					expect(windowMock.location).not.toBe(
						`${CollaborativeTextEditorParentType.ContentElement}/${element.id}`
					);
				});
			});
		});
	});

	describe("when component is in edit-mode", () => {
		describe("when element is focused", () => {
			it.each(["up", "down"])(
				"should emit 'move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setup({
						isEditMode: true,
					});

					const elementCard = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(wrapper.emitted("move-keyboard:edit")).toBeTruthy();
				}
			);

			it.each(["enter", "space"])(
				"should open element in new tab when %s is pressed",
				async (key) => {
					const { wrapper, windowMock, element } = setup({
						isEditMode: true,
					});

					const elementCard = wrapper.findComponent({
						ref: "collaborativeTextEditorElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(window.open).toHaveBeenCalledTimes(1);
					expect(windowMock.location).toBe(
						`${CollaborativeTextEditorParentType.ContentElement}/${element.id}`
					);
				}
			);
		});

		it("should render BoardMenu element", async () => {
			const { wrapper } = setup({
				isEditMode: true,
			});

			const boardMenu = wrapper.findComponent(
				CollaborativeTextEditorElementMenu
			);
			expect(boardMenu.exists()).toBe(true);
		});

		describe("when move down is emitted by CollaborativeTextEditorElementMenu", () => {
			it('should emit "move-down:edit" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: true,
				});

				const boardMenu = wrapper.findComponent(
					CollaborativeTextEditorElementMenu
				);
				boardMenu.vm.$emit("move-down:element");

				expect(wrapper.emitted("move-down:edit")).toBeTruthy();
			});
		});

		describe("when move up is clicked", () => {
			it('should emit "move-up" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: true,
				});

				const boardMenu = wrapper.findComponent(
					CollaborativeTextEditorElementMenu
				);
				boardMenu.vm.$emit("move-up:element");

				expect(wrapper.emitted("move-up:edit")).toBeTruthy();
			});
		});

		describe("when delete is clicked", () => {
			it('should emit "delete" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: true,
				});

				const boardMenu = wrapper.findComponent(
					CollaborativeTextEditorElementMenu
				);
				boardMenu.vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toBeTruthy();
			});
		});
	});

	describe("when board is a list board", () => {
		it.each`
			screenSize  | px
			${"small"}  | ${600}
			${"medium"} | ${960}
			${"large"}  | ${1280}
		`(
			"content should have row style for $screenSize display sizes",
			({ px: windowWidth }) => {
				const { wrapper } = setup({
					isListBoard: true,
					windowWidth,
				});

				expect(wrapper.find(".content-element-bar").classes()).toContain(
					"flex-row"
				);
			}
		);

		it("content should have column style when display size is smaller than 600px", () => {
			const { wrapper } = setup({
				isListBoard: true,
				windowWidth: 599,
			});

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
			"content should have column style for $screenSize display sizes",
			({ px: windowWidth }) => {
				const { wrapper } = setup({
					isListBoard: false,
					windowWidth,
				});

				expect(wrapper.find(".content-element-bar").classes()).toContain(
					"flex-column"
				);
			}
		);
	});
});
