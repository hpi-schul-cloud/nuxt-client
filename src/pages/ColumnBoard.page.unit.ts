import ColumnBoardPage from "./ColumnBoard.page.vue";
import { shallowMount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { Route } from "vue-router";
import { I18N_KEY } from "@/utils/inject";

describe("@pages/ColumnBoard.page.vue", () => {
	const $router = { replace: jest.fn(), push: jest.fn(), afterEach: jest.fn() };
	const $route: Partial<Route> = {
		params: {
			id: "test-board-id",
		},
	};

	const mountComponent = () => {
		return shallowMount(ColumnBoardPage, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
			mocks: { $router, $route },
		});
	};
	it("should be rendered in DOM", () => {
		const wrapper = mountComponent();
		expect(wrapper.vm).toBeDefined();
	});

	it("should have Board component", async () => {
		const wrapper = mountComponent();
		const boardComponent = wrapper.findComponent({ name: "Board" });
		expect(boardComponent.vm).toBeDefined();
	});

	it("should have DefaultWireframe layout", async () => {
		const wrapper = mountComponent();
		const layout = wrapper.findComponent({ name: "DefaultWireframe" });
		expect(layout.vm).toBeDefined();
	});
});
