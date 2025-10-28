import ColumnBoardPage from "./ColumnBoard.page.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

vi.mock("vue-router");

describe("@pages/ColumnBoard.page.vue", () => {
	const setup = () => {
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

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

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
