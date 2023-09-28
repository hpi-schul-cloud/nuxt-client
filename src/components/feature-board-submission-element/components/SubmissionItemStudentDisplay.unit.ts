import Vue from "vue";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { i18nMock, submissionsResponseFactory } from "@@/tests/test-utils";
import { mount, MountOptions } from "@vue/test-utils";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import { SubmissionsResponse } from "@/serverApi/v3";

const mockedSubmissions = submissionsResponseFactory.build();

describe("SubmissionItemStudentDisplay", () => {
	const setup = (submissions = mockedSubmissions, editable = true) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			editable: editable,
			submissions: submissions,
		};

		const wrapper = mount(SubmissionItemStudentDisplay as MountOptions<Vue>, {
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

		const component = wrapper.findComponent(SubmissionItemStudentDisplay);
		expect(component.exists()).toBe(true);
	});

	it("should emit 'update:completed' when completed state changes", async () => {
		const { wrapper } = setup();

		const component = wrapper.findComponent({ name: "v-checkbox" });
		component.vm.$emit("change");

		const emitted = wrapper.emitted();
		expect(emitted["update:completed"]).toBeDefined();
	});

	it("should show form", () => {
		const { wrapper } = setup();

		const form = wrapper.findComponent({ name: "v-checkbox" });
		expect(form.exists()).toBe(true);
	});

	describe("if student has no submissionItem yet", () => {
		it("should show state as not completed", async () => {
			const submissions: SubmissionsResponse = {
				submissionItemsResponse: [],
				users: [],
			};
			const { wrapper } = setup(submissions);

			const checked = wrapper
				.findComponent({ name: "v-checkbox" })
				.find("input")
				.attributes("aria-checked");

			expect(checked).toEqual("false");
		});
	});

	describe("if student has a submissionItem yet", () => {
		it("should show the completed state of the belonging submissionItem", async () => {
			const { wrapper } = setup();

			const checked = wrapper
				.findComponent({ name: "v-checkbox" })
				.find("input")
				.attributes("aria-checked");

			expect(checked).toEqual(
				mockedSubmissions.submissionItemsResponse[0].completed.toString()
			);
		});
	});

	describe("if submission can be edited", () => {
		it("should render the checkbox as not disabled", async () => {
			const { wrapper } = setup();

			const disabled = wrapper
				.findComponent({ name: "v-checkbox" })
				.props("disabled");

			expect(disabled).toBe(false);
		});
	});

	describe("if submission can't be edited any more", () => {
		it("should render the checkbox as disabled", async () => {
			const editable = false;
			const { wrapper } = setup(mockedSubmissions, editable);

			const disabled = wrapper
				.findComponent({ name: "v-checkbox" })
				.props("disabled");

			expect(disabled).toBe(true);
		});
	});
});
