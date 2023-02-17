import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import BoardColumnVue from "./BoardColumn.vue";
import { BoardColumn } from "./types/Board";
import CardHost from "./CardHost.vue";

const MOCK_PROP: BoardColumn = {
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
	title: "Col1",
	cards: [
		{ cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120004", height: 200 },
		{ cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120005", height: 250 },
		{ cardId: "989b0ff2-ad1e-11ed-afa1-0242ac120006", height: 220 },
	],
};

describe("BoardColumn", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(BoardColumnVue, {
			...createComponentMocks({}),
			propsData: { column: MOCK_PROP },
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnVue).exists()).toBe(true);
		});

		it("should get props and render CarHost components", () => {
			setup();
			expect(wrapper.findAllComponents(CardHost)).toHaveLength(3);
		});
	});
});
