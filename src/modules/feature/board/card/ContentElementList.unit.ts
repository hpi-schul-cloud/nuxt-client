import ContentElementList from "./ContentElementList.vue";
import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { CollaborativeTextEditorElement } from "@feature-board-collaborative-text-editor-element";
import { DeletedElement } from "@feature-board-deleted-element";
import { DrawingContentElement } from "@feature-board-drawing-element";
import { ExternalToolElement } from "@feature-board-external-tool-element";
import { FileContentElement } from "@feature-board-file-element";
import { FolderContentElement } from "@feature-board-folder-element";
import { H5pElement } from "@feature-board-h5p-element";
import { LinkContentElement } from "@feature-board-link-element";
import { SubmissionContentElement } from "@feature-board-submission-element";
import { RichTextContentElement } from "@feature-board-text-element";
import { VideoConferenceContentElement } from "@feature-board-video-conference-element";
import { shallowMount } from "@vue/test-utils";
import { beforeAll } from "vitest";

describe("ContentElementList", () => {
	describe("when feature flags are true", () => {
		beforeAll(() => {
			createTestEnvStore({
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
				FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
				FEATURE_COLUMN_BOARD_H5P_ENABLED: true,
				FEATURE_TEAMS_ENABLED: true,
				FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED: true,
				FEATURE_TLDRAW_ENABLED: true,
				FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED: true,
			});
		});

		const setup = (props: { elements: AnyContentElement[]; isEditMode: boolean; isDetailView: boolean }) => {
			document.body.setAttribute("data-app", "true");

			const wrapper = shallowMount(ContentElementList, {
				global: {
					plugins: [createTestingI18n(), createTestingVuetify()],
				},
				props: { ...props, rowIndex: 0, columnIndex: 0 },
			});

			return { wrapper };
		};

		describe("when component is mounted", () => {
			it("should be found in dom", () => {
				const { wrapper } = setup({
					elements: [],
					isEditMode: false,
					isDetailView: false,
				});
				expect(wrapper.findComponent(ContentElementList).exists()).toBe(true);
			});

			const elementComponents = [
				{
					elementType: ContentElementType.RichText,
					component: RichTextContentElement,
				},
				{
					elementType: ContentElementType.File,
					component: FileContentElement,
				},
				{
					elementType: ContentElementType.Link,
					component: LinkContentElement,
				},
				{
					elementType: ContentElementType.SubmissionContainer,
					component: SubmissionContentElement,
				},
				{
					elementType: ContentElementType.ExternalTool,
					component: ExternalToolElement,
				},
				{
					elementType: ContentElementType.Drawing,
					component: DrawingContentElement,
				},
				{
					elementType: ContentElementType.CollaborativeTextEditor,
					component: CollaborativeTextEditorElement,
				},
				{
					elementType: ContentElementType.Deleted,
					component: DeletedElement,
				},
				{
					elementType: ContentElementType.VideoConference,
					component: VideoConferenceContentElement,
				},
				{
					elementType: ContentElementType.FileFolder,
					component: FolderContentElement,
				},
				{
					elementType: ContentElementType.H5p,
					component: H5pElement,
				},
			];

			it.each(elementComponents)("should render $elementType-elements", ({ elementType, component }) => {
				const { wrapper } = setup({
					elements: [{ type: elementType } as AnyContentElement],
					isEditMode: false,
					isDetailView: false,
				});
				expect(wrapper.findComponent(component).exists()).toBe(true);
			});

			it.each(elementComponents)(
				"should propagate isEditMode to children of $elementType-elements",
				({ elementType, component }) => {
					const isEditModeResult = true;

					const { wrapper } = setup({
						elements: [{ type: elementType } as AnyContentElement],
						isEditMode: isEditModeResult,
						isDetailView: false,
					});

					const childComponent = wrapper.findComponent(component);

					expect(childComponent.exists()).toBe(true);
					expect(childComponent.props("isEditMode")).toBe(isEditModeResult);
				}
			);
		});
	});

	describe("when FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED is false", () => {
		beforeAll(() => {
			createTestEnvStore({
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
				FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: false,
				FEATURE_TEAMS_ENABLED: true,
			});
		});

		const setup = (props: { elements: AnyContentElement[]; isEditMode: boolean; isDetailView: boolean }) => {
			document.body.setAttribute("data-app", "true");

			const wrapper = shallowMount(ContentElementList, {
				global: {
					plugins: [createTestingI18n(), createTestingVuetify()],
				},
				props: { ...props, rowIndex: 0, columnIndex: 0 },
			});

			return { wrapper };
		};

		it("should not render FolderContentElement", () => {
			const { wrapper } = setup({
				elements: [{ type: ContentElementType.FileFolder } as AnyContentElement],
				isEditMode: false,
				isDetailView: false,
			});

			expect(wrapper.findComponent(FolderContentElement).exists()).toBe(false);
		});
	});
});
