import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import RichTextContentElementComponent from "./RichTextContentElement.vue";
import RichTextContentElementDisplayComponent from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEditComponent from "./RichTextContentElementEdit.vue";
import { nextTick } from "vue";

const mockElement: RichTextElementResponse = {
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

jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: jest.fn(),
		useContentElementState: jest.fn().mockImplementation(() => ({
			modelValue: mockElement.content,
		})),
		useDeleteConfirmationDialog: jest.fn(),
	};
});

jest.mock("@ui-confirmation-dialog", () => {
	return {
		useDeleteConfirmationDialog: jest.fn(),
	};
});

jest.mock("@util-board", () => {
	return {
		useInlineEditInteractionHandler: jest.fn(),
	};
});

describe("RichTextContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: RichTextElementResponse;
		isEditMode: boolean;
		columnIndex?: number;
		elementIndex?: number;
	}) => {
		const wrapper = mount(RichTextContentElementComponent, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				provide: { [NOTIFIER_MODULE_KEY.valueOf()]: notifierModule },
				stubs: {
					RichTextContentElementEdit: true,
				},
			},
			props: {
				columnIndex: props.columnIndex ?? 0,
				elementIndex: props.elementIndex ?? 0,
				...props,
			},
		});

		return { wrapper };
	};

	describe("when element is in display mode", () => {
		it("should render RichTextContentElementDisplay", () => {
			const { wrapper } = setup({
				element: mockElement,
				isEditMode: false,
			});

			const displayComponent = wrapper.findComponent(
				RichTextContentElementDisplayComponent
			);
			expect(displayComponent.exists()).toBe(true);
		});

		describe("and element is first element", () => {
			it("should add first-element class", () => {
				const { wrapper } = setup({
					element: mockElement,
					isEditMode: false,
					elementIndex: 0,
				});
				const displayComponent = wrapper.findComponent(
					RichTextContentElementDisplayComponent
				);

				expect(displayComponent.classes()).toContain("first-element");
			});
		});

		describe("and element is not first element", () => {
			it("should not add first-element class", () => {
				const { wrapper } = setup({
					element: mockElement,
					isEditMode: false,
					elementIndex: 1,
				});
				const displayComponent = wrapper.findComponent(
					RichTextContentElementDisplayComponent
				);

				expect(displayComponent.classes()).not.toContain("first-element");
			});
		});
	});

	describe("when element is in edit mode", () => {
		it("should render RichTextContentElementEdit ", () => {
			const { wrapper } = setup({
				element: mockElement,
				isEditMode: true,
			});

			const editComponent = wrapper.findComponent(
				RichTextContentElementEditComponent
			);
			expect(editComponent.exists()).toBe(true);
		});

		describe("and element is first element", () => {
			it("should add first-element class when element is first element", () => {
				const { wrapper } = setup({
					element: mockElement,
					isEditMode: true,
					elementIndex: 0,
				});
				const editComponent = wrapper.findComponent(
					RichTextContentElementEditComponent
				);

				expect(editComponent.classes()).toContain("first-element");
			});
		});

		describe("and element is not first element", () => {
			it("should not add first-element class when element is not first element", () => {
				const { wrapper } = setup({
					element: mockElement,
					isEditMode: true,
					elementIndex: 1,
				});
				const editComponent = wrapper.findComponent(
					RichTextContentElementEditComponent
				);
				expect(editComponent.classes()).not.toContain("first-element");
			});
		});

		describe("and delete:element event is emitted from RichTextContentElementEdit component", () => {
			it("should emit 'delete:element' with correct value", async () => {
				const { wrapper } = setup({
					element: mockElement,
					isEditMode: true,
				});

				const richTextContentElementEditComponent = wrapper.findComponent(
					RichTextContentElementEditComponent
				);
				richTextContentElementEditComponent.vm.$emit("delete:element");
				await nextTick();
				const emitted = wrapper.emitted("delete:element");

				if (emitted) {
					expect(emitted).toHaveLength(1);
					expect(emitted[0][0]).toStrictEqual("test-id");
				}
			});
		});
	});
});
