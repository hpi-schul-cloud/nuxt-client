import { ContentElementType } from "@/serverApi/v3";
import { ConfigResponse } from "@/serverApi/v3/api";
import NotifierModule from "@/store/notifier";
import { injectStrict } from "@/utils/inject";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock } from "@golevelup/ts-jest";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { ref } from "vue";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import { useAddElementDialog } from "./AddElementDialog.composable";

setupStores({ notifierModule: NotifierModule });

vi.mock("./SharedElementTypeSelection.composable");

vi.mock("@/utils/inject");
const mockedInjectStrict = vi.mocked(injectStrict);

const translationMap: Record<string, string> = {};

vi.mock("vue-i18n", async () => {
	return {
		...(await vi.importActual("vue-i18n")),
		useI18n: vi.fn().mockReturnValue({
			t: (key: string) => key,
			tc: (key: string) => key,
			te: (key: string) => translationMap[key] !== undefined,
		}),
	};
});

vi.mock("@util-board");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);
vi.mocked(useSharedLastCreatedElement).mockImplementation(() => {
	return {
		lastCreatedElementId: ref(undefined),
		resetLastCreatedElementId: vi.fn(),
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
				const cardId = "cardId";

				setupSharedElementTypeSelectionMock();

				const addElementMock = vi.fn();
				const elementType = ContentElementType.RichText;

				const showCustomNotifierMock = vi.fn();
				const mockedBoardNotifierCalls = createMock<
					ReturnType<typeof useBoardNotifier>
				>({
					showCustomNotifier: showCustomNotifierMock,
				});
				mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

				return {
					addElementMock,
					elementType,
					showCustomNotifierMock,
					cardId,
				};
			};

			it("should call add Element", async () => {
				const { addElementMock, elementType, cardId } = setup();

				const { isDialogOpen, onElementClick } = useAddElementDialog(
					addElementMock,
					cardId
				);

				await onElementClick(elementType);

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toBeCalledWith({ type: elementType, cardId });
				expect(isDialogOpen.value).toBe(false);
			});

			it("should close dialog", async () => {
				const { addElementMock, elementType, cardId } = setup();

				const { isDialogOpen, onElementClick } = useAddElementDialog(
					addElementMock,
					cardId
				);

				await onElementClick(elementType);

				expect(isDialogOpen.value).toBe(false);
			});

			describe("when element type is CollaborativeTextEditor", () => {
				const setup = () => {
					setupSharedElementTypeSelectionMock();

					const cardId = "cardId";

					const addElementMock = vi.fn();
					const elementType = ContentElementType.CollaborativeTextEditor;

					const showCustomNotifierMock = vi.fn();
					const mockedBoardNotifierCalls = createMock<
						ReturnType<typeof useBoardNotifier>
					>({
						showCustomNotifier: showCustomNotifierMock,
					});
					mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

					return {
						addElementMock,
						elementType,
						showCustomNotifierMock,
						cardId,
					};
				};

				it("should show Notification", async () => {
					const i18nKeyCollaborativeTextEditor =
						"components.cardElement.collaborativeTextEditorElement.alert.info.visible";

					const {
						addElementMock,
						elementType,
						showCustomNotifierMock,
						cardId,
					} = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);

					expect(showCustomNotifierMock).toHaveBeenCalledWith(
						i18nKeyCollaborativeTextEditor,
						"info"
					);
				});
			});

			describe("when element type is NOT CollaborativeTextEditor or Whiteboard", () => {
				const setup = () => {
					setupSharedElementTypeSelectionMock();

					const cardId = "cardId";

					const addElementMock = vi.fn();
					const elementType = ContentElementType.RichText;

					const showCustomNotifierMock = vi.fn();
					const mockedBoardNotifierCalls = createMock<
						ReturnType<typeof useBoardNotifier>
					>({
						showCustomNotifier: showCustomNotifierMock,
					});
					mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

					return {
						addElementMock,
						elementType,
						showCustomNotifierMock,
						cardId,
					};
				};

				it("should NOT show Notification", async () => {
					const {
						addElementMock,
						elementType,
						showCustomNotifierMock,
						cardId,
					} = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);

					expect(showCustomNotifierMock).toBeCalledTimes(0);
				});
			});

			describe("when element type is Whiteboard", () => {
				it("should show Notification", async () => {
					const i18nKeyWhiteboard =
						"components.cardElement.notification.visibleAndEditable";
					const addElementMock = vi.fn();
					const elementType = ContentElementType.Drawing;
					const { showCustomNotifierMock, cardId } = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);

					expect(showCustomNotifierMock).toHaveBeenCalledWith(
						i18nKeyWhiteboard,
						"info"
					);
				});
			});
		});
		describe("when addElement returns error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = vi.fn().mockRejectedValueOnce(error);

				const showCustomNotifierMock = vi.fn();
				const mockedBoardNotifierCalls = createMock<
					ReturnType<typeof useBoardNotifier>
				>({
					showCustomNotifier: showCustomNotifierMock,
				});
				mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

				setupSharedElementTypeSelectionMock();

				const elementType = ContentElementType.RichText;

				return { addElementMock, error, elementType };
			};

			it("should return error", async () => {
				const { addElementMock, elementType, error } = setup();

				const { onElementClick } = useAddElementDialog(
					addElementMock,
					"cardId"
				);

				await expect(onElementClick(elementType)).rejects.toThrowError(error);
			});
		});
	});

	describe("askType", () => {
		it("should set isDialogOpen to true", () => {
			const addElementMock = vi.fn();
			const { isDialogOpen } = setupSharedElementTypeSelectionMock();
			const { askType } = useAddElementDialog(addElementMock, "cardId");

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
			const cardId = "cardId";
			const addElementMock = vi.fn();
			const closeDialogMock = vi.fn();
			const { elementTypeOptions } = setupSharedElementTypeSelectionMock({
				closeDialogMock,
			});

			const showCustomNotifierMock = vi.fn();
			const mockedBoardNotifierCalls = createMock<
				ReturnType<typeof useBoardNotifier>
			>({
				showCustomNotifier: showCustomNotifierMock,
			});
			mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

			mockedInjectStrict.mockImplementation(() => {
				return {
					getEnv: env,
				};
			});

			return { elementTypeOptions, addElementMock, closeDialogMock, cardId };
		};

		describe("when the RichTextElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[0].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith({
					type: ContentElementType.RichText,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);
				askType();

				const action = elementTypeOptions.value[0].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the FileElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[1].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith({
					type: ContentElementType.File,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[1].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the SubmissionElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);
				askType();

				const action = elementTypeOptions.value[2].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith({
					type: ContentElementType.SubmissionContainer,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);
				askType();

				const action = elementTypeOptions.value[2].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});

		describe("when the ExternalTool action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[3].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith({
					type: ContentElementType.ExternalTool,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[3].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
		describe("when the DrawingElement action is called", () => {
			it("should call drawing element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith({
					type: ContentElementType.Drawing,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
		describe("when the CollaborativeTextEditorElement action is called", () => {
			it("should call collaborative text editor element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[5].action;
				action();

				expect(addElementMock).toBeCalledTimes(1);
				expect(addElementMock).toBeCalledWith({
					type: ContentElementType.CollaborativeTextEditor,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(closeDialogMock).toBeCalledTimes(1);
			});
		});
	});
});
