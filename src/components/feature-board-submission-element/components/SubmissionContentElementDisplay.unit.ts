import { AUTH_MODULE_KEY } from "@/utils/inject";
import { shallowMount } from "@vue/test-utils";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("SubmissionContentElementDisplay", () => {
	const setup = (role: "teacher" | "student" = "teacher") => {
		const props = {
			dueDate: "01.01.2023 01:23",
			studentSubmission: { completed: false },
			submissions: [],
			loading: false,
			isOverdue: false,
		};
		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: [role],
		});

		const wrapper = shallowMount(SubmissionContentElementDisplay, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent(SubmissionContentElementDisplay);
		expect(component.exists()).toBe(true);
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

	describe("As a teacher", () => {
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
