import NotifierModule from "@/store/notifier";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { AnyContentElement } from "@/types/board/ContentElement";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { nextTick } from "vue";
import DrawingContentElement from "./DrawingContentElement.vue";
import DrawingContentElementDisplay from "./DrawingContentElementDisplay.vue";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import { drawingElementContentFactory } from "@/tests/test-utils/factory/drawingElementContentFactory";
import { createMock } from "@golevelup/ts-jest";

jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: jest.fn(),
		useContentElementState: jest.fn(() => ({ modelValue: {} })),
	};
});
jest.mock("@feature-board");

jest.mock("@ui-confirmation-dialog");
const mockedUse = createMock<ReturnType<typeof useDeleteConfirmationDialog>>();
mockedUse.askDeleteConfirmation.mockResolvedValue(true);
const useDeleteConfirmationDialogMock = jest.mocked(
	useDeleteConfirmationDialog
);
useDeleteConfirmationDialogMock.mockReturnValue(mockedUse);

describe("DrawingContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		const wrapper = shallowMount(DrawingContentElement as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
			propsData: { ...props },
		});

		return { wrapper };
	};

	describe("when component is in view mode", () => {
		const setup = () => {
			const element = drawingElementContentFactory.build();
			document.body.setAttribute("data-app", "true");

			const drawingElementResponse = drawingElementContentFactory.build();

			const { wrapper } = getWrapper({
				element,
				isEditMode: false,
				isFirstElement: false,
				isLastElement: false,
				hasMultipleElements: false,
			});

			return {
				element,
				wrapper,
				drawingElementResponse,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(DrawingContentElement);
			expect(component.exists()).toBe(true);
		});

		it("should render DrawingElementDisplay component", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(DrawingContentElementDisplay);
			expect(component.exists()).toBe(true);
		});

		it("should hand over lastUpdatedAt to DrawingElementDisplay", async () => {
			const { wrapper, element } = setup();

			const dueDate = wrapper
				.findComponent(DrawingContentElementDisplay)
				.props("lastUpdatedAt");

			expect(dueDate).toBe(element.timestamps.lastUpdatedAt);
		});
	});

	describe("when component is in edit mode", () => {
		const setup = () => {
			const element = drawingElementContentFactory.build();
			document.body.setAttribute("data-app", "true");

			const drawingElementResponse = drawingElementContentFactory.build();

			const { wrapper } = getWrapper({
				element,
				isEditMode: true,
				isFirstElement: false,
				isLastElement: false,
				hasMultipleElements: false,
			});

			return {
				element,
				wrapper,
				drawingElementResponse,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(DrawingContentElement).exists()).toBe(true);
		});

		it("should render DrawingContentElementEdit component", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(DrawingContentElementEdit);
			expect(component.exists()).toBe(true);
		});

		it("should hand over isFirstElement property to DrawingContentElementEdit", async () => {
			const { wrapper } = setup();

			const isFirstElement = wrapper
				.findComponent(DrawingContentElementEdit)
				.props("isFirstElement");

			expect(isFirstElement).toBe(false);
		});

		it("should hand over isLastElement property to DrawingContentElementEdit", async () => {
			const { wrapper } = setup();

			const isLastElement = wrapper
				.findComponent(DrawingContentElementEdit)
				.props("isLastElement");

			expect(isLastElement).toBe(false);
		});

		it("should hand over hasMultipleElements property to DrawingContentElementEdit", async () => {
			const { wrapper } = setup();

			const hasMultipleElements = wrapper
				.findComponent(DrawingContentElementEdit)
				.props("hasMultipleElements");

			expect(hasMultipleElements).toBe(false);
		});

		it("should hand over lastUpdatedAt to DrawingContentElementEdit", async () => {
			const { wrapper, element } = setup();

			const dueDate = wrapper
				.findComponent(DrawingContentElementEdit)
				.props("lastUpdatedAt");

			expect(dueDate).toBe(element.timestamps.lastUpdatedAt);
		});

		it("should emit 'move-down:edit' when it receives move-down:element event from child", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(DrawingContentElementEdit);
			component.vm.$emit("move-down:element");

			const emitted = wrapper.emitted();
			expect(emitted["move-down:edit"]).toBeDefined();
		});

		it("should emit 'move-up:edit' when it receives move-up:element event from child", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(DrawingContentElementEdit);
			component.vm.$emit("move-up:element");

			const emitted = wrapper.emitted();
			expect(emitted["move-up:edit"]).toBeDefined();
		});

		it("should pass delete:element event from child to parent", async () => {
			const { wrapper } = setup();

			await nextTick();
			await nextTick();

			const child = wrapper.findComponent(DrawingContentElementEdit);
			child.vm.$emit("delete:element");

			await nextTick();
			await nextTick();

			expect(wrapper.emitted("delete:element")).toHaveLength(1);
		});
	});
});
