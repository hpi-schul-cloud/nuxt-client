import CardHostDetailView from "./CardHostDetailView.vue";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardRestApi } from "@/modules/data/board/cardActions/cardRestApi.composable";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardSocketApi } from "@/modules/data/board/cardActions/cardSocketApi.composable";
import {
	boardResponseFactory,
	cardResponseFactory,
	fileElementResponseFactory,
	mockComposable,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardResponseAllowedOperations, CardResponse, Colors } from "@api-server";
import { useBoardAllowedOperations, useCourseBoardEditMode, useSharedEditMode } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { useSharedFileSelect, useSharedLastCreatedElement } from "@util-board";
import { computed, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { VDialog } from "vuetify/components";

const backgroundColor = Colors.BLUE;

const CARD_WITH_ELEMENTS: CardResponse = cardResponseFactory.build({
	elements: [fileElementResponseFactory.build()],
	backgroundColor: backgroundColor,
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
const mockedUseSharedEditMode = vi.mocked(useSharedEditMode);

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

		const mockedSharedEditMode = mockComposable(useSharedEditMode, {
			editModeId: ref(undefined),
			isInEditMode: computed(() => true),
		});
		mockedUseSharedEditMode.mockReturnValue(mockedSharedEditMode);

		const wrapper = shallowMount(CardHostDetailView, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							cardStore: {
								cards: {
									[CARD_WITH_ELEMENTS.id]: CARD_WITH_ELEMENTS,
								},
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
				cardId: CARD_WITH_ELEMENTS.id,
			});
			expect(wrapper.findComponent(CardHostDetailView).exists()).toBe(true);
		});
	});

	describe("when detail view is open", () => {
		it("should display the dialog", () => {
			const { wrapper } = setup({
				cardId: CARD_WITH_ELEMENTS.id,
			});

			expect(wrapper.findComponent(VDialog).exists()).toBe(true);
		});
	});

	describe("user with edit permissions", () => {
		it("should show edit button", async () => {
			const { wrapper } = setup(
				{
					cardId: CARD_WITH_ELEMENTS.id,
				},
				{ deleteCard: true }
			);

			const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
			expect(editButton.exists()).toBe(true);
		});

		describe("when edit mode is activated", () => {
			it("should show view button", () => {
				const { wrapper } = setup(
					{
						cardId: CARD_WITH_ELEMENTS.id,
					},
					{ deleteCard: true },
					true
				);

				const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
				expect(editButton.exists()).toBe(false);

				const viewButton = wrapper.find("[data-testid='toolbar-view-button']");
				expect(viewButton.exists()).toBe(true);
			});
		});
	});

	describe("user without edit permissions", () => {
		it("should not show edit button", () => {
			const { wrapper } = setup(
				{
					cardId: CARD_WITH_ELEMENTS.id,
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
				cardId: CARD_WITH_ELEMENTS.id,
			});

			const closeButton = wrapper.find("[data-testid='close-detail-view-button']");
			closeButton.trigger("click");

			expect(wrapper.emitted("close:detail-view")).toBeTruthy();
		});
	});
});
