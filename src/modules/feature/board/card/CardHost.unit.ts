import { BoardCard, BoardCardSkeleton } from "@/types/board/Card";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import {
	boardCardFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils/factory";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useCardState,
	useEditMode,
} from "@data-board";
import { BoardMenuActionDelete } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { shallowMount } from "@vue/test-utils";
import { computed, ref } from "vue";
import { setupAddElementDialogMock } from "../test-utils/AddElementDialogMock";
import CardHost from "./CardHost.vue";
import ContentElementList from "./ContentElementList.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

jest.mock("@data-board/BoardFocusHandler.composable");
jest.mock("@data-board/BoardPermissions.composable");
jest.mock("../shared/AddElementDialog.composable");
jest.mock("@ui-confirmation-dialog");
jest.mock("@data-board");

const mockedBoardFocusHandler = jest.mocked(useBoardFocusHandler);
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const mockedEditMode = jest.mocked(useEditMode);
const mockedUseCardState = jest.mocked(useCardState);

const mockedUseDeleteConfirmationDialog = jest.mocked(
	useDeleteConfirmationDialog
);

const CARD_SKELETON: BoardCardSkeleton = {
	height: 200,
	cardId: "0123456789abcdef00067000",
};

const CARD_WITHOUT_ELEMENTS: BoardCard = boardCardFactory.build();

const CARD_WITH_FILE_ELEMENT: BoardCard = boardCardFactory.build({
	elements: [fileElementResponseFactory.build()],
});

describe("CardHost", () => {
	const setup = (options?: {
		card: BoardCard;
		isLoading?: boolean;
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
		const { card, isLoading } = options ?? {};
		document.body.setAttribute("data-app", "true");

		const isFocusContainedMock = computed(() => true);
		mockedBoardFocusHandler.mockReturnValue({
			isFocusContained: isFocusContainedMock,
			isFocused: computed(() => true),
			isFocusWithin: computed(() => true),
			isFocusedById: computed(() => true),
		});

		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		const isEditModeMock = computed(() => true);
		const startEditModeMock = jest.fn();
		const stopEditModeMock = jest.fn();
		mockedEditMode.mockReturnValue({
			isEditMode: isEditModeMock,
			startEditMode: startEditModeMock,
			stopEditMode: stopEditModeMock,
		});

		setupAddElementDialogMock();

		const deleteElementMock = jest.fn();
		mockedUseCardState.mockReturnValue({
			fetchCard: jest.fn(),
			updateTitle: jest.fn(),
			deleteCard: jest.fn(),
			updateCardHeight: jest.fn(),
			addElement: jest.fn(),
			addTextAfterTitle: jest.fn(),
			moveElementDown: jest.fn(),
			moveElementUp: jest.fn(),
			deleteElement: deleteElementMock as () => Promise<void>,
			card: ref(card),
			isLoading: ref(isLoading ?? false),
			notifyWithTemplateAndReload: jest.fn(),
		});

		const askDeleteConfirmationMock = async () => await Promise.resolve(true);

		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});

		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});

		const wrapper = shallowMount(CardHost, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: CARD_SKELETON,
		});

		return { deleteElementMock, wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ card: CARD_WITHOUT_ELEMENTS });
			expect(wrapper.findComponent(CardHost).exists()).toBe(true);
		});

		describe("'CardSkeleton' component", () => {
			it("should be rendered if loading is set 'true'", () => {
				const { wrapper } = setup({
					card: CARD_WITHOUT_ELEMENTS,
					isLoading: true,
				});
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					true
				);
			});

			it("should not be rendered if loading is set 'false'", () => {
				const { wrapper } = setup({ card: CARD_WITHOUT_ELEMENTS });
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					false
				);
			});
		});

		describe("'ContentElementList' component", () => {
			it("should be found in dom", () => {
				const { wrapper } = setup({ card: CARD_WITH_FILE_ELEMENT });

				const contentElementList = wrapper.findComponent(ContentElementList);

				expect(contentElementList.exists()).toBe(true);
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete", () => {
			it("should not be rendered on DOM", () => {
				const { wrapper } = setup({
					card: CARD_WITHOUT_ELEMENTS,
					permissions: { hasDeletePermission: false },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});

	describe("card menus", () => {
		describe("when users click delete menu", () => {
			it("should emit 'delete:card'", async () => {
				const { wrapper } = setup({ card: CARD_WITHOUT_ELEMENTS });

				const deleteButton = wrapper.findComponent(BoardMenuActionDelete);

				await deleteButton.vm.$emit("click", true);

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();
				const emitted = wrapper.emitted()["delete:card"] ?? [];

				expect(emitted).toHaveLength(1);
			});
		});
	});
});
