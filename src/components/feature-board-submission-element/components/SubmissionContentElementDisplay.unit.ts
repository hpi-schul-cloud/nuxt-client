import Vue from "vue";
import { AUTH_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, MountOptions } from "@vue/test-utils";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";

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

	it("should render SubmissionItemStudentDisplay as a student", () => {
		const { wrapper } = setup("student");

		const component = wrapper.findComponent(SubmissionItemStudentDisplay);
		expect(component.exists()).toBe(true);
	});

	it("should emit 'update:completed' when student changes completed state", async () => {
		const { wrapper } = setup("student");

		const component = wrapper.findComponent(SubmissionItemStudentDisplay);
		component.vm.$emit("update:completed");

		const emitted = wrapper.emitted();
		expect(emitted["update:completed"]).toBeDefined();
	});

	it("should not render SubmissionItemStudentDisplay as a teacher", () => {
		const { wrapper } = setup("teacher");

		const component = wrapper.findComponent(SubmissionItemStudentDisplay);
		expect(component.exists()).toBe(false);
	});
});
