import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import ContentElementList from "../content-elements/ContentElementList.vue";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { useDeleteBoardNodeConfirmation } from "../shared/DeleteBoardNodeConfirmation.composable";
import { useCardState } from "../state/CardState.composable";
import { BoardPermissionsTypes } from "../types/Board";
import { BoardCard, BoardCardSkeleton } from "../types/Card";
import CardHost from "./CardHost.vue";

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const defaultPermissions = {
	hasDeletePermission: true,
};

const CARD_SKELETON: BoardCardSkeleton = {
	height: 200,
	cardId: "0123456789abcdef00067000",
};

const CARD_WITHOUT_ELEMENTS: BoardCard = {
	id: "0123456789abcdef00067000",
	title: "Empty Card",
	height: 200,
	elements: [],
	visibility: { publishedAt: "2022-01-01 20:00:00" },
};

const CARD_WITH_FILE_ELEMENT: BoardCard = {
	id: "0123456789abcdef00067000",
	title: "Card with file element",
	height: 200,
	elements: [fileElementResponseFactory.build()],
	visibility: { publishedAt: "2022-01-01 20:00:00" },
};

jest.mock("../state/CardState.composable");
const mockedUseCardState = jest.mocked(useCardState);

jest.mock("../shared/DeleteBoardNodeConfirmation.composable");
const mockedDeleteBoardNodeConfirmation = jest.mocked(
	useDeleteBoardNodeConfirmation
);

describe("CardHost", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options?: {
		card: BoardCard;
		isLoading?: boolean;
		permissions?: BoardPermissionsTypes;
	}) => {
		const { card, isLoading } = options ?? {};
		document.body.setAttribute("data-app", "true");

		const deleteElementMock = jest.fn();
		mockedUseCardState.mockReturnValue({
			fetchCard: jest.fn(),
			updateTitle: jest.fn(),
			deleteCard: jest.fn(),
			updateCardHeight: jest.fn(),
			addElement: jest.fn(),
			deleteElement: deleteElementMock,
			card: ref(card),
			isLoading: ref(isLoading ?? false),
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		const onDeleteElement = jest.fn();
		const isDeleteDialogOpen = ref(false);
		mockedDeleteBoardNodeConfirmation.mockReturnValue({
			askDeleteBoardNodeConfirmation: jest.fn(),
			isDeleteDialogOpen: isDeleteDialogOpen,
		});

		wrapper = shallowMount(CardHost as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: CARD_SKELETON,
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
		});

		return { onDeleteElement, deleteElementMock };
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

			it("should propagate deleteElement function to ContentElementList'", () => {
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
