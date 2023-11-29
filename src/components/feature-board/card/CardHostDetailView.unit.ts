import { BoardCard } from "@/types/board/Card";
import { I18N_KEY } from "@/utils/inject";
import {
	boardCardFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardHostDetailView from "./CardHostDetailView.vue";

const CARD_WITH_ELEMENTS: BoardCard = boardCardFactory.build({
	elements: [fileElementResponseFactory.build()],
});

describe("CardHostDetailView", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: { card: BoardCard }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardHostDetailView as MountOptions<Vue>, {
			...createComponentMocks({}),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ card: CARD_WITH_ELEMENTS });
			expect(wrapper.findComponent(CardHostDetailView).exists()).toBe(true);
		});
	});
});
