import { StudentSubmission } from "../types/submission";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("SubmissionItemStudentDisplay", () => {
	const setup = (loading = false, studentSubmission = { completed: true }, isOverdue = false) => {
		const props = {
			isOverdue,
			loading,
			studentSubmission,
		};

		const wrapper = mount(SubmissionItemStudentDisplay, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

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

		const checkbox = wrapper.findComponent({ name: "v-checkbox" });
		await checkbox.setValue(true);

		const emitted = wrapper.emitted();
		expect(emitted["update:completed"]).toBeDefined();
	});

	describe("while loading", () => {
		it("should show loading skeleton", () => {
			const loading = true;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(true);
		});

		it("should not show form", () => {
			const loading = true;
			const { wrapper } = setup(loading);

			const form = wrapper.findComponent({ name: "v-checkbox" });
			expect(form.exists()).toBe(false);
		});
	});

	describe("after loading", () => {
		it("should not show loading skeleton", () => {
			const loading = false;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(false);
		});

		it("should show checkbox", () => {
			const loading = false;
			const { wrapper } = setup(loading);

			const form = wrapper.findComponent({ name: "v-checkbox" });
			expect(form.exists()).toBe(true);
		});

		describe("if student has no submissionItem yet", () => {
			it("should show state as not completed", async () => {
				const loading = false;
				const studentSubmission: StudentSubmission = {
					completed: false,
				};
				const { wrapper } = setup(loading, studentSubmission);

				const checked = wrapper.findComponent({ name: "v-checkbox" }).get("input").element.checked;

				expect(checked).toBe(false);
			});
		});

		describe("if student has a submissionItem", () => {
			it("should show the completed state of the belonging submissionItem", async () => {
				const loading = false;
				const { wrapper } = setup(loading);

				const checked = wrapper.findComponent({ name: "v-checkbox" }).get("input").element.checked;

				expect(checked).toBe(true);
			});
		});

		describe("if submission is open", () => {
			it("should render the checkbox as not disabled", async () => {
				const loading = false;
				const { wrapper } = setup(loading);

				const disabled = wrapper.findComponent({ name: "v-checkbox" }).props("disabled");

				expect(disabled).toBe(false);
			});
		});

		describe("if submission is overdue", () => {
			it("should render the checkbox as disabled", async () => {
				const loading = false;
				const isOverdue = true;
				const { wrapper } = setup(loading, { completed: true }, isOverdue);

				const disabled = wrapper.findComponent({ name: "v-checkbox" }).props("disabled");

				expect(disabled).toBe(true);
			});
		});

		describe("if submission has no due date", () => {
			it("should render the checkbox as not disabled", async () => {
				const loading = false;
				const { wrapper } = setup(loading);

				const disabled = wrapper.findComponent({ name: "v-checkbox" }).props("disabled");

				expect(disabled).toBe(false);
			});
		});
	});
});
