import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { PiniaPlugin, PiniaPluginContext, PiniaVuePlugin } from "pinia";
import CounterButton from "./CounterButton.vue";

// idea from https://github.com/vuejs/pinia/pull/1201
const mockPiniaGetters = (
	mockGetters: Record<string, any> = {}
): PiniaPlugin => {
	const piniaPlugin: PiniaPlugin = (context: PiniaPluginContext) => {
		const { store, options } = context;
		const getters = options.getters || {};

		if (mockGetters[store.$id]) {
			Object.keys(getters).forEach((getter) => {
				Object.defineProperty(store, getter, {
					//@ts-ignore
					get: () => mockGetters[store.$id][getter] || getters[getter],
				});
			});
		}
	};
	return piniaPlugin;
};

describe("counter button", () => {
	it("renders the board name", () => {
		const componentOptions = createComponentMocks({});

		const { localVue } = componentOptions;
		localVue.use(PiniaVuePlugin);
		const testingPinia = createTestingPinia();

		testingPinia.use(
			mockPiniaGetters({
				boards: {
					getName: "TestName",
				},
			})
		);

		const wrapper = mount(CounterButton, {
			...componentOptions,
			pinia: testingPinia,
		});

		const button = wrapper.find("[data-testid='btn-update-board-name']");
		console.log(button.text());
		expect(button.text()).toBe("TestName");
	});
});
