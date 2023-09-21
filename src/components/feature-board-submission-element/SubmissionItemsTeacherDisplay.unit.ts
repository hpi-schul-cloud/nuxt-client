import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { i18nMock, submissionsResponseFactory } from "@@/tests/test-utils";

const mockedSubmissions = submissionsResponseFactory.build();

describe("SubmissionItemsTeacherDisplay", () => {
	const setup = (
		loading = false,
		submissions = mockedSubmissions,
		editable = true
	) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			editable: editable,
			loading: loading,
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

	describe("while loading", () => {
		it("should show loading skeleton", () => {
			const loading = true;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(true);
		});

		it("should not show submissionItems", () => {
			const loading = true;
			const { wrapper } = setup(loading);

			const submissionItems = wrapper.findComponent({
				name: "v-expansion-panels",
			});
			expect(submissionItems.exists()).toBe(false);
		});
	});

	describe("after loading", () => {
		it("should not show loading skeleton", () => {
			const loading = false;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(false);
		});

		it("should show submissionItems", () => {
			const loading = false;
			const { wrapper } = setup(loading);

			const submissionItems = wrapper.findComponent({
				name: "v-expansion-panels",
			});
			expect(submissionItems.exists()).toBe(true);
		});

		it("should show one submissionItem per student", async () => {
			const loading = false;
			const numStudents = 10;
			const submissions = submissionsResponseFactory.build(
				{},
				{ transient: { numSubmissionItems: 1, numUsers: numStudents } }
			);
			const { wrapper } = setup(loading, submissions);

			const panelHeader = wrapper.findComponent({
				name: "v-expansion-panel-header",
			});
			expect(panelHeader.exists()).toBe(true);

			await panelHeader.trigger("click");

			const submissionItems = wrapper.findAll(
				'[data-testid="submission-item"]'
			);

			expect(submissionItems).toHaveLength(numStudents);
		});
	});

	describe("if dueDate has not expired yet", () => {
		it("should show no expired-chip", () => {
			const loading = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(loading, submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show open-chip if there are open submissionItems", () => {
			const loading = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(loading, submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no open-chip if there are no open submissionItems", () => {
			const loading = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(loading, submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show completed-chip if there are completed submissionItems", () => {
			const loading = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(loading, submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no completed-chip if there are no completed submissionItems", () => {
			const loading = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(loading, submissions);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(false);
		});
	});

	describe("if dueDate has expired", () => {
		it("should show no open-chip", () => {
			const loading = false;
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(loading, submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show expired-chip if there are expired submissionItems", () => {
			const loading = false;
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(loading, submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no expired-chip if there are no expired submissionItems", () => {
			const loading = false;
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(loading, submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show completed-chip if there are completed submissionItems", () => {
			const loading = false;
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: true,
					},
				}
			);
			const { wrapper } = setup(loading, submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show no completed-chip if there are no completed submissionItems", () => {
			const loading = false;
			const editable = false;
			const submissions = submissionsResponseFactory.build(
				{},
				{
					transient: {
						numSubmissionItems: 1,
						numUsers: 1,
						completed: false,
					},
				}
			);
			const { wrapper } = setup(loading, submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(false);
		});
	});
});
