import { TeacherSubmission } from "../types/submission";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { DateTimePicker } from "@ui-date-time-picker";
import { shallowMount } from "@vue/test-utils";

const mockedSubmissions: TeacherSubmission[] = [
	{
		status: "completed",
		firstName: "Cord",
		lastName: "Carl",
	},
];

describe("SubmissionContentElementEdit", () => {
	const setup = () => {
		const props = {
			dueDate: "01.01.2023 01:23",
			submissions: mockedSubmissions,
			isOverdue: false,
			loading: true,
		};
		const wrapper = shallowMount(SubmissionContentElementEdit, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return {
			wrapper,
			dueDate: props.dueDate,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const submissionContentElement = wrapper.findComponent(SubmissionContentElementEdit);
		expect(submissionContentElement.exists()).toBe(true);
	});

	it("should render DateTimePicker", () => {
		const { wrapper } = setup();

		const dateTimePicker = wrapper.findComponent(DateTimePicker);

		expect(dateTimePicker.exists()).toBe(true);
	});

	it("should hand over submissions prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const submissions = wrapper.findComponent(SubmissionItemsTeacherDisplay).props("submissions");

		expect(submissions).toEqual(mockedSubmissions);
	});

	it("should hand over loading prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const loading = wrapper.findComponent(SubmissionItemsTeacherDisplay).props("loading");

		expect(loading).toBe(true);
	});

	it("should hand over isOverdue prop to SubmissionItemsTeacherDisplay", () => {
		const { wrapper } = setup();

		const isOverdue = wrapper.findComponent(SubmissionItemsTeacherDisplay).props("isOverdue");

		expect(isOverdue).toBe(false);
	});
});
