import { ContentElementType } from "@/serverApi/v3";
import { ConfigResponse } from "@/serverApi/v3/api";
import NotifierModule from "@/store/notifier";
import { injectStrict } from "@/utils/inject";
import setupStores from "@@/tests/test-utils/setupStores";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import { useAddElementDialog } from "./AddElementDialog.composable";

setupStores({ notifierModule: NotifierModule });

jest.mock("./SharedElementTypeSelection.composable");

jest.mock("@/utils/inject");
const mockedInjectStrict = jest.mocked(injectStrict);

const i18nKey =
	"components.cardElement.collaborativeTextEditorElement.alert.info.visible";

const translationMap: Record<string, string> = {};

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: (key: string) => key,
			tc: (key: string) => key,
			te: (key: string) => translationMap[key] !== undefined,
		}),
	};
});

jest.mock("@util-board", () => {
	return {
		...jest.requireActual("@util-board"),
		useBoardNotifier: jest.fn().mockReturnValue({
			showCustomNotifier: jest.fn(),
		}),
	};
});

// simple mock, as we only need to provide the env-config-module (the concrete value is even irrelevant for the currently implemented tests)
mockedInjectStrict.mockImplementation(() => {
	return {
		getEnv: {
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: false,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
			FEATURE_TLDRAW_ENABLED: false,
			FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: false,
		},
	};
});

describe("ElementTypeSelection Composable", () => {
	describe("onElementClick", () => {
		describe("when element is created successfully", () => {
			const setup = () => {
				setupSharedElementTypeSelectionMock();

				const addElementMock = jest.fn();
				const elementType = ContentElementType.RichText;

				return {
					addElementMock,
					elementType,
				};
			};

			it("should call add Element", async () => {
				const { addElementMock, elementType } = setup();

				const { isDialogOpen, onElementClick } =
					useAddElementDialog(addElementMock);

				await onElementClick(elementType);

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toBeCalledWith(elementType);
				expect(isDialogOpen.value).toBe(false);
			});

			it("should close dialog", async () => {
				const { addElementMock, elementType } = setup();

				const { isDialogOpen, onElementClick } =
					useAddElementDialog(addElementMock);

				await onElementClick(elementType);

				expect(isDialogOpen.value).toBe(false);
			});

			describe("when element type is CollaborativeTextEditor", () => {
				const setup = () => {
					setupSharedElementTypeSelectionMock();

					const addElementMock = jest.fn();
					const elementType = ContentElementType.CollaborativeTextEditor;

					return {
						addElementMock,
						elementType,
					};
				};
				it("should show Notification", async () => {
					const { addElementMock, elementType } = setup();

					const { onElementClick, showCustomNotifier } =
						useAddElementDialog(addElementMock);

					await onElementClick(elementType);

					expect(showCustomNotifier).toHaveBeenCalledWith(i18nKey, "info");
				});
			});

			describe("when element type is NOT CollaborativeTextEditor", () => {
				const setup = () => {
					setupSharedElementTypeSelectionMock();

					const addElementMock = jest.fn();
					const elementType = ContentElementType.RichText;

					return {
						addElementMock,
						elementType,
					};
				};
				it("should NOT show Notification", async () => {
					const { addElementMock, elementType } = setup();

					const { onElementClick, showCustomNotifier } =
						useAddElementDialog(addElementMock);

					await onElementClick(elementType);

					expect(showCustomNotifier).toBeCalledTimes(0);
				});
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

				const { onElementClick } = useAddElementDialog(addElementMock);

				await expect(onElementClick(elementType)).rejects.toThrowError(error);
			});
		});
	});

	describe("askType", () => {
		it("should set isDialogOpen to true", () => {
			const addElementMock = jest.fn();
			const { isDialogOpen } = setupSharedElementTypeSelectionMock();
			const { askType } = useAddElementDialog(addElementMock);

			askType();
			expect(isDialogOpen.value).toBe(true);
		});
	});

	describe("elementTypeOptions actions", () => {
		const setup = (
			env: Partial<ConfigResponse> = {
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				FEATURE_TLDRAW_ENABLED: true,
				FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: true,
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
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[0].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.RichText);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);
				askType();

				const action = elementTypeOptions.value[0].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the FileElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[1].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.File);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[1].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the SubmissionElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);
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
				const { askType } = useAddElementDialog(addElementMock);
				askType();

				const action = elementTypeOptions.value[2].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the ExternalTool action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[3].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.ExternalTool);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[3].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
		describe("when the DrawingElement action is called", () => {
			it("should call drawing element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(ContentElementType.Drawing);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
		describe("when the CollaborativeTextEditorElement action is called", () => {
			it("should call collaborative text editor element function with right argument", async () => {
				const { elementTypeOptions, addElementMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[5].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith(
					ContentElementType.CollaborativeTextEditor
				);
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock } = setup();
				const { askType } = useAddElementDialog(addElementMock);

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
	});
});
