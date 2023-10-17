import Vue from "vue";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount, Wrapper } from "@vue/test-utils";
import { ContentElementType, DrawingElementResponse } from "@/serverApi/v3";
import DrawingContentElement from "./DrawingContentElement.vue";
import DrawingContentElementDisplay from "./DrawingContentElementDisplay.vue";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import NotifierModule from "@/store/notifier";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");

const DRAWING_ELEMENT: DrawingElementResponse = {
	id: "test-id",
	type: ContentElementType.Drawing,
	content: {
		drawingName: "DrawingName",
		description: "DrawingDescription",
	},
	timestamps: {
		createdAt: new Date().toISOString(),
		lastUpdatedAt: new Date().toISOString(),
	},
};

describe("DrawingContentElement", () => {
	let wrapper: Wrapper<Vue>;
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: DrawingElementResponse;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(DrawingContentElement, {
			...createComponentMocks({}),
			propsData: props,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should render display if isEditMode is false", () => {
			setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
			});
			expect(wrapper.findComponent(DrawingContentElementDisplay).exists()).toBe(
				true
			);
		});

		it("should render edit if isEditMode is true", () => {
			setup({
				element: DRAWING_ELEMENT,
				isEditMode: true,
			});
			expect(wrapper.findComponent(DrawingContentElementEdit).exists()).toBe(
				true
			);
		});
	});
});
