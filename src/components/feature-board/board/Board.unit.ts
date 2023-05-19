import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import { Route } from "vue-router";
import BoardVue from "./Board.vue";
import BoardColumnVue from "./BoardColumn.vue";
import { useBoardState } from "../state/BoardState.composable";
import { Board, BoardPermissionsTypes } from "../types/Board";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";

const MOCK_BOARD_ONE_COLUMN: Board = {
	columns: [
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
			title: "Col1",
			cards: [
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120004",
					height: 200,
				},
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120005",
					height: 250,
				},
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120006",
					height: 220,
				},
			],
			timestamps: {
				createdAt: new Date().toString(),
				lastUpdatedAt: new Date().toString(),
			},
		},
	],
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120002",
	title: "MyFirstBoard!",
	timestamps: {
		lastUpdatedAt: new Date().toString(),
		createdAt: new Date().toString(),
	},
};

const MOCK_BOARD_TWO_COLUMNS: Board = {
	columns: [
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
			title: "Col1",
			cards: [
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120004",
					height: 200,
				},
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120005",
					height: 250,
				},
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120006",
					height: 220,
				},
			],
			timestamps: {
				createdAt: new Date().toString(),
				lastUpdatedAt: new Date().toString(),
			},
		},
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120001",
			title: "Col2",
			cards: [
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120204",
					height: 300,
				},
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120305",
					height: 350,
				},
				{
					cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120406",
					height: 320,
				},
			],
			timestamps: {
				createdAt: new Date().toString(),
				lastUpdatedAt: new Date().toString(),
			},
		},
	],
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120002",
	title: "MyFirstBoard!",
	timestamps: {
		lastUpdatedAt: new Date().toString(),
		createdAt: new Date().toString(),
	},
};

jest.mock("../state/BoardState.composable");
const mockedUseBoardState = jest.mocked(useBoardState);

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const $route: Route = {
	params: {
		id: "a1b2c3",
	},
	path: "/rooms/a1b2c3/board",
	fullPath: "/rooms/a1b2c3/board",
	hash: "",
	query: {
		id: "a1b2c3",
	},
	matched: [],
} as Route;

const $router = { replace: jest.fn(), push: jest.fn(), afterEach: jest.fn() };

const defaultPermissions = {
	hasBoardMovePermission: true,
	hasBoardCardCreatePermission: true,
	hasBoardColumnCreatePermission: true,
};

const createCardMock = jest.fn();
const deleteCardMock = jest.fn();

describe("Board", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options?: {
		board?: Board;
		isLoading?: boolean;
		permissions?: BoardPermissionsTypes;
	}) => {
		const { board, isLoading } = options ?? {};
		document.body.setAttribute("data-app", "true");
		mockedUseBoardState.mockReturnValue({
			board: ref<Board | undefined>(board ?? MOCK_BOARD_ONE_COLUMN),
			isLoading: ref(isLoading ?? false),
			createCard: createCardMock,
			createColumn: jest.fn(),
			createColumnWithCard: jest.fn(),
			deleteColumn: jest.fn(),
			deleteCard: deleteCardMock,
			extractCard: jest.fn(),
			fetchBoard: jest.fn(),
			getColumnId: jest.fn(),
			moveCard: jest.fn(),
			moveColumn: jest.fn(),
			updateColumnTitle: jest.fn(),
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});
		wrapper = shallowMount(BoardVue, {
			...createComponentMocks({}),
			mocks: {
				$router,
				$route,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should call 'useBoardState' composable", () => {
			setup();
			expect(mockedUseBoardState).toHaveBeenCalled();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			expect(wrapper.vm.board).toStrictEqual(MOCK_BOARD_ONE_COLUMN);
		});

		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(BoardVue).exists()).toBeTruthy();
		});

		it("should fetch board from store and render it", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnVue).exists()).toBeTruthy();
		});

		it("should fetch board from store and render one column", () => {
			setup();
			expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(1);
		});

		it("should fetch board from store and render two columns", () => {
			setup({ board: MOCK_BOARD_TWO_COLUMNS });
			expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(2);
		});
	});

	describe("user permissions", () => {
		describe("when hasBoardMovePermission is set false", () => {
			it("should set lock-axis to 'x,y", () => {
				setup({ permissions: { hasBoardMovePermission: false } });

				const dndContainer = wrapper.findComponent({ name: "Container" });
				expect(dndContainer.element.outerHTML).toContain('lockaxis="x,y"');
			});
		});

		describe("when hasBoardCardCreatePermission is set false", () => {
			it("should not call createCard api", () => {
				setup({ permissions: { hasBoardCardCreatePermission: false } });

				const columnComponent = wrapper.findComponent({ name: "BoardColumn" });
				columnComponent.vm.$emit("create:card");

				expect(createCardMock).not.toHaveBeenCalled();
			});

			it("should not call onDeleteCard api", () => {
				setup({ permissions: { hasBoardCardCreatePermission: false } });

				const columnComponent = wrapper.findComponent({ name: "BoardColumn" });
				columnComponent.vm.$emit("delete:card");

				expect(deleteCardMock).not.toHaveBeenCalled();
			});
		});

		describe("when hasBoardColumnCreatePermission is set false", () => {
			it("should not be rendered on DOM", () => {
				setup({ permissions: { hasBoardColumnCreatePermission: false } });

				const ghostColumnComponent = wrapper.findComponent({
					name: "BoardColumnGhost",
				});

				expect(ghostColumnComponent.vm).not.toBeDefined();
			});
		});
	});
});
