import { setupAddElementDialogMock } from "../test-utils/AddElementDialogMock";
import CardHost from "./CardHost.vue";
import CardSkeleton from "./CardSkeleton.vue";
import ContentElementList from "./ContentElementList.vue";
import { CardResponse } from "@/serverApi/v3";
import { BoardPermissionChecks, defaultPermissions } from "@/types/board/Permissions";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { cardResponseFactory, fileElementResponseFactory } from "@@/tests/test-utils/factory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useCardStore,
	useCourseBoardEditMode,
	useSharedEditMode,
} from "@data-board";
import { useCardRestApi } from "@data-board/cardActions/cardRestApi.composable";
import { useCardSocketApi } from "@data-board/cardActions/cardSocketApi.composable";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { BoardMenuScope } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
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
import { computed, ref } from "vue";

vi.mock("vue-router");

vi.mock("@util-board");
const mockedSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);
const mockedUseShareBoardLink = vi.mocked(useShareBoardLink);
const mockedUseSharedFileSelect = vi.mocked(useSharedFileSelect);

vi.mock("@data-board/BoardFocusHandler.composable");
const mockedBoardFocusHandler = vi.mocked(useBoardFocusHandler);

vi.mock("@data-board/edit-mode.composable");
const mockedEditMode = vi.mocked(useCourseBoardEditMode);
const mockedUseSharedEditMode = vi.mocked(useSharedEditMode);

vi.mock("@data-board/BoardPermissions.composable");
const mockedUseBoardPermissions = vi.mocked(useBoardPermissions);

vi.mock("../shared/AddElementDialog.composable");
vi.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = vi.mocked(useDeleteConfirmationDialog);

vi.mock("@data-board/cardActions/cardRestApi.composable");
vi.mocked(useCardRestApi).mockReturnValue({
	createElementRequest: vi.fn(),
	createPreferredElement: vi.fn(),
	getPreferredTools: vi.fn(),
	deleteElementRequest: vi.fn(),
	moveElementRequest: vi.fn(),
	updateElementRequest: vi.fn(),
	duplicateCardRequest: vi.fn(),
	deleteCardRequest: vi.fn(),
	fetchCardRequest: vi.fn(),
	updateCardTitleRequest: vi.fn(),
	updateCardHeightRequest: vi.fn(),
	disconnectSocketRequest: vi.fn(),
});

vi.mock("@data-board/cardActions/cardSocketApi.composable");
vi.mocked(useCardSocketApi).mockReturnValue({
	dispatch: vi.fn(),
	disconnectSocketRequest: vi.fn(),
	createElementRequest: vi.fn(),
	deleteElementRequest: vi.fn(),
	moveElementRequest: vi.fn(),
	updateElementRequest: vi.fn(),
	deleteCardRequest: vi.fn(),
	fetchCardRequest: vi.fn(),
	updateCardTitleRequest: vi.fn(),
	updateCardHeightRequest: vi.fn(),
	duplicateCardRequest: vi.fn(),
});

