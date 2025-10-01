import { useSubmissionContentElementState } from "../composables/SubmissionContentElementState.composable";
import SubmissionContentElement from "./SubmissionContentElement.vue";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import { SubmissionContainerElementResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { submissionContainerElementResponseFactory } from "@@/tests/test-utils/factory/submissionContainerElementResponseFactory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useContentElementState } from "@data-board";
import { createMock } from "@golevelup/ts-vitest";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { shallowMount } from "@vue/test-utils";
import { computed, ref, unref } from "vue";

vi.mock("@data-board/BoardFocusHandler.composable");
vi.mock("@feature-board");

vi.mock("@ui-confirmation-dialog");
const mockedUse = createMock<ReturnType<typeof useDeleteConfirmationDialog>>();
mockedUse.askDeleteConfirmation.mockResolvedValue(true);
const useDeleteConfirmationDialogMock = vi.mocked(useDeleteConfirmationDialog);
useDeleteConfirmationDialogMock.mockReturnValue(mockedUse);

vi.mock("@data-board/ContentElementState.composable");
const mockedUseContentElementState = vi.mocked(useContentElementState);
const mockedUseContentElementStateResponse = createMock<ReturnType<typeof useContentElementState>>();

mockedUseContentElementState.mockReturnValue(mockedUseContentElementStateResponse);

vi.mock("../composables/SubmissionContentElementState.composable");
const mockedUseSubmissionContentElementState = vi.mocked(useSubmissionContentElementState);
const mockedUseSubmissionContentElementStateResponse: ReturnType<typeof useSubmissionContentElementState> = {
	submissions: ref([]),
	studentSubmission: ref({ completed: false }),
	fetchSubmissionItems: vi.fn(),
	updateSubmissionItem: vi.fn(),
	loading: ref(false),
	isOverdue: computed(() => false),
};

mockedUseSubmissionContentElementState.mockReturnValue(mockedUseSubmissionContentElementStateResponse);

describe("SubmissionContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		element: SubmissionContainerElementResponse;
		isEditMode: boolean;
		columnIndex: number;
		rowIndex: number;
		elementIndex: number;
	}) => {
		const wrapper = shallowMount(SubmissionContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props,
		});

		return { wrapper };
	};

	describe("when component is in view mode", () => {
		const setup = () => {
			const element = submissionContainerElementResponseFactory.build();

			const submissionContainerElementResponse = submissionContainerElementResponseFactory.build();

			mockedUseContentElementState.mockReturnValue({
				modelValue: ref({
					dueDate: element.content.dueDate,
				}),
				computedElement: computed(() => element),
			});

			const { wrapper } = getWrapper({
				element,
				isEditMode: false,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
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

			const dueDate = wrapper.findComponent(SubmissionContentElementDisplay).props("dueDate");
			expect(dueDate).toBe(element.content.dueDate);
		});

		it("should hand over submissionItems to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const completed = wrapper.findComponent(SubmissionContentElementDisplay).props("submissions");

			expect(completed).toBe(unref(mockedUseSubmissionContentElementStateResponse.submissions));
		});

		it("should hand over loading state to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const loading = wrapper.findComponent(SubmissionContentElementDisplay).props("loading");

			expect(loading).toBe(unref(mockedUseSubmissionContentElementStateResponse.loading));
		});

		it("should hand over isOverdue state to SubmissionContentElementDisplay", async () => {
			const { wrapper } = setup();

			const isOverdue = wrapper.findComponent(SubmissionContentElementDisplay).props("isOverdue");

			expect(isOverdue).toBe(unref(mockedUseSubmissionContentElementStateResponse.isOverdue));
		});

		it("should update completed state when it receives 'update:completed' event from child", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementDisplay);
			component.vm.$emit("update:completed");

			expect(mockedUseSubmissionContentElementStateResponse.updateSubmissionItem).toHaveBeenCalledTimes(1);
		});
	});

	describe("when component is in edit mode", () => {
		const setup = () => {
			const element = submissionContainerElementResponseFactory.build();

			const submissionContainerElementResponse = submissionContainerElementResponseFactory.build();

			mockedUseContentElementState.mockReturnValue({
				modelValue: ref({
					dueDate: element.content.dueDate,
				}),
				computedElement: computed(() => element),
			});

			const { wrapper } = getWrapper({
				element,
				isEditMode: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
			});

			return {
				element,
				wrapper,
				submissionContainerElementResponse,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(SubmissionContentElement).exists()).toBe(true);
		});

		it("should render SubmissionContentElementEdit component", async () => {
			const { wrapper } = setup();

			const component = wrapper.findComponent(SubmissionContentElementEdit);
			expect(component.exists()).toBe(true);
		});

		it("should hand over dueDate to SubmissionContentElementEdit", async () => {
			const { wrapper, element } = setup();

			const dueDate = wrapper.findComponent(SubmissionContentElementEdit).props("dueDate");

			expect(dueDate).toBe(element.content.dueDate);
		});

		it("should hand over submissionItems to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const completed = wrapper.findComponent(SubmissionContentElementEdit).props("submissions");

			expect(completed).toBe(unref(mockedUseSubmissionContentElementStateResponse.submissions));
		});

		it("should hand over loading state to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const loading = wrapper.findComponent(SubmissionContentElementEdit).props("loading");

			expect(loading).toBe(unref(mockedUseSubmissionContentElementStateResponse.loading));
		});

		it("should hand over isOverdue state to SubmissionContentElementEdit", async () => {
			const { wrapper } = setup();

			const isOverdue = wrapper.findComponent(SubmissionContentElementEdit).props("isOverdue");

			expect(isOverdue).toBe(unref(mockedUseSubmissionContentElementStateResponse.isOverdue));
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

			expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(1);
		});
	});
});
