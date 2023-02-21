import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardLegacyLessonReference from "./CardLegacyLessonReference.vue";
import { LegacyLessonCard } from "./types/Card";
import { CardResponseCardTypeEnum as BoardCardType } from "@/serverApi/v3";

const MOCK_PROP: LegacyLessonCard = {
	id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
	height: 100,
	elements: [],
	lessonId: "24",
	cardType: BoardCardType.LegacyLesson,
	visibility: {
		publishedAt: "2022-01-01 20:00:00",
	},
	title: "Legacy Lesson Card",
};

describe("CardLegacyLessonReference", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardLegacyLessonReference, {
			...createComponentMocks({}),
			propsData: { card: MOCK_PROP },
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(CardLegacyLessonReference).exists()).toBe(
				true
			);
		});
		it("should display the card id in the card text", () => {
			setup();

			expect(wrapper.element.textContent).toContain(MOCK_PROP.id);
		});
	});
});
