import { CardResponse } from "@/serverApi/v3";
import {
	cardResponseFactory,
	fileElementResponseFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import { ComponentProps } from "vue-component-type-helpers";
import CardHostDetailView from "./CardHostDetailView.vue";

const CARD_WITH_ELEMENTS: CardResponse = cardResponseFactory.build({
	elements: [fileElementResponseFactory.build()],
});

describe("CardHostDetailView", () => {
	const setup = (props: ComponentProps<typeof CardHostDetailView>) => {
		const wrapper = shallowMount(CardHostDetailView, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: props,
		});

		return {
			wrapper,
		};
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});
			expect(wrapper.findComponent(CardHostDetailView).exists()).toBe(true);
		});
	});
});
