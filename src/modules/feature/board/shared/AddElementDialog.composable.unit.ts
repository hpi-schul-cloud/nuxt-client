import { ContentElementType } from "@/serverApi/v3";
import { ConfigResponse } from "@/serverApi/v3/api";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { injectStrict } from "@/utils/inject";
import { mockedPiniaStoreTyping, ObjectIdMock } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useBoardFeatures, useCardStore } from "@data-board";
import { createMock } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import { useAddElementDialog } from "./AddElementDialog.composable";

setupStores({ notifierModule: NotifierModule });

jest.mock("./SharedElementTypeSelection.composable");

jest.mock("@/utils/inject");
const mockedInjectStrict = jest.mocked(injectStrict);

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

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@util-board/LastCreatedElement.composable");
jest.mocked(useSharedLastCreatedElement).mockImplementation(() => {
	return {
		lastCreatedElementId: ref(undefined),
		resetLastCreatedElementId: jest.fn(),
	};
});

jest.mock("@data-board/BoardFeatures.composable");
jest.mocked(useBoardFeatures).mockImplementation(() => {
	return {
		isFeatureEnabled: jest.fn().mockReturnValue(true),
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
			FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: false,
		},
	};
});

describe("ElementTypeSelection Composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());

		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	describe("onElementClick", () => {
		describe("when element is created successfully", () => {
			const setup = () => {
				const cardId = "cardId";

				setupSharedElementTypeSelectionMock();

				const addElementMock = jest.fn();
				const elementType = ContentElementType.RichText;

				const showCustomNotifierMock = jest.fn();
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
				expect(addElementMock).toHaveBeenCalledWith({
					type: elementType,
					cardId,
				});
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

					const addElementMock = jest.fn();
					const elementType = ContentElementType.CollaborativeTextEditor;

					const showCustomNotifierMock = jest.fn();
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

					const addElementMock = jest.fn();
					const elementType = ContentElementType.RichText;

					const showCustomNotifierMock = jest.fn();
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

					expect(showCustomNotifierMock).toHaveBeenCalledTimes(0);
				});
			});

			describe("when element type is Whiteboard", () => {
				it("should show Notification", async () => {
					const i18nKeyWhiteboard =
						"components.cardElement.notification.visibleAndEditable";
					const addElementMock = jest.fn();
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
				const addElementMock = jest.fn().mockRejectedValueOnce(error);

				const showCustomNotifierMock = jest.fn();
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
			const addElementMock = jest.fn();
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
				FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
				FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: true,
				FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
			}
		) => {
			const cardId = "cardId";
			const cardStore = mockedPiniaStoreTyping(useCardStore);
			const addElementMock = jest.fn();
			const closeDialogMock = jest.fn();
			const { elementTypeOptions } = setupSharedElementTypeSelectionMock({
				closeDialogMock,
			});

			const preferredTools = [
				{
					name: "mock tool",
					iconName: "mdiMock",
					schoolExternalToolId: ObjectIdMock(),
				},
			];

			cardStore.getPreferredTools.mockReturnValue(preferredTools);

			const showCustomNotifierMock = jest.fn();
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

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
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

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the FileElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[1].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
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

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the SubmissionElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);
				askType();

				const action = elementTypeOptions.value[2].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
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

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the ExternalTool action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[3].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
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

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});
		describe("when the DrawingElement action is called", () => {
			it("should call drawing element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[4].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
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

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});
		describe("when the CollaborativeTextEditorElement action is called", () => {
			it("should call collaborative text editor element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[5].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.CollaborativeTextEditor,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[5].action;
				action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});
		describe("when the VideoConference action is called", () => {
			it("should call video conference element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[7].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.VideoConference,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[7].action;
				action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});
		describe("when the FileFolderElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();
				console.log(elementTypeOptions);
				const action = elementTypeOptions.value[8].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.FileFolder,
					cardId,
				});
			});

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const action = elementTypeOptions.value[8].action;
				action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});
	});
});
