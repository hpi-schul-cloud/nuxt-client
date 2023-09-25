import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import { i18nMock } from "@@/tests/test-utils";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";

describe("SubmissionContentElementTitle", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(
			SubmissionContentElementTitle as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
				},
			}
		);

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
