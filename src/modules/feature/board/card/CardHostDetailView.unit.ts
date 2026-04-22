import CardHostDetailView from "./CardHostDetailView.vue";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardRestApi } from "@/modules/data/board/cardActions/cardRestApi.composable";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardSocketApi } from "@/modules/data/board/cardActions/cardSocketApi.composable";
import { mockComposable } from "@@/tests/test-utils";
import { boardResponseFactory, cardResponseFactory, fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardResponseAllowedOperations, CardResponse } from "@api-server";
import { useBoardAllowedOperations } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { useSharedFileSelect, useSharedLastCreatedElement } from "@util-board";
import { flushPromises, mount } from "@vue/test-utils";
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

describe("CardHostDetailView", () => {
	afterEach(() => {
		vi.clearAllMocks();
		document.body.innerHTML = "";
	});

	const setup = (
		props: ComponentProps<typeof CardHostDetailView>,
		allowedOperations?: Partial<BoardResponseAllowedOperations>
	) => {
		const testBoard = allowedOperations
			? boardResponseFactory.build({ allowedOperations })
			: boardResponseFactory.build();

		vi.mocked(useBoardAllowedOperations).mockReturnValue({
			allowedOperations: computed(() => testBoard.allowedOperations as BoardResponseAllowedOperations),
		});

		const wrapper = mount(CardHostDetailView, {
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

			// Wait for Vue's nextTick to complete teleport
			await wrapper.vm.$nextTick();
			await flushPromises();

			// Search in document.body since VDialog teleports there
			const editButton = document.querySelector("[data-testid='toolbar-edit-button']");

			expect(editButton).toBeTruthy();
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

			const addElementButton = wrapper.find("[data-testid='add-element-button']");
			expect(addElementButton.exists()).toBe(false);
		});
	});

	// describe("when edit button is clicked", () => {
	// 	it("should show view button after clicking edit", async () => {
	// 		const { wrapper } = setup(
	// 			{
	// 				card: CARD_WITH_ELEMENTS,
	// 				isOpen: true,
	// 				columnIndex: 0,
	// 				rowIndex: 1,
	// 			},
	// 			{ deleteCard: true, updateElement: true }
	// 		);

	// 		// Initially edit button should exist and isEditMode should be false
	// 		expect(mockIsEditMode.value).toBe(false);
	// 		const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
	// 		expect(editButton.exists()).toBe(true);

	// 		// Click the edit button
	// 		await editButton.trigger("click");

	// 		// Verify the mock function was called
	// 		expect(mockStartEditMode).toHaveBeenCalled();

	// 		// Verify state changed
	// 		expect(mockIsEditMode.value).toBe(true);

	// 		// Wait for reactivity
	// 		await nextTick();
	// 		await flushPromises();

	// 		// Now check for the view button
	// 		const viewButton = wrapper.find("[data-testid='toolbar-view-button']");
	// 		expect(viewButton.exists()).toBe(true);

	// 		// Edit button should be gone
	// 		expect(wrapper.find("[data-testid='toolbar-edit-button']").exists()).toBe(false);
	// 	});
	// });

	// describe("events", () => {
	// 	it("should emit close event when dialog is closed", async () => {
	// 		const { wrapper } = setup({
	// 			card: CARD_WITH_ELEMENTS,
	// 			isOpen: true,
	// 			columnIndex: 0,
	// 			rowIndex: 1,
	// 		});

	// 		await wrapper.vm.$emit("close:detail-view");
	// 		await nextTick();

	// 		expect(wrapper.emitted("close:detail-view")).toBeTruthy();
	// 	});

	// it("should emit update:title when title is updated", () => {
	// 	const { wrapper } = setup({
	// 		card: CARD_WITH_ELEMENTS,
	// 		isOpen: true,
	// 		columnIndex: 0,
	// 		rowIndex: 1,
	// 	});

	// 	const newTitle = "New title";
	// 	getVm(wrapper).onUpdateCardTitle(newTitle);

	// 	expect(wrapper.emitted("update:title")?.[0]).toEqual([newTitle]);
	// });

	// it("should emit add:element and enable edit mode when element is added", () => {
	// 	const { wrapper } = setup({
	// 		card: CARD_WITH_ELEMENTS,
	// 		isOpen: true,
	// 		columnIndex: 0,
	// 		rowIndex: 1,
	// 	});

	// 	getVm(wrapper).onAddElement();

	// 	expect(wrapper.emitted("add:element")).toBeTruthy();
	// });
	// });
});
