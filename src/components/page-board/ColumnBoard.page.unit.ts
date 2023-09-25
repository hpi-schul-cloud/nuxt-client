import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import ColumnBoardPage from "./ColumnBoard.page.vue";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("@pages/ColumnBoard.page.vue", () => {
	const setup = () => {
		const boardId = "test-board-id";

		const wrapper = shallowMount(ColumnBoardPage as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				boardId,
			},
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
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

	it("should have DefaultWireframe layout", async () => {
		const { wrapper } = setup();

		const layout = wrapper.findComponent({ name: "DefaultWireframe" });

		expect(layout.vm).toBeDefined();
	});
});
