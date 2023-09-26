import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mdiFileDocumentOutline } from "@mdi/js";
import { shallowMount } from "@vue/test-utils";
import FileDescription from "./FileDescription.vue";

describe("FileDescription", () => {
	const setup = (props: {
		isEditMode: boolean;
		showTitle: boolean;
		name?: string;
		caption?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			name: props.name ?? "testName",
			caption: props.caption ?? "testCaption",
			isEditMode: props.isEditMode,
			showTitle: props.showTitle,
		};
		const wrapper = shallowMount(FileDescription, {
			propsData,
			...createComponentMocks({}),
		});

		return {
			wrapper,
			name: propsData.name,
			caption: propsData.caption,
		};
	};

	describe("when isEditMode is true", () => {
		describe("when showTitle is true", () => {
			it("should render title", () => {
				const { wrapper, name } = setup({
					isEditMode: true,
					showTitle: true,
				});

				const text = wrapper.text();

				expect(text).toContain(name);
			});

			it("should render icon", () => {
				const { wrapper } = setup({
					isEditMode: true,
					showTitle: true,
				});

				const icon = wrapper.find("v-icon-stub").text();

				expect(icon).toBe(mdiFileDocumentOutline);
			});

			it("should not render caption", () => {
				const { wrapper, caption } = setup({
					isEditMode: true,
					showTitle: true,
				});

				const text = wrapper.text();

				expect(text).not.toContain(caption);
			});
		});

		describe("when showTitle is false", () => {
			it("should not render title", () => {
				const { wrapper, name } = setup({
					isEditMode: true,
					showTitle: false,
				});

				const text = wrapper.text();

				expect(text).not.toContain(name);
			});

			it("should not render caption", () => {
				const { wrapper, caption } = setup({
					isEditMode: true,
					showTitle: false,
				});

				const text = wrapper.text();

				expect(text).not.toContain(caption);
			});
		});
	});

	describe("when isEditMode is false", () => {
		describe("when showTitle is true", () => {
			it("should render title", () => {
				const { wrapper, name } = setup({
					isEditMode: false,
					showTitle: true,
				});

				const text = wrapper.text();

				expect(text).toContain(name);
			});

			it("should render icon", () => {
				const { wrapper } = setup({
					isEditMode: false,
					showTitle: true,
				});

				const icon = wrapper.find("v-icon-stub").text();

				expect(icon).toBe(mdiFileDocumentOutline);
			});

			it("should render caption", () => {
				const { wrapper, caption } = setup({
					isEditMode: false,
					showTitle: true,
				});

				const text = wrapper.text();

				expect(text).toContain(caption);
			});
		});

		describe("when showTitle is false", () => {
			it("should not render title", () => {
				const { wrapper, name } = setup({
					isEditMode: false,
					showTitle: false,
				});

				const text = wrapper.text();

				expect(text).not.toContain(name);
			});

			it("should render caption", () => {
				const { wrapper, caption } = setup({
					isEditMode: false,
					showTitle: false,
				});

				const text = wrapper.text();

				expect(text).toContain(caption);
			});
		});
	});
});
