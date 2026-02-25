import CollaboraPage from "./Collabora.page.vue";
import * as serverApi from "@/serverApi/v3/api";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	fileElementResponseFactory,
	fileRecordFactory,
	ObjectIdMock,
	parentNodeInfoFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { useTitle } from "@vueuse/core";
import { AxiosResponse } from "axios";
import { setActivePinia } from "pinia";

// Mock useTitle from @vueuse/core
vi.mock("@vueuse/core", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@vueuse/core")>();
	return {
		...actual,
		useTitle: vi.fn(),
	};
});

vi.mock("@/utils/pageTitle", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/utils/pageTitle")>();
	return {
		...actual,
		buildPageTitle: vi.fn(),
	};
});

const mockUseTitle = vi.mocked(useTitle);
const mockBuildPageTitle = vi.mocked(buildPageTitle);

describe("Collabora.page", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		vi.resetAllMocks();
		mockUseTitle.mockClear();
		mockBuildPageTitle.mockClear();
	});

	describe("when file record exists in store", () => {
		const setup = (edit?: string) => {
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

			const fileRecord = fileRecordFactory.build({ name: "test-file.xlsx" });
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(fileRecord);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				"https://collabora.example.com/wopi/files/123"
			);

			const parentNodeInfos = parentNodeInfoFactory.build({ name: "Course Board" });
			const fileElement = fileElementResponseFactory.build();
			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			boardApi.elementControllerGetElementWithParentHierarchy.mockResolvedValueOnce({
				data: {
					element: fileElement,
					parentHierarchy: [parentNodeInfos],
				},
			} as AxiosResponse);
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			mockBuildPageTitle.mockReturnValue("test-file.xlsx - Course Board - Instance Title");

			const wrapper = shallowMount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					fileRecordId: fileRecord.id,
					edit,
				},
			});

			return {
				wrapper,
				fileRecord,
			};
		};

		it("should render CollaboraEditor component with correct props", () => {
			const { wrapper, fileRecord } = setup("true");

			const collaboraEditor = wrapper.findComponent({ name: "CollaboraEditor" });
			expect(collaboraEditor.exists()).toBe(true);
			expect(collaboraEditor.props("fileRecordId")).toBe(fileRecord.id);
			expect(collaboraEditor.props("isEditable")).toBe(true);
		});

		it("should pass isEditable as false when not editable", () => {
			const { wrapper } = setup("false");

			const collaboraEditor = wrapper.findComponent({ name: "CollaboraEditor" });
			expect(collaboraEditor.props("isEditable")).toBe(false);
		});

		it("should pass isEditable as false when edit prop is undefined", () => {
			const { wrapper } = setup(undefined);

			const collaboraEditor = wrapper.findComponent({ name: "CollaboraEditor" });
			expect(collaboraEditor.props("isEditable")).toBe(false);
		});

		it("should call useTitle with page title including file name and parent name", async () => {
			setup("true");

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith("test-file.xlsx - Course Board");
			expect(mockUseTitle).toHaveBeenCalledWith("test-file.xlsx - Course Board - Instance Title");
		});
	});

	describe("when file record needs to be fetched", () => {
		const setup = () => {
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

			const fileRecord = fileRecordFactory.build({ name: "fetched-file.xlsx" });
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(undefined).mockReturnValueOnce(fileRecord);
			fileStorageApiMock.fetchFileById.mockResolvedValueOnce(undefined);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				"https://collabora.example.com/wopi/files/123"
			);

			const parentNodeInfos = parentNodeInfoFactory.build({ name: "Course Board" });
			const fileElement = fileElementResponseFactory.build();
			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			boardApi.elementControllerGetElementWithParentHierarchy.mockResolvedValueOnce({
				data: {
					element: fileElement,
					parentHierarchy: [parentNodeInfos],
				},
			} as AxiosResponse);
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			mockBuildPageTitle.mockReturnValueOnce("fetched-file.xlsx - Course Board - Instance Title");

			const wrapper = shallowMount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					fileRecordId: fileRecord.id,
					isEditable: true,
				},
			});

			return {
				wrapper,
				fileStorageApiMock,
				fileRecord,
				parentNodeInfos,
			};
		};

		it("should fetch file and call useTitle with correct parameters", async () => {
			const { fileStorageApiMock, fileRecord } = setup();

			await flushPromises();

			expect(fileStorageApiMock.fetchFileById).toHaveBeenCalledWith(fileRecord.id);
			expect(mockBuildPageTitle).toHaveBeenCalledWith("fetched-file.xlsx - Course Board");
			expect(mockUseTitle).toHaveBeenCalledWith("fetched-file.xlsx - Course Board - Instance Title");
		});
	});

	describe("when fetchFileById rejects", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

			fileStorageApiMock.getFileRecordById.mockReturnValue(undefined);
			fileStorageApiMock.fetchFileById.mockRejectedValueOnce(new Error("Fetch failed"));
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				"https://collabora.example.com/wopi/files/123"
			);

			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);
			boardApi.elementControllerGetElementWithParentHierarchy.mockRejectedValueOnce(new Error("Fetch parent failed"));

			const expectedTitle = "Instance Title";
			mockBuildPageTitle.mockReturnValueOnce(expectedTitle);

			const wrapper = shallowMount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					fileRecordId,
					isEditable: true,
				},
			});

			return {
				wrapper,
				expectedTitle,
			};
		};

		it("should call useTitle with empty string", async () => {
			const { expectedTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith("");
			expect(mockUseTitle).toHaveBeenCalledWith(expectedTitle);
		});
	});

	describe("when getElementWithParentHierarchy rejects", () => {
		const setup = () => {
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);

			const fileRecord = fileRecordFactory.build({ name: "standalone-file.pdf" });
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(fileRecord);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				"https://collabora.example.com/wopi/files/123"
			);

			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);
			boardApi.elementControllerGetElementWithParentHierarchy.mockRejectedValue(new Error("Fetch parent failed"));

			const expectedTitle = "standalone-file.pdf - Instance Title";
			mockBuildPageTitle.mockReturnValueOnce(expectedTitle);

			const wrapper = shallowMount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					fileRecordId: fileRecord.id,
					isEditable: false,
				},
			});

			return {
				wrapper,
				fileRecord,
				expectedTitle,
			};
		};

		it("should call useTitle with only file name", async () => {
			const { expectedTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith("standalone-file.pdf");
			expect(mockUseTitle).toHaveBeenCalledWith(expectedTitle);
		});
	});

	describe("when file record has no name", () => {
		const setup = () => {
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

			const fileRecord = fileRecordFactory.build({ name: undefined });
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(undefined).mockReturnValueOnce(fileRecord);
			fileStorageApiMock.fetchFileById.mockResolvedValueOnce(undefined);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				"https://collabora.example.com/wopi/files/123"
			);

			const parentNodeInfos = parentNodeInfoFactory.build({ name: "Task Board" });
			const fileElement = fileElementResponseFactory.build();
			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			boardApi.elementControllerGetElementWithParentHierarchy.mockResolvedValue({
				data: {
					element: fileElement,
					parentHierarchy: [parentNodeInfos],
				},
			} as AxiosResponse);
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValue(boardApi);

			const expectedTitle = "Task Board - Instance Title";
			mockBuildPageTitle.mockReturnValueOnce(expectedTitle);

			const wrapper = shallowMount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					fileRecordId: fileRecord.id,
					isEditable: true,
				},
			});

			return {
				wrapper,
				parentNodeInfos,
				expectedTitle,
			};
		};

		it("should call useTitle with only parent name when file name is missing", async () => {
			const { expectedTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith("Task Board");
			expect(mockUseTitle).toHaveBeenCalledWith(expectedTitle);
		});
	});

	describe("when both file name and parent name are missing", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

			fileStorageApiMock.getFileRecordById.mockReturnValue(undefined);
			fileStorageApiMock.fetchFileById.mockRejectedValueOnce(new Error());
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				"https://collabora.example.com/wopi/files/123"
			);

			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);
			boardApi.elementControllerGetElementWithParentHierarchy.mockRejectedValueOnce(new Error("Fetch parent failed"));

			const instanceTitle = "Instance Title";
			mockBuildPageTitle.mockReturnValueOnce(instanceTitle);

			const wrapper = shallowMount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				props: {
					fileRecordId,
					isEditable: false,
				},
			});

			return {
				wrapper,
				instanceTitle,
			};
		};

		it("should call useTitle with empty string", async () => {
			const { instanceTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith("");
			expect(mockUseTitle).toHaveBeenCalledWith(instanceTitle);
		});
	});
});
