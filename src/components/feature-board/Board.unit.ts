import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { ref } from "vue";
import BoardVue from "./Board.vue";
import { Board } from "./types/Board";
import Vue from "vue";
import BoardColumnVue from "./BoardColumn.vue";

const MOCK_BOARD: Board = {
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

jest.mock("./board-state.composable", () => ({
	useBoardState: () => ({
		fetchBoard: jest.fn(),
		board: MOCK_BOARD,
	}),
}));

describe("Board", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
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

		it("should fetch board from store and render all columns", () => {
			setup();
			expect(wrapper.findAllComponents(BoardColumnVue)).toHaveLength(2);
		});
	});
});
