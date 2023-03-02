import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
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
		wrapper = shallowMount(BoardColumnVue as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: { column: MOCK_PROP, index: 1 },
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

	describe("when a card moved by key stroke", () => {
		it("should emit 'position-change-keyboard'", () => {
			setup();
			const expectedEmitObject = {
				card: MOCK_PROP.cards[0],
				cardIndex: 0,
				columnIndex: 1,
				targetColumnIndex: 0,
				targetColumnPosition: 0,
			};
			const cardHostComponent = wrapper.findComponent(CardHost);
			cardHostComponent.vm.$emit("move-card-keyboard", "ArrowLeft");

			const emitted = wrapper.emitted("position-change-keyboard") || [[]];

			expect(emitted[0][0]).toStrictEqual(expectedEmitObject);
		});
	});
});
