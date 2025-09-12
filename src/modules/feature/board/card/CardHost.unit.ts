import { CardResponse } from "@/serverApi/v3";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import {
	cardResponseFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils/factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useCardStore,
} from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { BoardMenuScope } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import {
	KebabMenuActionDelete,
	KebabMenuActionEdit,
	KebabMenuActionShareLink,
} from "@ui-kebab-menu";
import {
	useBoardNotifier,
	useCourseBoardEditMode,
	useShareBoardLink,
	useSharedEditMode,
	useSharedLastCreatedElement,
} from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { computed, ref } from "vue";
import { setupAddElementDialogMock } from "../test-utils/AddElementDialogMock";
import CardHost from "./CardHost.vue";
import ContentElementList from "./ContentElementList.vue";

vi.mock("vue-router");

vi.mock("@util-board");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);
const mockedSharedLastCreatedElement = vi.mocked(useSharedLastCreatedElement);
const mockedEditMode = vi.mocked(useCourseBoardEditMode);
const mockedUseSharedEditMode = vi.mocked(useSharedEditMode);
const mockedUseShareBoardLink = vi.mocked(useShareBoardLink);

vi.mock("@data-board/BoardFocusHandler.composable");
const mockedBoardFocusHandler = vi.mocked(useBoardFocusHandler);

vi.mock("@data-board/BoardPermissions.composable");
const mockedUseBoardPermissions = vi.mocked(useBoardPermissions);

vi.mock("../shared/AddElementDialog.composable");
vi.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = vi.mocked(
	useDeleteConfirmationDialog
);

describe("CardHost", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let mockedBoardPermissionsHandler: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;
	let mockedBoardPermissions: BoardPermissionChecks;
	let mockedSharedLastCreatedElementCalls: DeepMocked<
		ReturnType<typeof useSharedLastCreatedElement>
	>;
	let useShareBoardLinkMock: DeepMocked<ReturnType<typeof useShareBoardLink>>;

	beforeEach(() => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

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
		const askDeleteConfirmationMock = async () => await Promise.resolve(true);
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});

		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});

		mockedBoardPermissionsHandler =
			createMock<ReturnType<typeof useBoardPermissions>>();
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissionsHandler);

		mockedBoardPermissions = { ...defaultPermissions };
		mockedUseBoardPermissions.mockReturnValue(mockedBoardPermissions);
		mockedSharedLastCreatedElementCalls =
			createMock<ReturnType<typeof useSharedLastCreatedElement>>();
		mockedSharedLastCreatedElement.mockReturnValue(
			mockedSharedLastCreatedElementCalls
		);
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

		mockedPiniaStoreTyping(useCardStore);

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

				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					true
				);
			});

			it("should not be rendered if card is loaded", () => {
				const { wrapper } = setup();
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					false
				);
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
	});

	describe("card menus", () => {
		describe("when users clicks share link menu", () => {
			it("should copy a share link", async () => {
				mockedBoardPermissions.hasDeletePermission.value = true;
				const { wrapper, cardId } = setup();

				const shareLinkButton = wrapper.findComponent(KebabMenuActionShareLink);

				await shareLinkButton.trigger("click");

				expect(useShareBoardLinkMock.copyShareLink).toHaveBeenCalledWith(
					cardId,
					BoardMenuScope.CARD
				);
			});
		});

		describe("when users click delete menu", () => {
			it("should emit 'delete:card'", async () => {
				mockedBoardPermissions.hasDeletePermission.value = true;
				const { wrapper } = setup();

				const deleteButton = wrapper.findComponent(KebabMenuActionDelete);

				await deleteButton.vm.$emit("click", true);

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();
				const emitted = wrapper.emitted()["delete:card"] ?? [];

				expect(emitted).toHaveLength(1);
			});
		});
	});
});
