import NotifierModule from "@/store/notifier";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { setupDeleteBoardNodeConfirmationMock } from "@@/tests/test-utils/composable-mocks/deleteBoardNodeConfirmationMock";
import { AnyContentElement } from "@boardTypes/ContentElement";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import SubmissionContentElement from "./SubmissionContentElement.vue";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import { submissionContainerElementResponseFactory } from "@@/tests/test-utils/factory/submissionContainerElementResponseFactory";

jest.mock("@boardShared/InlineEditInteractionHandler.composable");
jest.mock("@boardShared/DeleteBoardNodeConfirmation.composable");

describe("SubmissionContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		const deleteElementMock = jest.fn();

		const wrapper = shallowMount(
			SubmissionContentElement as MountOptions<Vue>,
			{
				...createComponentMocks({ i18n: true }),
				provide: {
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
				propsData: { ...props, deleteElement: deleteElementMock },
			}
		);

		return { wrapper, deleteElementMock };
	};

	describe("when component is in view mode", () => {
		const setup = () => {
			const element = submissionContainerElementResponseFactory.build();
			document.body.setAttribute("data-app", "true");

			const submissionContainerElementResponse =
				submissionContainerElementResponseFactory.build();

			const askDeleteBoardNodeConfirmationMock = jest.fn();
			setupDeleteBoardNodeConfirmationMock({
				askDeleteBoardNodeConfirmationMock,
			});

			const { wrapper, deleteElementMock } = getWrapper({
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
				deleteElementMock,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			const submissionContentElement = wrapper.findComponent(
				SubmissionContentElement
			);
			expect(submissionContentElement.exists()).toBe(true);
		});

		it("should render SubmissionContentElementDisplay component", async () => {
			const { wrapper } = setup();

			const submissionContentElementDisplay = wrapper.findComponent(
				SubmissionContentElementDisplay
			);
			expect(submissionContentElementDisplay.exists()).toBe(true);
		});

		it("should hand over dueDate to SubmissionContentElementDisplay", async () => {
			const { wrapper, element } = setup();

			const dueDate = wrapper
				.findComponent(SubmissionContentElementDisplay)
				.props("dueDate");

			expect(dueDate).toBe(element.content.dueDate);
		});
	});

	describe("when component is in edit mode", () => {
		const setup = () => {
			const element = submissionContainerElementResponseFactory.build();
			document.body.setAttribute("data-app", "true");

			const submissionContainerElementResponse =
				submissionContainerElementResponseFactory.build();

			const askDeleteBoardNodeConfirmationMock = jest
				.fn()
				.mockReturnValueOnce(true);
			setupDeleteBoardNodeConfirmationMock({
				askDeleteBoardNodeConfirmationMock,
			});

			const { wrapper, deleteElementMock } = getWrapper({
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
				deleteElementMock,
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

			const submissionContentElementEdit = wrapper.findComponent(
				SubmissionContentElementEdit
			);
			expect(submissionContentElementEdit.exists()).toBe(true);
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

		it("should emit 'move-down:edit' when it receives move-down:element event from child", async () => {
			const { wrapper } = setup();

			const submissionContentElementEdit = wrapper.findComponent(
				SubmissionContentElementEdit
			);
			submissionContentElementEdit.vm.$emit("move-down:element");

			const emitted = wrapper.emitted();
			expect(emitted["move-down:edit"]).toBeDefined();
		});

		it("should emit 'move-up:edit' when it receives move-up:element event from child", async () => {
			const { wrapper } = setup();

			const submissionContentElementEdit = wrapper.findComponent(
				SubmissionContentElementEdit
			);
			submissionContentElementEdit.vm.$emit("move-up:element");

			const emitted = wrapper.emitted();
			expect(emitted["move-up:edit"]).toBeDefined();
		});

		it("should call deleteElement function when it receives delete:element event from child", async () => {
			const { wrapper, element, deleteElementMock } = setup();

			const submissionContentElementEdit = wrapper.findComponent(
				SubmissionContentElementEdit
			);
			submissionContentElementEdit.vm.$emit("delete:element");

			await wrapper.vm.$nextTick();

			expect(deleteElementMock).toHaveBeenCalledTimes(1);
			expect(deleteElementMock).toHaveBeenCalledWith(element.id);

			expect(submissionContentElementEdit.exists()).toBe(true);
		});

		// currently blocked as v-card blocks correct usage of keydown event (works when its a div)
		it.todo("should emit 'move-keyboard:edit' when arrow key up or is pressed");
		/* async () => {
			const { wrapper } = setup();

			await wrapper.trigger("keydown.up");

			const emitted = wrapper.emitted();
			expect(emitted["move-keyboard:edit"]).toBeDefined();
		}; */
	});
});
