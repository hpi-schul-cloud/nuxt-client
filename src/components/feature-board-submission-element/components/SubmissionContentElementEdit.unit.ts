import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { i18nMock, submissionsResponseFactory } from "@@/tests/test-utils";
import { DateTimePicker } from "@feature-date-time-picker";

const mockedSubmissions = submissionsResponseFactory.build();

describe("SubmissionContentElementEdit", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			dueDate: "01.01.2023 01:23",
			submissions: mockedSubmissions,
			editable: true,
			loading: true,
		};
		const wrapper = shallowMount(
			SubmissionContentElementEdit as MountOptions<Vue>,
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

		const submissionContentElement = wrapper.findComponent(
			SubmissionContentElementEdit
		);
		expect(submissionContentElement.exists()).toBe(true);
	});

	it("should render DateTimePicker", () => {
		const { wrapper } = setup();

		const dateTimePicker = wrapper.findComponent(DateTimePicker);

		expect(dateTimePicker.exists()).toBe(true);
	});

	it("should hand over submissions prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const submissions = wrapper
			.findComponent(SubmissionItemsTeacherDisplay)
			.props("submissions");

		expect(submissions).toBe(mockedSubmissions);
	});

	it("should hand over loading prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const loading = wrapper
			.findComponent(SubmissionItemsTeacherDisplay)
			.props("loading");

		expect(loading).toBe(true);
	});

	it("should hand over editable prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const editable = wrapper
			.findComponent(SubmissionItemsTeacherDisplay)
			.props("editable");

		expect(editable).toBe(true);
	});
});
