import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { FolderTrash } from "@feature-folder";
import { FolderTrashPage } from "@page-folder";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, Mock, vi } from "vitest";
import { useI18n } from "vue-i18n";

vi.mock("vue-i18n");

const tMock = vi.fn().mockImplementation((key: string) => key);
(useI18n as Mock).mockReturnValue({ t: tMock });

describe("FolderTrashPage", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setupWrapper = () => {
		const wrapper = shallowMount(FolderTrashPage, {
			global: { plugins: [createTestingVuetify()] },
			props: {
				folderId: "123",
			},
		});

		return { wrapper };
	};

	it("should render the folder trash component", () => {
		const { wrapper } = setupWrapper();

		const folderTrashComponent = wrapper.findComponent(FolderTrash);

		expect(folderTrashComponent.exists()).toBe(true);
		expect(folderTrashComponent.props().folderId).toBe("123");
	});

	describe("when folder trash component emits 'update:folder-name'", () => {
		it("should call t with the correct key and folder name", () => {
			const { wrapper } = setupWrapper();
			const folderTrashComponent = wrapper.findComponent(FolderTrash);

			folderTrashComponent.vm.$emit("update:folder-name", "My Folder");

			expect(tMock).toHaveBeenCalledWith("pages.folder.trash.title", {
				folderName: "My Folder",
			});
		});
	});
});
