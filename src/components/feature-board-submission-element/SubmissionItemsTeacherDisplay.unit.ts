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
	const setup = (
		loading = false,
		submissionItems = mockedSubmissionItems,
		editable = true
	) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			editable: editable,
			loading: loading,
			submissionItems: submissionItems,
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
				const submissionItems: Array<SubmissionItemResponse> = [
					submissionItemResponseFactory.build({ completed: false }),
				];
				const { wrapper } = setup(loading, submissionItems);

				const chip = wrapper.findComponent({
					ref: "v-chip-open",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if open submission items do not exist", () => {
			it.skip("should not show chip with amount of open items", () => {
				const loading = false;
				const submissionItems: Array<SubmissionItemResponse> = [];
				const { wrapper } = setup(loading, submissionItems);

				const chip = wrapper.findComponent({
					ref: "v-chip-open",
				});
				expect(chip.exists()).toBe(false);
			});
		});

		describe("if completed submission items exist", () => {
			it("should show chip with amount of completed items", () => {
				const loading = false;
				const submissionItems: Array<SubmissionItemResponse> = [
					submissionItemResponseFactory.build({ completed: true }),
				];
				const { wrapper } = setup(loading, submissionItems);

				const chip = wrapper.findComponent({
					ref: "v-chip-completed",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if completed submission items do not exist", () => {
			it.skip("should not show chip with amount of completed items", () => {
				const loading = false;
				const submissionItems: Array<SubmissionItemResponse> = [];
				const { wrapper } = setup(loading, submissionItems);

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
			const submissionItems: Array<SubmissionItemResponse> = [
				submissionItemResponseFactory.build({ completed: false }),
			];
			const { wrapper } = setup(loading, submissionItems, editable);

			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		describe("if expired submission items exist", () => {
			it("should show chip with amount of expired items", () => {
				const loading = false;
				const editable = false;
				const submissionItems: Array<SubmissionItemResponse> = [
					submissionItemResponseFactory.build({ completed: false }),
				];
				const { wrapper } = setup(loading, submissionItems, editable);

				const chip = wrapper.findComponent({
					ref: "v-chip-expired",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if expired submission items do not exist", () => {
			it.skip("should not show chip with amount of expired items", () => {
				const loading = false;
				const editable = false;
				const submissionItems: Array<SubmissionItemResponse> = [];
				const { wrapper } = setup(loading, submissionItems, editable);

				const chip = wrapper.findComponent({
					ref: "v-chip-expired",
				});
				expect(chip.exists()).toBe(false);
			});
		});

		describe("if completed submission items exist", () => {
			it("should show chip with amount of completed items", () => {
				const loading = false;
				const editable = false;
				const submissionItems: Array<SubmissionItemResponse> = [
					submissionItemResponseFactory.build({ completed: true }),
				];
				const { wrapper } = setup(loading, submissionItems, editable);

				const chip = wrapper.findComponent({
					ref: "v-chip-completed",
				});
				expect(chip.exists()).toBe(true);
			});
		});

		describe("if completed submission items do not exist", () => {
			it.skip("should not show chip with amount of completed items", () => {
				const loading = false;
				const editable = false;
				const submissionItems: Array<SubmissionItemResponse> = [];
				const { wrapper } = setup(loading, submissionItems, editable);

				const chip = wrapper.findComponent({
					ref: "v-chip-completed",
				});
				expect(chip.exists()).toBe(false);
			});
		});
	});
});
