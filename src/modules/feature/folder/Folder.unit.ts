import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as FolderState from "@data-folder";
import { Folder } from "@feature-folder";
import { createMock } from "@golevelup/ts-jest";
import { ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

describe("Folder.vue", () => {
	const setupWrapper = () => {
		const wrapper = mount(Folder, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				folderId: "123",
			},
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		const setup = () => {
			const folderState = createMock<
				ReturnType<typeof FolderState.useFolderState>
			>({});
			jest.spyOn(FolderState, "useFolderState").mockReturnValue(folderState);

			const { wrapper } = setupWrapper();

			return { folderState, wrapper };
		};

		it("should call fetchFileFolderElement with the correct folderId", async () => {
			const { folderState } = setup();

			expect(folderState.fetchFileFolderElement).toHaveBeenCalledWith("123");
		});
	});

	describe("when isLoading is true", () => {
		const setup = () => {
			const folderState = createMock<
				ReturnType<typeof FolderState.useFolderState>
			>({
				isLoading: ref(true),
			});
			jest.spyOn(FolderState, "useFolderState").mockReturnValue(folderState);

			const { wrapper } = setupWrapper();

			return { folderState, wrapper };
		};
		it("should show the loading spinner", () => {
			const { wrapper } = setup();

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(true);
		});

		it("should not show VCustomEmptyState", () => {
			const { wrapper } = setup();

			const emptyState = wrapper.findComponent({ name: "VCustomEmptyState" });
			expect(emptyState.exists()).toBe(false);
		});
	});

	describe("when isLoading is false and isEmpty is true", () => {
		const setup = () => {
			const folderState = createMock<
				ReturnType<typeof FolderState.useFolderState>
			>({
				isLoading: ref(false),
			});
			jest.spyOn(FolderState, "useFolderState").mockReturnValue(folderState);

			const { wrapper } = setupWrapper();

			return { folderState, wrapper };
		};

		it("should not show the loading spinner", () => {
			const { wrapper } = setup();

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(false);
		});

		it("should show VCustomEmptyState", () => {
			const { wrapper } = setup();

			const emptyState = wrapper.findComponent({ name: "VCustomEmptyState" });
			expect(emptyState.exists()).toBe(true);
		});
	});

	describe("when isLoading is false and isEmpty is false", () => {
		const setup = () => {
			const folderState = createMock<
				ReturnType<typeof FolderState.useFolderState>
			>({
				isLoading: ref(false),
				isEmpty: ref(false),
			});
			jest.spyOn(FolderState, "useFolderState").mockReturnValue(folderState);

			const { wrapper } = setupWrapper();

			return { folderState, wrapper };
		};

		it("should not show the loading spinner", () => {
			const { wrapper } = setup();

			const loadingSpinner = wrapper.findComponent(VSkeletonLoader);
			expect(loadingSpinner.exists()).toBe(false);
		});

		it("should not show VCustomEmptyState", () => {
			const { wrapper } = setup();

			const emptyState = wrapper.findComponent({ name: "VCustomEmptyState" });
			expect(emptyState.exists()).toBe(false);
		});

		it("should show the main content", () => {
			const { wrapper } = setup();

			const containsMainContent = wrapper
				.html()
				.includes("Mount your component here"); // Replace with actual selector
			expect(containsMainContent).toBe(true);
		});
	});

	describe("when breadcrumbs are present", () => {
		const setup = () => {
			const folderState = createMock<
				ReturnType<typeof FolderState.useFolderState>
			>({
				breadcrumbs: ref([
					{
						title: "Test Folder",
						to: "/test-folder",
					},
				]),
			});
			jest.spyOn(FolderState, "useFolderState").mockReturnValue(folderState);

			const { wrapper } = setupWrapper();

			return { folderState, wrapper };
		};

		it("should show the breadcrumbs", () => {
			const { wrapper } = setup();

			const breadcrumbItem = wrapper.html().includes("Test Folder");
			expect(breadcrumbItem).toBe(true);
		});
	});

	describe("when folderName is present", () => {
		const setup = () => {
			const folderName = "Test Folder";
			const folderState = createMock<
				ReturnType<typeof FolderState.useFolderState>
			>({
				folderName: ref(folderName),
			});
			jest.spyOn(FolderState, "useFolderState").mockReturnValue(folderState);

			const { wrapper } = setupWrapper();

			return { folderState, wrapper, folderName };
		};

		it("should show the folder name", () => {
			const { wrapper, folderName } = setup();

			const h1 = wrapper.find("h1");
			const includesFolderName = h1.text().includes(folderName);
			expect(includesFolderName).toBe(true);
		});
	});
});