describe("CardHost", () => {
	let mockedBoardPermissionsHandler: DeepMocked<ReturnType<typeof useBoardPermissions>>;
	let mockedBoardPermissions: BoardPermissionChecks;
	let mockedSharedLastCreatedElementCalls: DeepMocked<ReturnType<typeof useSharedLastCreatedElement>>;
	let useShareBoardLinkMock: DeepMocked<ReturnType<typeof useShareBoardLink>>;
	let mockedUseSharedFileSelectActions: DeepMocked<ReturnType<typeof useSharedFileSelect>>;

	beforeEach(() => {
		mockedUseSharedEditMode.mockReturnValue({
			editModeId: ref(undefined),
			setEditModeId: vi.fn(),
			isInEditMode: computed(() => true),
		});

		useShareBoardLinkMock = createMock<ReturnType<typeof useShareBoardLink>>({
			getShareLinkId: vi.fn().mockReturnValue("shareLinkId"),
		});
		mockedUseShareBoardLink.mockReturnValue(useShareBoardLinkMock);

		mockedBoardFocusHandler.mockReturnValue({
			isFocusContained: computed(() => true),
			isFocused: computed(() => true),
			isFocusWithin: computed(() => true),
			isFocusedById: computed(() => true),
		});

		mockedEditMode.mockReturnValue({
			isEditMode: computed(() => true),
			startEditMode: vi.fn(),
			stopEditMode: vi.fn(),
		});

		setupAddElementDialogMock();
		const askDeleteConfirmationMock = () => Promise.resolve(true);
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});

		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});

		mockedBoardPermissionsHandler = createMock<ReturnType<typeof useBoardPermissions>>();
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissionsHandler);

		mockedBoardPermissions = { ...defaultPermissions };
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissions);
		mockedSharedLastCreatedElementCalls = createMock<ReturnType<typeof useSharedLastCreatedElement>>();
		mockedSharedLastCreatedElement.mockReturnValue(mockedSharedLastCreatedElementCalls);

		mockedUseSharedFileSelectActions = createMock<ReturnType<typeof useSharedFileSelect>>({
			isFileSelectOnMountEnabled: ref(true),
			resetFileSelectOnMountEnabled: vi.fn(),
			disableFileSelectOnMount: vi.fn(),
		});
		mockedUseSharedFileSelect.mockReturnValue(mockedUseSharedFileSelectActions);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: { hasCard?: boolean; hasElement?: boolean }) => {
		const { hasElement, hasCard } = {
			hasCard: true,
			hasElement: false,
			...options,
		};

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
				mockedBoardPermissions.hasShareBoardPermission.value = true;
				const { wrapper } = setup();
				const shareButton = wrapper.findComponent(KebabMenuActionShare);
				expect(shareButton.exists()).toEqual(true);
			});

			it("should not show share button", () => {
				mockedBoardPermissions.hasShareBoardPermission.value = false;
				const { wrapper } = setup();
				const shareButton = wrapper.findComponent(KebabMenuActionShare);
				expect(shareButton.exists()).toEqual(false);
			});
		});

		describe("when user is not permitted to delete", () => {
			it("should not show an edit button", () => {
				mockedBoardPermissions.hasDeletePermission.value = false;
				const { wrapper } = setup();

				const deleteButton = wrapper.findComponent(KebabMenuActionEdit);

				expect(deleteButton.exists()).toEqual(false);
			});

			it("should not show a delete button", () => {
				mockedBoardPermissions.hasDeletePermission.value = false;
				const { wrapper } = setup();

				const deleteButton = wrapper.findComponent(KebabMenuActionDelete);

				expect(deleteButton.exists()).toEqual(false);
			});
		});

		describe("when user wants to move a card.", () => {
			it("should show move button when allowed to edit", () => {
				mockedBoardPermissions.hasEditPermission.value = true;
				const { wrapper } = setup();
				const moveButton = wrapper.findComponent(KebabMenuActionExport);
				expect(moveButton.exists()).toEqual(true);
			});

			it("should not show move button when not allowed to edit", () => {
				mockedBoardPermissions.hasEditPermission.value = false;
				const { wrapper } = setup();
				const moveButton = wrapper.findComponent(KebabMenuActionExport);
				expect(moveButton.exists()).toEqual(false);
			});
		});
	});

	describe("card menus", () => {
		describe("when users clicks duplicate menu btn", () => {
			it("should call cardStore.duplicateCardRequest", async () => {
				mockedBoardPermissions.hasEditPermission.value = true;
				const { wrapper, cardId } = setup();

				const duplicateButton = wrapper.findComponent(KebabMenuActionDuplicate);

				await duplicateButton.trigger("click");

				expect(useCardStore().duplicateCard).toHaveBeenCalledWith({ cardId });
			});

			it("should show card skeleton while duplicating", async () => {
				mockedBoardPermissions.hasEditPermission.value = true;
				const { wrapper } = setup();
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
				mockedBoardPermissions.hasEditPermission.value = true;
				const { wrapper } = setup();

				const moveButton = wrapper.findComponent(KebabMenuActionExport);
				moveButton.vm.$emit("click");

				expect(wrapper.emitted("move:card")).toHaveLength(1);
			});
		});

		describe("when user clicks share button", () => {
			it("should emit share:card event", () => {
				mockedBoardPermissions.hasShareBoardPermission.value = true;
				const { wrapper } = setup();

				const shareButton = wrapper.findComponent(KebabMenuActionShare);
				shareButton.vm.$emit("click");

				expect(wrapper.emitted("share:card")).toHaveLength(1);
			});
		});

		describe("when users clicks share link menu", () => {
			it("should copy a share link", async () => {
				mockedBoardPermissions.hasDeletePermission.value = true;
				const { wrapper, cardId } = setup();

				const shareLinkButton = wrapper.findComponent(KebabMenuActionShareLink);
				await shareLinkButton.trigger("click");

				expect(useShareBoardLinkMock.copyShareLink).toHaveBeenCalledWith(cardId, BoardMenuScope.CARD);
			});
		});

		describe("when users click delete menu", () => {
			it("should emit 'delete:card'", async () => {
				mockedBoardPermissions.hasDeletePermission.value = true;
				const { wrapper } = setup();

				const deleteButton = wrapper.findComponent(KebabMenuActionDelete);
				await deleteButton.vm.$emit("click", true);

				expect(wrapper.emitted("delete:card")).toHaveLength(1);
			});
		});
	});
});
