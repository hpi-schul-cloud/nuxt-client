import CollaboraEditor from "./CollaboraEditor.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { EditorMode } from "@/types/file/File";
import {
	authorizedCollaboraDocumentUrlResponseFactory,
	axiosErrorFactory,
	createTestAppStoreWithUser,
	expectNotification,
	ObjectIdMock,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

describe("CollaboraEditor", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		vi.resetAllMocks();
	});

	describe("when isEditable prop is true", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			const { mockedMe } = createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const wrapper = mount(CollaboraEditor, {
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
				fileStorageApiMock,
				fileRecordId,
				mockedMe,
				authorizedCollaboraDocumentUrlResponse,
			};
		};

		it("should call getAuthorizedCollaboraDocumentUrl with correct parameters", () => {
			const { fileStorageApiMock, fileRecordId, mockedMe } = setup();

			expect(fileStorageApiMock.getAuthorizedCollaboraDocumentUrl).toHaveBeenCalledWith(
				fileRecordId,
				EditorMode.EDIT,
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

		it("should use EDIT mode", async () => {
			const { fileStorageApiMock, fileRecordId, mockedMe } = setup();

			await flushPromises();

			expect(fileStorageApiMock.getAuthorizedCollaboraDocumentUrl).toHaveBeenCalledWith(
				fileRecordId,
				EditorMode.EDIT,
				`${mockedMe.user.firstName} ${mockedMe.user.lastName}`
			);
		});
	});

	describe("when isEditable prop is false", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			const { mockedMe } = createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const wrapper = mount(CollaboraEditor, {
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
				fileStorageApiMock,
				fileRecordId,
				mockedMe,
			};
		};

		it("should use VIEW mode", async () => {
			const { fileStorageApiMock, fileRecordId, mockedMe } = setup();

			await flushPromises();

			expect(fileStorageApiMock.getAuthorizedCollaboraDocumentUrl).toHaveBeenCalledWith(
				fileRecordId,
				EditorMode.VIEW,
				`${mockedMe.user.firstName} ${mockedMe.user.lastName}`
			);
		});
	});

	describe("when iframe emits message", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const wrapper = mount(CollaboraEditor, {
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
			};
		};

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

	describe("when getAuthorizedCollaboraDocumentUrl rejects with 403 Forbidden", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.Forbidden).build();

			createTestAppStoreWithUser("user-id");
			const appStore = useAppStore();
			const handleApplicationErrorSpy = vi.spyOn(appStore, "handleApplicationError");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockRejectedValueOnce(axiosError);

			const wrapper = mount(CollaboraEditor, {
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
				handleApplicationErrorSpy,
			};
		};

		it("should call handleApplicationError with correct parameters", async () => {
			const { handleApplicationErrorSpy } = setup();

			await flushPromises();

			expect(handleApplicationErrorSpy).toHaveBeenCalledWith(HttpStatusCode.Forbidden);
		});
	});

	describe("when getAuthorizedCollaboraDocumentUrl rejects with other error", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();

			createTestAppStoreWithUser("user-id");
			const appStore = useAppStore();
			const handleApplicationErrorSpy = vi.spyOn(appStore, "handleApplicationError");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockRejectedValueOnce(axiosError);

			const wrapper = mount(CollaboraEditor, {
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
				handleApplicationErrorSpy,
			};
		};

		it("should call handleApplicationError with correct parameters", async () => {
			const { handleApplicationErrorSpy } = setup();

			await flushPromises();

			expect(handleApplicationErrorSpy).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
		});
	});

	describe("iframe attributes", () => {
		const setup = () => {
			const fileRecordId = ObjectIdMock();
			const authorizedCollaboraDocumentUrlResponse = authorizedCollaboraDocumentUrlResponseFactory.build();

			createTestAppStoreWithUser("user-id");

			const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
			vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
				authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
			);

			const wrapper = mount(CollaboraEditor, {
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
			};
		};

		it("should have correct security attributes", async () => {
			const { wrapper } = setup();

			await flushPromises();

			const iframe = wrapper.find("iframe");
			expect(iframe.attributes("allow")).toBe("clipboard-read *; clipboard-write *");
			expect(iframe.attributes("allowfullscreen")).toBeDefined();
		});

		it("should have correct title", async () => {
			const { wrapper } = setup();

			await flushPromises();

			const iframe = wrapper.find("iframe");
			expect(iframe.attributes("title")).toBe("pages.collabora.iframeTitle");
		});
	});
});
