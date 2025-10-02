import { DrawingElementResponse } from "@/serverApi/v3";
import { drawingElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenu } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { shallowMount } from "@vue/test-utils";
import DrawingContentElement from "./DrawingContentElement.vue";
import InnerContent from "./InnerContent.vue";

// Mocks
vi.mock("@data-board", () => {
	return {
		useBoardFocusHandler: vi.fn(),
		useContentElementState: vi.fn(() => {
			return { modelValue: {} };
		}),
		useDeleteConfirmationDialog: vi.fn(),
	};
});
vi.mock("@feature-board");

const DRAWING_ELEMENT = drawingElementResponseFactory.build();

describe("DrawingContentElement", () => {
	const setup = (props: {
		element: DrawingElementResponse;
		isEditMode: boolean;
		isNotFirstElement?: boolean;
		isNotLastElement?: boolean;
		columnIndex: number;
		rowIndex: number;
		elementIndex: number;
	}) => {
		const wrapper = shallowMount(DrawingContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: props,
		});

		return { wrapper };
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when component is mounted", () => {
		it("renders correctly", () => {
			const { wrapper } = setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
			});
			expect(wrapper.findComponent(InnerContent).exists()).toBe(true);
		});

		it("should have the correct href and target attribute", () => {
			const { wrapper } = setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
			});

			const elementCard = wrapper.findComponent({
				ref: "drawingElement",
			});

			expect(elementCard.attributes("href")).toBe(
				`/tldraw?parentId=${DRAWING_ELEMENT.id}`
			);
			expect(elementCard.attributes("target")).toBe("_blank");
		});

		it("should have the correct aria-label", () => {
			const { wrapper } = setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
			});

			const elementCard = wrapper.findComponent({
				ref: "drawingElement",
			});

			expect(elementCard.attributes("aria-label")).toBe(
				"components.cardElement.drawingElement, common.ariaLabel.newTab"
			);
		});

		describe("when element is in view mode", () => {
			it.each(["up", "down"])(
				"should not 'emit move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: false,
						columnIndex: 0,
						rowIndex: 1,
						elementIndex: 2,
					});

					const elementCard = wrapper.findComponent({
						ref: "drawingElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
				}
			);

			it("should not render element menu", () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: false,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
				});

				const elementMenu = wrapper.findComponent(BoardMenu);

				expect(elementMenu.exists()).toBe(false);
			});
		});

		describe("when element is in edit-mode", () => {
			it.each(["up", "down"])(
				"should 'emit move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: true,
						columnIndex: 0,
						rowIndex: 1,
						elementIndex: 2,
					});

					const elementCard = wrapper.findComponent({
						ref: "drawingElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
				}
			);

			it("should render element menu", () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
				});

				const elementMenu = wrapper.findComponent(BoardMenu);

				expect(elementMenu.exists()).toBe(true);
			});

			it("should emit 'delete:element' event when delete menu item is clicked", async () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
				});

				const menuItem = wrapper.findComponent(KebabMenuActionDelete);
				await menuItem.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("delete:element");
			});

			describe("when element is first element", () => {
				it("should hide 'moveUp' menu item", () => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: true,
						columnIndex: 0,
						rowIndex: 1,
						elementIndex: 2,
						isNotFirstElement: false,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);

					expect(menuItem.exists()).toBe(false);
				});
			});

			describe("when element is not the first element", () => {
				describe("when move up menu is clicked", () => {
					it("should emit 'move-up:edit' event", async () => {
						const { wrapper } = setup({
							element: DRAWING_ELEMENT,
							isEditMode: true,
							columnIndex: 0,
							rowIndex: 1,
							elementIndex: 2,
							isNotFirstElement: true,
						});

						const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);
						await menuItem.trigger("click");

						expect(wrapper.emitted()).toHaveProperty("move-up:edit");
					});
				});
			});

			describe("when element is last element", () => {
				it("should hide 'moveDown' menu item", async () => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: true,
						columnIndex: 0,
						rowIndex: 1,
						elementIndex: 2,
						isNotLastElement: true,
					});

					const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);
					await menuItem.trigger("click");

					expect(wrapper.emitted()).toHaveProperty("move-down:edit");
				});
			});

			describe("when element is not last element", () => {
				describe("when move down menu item is clicked", () => {
					it("should emit 'move:down edit' event", async () => {
						const { wrapper } = setup({
							element: DRAWING_ELEMENT,
							isEditMode: true,
							columnIndex: 0,
							rowIndex: 1,
							elementIndex: 2,
							isNotLastElement: true,
						});

						const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);
						await menuItem.trigger("click");

						expect(wrapper.emitted()).toHaveProperty("move-down:edit");
					});
				});
			});
		});
	});
});
