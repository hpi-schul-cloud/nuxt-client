import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import RichTextContentElementComponent from "./RichTextContentElement.vue";
import RichTextContentElementDisplayComponent from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEditComponent from "./RichTextContentElementEdit.vue";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import NotifierModule from "@/store/notifier";

jest.mock("../shared/InlineEditInteractionHandler.composable");

const TEST_ELEMENT: RichTextElementResponse = {
	id: "test-id",
	type: ContentElementType.RichText,
	content: {
		text: "TestContent",
		inputFormat: "richTextCk5",
	},
	timestamps: {
		createdAt: new Date().toISOString(),
		lastUpdatedAt: new Date().toISOString(),
	},
};

describe("RichTextContentElement", () => {
	let wrapper: Wrapper<Vue>;
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: RichTextElementResponse;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(
			RichTextContentElementComponent as MountOptions<Vue>,
			{
				...createComponentMocks({}),
				provide: {
					[I18N_KEY as symbol]: { t: (key: string) => key },
					[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
				},
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
