import { createTestingI18n } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import BoardAddCardButton from "./BoardAddCardButton.vue";

describe("BoardAddCardButton Component", () => {
	const setup = () => {
		const wrapper = shallowMount(BoardAddCardButton, {
			global: {
				plugins: [createTestingI18n()],
			},
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup();
			expect(wrapper).toBeDefined();
		});
	});
});
