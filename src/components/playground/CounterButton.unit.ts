import { useBoardStore } from "@/store/board.store";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import CounterButton from "./CounterButton.vue";

describe("counter button", () => {
	it("renders the board name", () => {
		const testingPinia = createTestingPinia();
		const boardStore = useBoardStore();

		jest.spyOn(boardStore, "getName", "get").mockReturnValue("TestName");

		const wrapper = mount(CounterButton, {
			...createComponentMocks({}),
			pinia: testingPinia,
		});

		const button = wrapper.find("[data-testid='btn-update-board-name']");
		expect(button.text()).toBe("TestName");
	});
});
