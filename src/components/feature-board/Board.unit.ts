import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { ref } from "vue";
import BoardVue from "./Board.vue";
import { Board } from "./types/Board";
import Vue from "vue";
import BoardColumnVue from "./BoardColumn.vue";
import { useBoardState } from "./board-state.composable";

const MOCK_BOARD_ONE_COLUMN: Board = {
	columns: [
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
			title: "Col1",
			cards: [
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120004",
					height: 200,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120005",
					height: 250,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120006",
					height: 220,
				},
			],
		},
	],
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120002",
	title: "MyFirstBoard!",
};

const MOCK_BOARD_TWO_COLUMNS: Board = {
	columns: [
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
			title: "Col1",
			cards: [
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120004",
					height: 200,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120005",
					height: 250,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120006",
					height: 220,
				},
			],
		},
		{
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120001",
			title: "Col2",
			cards: [
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120204",
					height: 300,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120305",
					height: 350,
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120406",
					height: 320,
				},
			],
		},
	],
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120002",
	title: "MyFirstBoard!",
};

jest.mock("./board-state.composable");
const mockedUseBoardState = jest.mocked(useBoardState);

describe("Board", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options?: { board?: Board; isLoading?: boolean }) => {
		const { board, isLoading } = options ?? {};
		document.body.setAttribute("data-app", "true");
		mockedUseBoardState.mockReturnValue({
			fetchBoard: jest.fn(),
			board: ref(board ?? MOCK_BOARD_ONE_COLUMN),
			isLoading: ref(isLoading ?? false),
		});
		wrapper = shallowMount(BoardVue, {
			...createComponentMocks({}),
		});
	};

	describe("when component is mounted", () => {
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
});
