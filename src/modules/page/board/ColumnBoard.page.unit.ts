import ColumnBoardPage from "./ColumnBoard.page.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle?: string, parentTitle?: string) =>
				[pageTitle, parentTitle, "dBildungscloud"].filter(Boolean).join(" - "),
		}) as typeof import("@/utils/pageTitle")
);

describe("@pages/ColumnBoard.page.vue", () => {
	const setup = () => {
		setActivePinia(createTestingPinia());
		const boardId = "test-board-id";

		const wrapper = shallowMount(ColumnBoardPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: {
				boardId,
			},
		});

		return {
			wrapper,
			boardId,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();

		expect(wrapper.vm).toBeDefined();
	});

	it("should have Board component", async () => {
		const { wrapper } = setup();

		const boardComponent = wrapper.findComponent({ name: "Board" });

		expect(boardComponent.vm).toBeDefined();
	});
});
