import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";

describe("SubmissionItemStudentDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			editable: true,
			completed: false,
		};

		const wrapper = shallowMount(
			SubmissionItemStudentDisplay as MountOptions<Vue>,
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

		const component = wrapper.findComponent(SubmissionItemStudentDisplay);
		expect(component.exists()).toBe(true);
	});

	it("should emit 'update:completed' when completed state changes", async () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent({ name: "v-checkbox" });
		component.vm.$emit("change");

		const emitted = wrapper.emitted();
		expect(emitted["update:completed"]).toBeDefined();
	});
});
