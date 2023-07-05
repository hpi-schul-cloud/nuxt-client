import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { setupDeleteBoardNodeConfirmationMock } from "@@/tests/test-utils/composable-mocks/deleteBoardNodeConfirmationMock";
import {
	boardCardFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils/factory";
import { MountOptions, Wrapper, shallowMount } from "@vue/test-utils";
import Vue, { Ref, computed, ref } from "vue";
import ContentElementList from "../content-elements/ContentElementList.vue";
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { useEditMode } from "../shared/EditMode.composable";
import { useElementTypeSelection } from "../shared/ElementTypeSelection.composable";
import { useCardState } from "../state/CardState.composable";
import { BoardCard, BoardCardSkeleton } from "../types/Card";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "../types/Permissions";
import CardHost from "./CardHost.vue";

jest.mock("../shared/BoardFocusHandler.composable");
jest.mock("../shared/BoardPermissions.composable");
jest.mock("../shared/DeleteBoardNodeConfirmation.composable");
jest.mock("../shared/EditMode.composable");
jest.mock("../shared/ElementTypeSelection.composable");
jest.mock("../state/CardState.composable");

const mockedBoardFocusHandler = jest.mocked(useBoardFocusHandler);
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const mockedEditMode = jest.mocked(useEditMode);
const mockedElementTypeSelection = jest.mocked(useElementTypeSelection);
const mockedUseCardState = jest.mocked(useCardState);

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

		const createTextElementMock = jest.fn();
		const createFileElementMock = jest.fn();
		const elementTypeOptionsMock: Ref<
			{
				icon: string;
				label: string;
				action: () => void;
				testId: string;
			}[]
		> = ref([
			{
				icon: "action1-icon",
				label: "action1-label",
				action: createTextElementMock,
				testId: "action1-id",
			},
			{
				icon: "action2-icon",
				label: "action2-label",
				action: createFileElementMock,
				testId: "action2-id",
			},
		]);
		const askTypeMock = jest.fn();
		const onFileSelectMock = jest.fn();
		const isFilePickerOpenMock = ref(false);
		const isDialogOpenMock = ref(false);
		mockedElementTypeSelection.mockReturnValue({
			askType: askTypeMock,
			isDialogOpen: isDialogOpenMock,
			elementTypeOptions: elementTypeOptionsMock,
			onElementClick: jest.fn(),
			onFileElementClick: jest.fn(),
			onFileSelect: onFileSelectMock,
			isFilePickerOpen: isFilePickerOpenMock,
		});

		const deleteElementMock = jest.fn();
		mockedUseCardState.mockReturnValue({
			fetchCard: jest.fn(),
			updateTitle: jest.fn(),
			deleteCard: jest.fn(),
			updateCardHeight: jest.fn(),
			addElement: jest.fn(),
			moveElementDown: jest.fn(),
			moveElementUp: jest.fn(),
			deleteElement: deleteElementMock,
			card: ref(card),
			isLoading: ref(isLoading ?? false),
		});

		setupDeleteBoardNodeConfirmationMock();

		wrapper = shallowMount(CardHost as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: CARD_SKELETON,
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

			it("should propagate deleteElement function to ContentElementList", () => {
				const { deleteElementMock } = setup({ card: CARD_WITH_FILE_ELEMENT });

				const contentElementList = wrapper.findComponent(ContentElementList);

				expect(contentElementList.props("deleteElement")).toBe(
					deleteElementMock
				);
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
});
