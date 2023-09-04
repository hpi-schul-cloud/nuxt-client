import NotifierModule from "@/store/notifier";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { AnyContentElement } from "@/types/board/ContentElement";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { nextTick, computed, ref } from "vue";
import SubmissionContentElement from "./SubmissionContentElement.vue";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { submissionContainerElementResponseFactory } from "@@/tests/test-utils/factory/submissionContainerElementResponseFactory";
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

jest.mock("./SubmissionContentElementState.composable");
const mockedUseSubmissionContentElementState = jest.mocked(
	useSubmissionContentElementState
);
const mockedUpdateSubmissionItem = jest.fn();
const mockedSubmissionItems = ref([]);
const mockedCompleted = computed(() => true);
const mockedLoading = computed(() => false);
const mocks = {
	updateSubmissionItem: mockedUpdateSubmissionItem,
	submissionItems: mockedSubmissionItems,
	completed: mockedCompleted,
	loading: mockedLoading,
};
mockedUseSubmissionContentElementState.mockReturnValue(mocks);

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
					[I18N_KEY.valueOf()]: { t: (key: string) => key },
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

		it("should hand over completed state to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const completed = wrapper
				.findComponent(SubmissionContentElementDisplay)
				.props("completed");

			expect(completed).toBe(mockedCompleted.value);
		});

		it("should hand over loading state to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const loading = wrapper
				.findComponent(SubmissionContentElementDisplay)
				.props("loading");

			expect(loading).toBe(mockedLoading.value);
		});

		it("should update completed state when it receives 'update:completed' event from child", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementDisplay);
			component.vm.$emit("update:completed");

			expect(mockedUpdateSubmissionItem).toHaveBeenCalledTimes(1);
		});
	});

	describe("when component is in edit mode", () => {
		const setup = () => {
			const element = submissionContainerElementResponseFactory.build();
			document.body.setAttribute("data-app", "true");

			const submissionContainerElementResponse =
				submissionContainerElementResponseFactory.build();

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
