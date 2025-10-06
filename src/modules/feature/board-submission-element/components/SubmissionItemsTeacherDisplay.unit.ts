import { TeacherSubmission } from "../types/submission";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

describe("SubmissionItemsTeacherDisplay", () => {
	const setup = (
		submissions: TeacherSubmission[] = [{ firstName: "Max", lastName: "Meyer", status: "open" }],
		loading = false,
		isOverdue = false
	) => {
		const props = {
			isOverdue,
			loading,
			submissions,
		};

		const wrapper = mount(SubmissionItemsTeacherDisplay, {
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

		const component = wrapper.findComponent(SubmissionItemsTeacherDisplay);
		expect(component.exists()).toBe(true);
	});

	describe("while loading", () => {
		it("should show loading skeleton", () => {
			const submissions: TeacherSubmission[] = [{ firstName: "Max", lastName: "Meyer", status: "open" }];
			const loading = true;
			const { wrapper } = setup(submissions, loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(true);
		});

		it("should not show submissionItems", () => {
			const submissions: TeacherSubmission[] = [{ firstName: "Max", lastName: "Meyer", status: "open" }];
			const loading = true;
			const { wrapper } = setup(submissions, loading);

			const submissionItems = wrapper.findComponent({
				name: "v-expansion-panels",
			});
			expect(submissionItems.exists()).toBe(false);
		});
	});

	describe("after loading", () => {
		it("should not show loading skeleton", () => {
			const { wrapper } = setup();

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(false);
		});

		it("should show submissionItems", () => {
			const { wrapper } = setup();

			const submissionItems = wrapper.findComponent({
				name: "v-expansion-panels",
			});
			expect(submissionItems.exists()).toBe(true);
		});

		it("should show filter chips", () => {
			const { wrapper } = setup();

			const chips = wrapper.findAllComponents({ name: "v-chip" });
			expect(chips).toHaveLength(2);
		});

		it("should show one submissionItem per student", async () => {
			const submissions: TeacherSubmission[] = [{ firstName: "Max", lastName: "Meyer", status: "open" }];
			const { wrapper } = setup(submissions);

			const panelHeader = wrapper.findComponent({
				name: "v-expansion-panel-title",
			});
			expect(panelHeader.exists()).toBe(true);

			await panelHeader.trigger("click");

			const tableContent = wrapper.find("tbody");
			expect(tableContent.exists()).toBe(true);

			const submissionItems = tableContent.findAll("tr");

			expect(submissionItems).toHaveLength(1);
		});
	});

	describe("if dueDate has not expired yet", () => {
		const setupNotExpired = () => {
			const submissions: TeacherSubmission[] = [
				{ firstName: "Max", lastName: "Meyer", status: "open" },
				{
					firstName: "Sabrina",
					lastName: "Schulz",
					status: "completed",
				},
			];
			const wrapper = setup(submissions).wrapper;

			return { wrapper };
		};

		it("should not show expired-chip", () => {
			const { wrapper } = setupNotExpired();
			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show open-chip", () => {
			const { wrapper } = setupNotExpired();
			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show completed-chip", () => {
			const { wrapper } = setupNotExpired();
			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});
	});

	describe("if dueDate has expired", () => {
		const setupExpired = () => {
			const loading = false;
			const isOverdue = true;
			const submissions: TeacherSubmission[] = [
				{ firstName: "Max", lastName: "Meyer", status: "expired" },
				{
					firstName: "Sabrina",
					lastName: "Schulz",
					status: "completed",
				},
			];
			const wrapper = setup(submissions, loading, isOverdue).wrapper;

			return { wrapper };
		};

		it("should not show open-chip", () => {
			const { wrapper } = setupExpired();
			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show expired-chip", () => {
			const { wrapper } = setupExpired();
			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show completed-chip", () => {
			const { wrapper } = setupExpired();
			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});
	});

	describe("when a filter is clicked", () => {
		const setupWithFilter = () => {
			const submissions: TeacherSubmission[] = [
				{ firstName: "Max", lastName: "Meyer", status: "open" },
				{
					firstName: "Sabrina",
					lastName: "Schulz",
					status: "completed",
				},
			];
			const wrapper = setup(submissions).wrapper;

			return { wrapper };
		};

		it("should expand panel", async () => {
			const { wrapper } = setupWithFilter();
			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);

			const panel = wrapper.findComponent({ name: "v-expansion-panel" });
			expect(panel.classes()).toEqual(["v-expansion-panel"]);

			await chip.trigger("click");
			await nextTick();

			expect(panel.classes()).toContain("v-expansion-panel--active");
		});

		it("should only show filtered submissions", async () => {
			const { wrapper } = setupWithFilter();
			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(true);

			await chip.trigger("click");

			const tableContent = wrapper.find(".v-expansion-panel-text");
			expect(tableContent.exists()).toBe(true);

			const submissionItems = tableContent.findAll("tbody > tr");
			expect(submissionItems).toHaveLength(1);
		});
	});
});
