import { BoardCard, BoardCardSkeleton } from "@/types/board/Card";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import {
	boardCardFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils/factory";
import {
	useCardState,
	useEditMode,
	useBoardFocusHandler,
	useBoardPermissions,
} from "@data-board";
import { describe, expect, it, jest } from "@jest/globals";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { computed, ref } from "vue";
import ContentElementList from "./ContentElementList.vue";
import { setupAddElementDialogMock } from "../test-utils/AddElementDialogMock";
import CardHost from "./CardHost.vue";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";

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
	let wrapper: Wrapper<Vue>;

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
		});

		const askDeleteConfirmationMock = async () => await Promise.resolve(true);

		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});

		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});

		wrapper = shallowMount(CardHost as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: CARD_SKELETON,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});

		return { deleteElementMock };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ card: CARD_WITHOUT_ELEMENTS });
			expect(wrapper.findComponent(CardHost).exists()).toBe(true);
		});

		describe("'CardSkeleton' component", () => {
			it("should be rendered if loading is set 'true'", () => {
				setup({ card: CARD_WITHOUT_ELEMENTS, isLoading: true });
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					true
				);
			});

			it("should not be rendered if loading is set 'false'", () => {
				setup({ card: CARD_WITHOUT_ELEMENTS });
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					false
				);
			});
		});

		describe("'ContentElementList' component", () => {
			it("should be found in dom", () => {
				setup({ card: CARD_WITH_FILE_ELEMENT });

				const contentElementList = wrapper.findComponent(ContentElementList);

				expect(contentElementList.exists()).toBe(true);
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete", () => {
			it("should not be rendered on DOM", () => {
				setup({
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
				setup({ card: CARD_WITHOUT_ELEMENTS });

				const firstMenuItem = wrapper.findComponent({
					name: "BoardMenuAction",
				});

				firstMenuItem.vm.$emit("click");

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();
				const emitted = wrapper.emitted()["delete:card"] ?? [];

				expect(emitted).toHaveLength(1);
			});
		});
	});
});
