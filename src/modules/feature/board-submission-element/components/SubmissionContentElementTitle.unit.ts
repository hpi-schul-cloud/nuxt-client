import { shallowMount } from "@vue/test-utils";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("SubmissionContentElementTitle", () => {
	const setup = () => {
		const wrapper = shallowMount(SubmissionContentElementTitle, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(SubmissionContentElementTitle);
		expect(component.exists()).toBe(true);
	});
});
