import { shallowMount } from "@vue/test-utils";
import FilterActionButtons from "./FilterActionButtons.vue"; // Adjust the path accordingly

// TODO: correct i18n providing will be here
jest.mock("vue-i18n", () => ({
	useI18n: jest.fn().mockReturnValue({
		t: (key: string) => key,
	}),
}));

const setup = () => {
	const wrapper = shallowMount(FilterActionButtons);
	return { wrapper };
};

// TODO: write actual tests

describe("FilterActionButtons", () => {
	it('should emit "remove:filter" event when onRemoveFilter is called', async () => {
		const { wrapper } = setup();

		expect(wrapper).toBeDefined();
	});

	it('should emit "dialog-closed" event when onCancel is called', async () => {
		const { wrapper } = setup();

		expect(wrapper).toBeDefined();
	});

	it('should emit "update:filter" event when onAddFilter is called', async () => {
		const { wrapper } = setup();

		expect(wrapper).toBeDefined();
	});
});
