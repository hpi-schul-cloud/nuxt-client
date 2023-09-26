import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mdiFileDocumentOutline } from "@mdi/js";
import { shallowMount } from "@vue/test-utils";
import FileDescription from "./FileDescription.vue";

describe("FileDescription", () => {
	const setup = (props: {
		isEditMode?: boolean;
		name?: string;
		caption?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileDescription, {
			propsData: { ...props },
			...createComponentMocks({}),
		});

		return {
			wrapper,
			...props,
		};
	};

	describe("when name is defined", () => {
		it("should pass name to card", () => {
			const { name, wrapper } = setup({ name: "testName" });

			const card = wrapper.find("card-stub");
			expect(card.attributes("title")).toBe(name);
		});

		it("should pass icon mdiFileDocumentOutline to card", () => {
			const { wrapper } = setup({ name: "testName" });

			const card = wrapper.find("card-stub");
			expect(card.attributes("icon")).toBe(mdiFileDocumentOutline);
		});
	});

	describe("when name is undefined", () => {
		it("should not pass icon mdiFileDocumentOutline to card", () => {
			const { wrapper } = setup({});

			const card = wrapper.find("card-stub");
			expect(card.attributes("icon")).toBeUndefined();
		});
	});

	describe("when editmode is true", () => {
		it("should not pass caption to card", () => {
			const { wrapper } = setup({ isEditMode: true });

			const card = wrapper.find("card-stub");
			expect(card.attributes("subtitle")).toBeUndefined();
		});
	});

	describe("when editmode is false", () => {
		it("should pass caption to card", () => {
			const { caption, wrapper } = setup({ isEditMode: false });

			const card = wrapper.find("card-stub");
			expect(card.attributes("subtitle")).toBe(caption);
		});
	});
});
