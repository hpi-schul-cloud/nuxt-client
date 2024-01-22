import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mount } from "@vue/test-utils";
import RichTextContentElementComponent from "./RichTextContentElement.vue";
import RichTextContentElementDisplayComponent from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEditComponent from "./RichTextContentElementEdit.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
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

describe("RichTextContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: RichTextElementResponse;
		isEditMode: boolean;
	}) => {
		const wrapper = mount(RichTextContentElementComponent, {
			propsData: props,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should render display if isEditMode is false", () => {
			const { wrapper } = setup({
				element: TEST_ELEMENT,
				isEditMode: false,
			});
			expect(
				wrapper.findComponent(RichTextContentElementDisplayComponent).exists()
			).toBe(true);
		});

		it("should render edit if isEditMode is true", () => {
			const { wrapper } = setup({
				element: TEST_ELEMENT,
				isEditMode: true,
			});
			expect(
				wrapper.findComponent(RichTextContentElementEditComponent).exists()
			).toBe(true);
		});

		it("should call deleteElement when it receives delete:element event from edit component", async () => {
			const { wrapper } = setup({
				element: TEST_ELEMENT,
				isEditMode: true,
			});

			const richTextContentElementEditComponent = wrapper.findComponent(
				RichTextContentElementEditComponent
			);
			richTextContentElementEditComponent.vm.$emit("delete:element");
			await wrapper.vm.$nextTick();
			const emitted = wrapper.emitted("delete:element");

			if (emitted) {
				expect(emitted).toHaveLength(1);
				expect(emitted[0][0]).toStrictEqual("test-id");
			}
		});
	});
});
