import FileStatistic from "./FileStatistic.vue";
import { FolderAlert } from "./FolderAlert.enum";
import FolderContentElement from "./FolderContentElement.vue";
import { useFolderAlerts } from "./useFolderAlerts.composable";
import { ContentElementType } from "@/serverApi/v3";
import { FileFolderElement } from "@/types/board/ContentElement";
import { parentStatisticFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useContentElementState } from "@data-board";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { mdiFolderOpenOutline } from "@icons/material";
import { BoardMenu, BoardMenuScope, ContentElementBar } from "@ui-board";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { flushPromises } from "@vue/test-utils";
import { Mock } from "vitest";
import { computed } from "vue";
import { Router, RouterLink, useRouter } from "vue-router";
import { VAlert } from "vuetify/components";

vi.mock("./useFolderAlerts.composable");

vi.mock("@data-board", () => ({
	useBoardFocusHandler: vi.fn(),
	useContentElementState: vi.fn(() => ({
		modelValue: { value: { title: "test" } },
	})),
}));

vi.mock("vue-router", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-router")>();
	return {
		...actual,
		useRoute: vi.fn(),
		useRouter: vi.fn(() => ({
			push: vi.fn(),
		})),
	};
});
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

	const setupWrapper = (options: {
		isEditMode?: boolean;
		isNotFirstElement?: boolean;
		isNotLastElement?: boolean;
		element?: FileFolderElement;
		alerts?: FolderAlert[];
		fileStatistics?: ReturnType<typeof parentStatisticFactory.build>;
	}) => {
		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
		const statistic =
			options.fileStatistics ||
			parentStatisticFactory.build({
				fileCount: 3,
				totalSizeInBytes: 3000000,
			});
		const getStatisticByParentId = vi.fn(() => statistic);
		const tryGetParentStatisticFromApi = vi.fn(() => Promise.resolve());
		const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>({
			getStatisticByParentId,
			tryGetParentStatisticFromApi,
		});
		vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);

		vi.mocked(useFolderAlerts).mockReturnValue({
			addAlert: vi.fn(),
			alerts: computed(() => options.alerts || []),
		});

		const wrapper = mount(FolderContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					FileStatistic: true,
					RouterLink: true,
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

				expect(title.text()).toBe("components.cardElement.folderElement.untitled");
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

		it("should render folder element title link with correct props", async () => {
			const { wrapper, mockElement } = setupWrapper({
				isEditMode: false,
			});

			const link = wrapper.getComponent(RouterLink);
			expect(link.props("to")).toBe(`/folder/${mockElement.id}`);
			expect(link.attributes("aria-label")).toBe(`components.cardElement.folderElement ${mockElement.content.title}`);
		});

		it.each(["up", "down"])(
			"should not 'emit move-keyboard:edit' when arrow key %s is pressed and element is in view mode",
			async (key) => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const folderElement = wrapper.findComponent('[data-testid="board-folder-element"]');

				await folderElement.trigger(`keydown.${key}`);

				expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
			}
		);

		describe("when contentelementbar is clicked", () => {
			it("should push folder route to router", async () => {
				const { wrapper, mockElement, router } = setupWrapper({
					isEditMode: false,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);
				await contentElementBar.trigger("click");

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

				const menuButton = wrapper.findComponent({ name: "BoardMenu" }).findComponent({ name: "VBtn" });
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

				const menuButton = wrapper.findComponent({ name: "BoardMenu" }).findComponent({ name: "VBtn" });
				await menuButton.trigger("click");

				const menuItem = wrapper.findComponent(KebabMenuActionMoveUp);
				await menuItem.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("move-up:edit");
			});

			it("should emit 'delete:element' event when delete menu item is clicked", async () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
				});

				const menuButton = wrapper.findComponent({ name: "BoardMenu" }).findComponent({ name: "VBtn" });
				await menuButton.trigger("click");

				const menuItem = wrapper.findComponent(KebabMenuActionDelete);
				menuItem.vm.$emit("click", Promise.resolve(true));
				await flushPromises();

				expect(wrapper.emitted()).toHaveProperty("delete:element");
			});
		});

		it.each(["up", "down"])("should 'emit move-keyboard:edit' when arrow key %s is pressed", async (key) => {
			const { wrapper } = setupWrapper({
				isEditMode: true,
				isNotFirstElement: true,
				isNotLastElement: true,
			});

			const linkElement = wrapper.findComponent('[data-testid="board-folder-element"]');

			await linkElement.trigger(`keydown.${key}`);

			expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
		});
	});

	describe("when file statistics are available", () => {
		it("should show file statistics", async () => {
			const { wrapper } = setupWrapper({
				isEditMode: true,
			});

			const fileStatistic = wrapper.findComponent(FileStatistic);
			expect(fileStatistic.exists()).toBe(true);
		});

		it("should fetch file statistics from API", async () => {
			setupWrapper({
				isEditMode: true,
			});

			await flushPromises();

			const fileStorageApi = FileStorageApi.useFileStorageApi();
			expect(fileStorageApi.tryGetParentStatisticFromApi).toHaveBeenCalledWith("123", "boardnodes");
		});
	});

	describe("download button", () => {
		const downloadButtonTestId = '[data-testid="board-folder-element-download-button"]';
		describe("when file folder is not empty", () => {
			it("should show download button in edit mode", () => {
				const { wrapper } = setupWrapper({
					isEditMode: true,
				});

				const downloadButton = wrapper.findComponent(downloadButtonTestId);

				expect(downloadButton.exists()).toBe(true);
			});
			it("should show download button in view mode", () => {
				const { wrapper } = setupWrapper({
					isEditMode: false,
				});

				const downloadButton = wrapper.findComponent(downloadButtonTestId);

				expect(downloadButton.exists()).toBe(true);
			});
		});

		describe("when file folder is empty", () => {
			it("should show download button as disabled", () => {
				const fileStatistics = parentStatisticFactory.build({
					fileCount: 0,
					totalSizeInBytes: 0,
				});
				const { wrapper } = setupWrapper({
					isEditMode: true,
					fileStatistics,
				});

				const downloadButton = wrapper.findComponent(downloadButtonTestId);

				expect(downloadButton.attributes("disabled")).toBeDefined();
			});
		});
	});

	describe("when file statistics are not available", () => {
		it("should show an alert", async () => {
			const { wrapper } = setupWrapper({
				isEditMode: true,
				alerts: [FolderAlert.FILE_STORAGE_ERROR],
			});

			const alert = wrapper.findComponent(VAlert);
			expect(alert.exists()).toBe(true);
			expect(alert.text()).toContain("components.cardElement.folderElement.storage.error");
		});
	});
});
