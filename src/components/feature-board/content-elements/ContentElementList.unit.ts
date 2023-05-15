import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import {
	AnyContentElement,
	ContentElementType,
	RichTextContentElement,
} from "../types/ContentElement";
import ContentElementList from "./ContentElementList.vue";
import RichTextContentElementComponent from "./RichTextContentElement.vue";

describe("ContentElementList", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: {
		elements: AnyContentElement[];
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(ContentElementList as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ elements: [], isEditMode: false });
			expect(wrapper.findComponent(ContentElementList).exists()).toBe(true);
		});
		it.each([
			{
				elementType: ContentElementType.TEXT,
				component: RichTextContentElementComponent,
			},
		])(
			"should render elements based on type %s",
			({ elementType, component }) => {
				setup({
					elements: [{ type: elementType } as AnyContentElement],
					isEditMode: false,
				});
				expect(wrapper.findComponent(component).exists()).toBe(true);
			}
		);
		it("should propagate isEditMode to child elements", () => {
			const isEditModeResult = true;

			setup({
				elements: [{ type: ContentElementType.TEXT } as RichTextContentElement],
				isEditMode: isEditModeResult,
			});

			const childComponent = wrapper.findComponent(ContentElementList);

			expect(childComponent.exists()).toBe(true);
			expect(childComponent.props("isEditMode")).toBe(isEditModeResult);
		});
	});
});
