import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import { i18nMock } from "@@/tests/test-utils";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";

describe("SubmissionContentElementTitle", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			dueDate: "01.01.2023 01:23",
		};

		const wrapper = shallowMount(
			SubmissionContentElementTitle as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
				},
			}
		);

		return {
			wrapper,
			dueDate: propsData.dueDate,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(SubmissionContentElementTitle);
		expect(component.exists()).toBe(true);
	});
});
