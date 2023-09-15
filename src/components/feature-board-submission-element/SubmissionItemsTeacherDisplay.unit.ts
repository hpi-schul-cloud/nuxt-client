import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { I18N_KEY } from "@/utils/inject";
import { submissionsResponseFactory } from "@@/tests/test-utils";

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
	});

	describe("if dueDate has not expired", () => {
		it("should show no chip with amount of expired items", () => {
			const loading = false;
			const { wrapper } = setup(loading);

			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(false);
		});

		describe("if open submission items exist", () => {
			it("should show chip with amount of open items", () => {
				const loading = false;
				const submissions = submissionsResponseFactory.build();
				submissions.submissionItemsResponse[0].completed = false;

				const { wrapper } = setup(loading, submissions);

				const chip = wrapper.findComponent({
					ref: "v-chip-open",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if completed submission items exist", () => {
			it("should show chip with amount of completed items", () => {
				const loading = false;
				const submissions = submissionsResponseFactory.build();
				submissions.submissionItemsResponse[0].completed = true;

				const { wrapper } = setup(loading, submissions);

				const chip = wrapper.findComponent({
					ref: "v-chip-completed",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if completed submission items do not exist", () => {
			it("should not show chip with amount of completed items", () => {
				const loading = false;
				const submissions = submissionsResponseFactory.build();
				submissions.submissionItemsResponse = [];

				const { wrapper } = setup(loading, submissions);

				const chip = wrapper.findComponent({
					ref: "v-chip-completed",
				});
				expect(chip.exists()).toBe(false);
			});
		});
	});

	describe("if dueDate has expired", () => {
		it("should show no chip with amount of open items", () => {
			const loading = false;
			const editable = false;
			const submissions = submissionsResponseFactory.build();
			submissions.submissionItemsResponse[0].completed = false;

			const { wrapper } = setup(loading, submissions, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		describe("if expired submission items exist", () => {
			it("should show chip with amount of expired items", () => {
				const loading = false;
				const editable = false;
				const submissions = submissionsResponseFactory.build();
				submissions.submissionItemsResponse[0].completed = false;

				const { wrapper } = setup(loading, submissions, editable);

				const chip = wrapper.findComponent({
					ref: "v-chip-expired",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if completed submission items exist", () => {
			it("should show chip with amount of completed items", () => {
				const loading = false;
				const editable = false;
				const submissions = submissionsResponseFactory.build();
				submissions.submissionItemsResponse[0].completed = true;

				const { wrapper } = setup(loading, submissions, editable);

				const chip = wrapper.findComponent({
					ref: "v-chip-completed",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if completed submission items do not exist", () => {
			it("should not show chip with amount of completed items", () => {
				const loading = false;
				const editable = false;
				const submissions = submissionsResponseFactory.build();
				submissions.submissionItemsResponse = [];

				const { wrapper } = setup(loading, submissions, editable);

				const chip = wrapper.findComponent({
					ref: "v-chip-completed",
				});
				expect(chip.exists()).toBe(false);
			});
		});
	});
});
