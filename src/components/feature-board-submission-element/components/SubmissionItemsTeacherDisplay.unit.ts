import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { i18nMock, submissionsResponseFactory } from "@@/tests/test-utils";

const mockedSubmissions = submissionsResponseFactory.build();

describe("SubmissionItemsTeacherDisplay", () => {
	const setup = (submissions = mockedSubmissions, editable = true) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			editable: editable,
			submissions: submissions,
		};

		const wrapper = mount(SubmissionItemsTeacherDisplay as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(SubmissionItemsTeacherDisplay);
		expect(component.exists()).toBe(true);
	});

	it("should show submissionItems", () => {
		const loading = false;
		const { wrapper } = setup();

		const submissionItems = wrapper.findComponent({
			name: "v-expansion-panels",
		});
		expect(submissionItems.exists()).toBe(true);
	});

	it("should show one submissionItem per student", async () => {
		const loading = false;
		const numbersOfStudents = 10;
		const submissions = submissionsResponseFactory.build(
			{},
			{
				transient: {
					numberOfSubmissionItems: 1,
					numberOfUsers: numbersOfStudents,
				},
			}
		);
		const { wrapper } = setup(submissions);

		const panelHeader = wrapper.findComponent({
			name: "v-expansion-panel-header",
		});
		expect(panelHeader.exists()).toBe(true);

		await panelHeader.trigger("click");

		const submissionItems = wrapper.findAll('[data-testid="submission-item"]');

		expect(submissionItems).toHaveLength(numbersOfStudents);
	});

	describe("if dueDate has not expired yet", () => {
		it("should show no expired-chip", () => {
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show open-chip if there are open submissionItems", () => {
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no open-chip if there are no open submissionItems", () => {
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show completed-chip if there are completed submissionItems", () => {
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no completed-chip if there are no completed submissionItems", () => {
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(false);
		});
	});

	describe("if dueDate has expired", () => {
		it("should show no open-chip", () => {
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show expired-chip if there are expired submissionItems", () => {
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no expired-chip if there are no expired submissionItems", () => {
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show completed-chip if there are completed submissionItems", () => {
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no completed-chip if there are no completed submissionItems", () => {
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numberOfSubmissionItems: 1,
						numberOfUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(false);
		});
	});
});
