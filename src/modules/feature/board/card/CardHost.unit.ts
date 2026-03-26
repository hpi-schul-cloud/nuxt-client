import { setupAddElementDialogMock } from "../test-utils/AddElementDialogMock";
import CardHost from "./CardHost.vue";
import CardSkeleton from "./CardSkeleton.vue";
import ContentElementList from "./ContentElementList.vue";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardRestApi } from "@/modules/data/board/cardActions/cardRestApi.composable";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardSocketApi } from "@/modules/data/board/cardActions/cardSocketApi.composable";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { mockComposable, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { cardResponseFactory, fileElementResponseFactory } from "@@/tests/test-utils/factory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardResponseAllowedOperations, CardResponse } from "@api-server";
import { useBoardFocusHandler, useCardStore, useCourseBoardEditMode, useSharedEditMode } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionDuplicate,
	KebabMenuActionEdit,
	KebabMenuActionExport,
	KebabMenuActionShare,
	KebabMenuActionShareLink,
} from "@ui-kebab-menu";
import { useShareBoardLink, useSharedFileSelect, useSharedLastCreatedElement } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { Mocked } from "vitest";
import { computed, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@util-board");

vi.mock("@data-board/BoardFocusHandler.composable");
vi.mock("@data-board/edit-mode.composable");

vi.mock("../shared/AddElementDialog.composable");

vi.mock("@data-board/cardActions/cardRestApi.composable");
vi.mocked(useCardRestApi).mockReturnValue(mockComposable(useCardRestApi));

vi.mock("@data-board/cardActions/cardSocketApi.composable");
vi.mocked(useCardSocketApi).mockReturnValue(mockComposable(useCardSocketApi));

describe("CardHost", () => {
	let useShareBoardLinkMock: Mocked<ReturnType<typeof useShareBoardLink>>;
	let useSharedFileSelectMock: Mocked<ReturnType<typeof useSharedFileSelect>>;

	beforeEach(() => {
		vi.mocked(useSharedEditMode).mockReturnValue(
			mockComposable(useSharedEditMode, {
				editModeId: ref(undefined),
				isInEditMode: computed(() => true),
			})
		);

		useShareBoardLinkMock = mockComposable(useShareBoardLink);
		vi.mocked(useShareBoardLink).mockReturnValue(useShareBoardLinkMock);

		vi.mocked(useBoardFocusHandler).mockReturnValue(
			mockComposable(useBoardFocusHandler, {
				isFocusContained: computed(() => true),
				isFocused: computed(() => true),
				isFocusWithin: computed(() => true),
				isFocusedById: computed(() => true),
			})
		);

		vi.mocked(useCourseBoardEditMode).mockReturnValue(
			mockComposable(useCourseBoardEditMode, {
				isEditMode: computed(() => true),
			})
		);

		setupAddElementDialogMock();

		vi.mocked(useSharedLastCreatedElement).mockReturnValue(mockComposable(useSharedLastCreatedElement));

		useSharedFileSelectMock = mockComposable(useSharedFileSelect, {
			isFileSelectOnMountEnabled: ref(true),
		});
		vi.mocked(useSharedFileSelect).mockReturnValue(useSharedFileSelectMock);

		injectRouterMock(createRouterMock());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: {
		hasCard?: boolean;
		hasElement?: boolean;
		allowedOperations?: Partial<BoardResponseAllowedOperations>;
	}) => {
		const { hasElement = false, hasCard = true, allowedOperations = {} } = options ?? {};

		let card: CardResponse | null = null;
		if (hasCard) {
			card = cardResponseFactory.build({
				elements: hasElement ? [fileElementResponseFactory.build()] : [],
			});
		}

		const cardId = card?.id ?? "cardId";

		const wrapper = shallowMount(CardHost, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							cardStore: {
								cards: card ? { [card.id]: card } : {},
							},
							boardStore: {
								board: {
									allowedOperations: allowedOperations,
								},
							},
						},
						stubActions: false,
					}),
					createTestingVuetify(),
					createTestingI18n(),
				],
			},
			propsData: {
				cardId,
				height: card?.height ?? 0,
				columnIndex: 0,
				rowIndex: 1,
			},
		});

		return {
			wrapper,
			cardId,
		};
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent(CardHost).exists()).toBe(true);
		});

		describe("'CardSkeleton' component", () => {
			it("should be rendered if card is not loaded", () => {
				const { wrapper } = setup({ hasCard: false });

				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(true);
			});

			it("should not be rendered if card is loaded", () => {
				const { wrapper } = setup();
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(false);
			});
		});

		describe("'ContentElementList' component", () => {
			it("should be found in dom", () => {
				const { wrapper } = setup({});

				const contentElementList = wrapper.findComponent(ContentElementList);

				expect(contentElementList.exists()).toBe(true);
			});
		});
	});

	describe("user permissions", () => {
		describe("when user wants to share a card.", () => {
			it("should show share button", () => {
				const { wrapper } = setup({ allowedOperations: { shareCard: true } });
				const shareButton = wrapper.findComponent(KebabMenuActionShare);
				expect(shareButton.exists()).toEqual(true);
			});

			it("should not show share button", () => {
				const { wrapper } = setup({ allowedOperations: { shareCard: false } });
				const shareButton = wrapper.findComponent(KebabMenuActionShare);
				expect(shareButton.exists()).toEqual(false);
			});
		});

		describe("when user is not permitted to delete", () => {
			it("should not show an edit button", () => {
				const { wrapper } = setup({ allowedOperations: { deleteCard: false } });

				const deleteButton = wrapper.findComponent(KebabMenuActionEdit);

				expect(deleteButton.exists()).toEqual(false);
			});

			it("should not show a delete button", () => {
				const { wrapper } = setup({ allowedOperations: { deleteCard: false } });

				const deleteButton = wrapper.findComponent(KebabMenuActionDelete);

				expect(deleteButton.exists()).toEqual(false);
			});
		});

		describe("when user wants to move a card.", () => {
			it("should show move button when allowed to edit", () => {
				const { wrapper } = setup({ allowedOperations: { moveCard: true } });

				const moveButton = wrapper.findComponent(KebabMenuActionExport);

				expect(moveButton.exists()).toEqual(true);
			});

			it("should not show move button when not allowed to edit", () => {
				const { wrapper } = setup({ allowedOperations: { moveCard: false } });

				const moveButton = wrapper.findComponent(KebabMenuActionExport);

				expect(moveButton.exists()).toEqual(false);
			});
		});
	});

	describe("card menus", () => {
		describe("when users clicks duplicate menu btn", () => {
			it("should call cardStore.duplicateCardRequest", async () => {
				const { wrapper, cardId } = setup({ allowedOperations: { copyCard: true } });

				const duplicateButton = wrapper.findComponent(KebabMenuActionDuplicate);

				await duplicateButton.trigger("click");

				expect(useCardStore().duplicateCard).toHaveBeenCalledWith({ cardId });
			});

			it("should show card skeleton while duplicating", async () => {
				const { wrapper } = setup({ allowedOperations: { copyCard: true } });
				const cardStore = mockedPiniaStoreTyping(useCardStore);
				cardStore.duplicateCard.mockResolvedValueOnce();

				const duplicateButton = wrapper.findComponent(KebabMenuActionDuplicate);
				await duplicateButton.trigger("click");

				const cardSkeletons = wrapper.findAllComponents(CardSkeleton);
				expect(cardSkeletons).toHaveLength(1);

				await wrapper.vm.$nextTick();

				const cardSkeletonsAfterDuplicationFinished = wrapper.findAllComponents(CardSkeleton);
				expect(cardSkeletonsAfterDuplicationFinished).toHaveLength(0);
			});
		});

		describe("when user clicks move button", () => {
			it("should emit move:card event", () => {
				const { wrapper } = setup({ allowedOperations: { moveCard: true } });

				const moveButton = wrapper.findComponent(KebabMenuActionExport);
				moveButton.vm.$emit("click");

				expect(wrapper.emitted("move:card")).toHaveLength(1);
			});
		});

		describe("when user clicks share button", () => {
			it("should emit share:card event", () => {
				const { wrapper } = setup({ allowedOperations: { shareCard: true } });

				const shareButton = wrapper.findComponent(KebabMenuActionShare);
				shareButton.vm.$emit("click");

				expect(wrapper.emitted("share:card")).toHaveLength(1);
			});
		});

		describe("when users clicks share link menu", () => {
			it("should copy a share link", async () => {
				const { wrapper, cardId } = setup({ allowedOperations: { shareCard: true } });

				const shareLinkButton = wrapper.findComponent(KebabMenuActionShareLink);
				await shareLinkButton.trigger("click");

				expect(useShareBoardLinkMock.copyShareLink).toHaveBeenCalledWith(cardId, BoardMenuScope.CARD);
			});
		});

		describe("when users click delete menu", () => {
			it("should emit 'delete:card' when confirmed", async () => {
				vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
				const { wrapper } = setup({ allowedOperations: { deleteCard: true } });

				const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
				await deleteButton.trigger("click");

				expect(confirmDialogUtils.askDeletionForType).toHaveBeenCalledWith("components.boardCard");
				expect(wrapper.emitted("delete:card")).toHaveLength(1);
			});
		});
	});
});
