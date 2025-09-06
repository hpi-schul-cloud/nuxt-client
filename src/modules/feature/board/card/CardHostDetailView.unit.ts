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
import { useBoardPermissions } from "@data-board";
import { defaultPermissions } from "@/types/board/Permissions";

const CARD_WITH_ELEMENTS: CardResponse = cardResponseFactory.build({
	elements: [fileElementResponseFactory.build()],
});

vi.mock("@data-board/BoardPermissions.composable");
const boardPermissions = vi.mocked(useBoardPermissions);

describe("CardHostDetailView", () => {
	const setup = (props: ComponentProps<typeof CardHostDetailView>) => {
		boardPermissions.mockReturnValue(defaultPermissions);

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
