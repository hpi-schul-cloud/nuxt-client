import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { Folder } from "@feature-folder";
import { FolderPage } from "@page-folder";

jest.mock("@/store", () => ({
	envConfigModule: {
		getEnv: { SC_TITLE: "Test Title" },
	},
}));

describe("FolderPage", () => {
	const setupWrapper = () => {
		const wrapper = shallowMount(FolderPage, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				folderId: "123",
			},
		});

		return { wrapper };
	};

	it("should render the folder component", () => {
		const { wrapper } = setupWrapper();

		const folderComponent = wrapper.findComponent(Folder);

		expect(folderComponent.exists()).toBe(true);
		expect(folderComponent.props().folderId).toBe("123");
	});

	describe("when folder component emits 'update:folder-name'", () => {
		it("should update the page title with the new folder name", async () => {
			const { wrapper } = setupWrapper();
			const folderComponent = wrapper.findComponent(Folder);

			await folderComponent.vm.$emit("update:folder-name", "Updated Folder");

			expect(document.title).toBe(
				"Updated Folder - pages.folder.title - Test Title"
			);
		});
	});
});
