import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { del } from "vue";
import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { AnyContentElement } from "../types/ContentElement";
import ContentElementList from "./ContentElementList.vue";
import RichTextContentElementComponent from "./RichTextContentElement.vue";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import FileContentElement from "./FileContentElement.vue";
import { deleteElementEventPayloadFactory } from "@@/tests/test-utils/factory";

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
				elementType: ContentElementType.RichText,
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
				elements: [
					{
						type: ContentElementType.RichText,
					} as RichTextElementResponse,
				],
				isEditMode: isEditModeResult,
			});

			const childComponent = wrapper.findComponent(ContentElementList);

			expect(childComponent.exists()).toBe(true);
			expect(childComponent.props("isEditMode")).toBe(isEditModeResult);
		});
	});

	describe("when delete:element is emitted by FileContentElement", () => {
		it("should emit delete:element event", () => {
			const fileElementResponse = fileElementResponseFactory.build();
			setup({
				elements: [fileElementResponse],
				isEditMode: true,
			});

			const childComponent = wrapper.findComponent(FileContentElement);
			const deleteElementEventPayload =
				deleteElementEventPayloadFactory.build();
			childComponent.vm.$emit("delete:element", deleteElementEventPayload);

			expect(wrapper.emitted("delete:element")?.length).toBe(1);
			expect(wrapper.emitted("delete:element")?.[0]).toEqual([
				deleteElementEventPayload,
			]);
		});
	});
});
