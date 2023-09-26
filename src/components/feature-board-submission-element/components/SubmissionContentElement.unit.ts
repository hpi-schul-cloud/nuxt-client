import NotifierModule from "@/store/notifier";
import { AnyContentElement } from "@/types/board/ContentElement";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { submissionContainerElementResponseFactory } from "@@/tests/test-utils/factory/submissionContainerElementResponseFactory";
import { createMock } from "@golevelup/ts-jest";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { nextTick, ref } from "vue";
import SubmissionContentElement from "./SubmissionContentElement.vue";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import { useSubmissionContentElementState } from "../composables/SubmissionContentElementState.composable";
import { useContentElementState } from "@data-board";
import { i18nMock } from "@@/tests/test-utils";

jest.mock("@data-board/BoardFocusHandler.composable");
jest.mock("@feature-board");

jest.mock("@ui-confirmation-dialog");
const mockedUse = createMock<ReturnType<typeof useDeleteConfirmationDialog>>();
mockedUse.askDeleteConfirmation.mockResolvedValue(true);
const useDeleteConfirmationDialogMock = jest.mocked(
	useDeleteConfirmationDialog
);
useDeleteConfirmationDialogMock.mockReturnValue(mockedUse);

jest.mock("@data-board/ContentElementState.composable");
const mockedUseContentElementState = jest.mocked(useContentElementState);
const mockedUseContentElementStateResponse =
	createMock<ReturnType<typeof useContentElementState>>();

mockedUseContentElementState.mockReturnValue(
	mockedUseContentElementStateResponse
);

jest.mock("../composables/SubmissionContentElementState.composable");
const mockedUseSubmissionContentElementState = jest.mocked(
	useSubmissionContentElementState
);
const mockedUseSubmissionContentElementStateResponse =
	createMock<ReturnType<typeof useSubmissionContentElementState>>();

mockedUseSubmissionContentElementState.mockReturnValue(
	mockedUseSubmissionContentElementStateResponse
);

describe("SubmissionContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		const wrapper = shallowMount(
			SubmissionContentElement as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
				propsData: { ...props },
			}
		);

		return { wrapper };
	};

	describe("when component is in view mode", () => {
		const setup = () => {
			const element = submissionContainerElementResponseFactory.build();
			document.body.setAttribute("data-app", "true");

			const submissionContainerElementResponse =
				submissionContainerElementResponseFactory.build();

			mockedUseContentElementState.mockReturnValue({
				modelValue: ref({
					dueDate: element.content.dueDate,
				}),
			});

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
				submissionContainerElementResponse,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElement);
			expect(component.exists()).toBe(true);
		});

		it("should render SubmissionContentElementDisplay component", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementDisplay);
			expect(component.exists()).toBe(true);
		});

		it("should hand over dueDate to SubmissionContentElementDisplay", async () => {
			const { wrapper, element } = setup();

			const dueDate = wrapper
				.findComponent(SubmissionContentElementDisplay)
				.props("dueDate");
			expect(dueDate).toBe(element.content.dueDate);
		});

		it("should hand over submissionItems to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const completed = wrapper
				.findComponent(SubmissionContentElementDisplay)
				.props("submissions");

			expect(completed).toBe(
				mockedUseSubmissionContentElementStateResponse.submissions
			);
		});

		it("should hand over loading state to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const loading = wrapper
				.findComponent(SubmissionContentElementDisplay)
				.props("loading");

			expect(loading).toBe(
				mockedUseSubmissionContentElementStateResponse.loading
			);
		});

		it("should hand over editable state to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const editable = wrapper
				.findComponent(SubmissionContentElementDisplay)
				.props("editable");

			expect(editable).toBe(
				mockedUseSubmissionContentElementStateResponse.editable
			);
		});

		it("should update completed state when it receives 'update:completed' event from child", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementDisplay);
			component.vm.$emit("update:completed");

			expect(
				mockedUseSubmissionContentElementStateResponse.updateSubmissionItem
			).toHaveBeenCalledTimes(1);
		});
	});

	describe("when component is in edit mode", () => {
		const setup = () => {
			const element = submissionContainerElementResponseFactory.build();
			document.body.setAttribute("data-app", "true");

			const submissionContainerElementResponse =
				submissionContainerElementResponseFactory.build();

			mockedUseContentElementState.mockReturnValue({
				modelValue: ref({
					dueDate: element.content.dueDate,
				}),
			});

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
				submissionContainerElementResponse,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(SubmissionContentElement).exists()).toBe(
				true
			);
		});

		it("should render SubmissionContentElementEdit component", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementEdit);
			expect(component.exists()).toBe(true);
		});

		it("should hand over isFirstElement property to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const isFirstElement = wrapper
				.findComponent(SubmissionContentElementEdit)
				.props("isFirstElement");

			expect(isFirstElement).toBe(false);
		});

		it("should hand over isLastElement property to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const isLastElement = wrapper
				.findComponent(SubmissionContentElementEdit)
				.props("isLastElement");

			expect(isLastElement).toBe(false);
		});

		it("should hand over hasMultipleElements property to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const hasMultipleElements = wrapper
				.findComponent(SubmissionContentElementEdit)
				.props("hasMultipleElements");

			expect(hasMultipleElements).toBe(false);
		});

		it("should hand over dueDate to SubmissionContentElementEdit", async () => {
			const { wrapper, element } = setup();

			const dueDate = wrapper
				.findComponent(SubmissionContentElementEdit)
				.props("dueDate");

			expect(dueDate).toBe(element.content.dueDate);
		});

		it("should hand over submissionItems to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const completed = wrapper
				.findComponent(SubmissionContentElementEdit)
				.props("submissions");

			expect(completed).toBe(
				mockedUseSubmissionContentElementStateResponse.submissions
			);
		});

		it("should hand over loading state to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const loading = wrapper
				.findComponent(SubmissionContentElementEdit)
				.props("loading");

			expect(loading).toBe(
				mockedUseSubmissionContentElementStateResponse.loading
			);
		});

		it("should hand over editable state to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const editable = wrapper
				.findComponent(SubmissionContentElementEdit)
				.props("editable");

			expect(editable).toBe(
				mockedUseSubmissionContentElementStateResponse.editable
			);
		});

		it("should emit 'move-down:edit' when it receives move-down:element event from child", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementEdit);
			component.vm.$emit("move-down:element");

			const emitted = wrapper.emitted();
			expect(emitted["move-down:edit"]).toBeDefined();
		});

		it("should emit 'move-up:edit' when it receives move-up:element event from child", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementEdit);
			component.vm.$emit("move-up:element");

			const emitted = wrapper.emitted();
			expect(emitted["move-up:edit"]).toBeDefined();
		});

		it("should pass delete:element event from child to parent", async () => {
			const { wrapper } = setup();

			await nextTick();
			await nextTick();

			const child = wrapper.findComponent(SubmissionContentElementEdit);
			child.vm.$emit("delete:element");

			await nextTick();
			await nextTick();

			expect(wrapper.emitted("delete:element")).toHaveLength(1);
		});

		it("should emit 'move-keyboard:edit' when arrow key down is pressed", async () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({ ref: "submissionContentElement" });
			card.vm.$emit(
				"keydown",
				new KeyboardEvent("keydown", {
					key: "ArrowDown",
					keyCode: 40,
				})
			);

			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(1);
		});

		it("should emit 'move-keyboard:edit' when arrow key up is pressed", async () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({ ref: "submissionContentElement" });
			card.vm.$emit(
				"keydown",
				new KeyboardEvent("keydown", {
					key: "ArrowUp",
					keyCode: 38,
				})
			);

			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(1);
		});
	});
});
