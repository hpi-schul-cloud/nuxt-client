import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, mount, MountOptions } from "@vue/test-utils";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import { submissionItemResponseFactory } from "@@/tests/test-utils";
import { SubmissionItemResponse } from "@/serverApi/v3";

const mockedSubmissionItems: Array<SubmissionItemResponse> = [
	submissionItemResponseFactory.build(),
];

describe("SubmissionItemStudentDisplay", () => {
	const setup = (loading = false, submissionItems = mockedSubmissionItems) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			editable: true,
			loading: loading,
			submissionItems: submissionItems,
		};

		const wrapper = mount(SubmissionItemStudentDisplay as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			propsData,
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

	describe("while loading", () => {
		it("should show loading skeleton", () => {
			const loading = true;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(true);
		});

		it("should not show form", () => {
			const loading = true;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-checkbox" });
			expect(skeleton.exists()).toBe(false);
		});
	});

	describe("after loading", () => {
		it("should not show loading skeleton", () => {
			const loading = false;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-skeleton-loader" });
			expect(skeleton.exists()).toBe(false);
		});

		it("should show form", () => {
			const loading = false;
			const { wrapper } = setup(loading);

			const skeleton = wrapper.findComponent({ name: "v-checkbox" });
			expect(skeleton.exists()).toBe(true);
		});

		describe("if student has no submissionItem yet", () => {
			it("should show state as not completed", async () => {
				const loading = false;
				const submissionItems: Array<SubmissionItemResponse> = [];
				const { wrapper } = setup(loading, submissionItems);

				const checked = wrapper
					.findComponent({ name: "v-checkbox" })
					.find("input")
					.attributes("aria-checked");

				expect(checked).toBe("false");
			});
		});

		describe("if student has a submissionItem yet", () => {
			it("should show the completed state of the belonging submissionItem", async () => {
				const loading = false;
				const { wrapper } = setup(loading);

				const checked = wrapper
					.findComponent({ name: "v-checkbox" })
					.find("input")
					.attributes("aria-checked");

				expect(checked).toBe(mockedSubmissionItems[0].completed.toString());
			});
		});
	});
});
