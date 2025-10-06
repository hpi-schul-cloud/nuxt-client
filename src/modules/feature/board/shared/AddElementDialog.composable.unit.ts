import { ContentElementType } from "@/serverApi/v3";
import { ConfigResponse } from "@/serverApi/v3/api";
import { injectStrict } from "@/utils/inject";
import {
	createTestEnvStore,
	expectNotification,
	mockedPiniaStoreTyping,
	ObjectIdMock,
} from "@@/tests/test-utils";
import {
	useBoardFeatures,
	useBoardPermissions,
	useCardStore,
} from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { useSharedLastCreatedElement } from "@util-board";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { setupSharedElementTypeSelectionMock } from "../test-utils/sharedElementTypeSelectionMock";
import { useAddElementDialog } from "./AddElementDialog.composable";
import { ElementTypeSelectionOptions } from "./SharedElementTypeSelection.composable";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import { useNotificationStore } from "@data-app";

vi.mock("vue-router");
vi.mock("./SharedElementTypeSelection.composable");

vi.mock("@data-board/BoardPermissions.composable");
const mockedUseBoardPermissions = vi.mocked(useBoardPermissions);
mockedUseBoardPermissions.mockReturnValue({
	...defaultPermissions,
});

vi.mock("@/utils/inject");
const mockedInjectStrict = vi.mocked(injectStrict);

const translationMap: Record<string, string> = {};

vi.mock("vue-i18n", () => {
	return {
		useI18n: vi.fn().mockReturnValue({
			t: (key: string) => key,
			tc: (key: string) => key,
			te: (key: string) => translationMap[key] !== undefined,
		}),
	};
});

vi.mock("@util-board/LastCreatedElement.composable");
vi.mocked(useSharedLastCreatedElement).mockImplementation(() => {
	return {
		lastCreatedElementId: ref(undefined),
		resetLastCreatedElementId: vi.fn(),
	};
});

vi.mock("@data-board/BoardFeatures.composable");
vi.mocked(useBoardFeatures).mockImplementation(() => {
	return {
		isFeatureEnabled: vi.fn().mockReturnValue(true),
	};
});

