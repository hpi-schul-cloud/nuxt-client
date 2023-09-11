import Vue from "vue";
import { AUTH_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";

describe("SubmissionContentElementDisplay", () => {
	const setup = (role: "teacher" | "student" = "teacher") => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			dueDate: "01.01.2023 01:23",
		};
		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: [role],
		});

		const wrapper = shallowMount(
			SubmissionContentElementDisplay as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				propsData,
				provide: {
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
					[AUTH_MODULE_KEY.valueOf()]: authModule,
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

		const component = wrapper.findComponent(SubmissionContentElementDisplay);
		expect(component.exists()).toBe(true);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const submissionIcon = wrapper.find("v-icon-stub");

		expect(submissionIcon.exists()).toBe(true);
	});

	it("should find submission tag", () => {
		const { wrapper } = setup();

		const submissionTag = wrapper.find("span").text();

		expect(submissionTag).toBe(
			wrapper.vm.$t("components.cardElement.submissionElement")
		);
	});

	it("should find dueDate text", () => {
		const { wrapper, dueDate } = setup();

		const submissionDueDate = wrapper
			.find("[data-testid=board-submission-element-due-date]")
			.text();

		expect(submissionDueDate).toBe(dueDate);
	});

	describe("As a student", () => {
		it("should render SubmissionItemStudentDisplay", () => {
			const { wrapper } = setup("student");

			const component = wrapper.findComponent(SubmissionItemStudentDisplay);
			expect(component.exists()).toBe(true);
		});

		it("should not render SubmissionItemsTeacherDisplay", () => {
			const { wrapper } = setup("student");

			const component = wrapper.findComponent(SubmissionItemsTeacherDisplay);
			expect(component.exists()).toBe(false);
		});

		it("should emit 'update:completed' when completed state changes", async () => {
			const { wrapper } = setup("student");

			const component = wrapper.findComponent(SubmissionItemStudentDisplay);
			component.vm.$emit("update:completed");

			const emitted = wrapper.emitted();
			expect(emitted["update:completed"]).toBeDefined();
		});
	});

	describe("As a student", () => {
		it("should render SubmissionItemsTeacherDisplay", () => {
			const { wrapper } = setup("teacher");

			const component = wrapper.findComponent(SubmissionItemsTeacherDisplay);
			expect(component.exists()).toBe(true);
		});

		it("should not render SubmissionItemStudentDisplay", () => {
			const { wrapper } = setup("teacher");

			const component = wrapper.findComponent(SubmissionItemStudentDisplay);
			expect(component.exists()).toBe(false);
		});
	});
});
