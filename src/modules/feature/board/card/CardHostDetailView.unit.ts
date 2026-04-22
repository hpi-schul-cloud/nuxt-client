import CardHostDetailView from "./CardHostDetailView.vue";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardRestApi } from "@/modules/data/board/cardActions/cardRestApi.composable";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardSocketApi } from "@/modules/data/board/cardActions/cardSocketApi.composable";
import { mockComposable } from "@@/tests/test-utils";
import { boardResponseFactory, cardResponseFactory, fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardResponseAllowedOperations, CardResponse } from "@api-server";
import { useBoardAllowedOperations, useCourseBoardEditMode } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { useSharedFileSelect, useSharedLastCreatedElement } from "@util-board";
import { computed } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { VDialog } from "vuetify/components";

const CARD_WITH_ELEMENTS: CardResponse = cardResponseFactory.build({
	elements: [fileElementResponseFactory.build()],
});

vi.mock("@data-board/BoardPermissions.composable");

vi.mock("@data-board/cardActions/cardRestApi.composable");
vi.mocked(useCardRestApi).mockReturnValue(mockComposable(useCardRestApi));

vi.mock("@data-board/cardActions/cardSocketApi.composable");
vi.mocked(useCardSocketApi).mockReturnValue(mockComposable(useCardSocketApi));

vi.mock("@util-board/LastCreatedElement.composable");
vi.mocked(useSharedLastCreatedElement).mockReturnValue(mockComposable(useSharedLastCreatedElement));

vi.mock("@util-board/file-select.composable");
vi.mocked(useSharedFileSelect).mockReturnValue(mockComposable(useSharedFileSelect));

vi.mock("@data-board/board-allowed-operations.composable");
vi.mock("@data-board/edit-mode.composable");

describe("CardHostDetailView", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		props: ComponentProps<typeof CardHostDetailView>,
		allowedOperations?: Partial<BoardResponseAllowedOperations>,
		editMode?: boolean
	) => {
		const testBoard = allowedOperations
			? boardResponseFactory.build({ allowedOperations })
			: boardResponseFactory.build();

		vi.mocked(useBoardAllowedOperations).mockReturnValue({
			allowedOperations: computed(() => testBoard.allowedOperations as BoardResponseAllowedOperations),
		});

		vi.mocked(useCourseBoardEditMode).mockReturnValue({
			isEditMode: computed(() => editMode ?? false),
			startEditMode: vi.fn(),
			stopEditMode: vi.fn(),
		});

		const wrapper = shallowMount(CardHostDetailView, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							cardStore: {
								cards: CARD_WITH_ELEMENTS,
							},
							boardStore: {
								board: testBoard,
							},
						},
						stubActions: false,
					}),
					createTestingVuetify(),
					createTestingI18n(),
				],
			},
			propsData: props,
			attachTo: document.body,
		});

		return {
			wrapper,
		};
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});
			expect(wrapper.findComponent(CardHostDetailView).exists()).toBe(true);
		});
	});

	describe("when detail view is open", () => {
		it("should display the dialog", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

			expect(wrapper.findComponent(VDialog).exists()).toBe(true);
		});
	});

	describe("when detail view is not open", () => {
		it("should not display the dialog", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: false,
				columnIndex: 0,
				rowIndex: 1,
			});

			expect(wrapper.findComponent(VDialog).props("modelValue")).toBe(false);
		});
	});

	describe("user with edit permissions", () => {
		it("should show edit button", async () => {
			const { wrapper } = setup(
				{
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				},
				{ deleteCard: true }
			);

			const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
			expect(editButton.exists()).toBe(true);
		});

		describe("when edit mode is active", () => {
			it("should show view button", async () => {
				const { wrapper } = setup(
					{
						card: CARD_WITH_ELEMENTS,
						isOpen: true,
						columnIndex: 0,
						rowIndex: 1,
					},
					{ deleteCard: true },
					true
				);

				const viewButton = wrapper.find("[data-testid='toolbar-view-button']");
				const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
				expect(viewButton.exists()).toBe(true);
				expect(editButton.exists()).toBe(false);
			});

			it("should show addElementbutton", async () => {
				const { wrapper } = setup(
					{
						card: CARD_WITH_ELEMENTS,
						isOpen: true,
						columnIndex: 0,
						rowIndex: 1,
					},
					{ deleteCard: true },
					true
				);

				const addElementButton = wrapper.find("[data-testid='add-element-button']");
				expect(addElementButton.exists()).toBe(true);
			});
		});
	});

	describe("user without edit permissions", () => {
		it("should not show edit button", () => {
			const { wrapper } = setup(
				{
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				},
				{ deleteCard: false }
			);

			const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
			expect(editButton.exists()).toBe(false);
		});
	});

	describe("when close button gets clicked", () => {
		it("should emit close event", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

			const closeButton = wrapper.find("[data-testid='close-detail-view-button']");
			closeButton.trigger("click");

			expect(wrapper.emitted("close:detail-view")).toBeTruthy();
		});
	});

	describe("card title events", () => {
		describe("when update gets triggered", () => {
			it("should emit update:title", () => {
				const { wrapper } = setup({
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				});

				const cardTitle = wrapper.findComponent({ name: "CardTitle" });
				cardTitle.vm.$emit("update:value", "new-title");

				expect(wrapper.emitted("update:title")).toBeTruthy();
				expect(wrapper.emitted("update:title")?.[0]).toEqual(["new-title"]);
			});
		});

		describe("when enter gets triggered", () => {
			it("should emit enter:title", () => {
				const { wrapper } = setup({
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				});

				const cardTitle = wrapper.findComponent({ name: "CardTitle" });
				cardTitle.vm.$emit("enter");

				expect(wrapper.emitted("enter:title")).toBeTruthy();
			});
		});
	});

	describe("content element list events", () => {
		describe("when delete element gets triggered", () => {
			it("should emit delete:element", () => {
				const { wrapper } = setup({
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				});

				const contentElementList = wrapper.findComponent({ name: "ContentElementList" });
				contentElementList.vm.$emit("delete:element", "element-id");

				expect(wrapper.emitted("delete:element")).toBeTruthy();
				expect(wrapper.emitted("delete:element")?.[0]).toEqual(["element-id"]);
			});
		});

		describe("when move down gets triggered", () => {
			it("should emit move-down:element", () => {
				const { wrapper } = setup({
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				});

				const contentElementList = wrapper.findComponent({ name: "ContentElementList" });
				contentElementList.vm.$emit("move-down:element", "element-id");

				expect(wrapper.emitted("move-down:element")).toBeTruthy();
				expect(wrapper.emitted("move-down:element")?.[0]).toEqual(["element-id"]);
			});
		});

		describe("when move up gets triggered", () => {
			it("should emit move-up:element", () => {
				const { wrapper } = setup({
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				});

				const contentElementList = wrapper.findComponent({ name: "ContentElementList" });
				contentElementList.vm.$emit("move-up:element", "element-id");

				expect(wrapper.emitted("move-up:element")).toBeTruthy();
				expect(wrapper.emitted("move-up:element")?.[0]).toEqual(["element-id"]);
			});
		});

		describe("when move keyboard gets triggered", () => {
			it("should emit move-keyboard:element", () => {
				const { wrapper } = setup({
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				});

				const contentElementList = wrapper.findComponent({ name: "ContentElementList" });
				contentElementList.vm.$emit("move-keyboard:element", "element-id", "up");

				expect(wrapper.emitted("move-keyboard:element")).toBeTruthy();
				expect(wrapper.emitted("move-keyboard:element")?.[0]).toEqual(["element-id", "up"]);
			});
		});
	});
});
