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

	it("should set the page title correctly", () => {
		setupWrapper();

		expect(document.title).toBe(
			"pages.folder.untitled - pages.folder.title - Test Title"
		);
	});
});
