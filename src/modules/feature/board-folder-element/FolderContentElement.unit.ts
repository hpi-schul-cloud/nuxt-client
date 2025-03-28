import { ContentElementType, FileFolderElementResponse } from "@/serverApi/v3";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mdiFolderOpenOutline } from "@icons/material";
import { BoardMenu, BoardMenuScope, ContentElementBar } from "@ui-board";
import { mount } from "@vue/test-utils";
import FolderContentElement from "./FolderContentElement.vue";

jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
}));

describe("FolderContentElement", () => {
	const mockElement: FileFolderElementResponse = {
		id: "123",
		type: ContentElementType.FileFolder,
		content: {
			title: "Test Folder",
		},
		timestamps: {
			createdAt: "2024-01-01T00:00:00Z",
			lastUpdatedAt: "2024-01-01T00:00:00Z",
		},
	};

	const setupWrapper = (options: {
		isEditMode?: boolean;
		isNotFirstElement?: boolean;
		isNotLastElement?: boolean;
		element?: FileFolderElementResponse;
	}) => {
		const wrapper = mount(FolderContentElement, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				element: options.element || mockElement,
				isEditMode: options.isEditMode ?? false,
				isNotFirstElement: options.isNotFirstElement ?? false,
				isNotLastElement: options.isNotLastElement ?? false,
				columnIndex: 0,
				rowIndex: 0,
				elementIndex: 0,
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setupWrapper({});
			expect(wrapper.exists()).toBe(true);
		});

		describe("when folder title is is not empty string", () => {
			it("should render folder title", () => {
				const { wrapper } = setupWrapper({});
				const title = wrapper.find("[data-testid='board-folder-element']");
				expect(title.text()).toBe("Test Folder");
			});
		});

		describe("when folder title is empty string", () => {
			it("should render default title translation key", () => {
				const { wrapper } = setupWrapper({
					element: {
						...mockElement,
						content: {
							title: "",
						},
					},
				});
				const title = wrapper.find("[data-testid='board-folder-element']");
				expect(title.text()).toBe(
					"components.cardElement.folderElement.untitled"
				);
			});
		});

		it("should render folder icon", () => {
			const { wrapper } = setupWrapper({});
			const contentElementBar = wrapper.findComponent(ContentElementBar);
			expect(contentElementBar.props("icon")).toBe(mdiFolderOpenOutline);
		});
	});

	describe("when element is in view mode", () => {
		it("should not render menu", () => {
			const { wrapper } = setupWrapper({
				isEditMode: false,
			});

			const menu = wrapper.findComponent(BoardMenu);
			expect(menu.exists()).toBe(false);
		});
	});

	describe("when element is in edit mode", () => {
		it("should render folder element menu", () => {
			const { wrapper } = setupWrapper({
				isEditMode: true,
			});

			const menu = wrapper.findComponent(BoardMenu);
			expect(menu.exists()).toBe(true);
			expect(menu.props("scope")).toBe(BoardMenuScope.FOLDER_ELEMENT);
		});

		it("should handle keyboard navigation", async () => {
			const { wrapper } = setupWrapper({
				isEditMode: true,
			});

			await wrapper.trigger("keydown.up");
			expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");

			await wrapper.trigger("keydown.down");
			expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(2);
		});
	});
});
