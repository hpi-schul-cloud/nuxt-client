import LineClamp from "./LineClamp.vue";
import { mockComposable } from "@@/tests/test-utils/mockComposable";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { useMutationObserver } from "@vueuse/core";
import { Mocked } from "vitest";

vi.mock("@vueuse/core");
const mockedMutationObserver = vi.mocked(useMutationObserver);

describe("LineClamp", () => {
	let mockedMutationObserverActions: Mocked<ReturnType<typeof useMutationObserver>>;
	const mockStop = vi.fn();

	beforeEach(() => {
		mockedMutationObserverActions = mockComposable(useMutationObserver, {
			stop: mockStop,
		});

		mockedMutationObserver.mockReturnValue(mockedMutationObserverActions);
	});

	const setup = (defaultSlotContent: string) => {
		const icon = "mdi-test";
		const wrapper = mount(LineClamp, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			slots: {
				default: defaultSlotContent,
			},
		});

		return {
			wrapper,
			icon,
		};
	};

	it("renders correctly", () => {
		const defaultSlotContent = "Marmelade";
		const { wrapper } = setup(defaultSlotContent);

		expect(wrapper.text()).toBe(defaultSlotContent);
	});

	it("stops the mutation observer on component unmount", () => {
		const defaultSlotContent = "Test content";
		const { wrapper } = setup(defaultSlotContent);

		wrapper.unmount();

		expect(mockStop).toHaveBeenCalled();
	});
});
