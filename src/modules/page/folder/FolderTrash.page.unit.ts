import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { FolderTrash } from "@feature-folder";
import { FolderTrashPage } from "@page-folder";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("FolderTrashPage", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setupWrapper = () => {
		const wrapper = shallowMount(FolderTrashPage, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
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
		it("should update the page title with the new folder name", () => {
			const { wrapper } = setupWrapper();
			const folderTrashComponent = wrapper.findComponent(FolderTrash);

			folderTrashComponent.vm.$emit("update:folder-name", "My Folder - Papierkorb");

			expect(document.title).toEqual("My Folder - Papierkorb");
		});
	});
});
