import NotifierModule from "@/store/notifier";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import DrawingContentElement from "./DrawingContentElement.vue";
import DrawingContentElementDisplay from "./DrawingContentElementDisplay.vue";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import { ContentElementType, DrawingElementResponse } from "@/serverApi/v3";

jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: jest.fn(),
		useContentElementState: jest.fn(() => ({ modelValue: {} })),
		useDeleteConfirmationDialog: jest.fn(),
	};
});
jest.mock("@feature-board");

const DRAWING_ELEMENT: DrawingElementResponse = {
	id: "test-id",
	type: ContentElementType.Drawing,
	content: {
		drawingName: "DrawingName",
		description: "DrawingDescripton",
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
		wrapper = shallowMount(DrawingContentElement as MountOptions<Vue>, {
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

		// it("should call deleteElement when it receives delete:element event from edit component", async () => {
		// 	setup({
		// 		element: DRAWING_ELEMENT,
		// 		isEditMode: true,
		// 	});

		// 	const drawingContentElementEdit = wrapper.findComponent(
		// 		DrawingContentElementEdit
		// 	);
		// 	drawingContentElementEdit.vm.$emit("delete:element");
		// 	await wrapper.vm.$nextTick();
		// 	const emitted = wrapper.emitted()["delete:element"] ?? [];

		// 	expect(emitted).toHaveLength(1);
		// 	expect(emitted[0][0]).toStrictEqual("test-id");
		// });
	});
});
