import { ContentElementType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { Envs } from "@/store/types/env-config";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils";
import { useBoardNotifier } from "@util-board";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import { useAddElementDialog } from "./AddElementDialog.composable";

jest.mock("./SharedElementTypeSelection.composable");

jest.mock("@/utils/inject");
const mockedInjectStrict = jest.mocked(injectStrict);

// simple mock, as we only need to provide the env-config-module (the concrete value is even irrelevant for the currently implemented tests)
mockedInjectStrict.mockImplementation(() => {
	return {
		getEnv: {
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: false,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
			FEATURE_TLDRAW_ENABLED: false,
		},
	};
});

const notifierModule = createModuleMocks(NotifierModule);

describe("ElementTypeSelection Composable", () => {
	describe("onElementClick", () => {
		describe("when element is created successfully", () => {
			const setup = () => {
				setupSharedElementTypeSelectionMock();

				const addElementMock = jest.fn();
				const elementType = ContentElementType.RichText;

				const mountedComponent = mountComposable(() => useBoardNotifier(), {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				});

				return {
					addElementMock,
					elementType,
					mountedComponent,
					notifierModule,
				};
			};

			beforeEach(() => {
				jest.clearAllMocks();
			});
			it("should call add Element", async () => {
				const { addElementMock, elementType } = setup();

				const { isDialogOpen, onElementClick } = useAddElementDialog(
					addElementMock,
					{ value: { elements: [] } }
				);

				await onElementClick(elementType);

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toBeCalledWith(elementType);
				expect(isDialogOpen.value).toBe(false);
			});

			it("should close dialog", async () => {
				const { addElementMock, elementType } = setup();

				const { isDialogOpen, onElementClick } = useAddElementDialog(
					addElementMock,
					{ value: { elements: [] } }
				);

				await onElementClick(elementType);

				expect(isDialogOpen.value).toBe(false);
			});
		});

		describe("when addElement returns error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = jest.fn().mockRejectedValueOnce(error);
				const elementType = ContentElementType.RichText;

				return { addElementMock, error, elementType };
			};

			it("should return error", async () => {
				const { addElementMock, elementType, error } = setup();

				const { onElementClick } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				await expect(onElementClick(elementType)).rejects.toThrowError(error);
			});
		});
	});

	describe("askType", () => {
		it("should set isDialogOpen to true", () => {
			const addElementMock = jest.fn();
			const { isDialogOpen } = setupSharedElementTypeSelectionMock();
			const { askType } = useAddElementDialog(addElementMock, {
				value: { elements: [] },
			});

			askType();
			expect(isDialogOpen.value).toBe(true);
		});
	});

	describe("elementTypeOptions actions", () => {
		const setup = (
			env: Partial<Envs> = {
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				FEATURE_TLDRAW_ENABLED: true,
			}
		) => {
			const addElementMock = jest.fn();
			const closeDialogMock = jest.fn();
			const { elementTypeOptions } = setupSharedElementTypeSelectionMock({
				closeDialogMock,
			});

			mockedInjectStrict.mockImplementation(() => {
				return {
					getEnv: env,
				};
			});

			return { elementTypeOptions, addElementMock, closeDialogMock };
		};

		describe("when the RichTextElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				askType();

				const action = elementTypeOptions.value[0].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.RichText);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});
				askType();

				const action = elementTypeOptions.value[0].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the FileElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				askType();

				const action = elementTypeOptions.value[1].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.File);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				askType();

				const action = elementTypeOptions.value[1].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the SubmissionElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});
				askType();

				const action = elementTypeOptions.value[2].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(
					ContentElementType.SubmissionContainer
				);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});
				askType();

				const action = elementTypeOptions.value[2].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the ExternalTool action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				askType();

				const action = elementTypeOptions.value[3].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.ExternalTool);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				askType();

				const action = elementTypeOptions.value[3].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
		describe("when the DrawingElement action is called", () => {
			it("should call drawing element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.Drawing);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock, {
					value: { elements: [] },
				});

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});

			it("should show a notification if trying to add a drawing when it already exists", async () => {
				const { onElementClick } = useAddElementDialog(jest.fn(), {
					value: {
						elements: [],
					},
				});
				await onElementClick(ContentElementType.Drawing);

				notifierModule.setNotifier({ text: "some text", status: "info" });

				expect(notifierModule.setNotifier).toHaveBeenCalled();
			});
		});
	});
});
