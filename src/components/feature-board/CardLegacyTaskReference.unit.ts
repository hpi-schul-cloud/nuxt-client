import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardLegacyTaskReference from "./CardLegacyTaskReference.vue";
import { LegacyTaskCard } from "./types/Card";
import { CardResponseCardTypeEnum as BoardCardType } from "@/serverApi/v3";

const MOCK_PROP: LegacyTaskCard = {
	id: "0123456789abcdef00000003",
	title: "MyFirstCard!",
	height: 200,
	elements: [],
	taskId: "25",
	cardType: BoardCardType.LegacyTask,
	visibility: { publishedAt: "2022-01-01 20:00:00" },
};

describe("CardLegacyTaskReference", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardLegacyTaskReference, {
			...createComponentMocks({}),
			propsData: { card: MOCK_PROP },
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(CardLegacyTaskReference).exists()).toBe(
				true
			);
		});

		it("should 'cardId' be found in the content", () => {
			setup();
			expect(wrapper.findComponent(CardLegacyTaskReference).exists()).toBe(
				true
			);
			expect(wrapper.element.textContent).toContain(MOCK_PROP.id);
		});
	});
});
