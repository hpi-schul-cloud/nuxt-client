import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { I18N_KEY } from "@/utils/inject";
import { submissionItemResponseFactory } from "@@/tests/test-utils";
import { SubmissionItemResponse } from "@/serverApi/v3";

const mockedSubmissionItems: Array<SubmissionItemResponse> = [
	submissionItemResponseFactory.build(),
	submissionItemResponseFactory.build(),
	submissionItemResponseFactory.build(),
];

describe("SubmissionItemsTeacherDisplay", () => {
	const setup = (loading = false) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			loading: loading,
			submissionItems: mockedSubmissionItems,
		};

		const wrapper = shallowMount(
			SubmissionItemsTeacherDisplay as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
				},
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
