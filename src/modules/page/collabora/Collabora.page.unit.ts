import CollaboraPage from "./Collabora.page.vue";
import * as serverApi from "@/serverApi/v3/api";
import { EditorMode } from "@/types/file/File";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	authorizedCollaboraDocumentUrlResponseFactory,
	createTestAppStoreWithUser,
	expectNotification,
	fileElementResponseFactory,
	fileRecordFactory,
	ObjectIdMock,
	parentNodeInfoFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { useTitle } from "@vueuse/core";
import { AxiosPromise } from "axios";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

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

	const setup = () => {
		const fileRecordId = ObjectIdMock();
		const editorMode = EditorMode.EDIT;
		const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

		const { mockedMe } = createTestAppStoreWithUser("user-id");

		const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
		vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
		fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
		);

		const fileElement = fileElementResponseFactory.build();
		const parentNodeInfos = parentNodeInfoFactory.build();
		const boardApi = createMock<serverApi.BoardElementApiInterface>();
		boardApi.elementControllerGetElementWithParentHierarchy.mockReturnValueOnce({
			data: {
				element: fileElement,
				parentHierarchy: parentNodeInfos,
			},
		} as unknown as AxiosPromise);
		vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

		const wrapper = mount(CollaboraPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: {
				fileRecordId,
				editorMode,
			},
		});

		return {
			wrapper,
			authorizedCollaboraDocumentUrlResponse,
			editorMode,
			fileStorageApiMock,
			fileRecordId,
			mockedMe,
		};
	};

	it("should call getAuthorizedCollaboraDocumentUrl with correct parameters", () => {
		const { fileStorageApiMock, fileRecordId, editorMode, mockedMe } = setup();

		expect(fileStorageApiMock.getAuthorizedCollaboraDocumentUrl).toHaveBeenCalledWith(
			fileRecordId,
			editorMode,
			`${mockedMe.user.firstName} ${mockedMe.user.lastName}`
		);
	});

	it("should render Collabora editor iframe", async () => {
		const { wrapper, authorizedCollaboraDocumentUrlResponse } = setup();

		await flushPromises();

		expect(wrapper.find("iframe").exists()).toBe(true);
		expect(wrapper.find("iframe").attributes("src")).toEqual(
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl + `?lang=${useAppStore().locale}`
		);
	});

	describe("when editor mode prop is undefined", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const editorMode = EditorMode.EDIT;
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			const { mockedMe } = createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const fileElement = fileElementResponseFactory.build();
			const parentNodeInfos = parentNodeInfoFactory.build();
			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			boardApi.elementControllerGetElementWithParentHierarchy.mockReturnValueOnce({
				data: {
					element: fileElement,
					parentHierarchy: parentNodeInfos,
				},
			} as unknown as AxiosPromise);
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			const wrapper = mount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				propsData: {
					fileRecordId,
					editorMode: undefined,
				},
			});

			return {
				wrapper,
				authorizedCollaboraDocumentUrlResponse,
				editorMode,
				fileStorageApiMock,
				fileRecordId,
				mockedMe,
			};
		};

		it("should render Collabora editor iframe with view mode", async () => {
			const { wrapper, authorizedCollaboraDocumentUrlResponse, fileStorageApiMock, fileRecordId, mockedMe } =
				await setup();

			await flushPromises();

			expect(fileStorageApiMock.getAuthorizedCollaboraDocumentUrl).toHaveBeenCalledWith(
				fileRecordId,
				EditorMode.VIEW,
				`${mockedMe.user.firstName} ${mockedMe.user.lastName}`
			);

			expect(wrapper.find("iframe").exists()).toBe(true);
			expect(wrapper.find("iframe").attributes("src")).toEqual(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl + `?lang=${useAppStore().locale}`
			);
		});
	});

	describe("when iframe emits message", () => {
		describe("when message is not a collabora message", () => {
			describe("when MessageId is missing", () => {
				it("should show notification", () => {
					setup();

					const message = `{
					"SendTime": 1755591627240,
					"Values": { }
				}`;
					const messageEvent = new MessageEvent("message", {
						data: message,
					});
					window.dispatchEvent(messageEvent);

					expectNotification("error");
				});
			});

			describe("when MessageId is not string", () => {
				it("should show notification", () => {
					setup();

					const message = `{
						"MessageId": 1,
						"SendTime": 1755591627240,
						"Values": { }
					}`;
					const messageEvent = new MessageEvent("message", {
						data: message,
					});
					window.dispatchEvent(messageEvent);

					expectNotification("error");
				});
			});

			describe("when Values is missing", () => {
				it("should show notification", () => {
					setup();

					const message = `{
						"MessageId": "Some_Other_Message",
						"SendTime": 1755591627240
					}`;
					const messageEvent = new MessageEvent("message", {
						data: message,
					});
					window.dispatchEvent(messageEvent);

					expectNotification("error");
				});
			});
		});

		describe("when message is not valid json", () => {
			it("should show notification ", () => {
				setup();

				const modifiedMessage = `{
					sdf
				}`;
				const messageEvent = new MessageEvent("message", {
					data: modifiedMessage,
				});
				window.dispatchEvent(messageEvent);

				expectNotification("error");
			});
		});
	});

	describe("when file record exists in store", () => {
		const setup = () => {
			const editorMode = EditorMode.EDIT;
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const fileRecord = fileRecordFactory.build();
			fileStorageApiMock.getFileRecordById.mockReturnValue(fileRecord);

			const fileElement = fileElementResponseFactory.build();
			const parentNodeInfos = parentNodeInfoFactory.build();
			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			boardApi.elementControllerGetElementWithParentHierarchy.mockReturnValueOnce({
				data: {
					element: fileElement,
					parentHierarchy: [parentNodeInfos],
				},
			} as unknown as AxiosPromise);
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			mockBuildPageTitle.mockReturnValue("fetched-file.xlsx - Course Board - Instance Title");

			mount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				propsData: {
					fileRecordId: fileRecord.id,
					editorMode,
				},
			});

			return {
				fileRecord,
				parentNodeInfos,
			};
		};

		it("should call useTitle with page title including file name and parent name", async () => {
			const { fileRecord, parentNodeInfos } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith(`${fileRecord.name} - ${parentNodeInfos.name}`);
			expect(mockUseTitle).toHaveBeenCalledWith("fetched-file.xlsx - Course Board - Instance Title");
		});
	});

	describe("when file record needs to be fetched", () => {
		const setup = () => {
			const editorMode = EditorMode.EDIT;
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const fileRecord = fileRecordFactory.build();
			// First call returns null, then returns the file record after fetch
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(undefined).mockReturnValueOnce(fileRecord);
			fileStorageApiMock.fetchFileById.mockResolvedValueOnce(undefined);

			const fileElement = fileElementResponseFactory.build();
			const parentNodeInfos = parentNodeInfoFactory.build({ name: "Course Board" });
			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			boardApi.elementControllerGetElementWithParentHierarchy.mockReturnValueOnce({
				data: {
					element: fileElement,
					parentHierarchy: [parentNodeInfos],
				},
			} as unknown as AxiosPromise);
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			mockBuildPageTitle.mockReturnValueOnce("fetched-file.xlsx - Course Board - Instance Title");

			mount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				propsData: {
					fileRecordId: fileRecord.id,
					editorMode,
				},
			});

			return {
				fileRecord,
				fileStorageApiMock,
				parentNodeInfos,
			};
		};

		it("should fetch file and call useTitle with correct parameters", async () => {
			const { fileStorageApiMock, fileRecord, parentNodeInfos } = setup();

			await flushPromises();

			expect(fileStorageApiMock.fetchFileById).toHaveBeenCalled();
			expect(mockBuildPageTitle).toHaveBeenCalledWith(`${fileRecord.name} - ${parentNodeInfos.name}`);
			expect(mockUseTitle).toHaveBeenCalledWith("fetched-file.xlsx - Course Board - Instance Title");
		});
	});

	describe("when fetchFileById rejects", () => {
		const setup = () => {
			const editorMode = EditorMode.EDIT;
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const fileRecord = fileRecordFactory.build();
			// First call returns null, then returns the file record after fetch
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(undefined);
			fileStorageApiMock.fetchFileById.mockRejectedValueOnce();

			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			const expectedTitle = "standalone-file.pdf - Instance Title";
			mockBuildPageTitle.mockReturnValueOnce(expectedTitle);

			mount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				propsData: {
					fileRecordId: fileRecord.id,
					editorMode,
				},
			});

			return {
				fileRecord,
				expectedTitle,
			};
		};

		it("should call useTitle with only file name", async () => {
			const { expectedTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith("");
			expect(mockUseTitle).toHaveBeenCalledWith(expectedTitle);
		});
	});

	describe("when getElementWithParentHierarchy rejects", () => {
		const setup = () => {
			const editorMode = EditorMode.EDIT;
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const fileRecord = fileRecordFactory.build();
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(fileRecord);

			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);
			boardApi.elementControllerGetElementWithParentHierarchy.mockRejectedValueOnce();

			const expectedTitle = "standalone-file.pdf - Instance Title";
			mockBuildPageTitle.mockReturnValueOnce(expectedTitle);

			mount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				propsData: {
					fileRecordId: fileRecord.id,
					editorMode,
				},
			});

			return {
				fileRecord,
				expectedTitle,
			};
		};

		it("should call useTitle with only file name", async () => {
			const { fileRecord, expectedTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith(`${fileRecord.name}`);
			expect(mockUseTitle).toHaveBeenCalledWith(expectedTitle);
		});
	});

	describe("when file record has no name", () => {
		const setup = () => {
			const editorMode = EditorMode.EDIT;
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const fileRecord = fileRecordFactory.build({
				name: undefined,
			});
			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(undefined).mockReturnValueOnce(fileRecord);

			const fileElement = fileElementResponseFactory.build();
			const parentNodeInfos = parentNodeInfoFactory.build();
			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			boardApi.elementControllerGetElementWithParentHierarchy.mockReturnValueOnce({
				data: {
					element: fileElement,
					parentHierarchy: [parentNodeInfos],
				},
			} as unknown as AxiosPromise);
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			const expectedTitle = "Task Board - Instance Title";
			mockBuildPageTitle.mockReturnValue(expectedTitle);

			const wrapper = mount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				propsData: {
					fileRecordId: ObjectIdMock(),
					editorMode,
				},
			});

			return {
				wrapper,
				parentNodeInfos,
				expectedTitle,
			};
		};

		it("should call useTitle with only parent name when file name is missing", async () => {
			const { parentNodeInfos, expectedTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith(`${parentNodeInfos.name}`);
			expect(mockUseTitle).toHaveBeenCalledWith(expectedTitle);
		});
	});

	describe("when both file name and parent name are missing", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const editorMode = EditorMode.EDIT;
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			const { mockedMe } = createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			fileStorageApiMock.getFileRecordById.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined);

			const boardApi = createMock<serverApi.BoardElementApiInterface>();
			vi.spyOn(serverApi, "BoardElementApiFactory").mockReturnValueOnce(boardApi);

			const instanceTitle = "Instance Title";
			mockBuildPageTitle.mockReturnValue(instanceTitle);

			const wrapper = mount(CollaboraPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
				propsData: {
					fileRecordId,
					editorMode,
				},
			});

			return {
				wrapper,
				mockedMe,
				instanceTitle,
			};
		};

		it("should call useTitle with empty string when both file name and parent name are missing", async () => {
			const { instanceTitle } = setup();

			await flushPromises();

			expect(mockBuildPageTitle).toHaveBeenCalledWith("");
			expect(mockUseTitle).toHaveBeenCalledWith(instanceTitle);
		});
	});
});