describe("ElementTypeSelection Composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("onElementClick", () => {
		describe("when element is created successfully", () => {
			const setup = () => {
				const cardId = "cardId";

				setupSharedElementTypeSelectionMock();

				const addElementMock = vi.fn();
				const elementType = ContentElementType.RichText;

				return {
					addElementMock,
					elementType,
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

					const addElementMock = vi.fn();
					const elementType = ContentElementType.CollaborativeTextEditor;

					return {
						addElementMock,
						elementType,
						cardId,
					};
				};

				it("should show Notification", async () => {
					const { addElementMock, elementType, cardId } = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);
					expectNotification("info");
				});
			});

			describe("when element type is NOT CollaborativeTextEditor or Whiteboard", () => {
				const setup = () => {
					setupSharedElementTypeSelectionMock();

					const cardId = "cardId";

					const addElementMock = vi.fn();
					const elementType = ContentElementType.RichText;

					return {
						addElementMock,
						elementType,
						cardId,
					};
				};

				it("should NOT show Notification", async () => {
					const { addElementMock, elementType, cardId } = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);
					expect(useNotificationStore().notify).not.toHaveBeenCalled();
				});
			});

			describe("when element type is Whiteboard", () => {
				it("should show Notification", async () => {
					const addElementMock = vi.fn();
					const elementType = ContentElementType.Drawing;
					const { cardId } = setup();

					const { onElementClick } = useAddElementDialog(
						addElementMock,
						cardId
					);

					await onElementClick(elementType);
					expectNotification("info");
				});
			});
		});
		describe("when addElement returns error", () => {
			const setup = () => {
				const error = new Error("Test error");
				const addElementMock = vi.fn().mockRejectedValueOnce(error);

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
			const addElementMock = vi.fn();
			const {
				isDialogOpen,
				isDialogLoading,
				staticElementTypeOptions,
				dynamicElementTypeOptions,
			} = setupSharedElementTypeSelectionMock();

			createTestEnvStore({
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				FEATURE_TLDRAW_ENABLED: true,
				FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: true,
				FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
				FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: true,
				FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
				FEATURE_COLUMN_BOARD_H5P_ENABLED: true,
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

		it("should set staticElementTypeOptions with all permissions true", () => {
			const { askType, staticElementTypeOptions } = setup();

			askType();

			expect(staticElementTypeOptions.value.length).toBe(9);
		});

		describe("when preferred tools have finished loading", () => {
			const preferredToolsSetup = () => {
				const { askType, isDialogLoading, dynamicElementTypeOptions } = setup();

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
		const defaultEnv: Partial<ConfigResponse> = {
			FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
			FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
			FEATURE_TLDRAW_ENABLED: true,
			FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: true,
			FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
			FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: true,
			FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
			FEATURE_COLUMN_BOARD_H5P_ENABLED: true,
		};

		const defaultHasManageVideoConferencePermission = false;

		const setup = (options?: {
			env?: Partial<ConfigResponse>;
			hasManageVideoConferencePermission?: boolean;
		}) => {
			const mergedEnv = { ...defaultEnv, ...options?.env };
			const hasManageVideoConferencePermission =
				options?.hasManageVideoConferencePermission ??
				defaultHasManageVideoConferencePermission;

			const cardId = "cardId";
			const addElementMock = vi.fn();
			const closeDialogMock = vi.fn();
			const { staticElementTypeOptions } = setupSharedElementTypeSelectionMock({
				closeDialogMock,
			});

			mockedUseBoardPermissions.mockReturnValue({
				hasManageVideoConferencePermission: ref(
					hasManageVideoConferencePermission
				),
			} as BoardPermissionChecks);

			mockedPiniaStoreTyping(useCardStore);

			mockedInjectStrict.mockImplementation(() => {
				return {
					getEnv: mergedEnv,
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
			it("should call add element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-text"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.RichText,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-text"
				);
				option?.action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the FileElement action is called", () => {
			it("should call add element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-file"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.File,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-file"
				);
				option?.action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the SubmissionElement action is called", () => {
			it("should call add element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-submission-container"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.SubmissionContainer,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-submission-container"
				);
				option?.action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the ExternalTool action is called", () => {
			it("should call add element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-external-tool-container"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.ExternalTool,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-external-tool-container"
				);
				option?.action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the DrawingElement action is called", () => {
			it("should call drawing element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-drawing-element"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.Drawing,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-drawing-element"
				);
				option?.action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the CollaborativeTextEditorElement action is called", () => {
			it("should call collaborative text editor element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-collaborative-text-editor"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.CollaborativeTextEditor,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-collaborative-text-editor"
				);
				option?.action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("VideoConference action", () => {
			describe("when permission for VideoConference is granted", () => {
				it("should call video conference element function with right argument", () => {
					const { elementTypeOptions, addElementMock, cardId } = setup({
						hasManageVideoConferencePermission: true,
					});
					const { askType } = useAddElementDialog(addElementMock, cardId);

					askType();

					const option = elementTypeOptions.value.find(
						(opt) => opt.testId === "create-element-video-conference"
					);
					option?.action();

					expect(addElementMock).toHaveBeenCalledTimes(1);
					expect(addElementMock).toHaveBeenCalledWith({
						type: ContentElementType.VideoConference,
						cardId,
					});
				});

				it("should set isDialogOpen to false", () => {
					const {
						elementTypeOptions,
						addElementMock,
						closeDialogMock,
						cardId,
					} = setup({
						hasManageVideoConferencePermission: true,
					});
					const { askType } = useAddElementDialog(addElementMock, cardId);

					askType();

					const option = elementTypeOptions.value.find(
						(opt) => opt.testId === "create-element-video-conference"
					);
					option?.action();

					expect(closeDialogMock).toHaveBeenCalledTimes(1);
				});
			});

			describe("when permission for VideoConference is NOT granted", () => {
				it("should NOT include VideoConference option if permission is false", () => {
					const { elementTypeOptions, addElementMock, cardId } = setup();
					const { askType } = useAddElementDialog(addElementMock, cardId);

					askType();

					const option = elementTypeOptions.value.find(
						(opt) => opt.testId === "create-element-video-conference"
					);
					expect(option).toBeUndefined();
				});
			});
		});

		describe("when the FileFolderElement action is called", () => {
			it("should call add element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-file-folder"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.FileFolder,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-file-folder"
				);
				option?.action();

				expect(closeDialogMock).toHaveBeenCalledTimes(1);
			});
		});

		describe("when the H5pElement action is called", () => {
			it("should call add element function with right argument", () => {
				const { elementTypeOptions, addElementMock, cardId } = setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-h5p"
				);
				option?.action();

				expect(addElementMock).toHaveBeenCalledTimes(1);
				expect(addElementMock).toHaveBeenCalledWith({
					type: ContentElementType.H5p,
					cardId,
				});
			});

			it("should set isDialogOpen to false", () => {
				const { elementTypeOptions, addElementMock, closeDialogMock, cardId } =
					setup();
				const { askType } = useAddElementDialog(addElementMock, cardId);

				askType();

				const option = elementTypeOptions.value.find(
					(opt) => opt.testId === "create-element-h5p"
				);
				option?.action();

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
				const closeDialogMock = vi.fn();
				const { dynamicElementTypeOptions } =
					setupSharedElementTypeSelectionMock({
						closeDialogMock,
					});

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

				const { askType } = useAddElementDialog(vi.fn(), cardId);

				return {
					elementTypeOptions: dynamicElementTypeOptions,
					cardId,
					askType,
					cardStore,
					preferredTool,
					closeDialogMock,
				};
			};

			it("should set isDialogOpen to false", async () => {
				const { elementTypeOptions, askType, closeDialogMock, preferredTool } =
					setup();

				askType();

				const option = elementTypeOptions.value.find(
					(opt) =>
						opt.testId ===
						`create-element-preferred-element-${preferredTool.name}`
				);
				await option?.action();

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

				const option = elementTypeOptions.value.find(
					(opt) =>
						opt.testId ===
						`create-element-preferred-element-${preferredTool.name}`
				);
				await option?.action();

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
			envConfig: Partial<ConfigResponse> = {
				FEATURE_PREFERRED_CTL_TOOLS_ENABLED: true,
			}
		) => {
			const cardId = "cardId";
			const closeDialogMock = vi.fn();
			const { dynamicElementTypeOptions, isDialogLoading } =
				setupSharedElementTypeSelectionMock({
					closeDialogMock,
				});

			const cardStore = mockedPiniaStoreTyping(useCardStore);
			cardStore.preferredTools = [];

			createTestEnvStore(envConfig);

			useAddElementDialog(vi.fn(), cardId);

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
