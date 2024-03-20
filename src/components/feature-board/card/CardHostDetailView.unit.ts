import { BoardCard } from "@/types/board/Card";
import {
	boardCardFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils";
import { shallowMount } from "@vue/test-utils";
import CardHostDetailView from "./CardHostDetailView.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const CARD_WITH_ELEMENTS: BoardCard = boardCardFactory.build({
	elements: [fileElementResponseFactory.build()],
});

describe("CardHostDetailView", () => {
	const setup = (props: { card: BoardCard; isOpen: boolean }) => {
		document.body.setAttribute("data-app", "true");
		const wrapper = shallowMount(CardHostDetailView, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: props,
		});
		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ card: CARD_WITH_ELEMENTS, isOpen: true });
			expect(wrapper.findComponent(CardHostDetailView).exists()).toBe(true);
		});
	});
});
