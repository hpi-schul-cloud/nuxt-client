import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RichTextContentElementComponent from "./RichTextContentElement.vue";
import RichTextContentElementDisplayComponent from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEditComponent from "./RichTextContentElementEdit.vue";
jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: jest.fn(),
		useContentElementState: jest.fn(() => ({ modelValue: {} })),
		useDeleteConfirmationDialog: jest.fn(),
	};
});
jest.mock("@ui-confirmation-dialog", () => {
	return {
		useDeleteConfirmationDialog: jest.fn(),
	};
});

jest.mock("@feature-board", () => {
	return {
		useInlineEditInteractionHandler: jest.fn(),
	};
});

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
const deleteElementMock = jest.fn();

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
				propsData: { ...props, deleteElement: deleteElementMock },
				provide: {
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			}
		);
	};

	describe("when component is mounted", () => {
		it.only("should render display if isEditMode is false", () => {
			setup({
				element: TEST_ELEMENT,
				isEditMode: false,
			});
			expect(
				wrapper.findComponent(RichTextContentElementDisplayComponent).exists()
			).toBe(true);
		});

		it("should render edit if isEditMode is true", () => {
			setup({
				element: TEST_ELEMENT,
				isEditMode: true,
			});
			expect(
				wrapper.findComponent(RichTextContentElementEditComponent).exists()
			).toBe(true);
		});

		it("should call deleteElement when it receives delete:element event from edit component", async () => {
			setup({
				element: TEST_ELEMENT,
				isEditMode: true,
			});

			const richTextContentElementEditComponent = wrapper.findComponent(
				RichTextContentElementEditComponent
			);
			richTextContentElementEditComponent.vm.$emit("delete:element");

			await wrapper.vm.$nextTick();

			expect(deleteElementMock).toHaveBeenCalledTimes(1);
			expect(deleteElementMock).toHaveBeenCalledWith(TEST_ELEMENT.id);
		});
	});
});
