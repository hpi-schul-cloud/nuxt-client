import { ContentElementType } from "@/serverApi/v3";
import { FileFolderElement } from "@/types/board/ContentElement";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useContentElementState } from "@data-board";
import { createMock } from "@golevelup/ts-vitest";
import { mdiFolderOpenOutline } from "@icons/material";
import { BoardMenu, BoardMenuScope, ContentElementBar } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { flushPromises, mount } from "@vue/test-utils";
import { Router, useRouter } from "vue-router";
import FolderContentElement from "./FolderContentElement.vue";
import { Mock } from "vitest";

vi.mock("@data-board", () => ({
	useBoardFocusHandler: vi.fn(),
	useContentElementState: vi.fn(() => ({
		modelValue: { value: { title: "test" } },
	})),
}));

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

describe("FolderContentElement", () => {
	const mockElement: FileFolderElement = {
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
	const router = createMock<Router>();

	const setupWrapper = (options: {
		isEditMode?: boolean;
		isNotFirstElement?: boolean;
		isNotLastElement?: boolean;
		element?: FileFolderElement;
	}) => {
		useRouterMock.mockReturnValueOnce(router);

		const wrapper = mount(FolderContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					FileStatistic: true,
				},
			},
			props: {
				element: options.element || mockElement,
				isEditMode: options.isEditMode ?? false,
				isNotFirstElement: options.isNotFirstElement ?? false,
				isNotLastElement: options.isNotLastElement ?? false,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
			},
		});

		(useContentElementState as Mock).mockReturnValue({
			modelValue: {
				value: (options.element || mockElement).content.title || "",
			},
		});

		return { wrapper, router, mockElement };
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

		it.each(["up", "down"])(
			"should not 'emit move-keyboard:edit' when arrow key %s is pressed and element is in view mode",
			async (key) => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const folderElemet = wrapper.findComponent(
					'[data-testid="board-folder-element"]'
				);

				await folderElemet.trigger(`keydown.${key}`);

				expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
			}
		);

		describe("when contentelementbar is clicked", () => {
			it("should push folder route to router", async () => {
				const { wrapper, mockElement } = setupWrapper({
					isEditMode: false,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);
				await contentElementBar.trigger("click");

				expect(router.push).toHaveBeenCalledWith(`/folder/${mockElement.id}`);
			});
		});

		describe("when folder element title is focused and enter is pressed", () => {
			it("should push folder route to router", async () => {
				const { wrapper, mockElement } = setupWrapper({
					isEditMode: false,
				});

				const folderElement = wrapper.findComponent(ContentElementBar);
				await folderElement.trigger("keydown.enter");

				expect(router.push).toHaveBeenCalledWith(`/folder/${mockElement.id}`);
			});
		});
	});

	describe("when element is in edit mode", () => {
		describe("folder element menu", () => {
			it("should render folder element menu", () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
				});
				const menu = wrapper.findComponent(BoardMenu);

				expect(menu.exists()).toBe(true);
				expect(menu.props("scope")).toBe(BoardMenuScope.FOLDER_ELEMENT);
			});

			it("should emit 'move-down:edit' event when move down menu item is clicked", async () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
					isNotLastElement: true,
				});

				const menuButton = wrapper
					.findComponent({ name: "BoardMenu" })
					.findComponent({ name: "VBtn" });
				await menuButton.trigger("click");

				const menuItem = wrapper.findComponent(KebabMenuActionMoveDown);
				await menuItem.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("move-down:edit");
			});

			it("should emit 'move-up:edit' event when move up menu item is clicked", async () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
					isNotFirstElement: true,
				});

				const menuButton = wrapper
					.findComponent({ name: "BoardMenu" })
					.findComponent({ name: "VBtn" });
				await menuButton.trigger("click");

				const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);
				await menuItem.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("move-up:edit");
			});

			it("should emit 'delete:element' event when delete menu item is clicked", async () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
				});

				const menuButton = wrapper
					.findComponent({ name: "BoardMenu" })
					.findComponent({ name: "VBtn" });
				await menuButton.trigger("click");

				const menuItem = wrapper.findComponent(KebabMenuActionDelete);
				menuItem.vm.$emit("click", Promise.resolve(true));
				await flushPromises();

				expect(wrapper.emitted()).toHaveProperty("delete:element");
			});
		});

		it.each(["up", "down"])(
			"should 'emit move-keyboard:edit' when arrow key %s is pressed",
			async (key) => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
					isNotFirstElement: true,
					isNotLastElement: true,
				});

				const linkElement = wrapper.findComponent(
					'[data-testid="board-folder-element"]'
				);

				await linkElement.trigger(`keydown.${key}`);

				expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
			}
		);
	});
});
