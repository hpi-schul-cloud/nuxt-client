import { ContentElementType } from "@/serverApi/v3";
import { ConfigResponse } from "@/serverApi/v3/api";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { injectStrict } from "@/utils/inject";
import {
	envsFactory,
	mockedPiniaStoreTyping,
	ObjectIdMock,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useBoardFeatures, useCardStore } from "@data-board";
import { createMock } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier, useSharedLastCreatedElement } from "@util-board";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import { useAddElementDialog } from "./AddElementDialog.composable";
import { ElementTypeSelectionOptions } from "./SharedElementTypeSelection.composable";

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
		getEnv: envsFactory.build({
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: false,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: false,
			FEATURE_TLDRAW_ENABLED: false,
			FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: false,
			FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: false,
			FEATURE_COLUMN_BOARD_H5P_ENABLED: false,
		}),
	};
});

describe("ElementTypeSelection Composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());

		setupStores({
			envConfigModule: EnvConfigModule,
			notifierModule: NotifierModule,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("onElementClick", () => {
		describe("when element is created successfully", () => {
			const setup = () => {
				const cardId = "cardId";

				setupSharedElementTypeSelectionMock();

				const addElementMock = jest.fn();
				const elementType = ContentElementType.RichText;

				const mockedBoardNotifierCalls =
					createMock<ReturnType<typeof useBoardNotifier>>();
				mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

				return {
					addElementMock,
					elementType,
					cardId,
					mockedBoardNotifierCalls,
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

					const mockedBoardNotifierCalls =
						createMock<ReturnType<typeof useBoardNotifier>>();
					mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

					return {
						addElementMock,
						elementType,
						mockedBoardNotifierCalls,
						cardId,
					};
				};

				it("should show Notification", async () => {
					const i18nKeyCollaborativeTextEditor =
						"components.cardElement.collaborativeTextEditorElement.alert.info.visible";

					const {
						addElementMock,
						elementType,
						mockedBoardNotifierCalls,
						cardId,
					} = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);

					expect(
						mockedBoardNotifierCalls.showCustomNotifier
					).toHaveBeenCalledWith(i18nKeyCollaborativeTextEditor, "info");
				});
			});

			describe("when element type is NOT CollaborativeTextEditor or Whiteboard", () => {
				const setup = () => {
					setupSharedElementTypeSelectionMock();

					const cardId = "cardId";

					const addElementMock = jest.fn();
					const elementType = ContentElementType.RichText;

					const mockedBoardNotifierCalls =
						createMock<ReturnType<typeof useBoardNotifier>>();
					mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

					return {
						addElementMock,
						elementType,
						mockedBoardNotifierCalls,
						cardId,
					};
				};

				it("should NOT show Notification", async () => {
					const {
						addElementMock,
						elementType,
						mockedBoardNotifierCalls,
						cardId,
					} = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);

					expect(
						mockedBoardNotifierCalls.showCustomNotifier
					).toHaveBeenCalledTimes(0);
				});
			});

			describe("when element type is Whiteboard", () => {
				it("should show Notification", async () => {
					const i18nKeyWhiteboard =
						"components.cardElement.notification.visibleAndEditable";
					const addElementMock = jest.fn();
					const elementType = ContentElementType.Drawing;
					const { mockedBoardNotifierCalls, cardId } = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);

					expect(
						mockedBoardNotifierCalls.showCustomNotifier
					).toHaveBeenCalledWith(i18nKeyWhiteboard, "info");
				});
			});
		});
		describe("when addElement returns error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = jest.fn().mockRejectedValueOnce(error);

				const mockedBoardNotifierCalls =
					createMock<ReturnType<typeof useBoardNotifier>>();
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
		const setup = () => {
			const addElementMock = jest.fn();
			const {
				isDialogOpen,
				isDialogLoading,
				staticElementTypeOptions,
				dynamicElementTypeOptions,
			} = setupSharedElementTypeSelectionMock();

			mockedInjectStrict.mockImplementation(() => {
				return {
					getEnv: {
						FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
						FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
						FEATURE_TLDRAW_ENABLED: true,
						FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: true,
						FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
						FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: true,
						FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
						FEATURE_COLUMN_BOARD_H5P_ENABLED: true,
					},
				};
			});

			const { askType } = useAddElementDialog(addElementMock, "cardId");

			return {
				askType,
				isDialogOpen,
				isDialogLoading,
				staticElementTypeOptions,
				dynamicElementTypeOptions,
			};
		};

		it("should set isDialogOpen to true", () => {
			const { askType, isDialogOpen } = setup();

			askType();

			expect(isDialogOpen.value).toBe(true);
		});

		it("should set staticElementTypeOptions", () => {
			const { askType, staticElementTypeOptions } = setup();

			askType();

			expect(staticElementTypeOptions.value.length).toBe(9);
		});

		describe("when preferred tools have finished loading", () => {
			const preferredToolsSetup = () => {
				const { askType, isDialogLoading, dynamicElementTypeOptions } = setup();

				const mockedBoardNotifierCalls =
					createMock<ReturnType<typeof useBoardNotifier>>();
				mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

				const cardStore = mockedPiniaStoreTyping(useCardStore);

				cardStore.isPreferredToolsLoading = false;
				cardStore.preferredTools = [
					{
						schoolExternalToolId: ObjectIdMock(),
						name: "test-tool-name-1",
						iconName: "test-tool-icon-1",
					},
					{
						schoolExternalToolId: ObjectIdMock(),
						name: "test-tool-name-2",
						iconName: "test-tool-icon-2",
					},
				];

				const expectedDynamicOptions: ElementTypeSelectionOptions[] = [
					{
						icon: "$test-tool-icon-1",
						label: "test-tool-name-1",
						action: expect.any(Function),
						testId: "create-element-preferred-element-test-tool-name-1",
					},
					{
						icon: "$test-tool-icon-2",
						label: "test-tool-name-2",
						action: expect.any(Function),
						testId: "create-element-preferred-element-test-tool-name-2",
					},
				];

				return {
					askType,
					isDialogLoading,
					dynamicElementTypeOptions,
					expectedDynamicOptions,
				};
			};

			it("should set dynamicElementTypeOptions", () => {
				const { askType, dynamicElementTypeOptions, expectedDynamicOptions } =
					preferredToolsSetup();

				askType();

				expect(dynamicElementTypeOptions.value).toEqual(
					expect.arrayContaining(expectedDynamicOptions)
				);
			});

			it("should set isDialogLoading to false", () => {
				const { askType, isDialogLoading } = preferredToolsSetup();

				askType();

				expect(isDialogLoading.value).toBe(false);
			});
		});

		describe("when preferred tools are still loading", () => {
			const preferredToolsSetup = () => {
				const { askType, isDialogLoading, dynamicElementTypeOptions } = setup();

				const mockedBoardNotifierCalls =
					createMock<ReturnType<typeof useBoardNotifier>>();
				mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

				const cardStore = mockedPiniaStoreTyping(useCardStore);

				cardStore.isPreferredToolsLoading = true;
				cardStore.preferredTools = [];

				return {
					askType,
					isDialogLoading,
					dynamicElementTypeOptions,
				};
			};

			it("should set dynamicElementTypeOptions to be empty", () => {
				const { askType, dynamicElementTypeOptions } = preferredToolsSetup();

				askType();

				expect(dynamicElementTypeOptions.value.length).toBe(0);
			});

			it("should set isDialogLoading to true", () => {
				const { askType, isDialogLoading } = preferredToolsSetup();

				askType();

				expect(isDialogLoading.value).toBe(true);
			});
		});
	});

	describe("staticElementTypeOptions actions", () => {
		const setup = (
			env: Partial<ConfigResponse> = {
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				FEATURE_TLDRAW_ENABLED: true,
				FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: true,
				FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
				FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: true,
				FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
				FEATURE_COLUMN_BOARD_H5P_ENABLED: true,
			}
		) => {
			const cardId = "cardId";
			const addElementMock = jest.fn();
			const closeDialogMock = jest.fn();
			const { staticElementTypeOptions } = setupSharedElementTypeSelectionMock({
				closeDialogMock,
			});

			const mockedBoardNotifierCalls =
				createMock<ReturnType<typeof useBoardNotifier>>();
			mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

			mockedPiniaStoreTyping(useCardStore);

			mockedInjectStrict.mockImplementation(() => {
				return {
					getEnv: env,
				};
			});

			return {
				elementTypeOptions: staticElementTypeOptions,
				addElementMock,
				closeDialogMock,
				cardId,
			};
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

				const action = elementTypeOptions.value[6].action;
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

				const action = elementTypeOptions.value[6].action;
				action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the FileFolderElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();
				const action = elementTypeOptions.value[7].action;
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

				const action = elementTypeOptions.value[7].action;
				action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the H5pElement action is called", () => {
			it("should call add element function with right argument", async () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();
				const action = elementTypeOptions.value[8].action;
				action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.H5p,
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

	describe("dynamicElementTypeOptions actions", () => {
		describe("when the PreferredToolsElement action is called", () => {
			const setup = (
				env: Partial<ConfigResponse> = {
					FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
				}
			) => {
				const cardId = "cardId";
				const closeDialogMock = jest.fn();
				const { dynamicElementTypeOptions } =
					setupSharedElementTypeSelectionMock({
						closeDialogMock,
					});

				const mockedBoardNotifierCalls =
					createMock<ReturnType<typeof useBoardNotifier>>();
				mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

				const preferredTool = {
					schoolExternalToolId: ObjectIdMock(),
					name: "test-tool-name-1",
					iconName: "test-tool-icon-1",
				};

				const cardStore = mockedPiniaStoreTyping(useCardStore);
				cardStore.preferredTools = [preferredTool];

				mockedInjectStrict.mockImplementation(() => {
					return {
						getEnv: env,
					};
				});

				const { askType } = useAddElementDialog(jest.fn(), cardId);

				return {
					elementTypeOptions: dynamicElementTypeOptions,
					cardId,
					askType,
					cardStore,
					preferredTool,
					closeDialogMock,
					mockedBoardNotifierCalls,
				};
			};

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, askType, closeDialogMock } = setup();

				askType();

				const action = elementTypeOptions.value[0].action;
				await action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});

			it("should call add element function with right argument", async () => {
				const {
					elementTypeOptions,
					cardId,
					askType,
					cardStore,
					preferredTool,
				} = setup();

				askType();

				const action = elementTypeOptions.value[0].action;
				await action();

				expect(cardStore.createPreferredElement).toHaveBeenCalledWith(
					{
						cardId,
						type: ContentElementType.ExternalTool,
					},
					preferredTool
				);
			});
		});
	});

	describe("when preferred tools in card store is updated", () => {
		const setup = (
			env: Partial<ConfigResponse> = {
				FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
			}
		) => {
			const cardId = "cardId";
			const closeDialogMock = jest.fn();
			const { dynamicElementTypeOptions, isDialogLoading } =
				setupSharedElementTypeSelectionMock({
					closeDialogMock,
				});

			const mockedBoardNotifierCalls =
				createMock<ReturnType<typeof useBoardNotifier>>();
			mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

			const cardStore = mockedPiniaStoreTyping(useCardStore);
			cardStore.preferredTools = [];

			mockedInjectStrict.mockImplementation(() => {
				return {
					getEnv: env,
				};
			});

			useAddElementDialog(jest.fn(), cardId);

			return {
				dynamicElementTypeOptions,
				cardStore,
				isDialogLoading,
			};
		};

		it("should update dynamicElementTypeOptions", async () => {
			const { dynamicElementTypeOptions, cardStore } = setup();

			const preferredTool = {
				schoolExternalToolId: ObjectIdMock(),
				name: "test-tool-name-1",
				iconName: "test-tool-icon-1",
			};
			cardStore.preferredTools = [preferredTool];
			await flushPromises();

			expect(dynamicElementTypeOptions.value).toEqual([
				{
					icon: `$${preferredTool.iconName}`,
					label: preferredTool.name,
					action: expect.any(Function),
					testId: `create-element-preferred-element-${preferredTool.name}`,
				},
			]);
		});

		it("should set isDialogLoading to false", async () => {
			const { cardStore, isDialogLoading } = setup();

			cardStore.preferredTools = [
				{
					schoolExternalToolId: ObjectIdMock(),
					name: "test-tool-name-1",
					iconName: "test-tool-icon-1",
				},
			];
			await flushPromises();

			expect(isDialogLoading.value).toBe(false);
		});
	});
});
