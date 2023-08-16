import { ContentElementType } from "@/serverApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, Wrapper, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import { AnyContentElement } from "@/types/board/ContentElement";
import ContentElementList from "./ContentElementList.vue";
import { RichTextContentElement } from "@feature-board-text-element";
import { FileContentElement } from "@feature-board-file-element";

describe("ContentElementList", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: {
		elements: AnyContentElement[];
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(ContentElementList as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: { ...props },
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({
				elements: [],
				isEditMode: false,
			});
			expect(wrapper.findComponent(ContentElementList).exists()).toBe(true);
		});

		it.each([
			{
				elementType: ContentElementType.RichText,
				component: RichTextContentElement,
			},
			{
				elementType: ContentElementType.File,
				component: FileContentElement,
			},
			{
				elementType: ContentElementType.SubmissionContainer,
				component: SubmissionContentElement,
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

		it.each([
			{
				elementType: ContentElementType.RichText,
				component: RichTextContentElement,
			},
			{
				elementType: ContentElementType.File,
				component: FileContentElement,
			},
			{
				elementType: ContentElementType.SubmissionContainer,
				component: SubmissionContentElement,
			},
		])(
			"should propagate isEditMode to child elements",
			({ elementType, component }) => {
				const isEditModeResult = true;

				setup({
					elements: [{ type: elementType } as AnyContentElement],
					isEditMode: isEditModeResult,
				});

				const childComponent = wrapper.findComponent(component);

				expect(childComponent.exists()).toBe(true);
				expect(childComponent.props("isEditMode")).toBe(isEditModeResult);
			}
		);
	});
});
