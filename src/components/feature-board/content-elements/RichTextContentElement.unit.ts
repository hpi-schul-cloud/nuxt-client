import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import {
	ContentElementType,
	RichTextContentElement,
} from "../types/ContentElement";
import RichTextContentElementComponent from "./RichTextContentElement.vue";
import RichTextContentElementDisplayComponent from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEditComponent from "./RichTextContentElementEdit.vue";

const TEST_ELEMENT: RichTextContentElement = {
	id: "test-id",
	type: ContentElementType.RICH_TEXT,
	content: {
		text: "TestContent",
		inputFormat: "richtext_ck5",
	},
};

describe("RichTextContentElement", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: {
		element: RichTextContentElement;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(
			RichTextContentElementComponent as MountOptions<Vue>,
			{
				...createComponentMocks({}),
				propsData: props,
			}
		);
	};

	describe("when component is mounted", () => {
		it("should render display if isEditMode is false", () => {
			setup({ element: TEST_ELEMENT, isEditMode: false });
			expect(
				wrapper.findComponent(RichTextContentElementDisplayComponent).exists()
			).toBe(true);
		});

		it("should render edit if isEditMode is true", () => {
			setup({ element: TEST_ELEMENT, isEditMode: true });
			expect(
				wrapper.findComponent(RichTextContentElementEditComponent).exists()
			).toBe(true);
		});
	});
});
