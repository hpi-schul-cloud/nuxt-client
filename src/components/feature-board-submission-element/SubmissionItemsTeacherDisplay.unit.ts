import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";

describe("SubmissionItemsTeacherDisplay", () => {
	const setup = (loading = false) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			loading: loading,
		};

		const wrapper = shallowMount(
			SubmissionItemsTeacherDisplay as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				propsData,
			}
		);

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(SubmissionItemsTeacherDisplay);
		expect(component.exists()).toBe(true);
	});
});
