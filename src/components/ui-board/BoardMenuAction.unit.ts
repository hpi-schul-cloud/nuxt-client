import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";

describe("BoardMenuAction Component", () => {
	const setup = () => {
		const wrapper = shallowMount(BoardMenuAction, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
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
