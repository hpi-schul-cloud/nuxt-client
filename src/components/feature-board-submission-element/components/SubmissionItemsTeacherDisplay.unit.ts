import Vue, { nextTick } from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { i18nMock } from "@@/tests/test-utils";

describe("SubmissionItemsTeacherDisplay", () => {
	const setup = (
		submissions = [{ firstName: "Max", lastName: "Meyer", status: "open" }],
		loading = false,
		isOverdue = false
	) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			isOverdue,
			loading,
			submissions,
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
			const submissions = [
				{ firstName: "Max", lastName: "Meyer", status: "open" },
			];
			const loading = true;
			const { wrapper } = setup(submissions, loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(true);
		});

		it("should not show submissionItems", () => {
			const submissions = [
				{ firstName: "Max", lastName: "Meyer", status: "open" },
			];
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
			const submissions = [
				{ firstName: "Max", lastName: "Meyer", status: "open" },
			];
			const { wrapper } = setup(submissions);

			const panelHeader = wrapper.findComponent({
				name: "v-expansion-panel-header",
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
		let wrapper: Wrapper<Vue>;

		beforeAll(() => {
			const submissions = [
				{ firstName: "Max", lastName: "Meyer", status: "open" },
				{ firstName: "Max", lastName: "Meyer", status: "completed" },
			];
			wrapper = setup(submissions).wrapper;
		});

		it("should not show expired-chip", () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show open-chip", () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show completed-chip", () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});
	});

	describe("if dueDate has expired", () => {
		let wrapper: Wrapper<Vue>;

		beforeAll(() => {
			const loading = false;
			const isOverdue = true;
			const submissions = [
				{ firstName: "Max", lastName: "Meyer", status: "expired" },
				{ firstName: "Max", lastName: "Meyer", status: "completed" },
			];
			wrapper = setup(submissions, loading, isOverdue).wrapper;
		});

		it("should not show open-chip", () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(false);
		});

		it("should show expired-chip", () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-expired",
			});
			expect(chip.exists()).toBe(true);
		});

		it("should show completed-chip", () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);
		});
	});

	describe("when a filter is clicked", () => {
		let wrapper: Wrapper<Vue>;

		beforeAll(() => {
			const submissions = [
				{ firstName: "Max", lastName: "Meyer", status: "open" },
				{ firstName: "Sabrina", lastName: "Schulz", status: "completed" },
			];
			wrapper = setup(submissions).wrapper;
		});

		it("should expand panel", async () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-completed",
			});
			expect(chip.exists()).toBe(true);

			await chip.trigger("click");
			await nextTick();

			const tableContent = wrapper.find(".v-expansion-panel-content");
			expect(tableContent.exists()).toBe(true);
		});

		it("should only show filtered submissions", async () => {
			const chip = wrapper.findComponent({
				ref: "v-chip-open",
			});
			expect(chip.exists()).toBe(true);

			await chip.trigger("click");
			await nextTick();

			const tableContent = wrapper.find(".v-expansion-panel-content");
			expect(tableContent.exists()).toBe(true);

			const submissionItems = tableContent.findAll("tbody > tr");
			expect(submissionItems).toHaveLength(1);
		});
	});
});
