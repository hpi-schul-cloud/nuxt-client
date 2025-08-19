import AuthModule from "@/store/auth";
import NotifierModule from "@/store/notifier";
import { EditorMode } from "@/types/file/File";
import { AUTH_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import {
	authorizedCollaboraDocumentUrlResponseFactory,
	meResponseFactory,
	ObjectIdMock,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { flushPromises } from "@vue/test-utils";
import CollaboraPage from "./Collabora.page.vue";

describe("Collabora.page", () => {
	const setup = () => {
		const fileRecordId = ObjectIdMock();
		const editorMode = EditorMode.EDIT;
		const meUserResponse = meResponseFactory.build().user;
		const authorizedCollaboraDocumentUrlResponse =
			authorizedCollaboraDocumentUrlResponseFactory.build();

		const authModule = createModuleMocks(AuthModule, {
			getUser: meUserResponse,
		});

		const fileStorageApiMock =
			createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
		vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
			fileStorageApiMock
		);
		fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
		);

		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(CollaboraPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
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
			meUserResponse,
			notifierModule,
		};
	};

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should call getAuthorizedCollaboraDocumentUrl with correct parameters", () => {
		const { fileStorageApiMock, fileRecordId, editorMode, meUserResponse } =
			setup();

		expect(
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl
		).toHaveBeenCalledWith(
			fileRecordId,
			editorMode,
			`${meUserResponse.firstName} ${meUserResponse.lastName}`
		);
	});

	it("should render Collabora editor iframe", async () => {
		const { wrapper, authorizedCollaboraDocumentUrlResponse } = setup();

		await flushPromises();

		expect(wrapper.find("iframe").exists()).toBe(true);
		expect(wrapper.find("iframe").attributes("src")).toEqual(
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
		);
	});

	describe("when iframe emits message", () => {
		describe("when message is modified status message", () => {
			describe("when modified is true", () => {
				it("should show notification on page unload", async () => {
					setup();

					const modifiedMessage = `{
					 	"MessageId": "Doc_ModifiedStatus",
    				 	"SendTime": 1755591627240,
                    	"Values": { "Modified": true }
					}`;
					const messageEvent = new MessageEvent("message", {
						data: modifiedMessage,
					});
					window.dispatchEvent(messageEvent);

					const beforeUnloadEvent = new Event("beforeunload");
					const preventDefaultSpy = vi.fn();

					beforeUnloadEvent.preventDefault = preventDefaultSpy;
					window.dispatchEvent(beforeUnloadEvent);

					expect(preventDefaultSpy).toHaveBeenCalled();
				});
			});

			describe("when modified is false", () => {
				it("should show notification on page unload", async () => {
					setup();

					const modifiedMessage = `{
						"MessageId": "Doc_ModifiedStatus",
    					"SendTime": 1755591627240,
                    	"Values": { "Modified": false }
					}`;
					const messageEvent = new MessageEvent("message", {
						data: modifiedMessage,
					});
					window.dispatchEvent(messageEvent);

					const beforeUnloadEvent = new Event("beforeunload");
					const preventDefaultSpy = vi.fn();

					beforeUnloadEvent.preventDefault = preventDefaultSpy;
					window.dispatchEvent(beforeUnloadEvent);

					expect(preventDefaultSpy).not.toHaveBeenCalled();
				});
			});

			describe("when modified is not a boolean", () => {
				it("should not show notification on page unload", async () => {
					const { notifierModule } = setup();

					const modifiedMessage = `{
					 	"MessageId": "Doc_ModifiedStatus",
    				 	"SendTime": 1755591627240,
                    	"Values": { "Modified": "true_string" }
					}`;
					const messageEvent = new MessageEvent("message", {
						data: modifiedMessage,
					});
					window.dispatchEvent(messageEvent);

					expect(notifierModule.show).toHaveBeenCalledWith({
						text: "pages.collabora.messageError",
						status: "error",
						timeout: 5000,
					});
				});
			});
		});

		describe("when message is not a modified status message", () => {
			it("should not show notification on page unload", async () => {
				setup();

				const message = `{
						"MessageId": "Some_Other_Message",
						"SendTime": 1755591627240,
						"Values": { }
					}`;
				const messageEvent = new MessageEvent("message", {
					data: message,
				});
				window.dispatchEvent(messageEvent);

				const beforeUnloadEvent = new Event("beforeunload");
				const preventDefaultSpy = vi.fn();

				beforeUnloadEvent.preventDefault = preventDefaultSpy;
				window.dispatchEvent(beforeUnloadEvent);

				expect(preventDefaultSpy).not.toHaveBeenCalled();
			});
		});

		describe("when message is not a collabora message", () => {
			describe("when MessageId is missing", () => {
				it("should show notification", async () => {
					const { notifierModule } = setup();

					const message = `{
					"SendTime": 1755591627240,
					"Values": { }
				}`;
					const messageEvent = new MessageEvent("message", {
						data: message,
					});
					window.dispatchEvent(messageEvent);

					expect(notifierModule.show).toHaveBeenCalledWith({
						text: "pages.collabora.messageError",
						status: "error",
						timeout: 5000,
					});
				});
			});

			describe("when MessageId is not string", () => {
				it("should show notification", async () => {
					const { notifierModule } = setup();

					const message = `{
						"MessageId": 1,
						"SendTime": 1755591627240,
						"Values": { }
					}`;
					const messageEvent = new MessageEvent("message", {
						data: message,
					});
					window.dispatchEvent(messageEvent);

					expect(notifierModule.show).toHaveBeenCalledWith({
						text: "pages.collabora.messageError",
						status: "error",
						timeout: 5000,
					});
				});
			});

			describe("when Values is missing", () => {
				it("should show notification", async () => {
					const { notifierModule } = setup();

					const message = `{
						"MessageId": "Some_Other_Message",
						"SendTime": 1755591627240
					}`;
					const messageEvent = new MessageEvent("message", {
						data: message,
					});
					window.dispatchEvent(messageEvent);

					expect(notifierModule.show).toHaveBeenCalledWith({
						text: "pages.collabora.messageError",
						status: "error",
						timeout: 5000,
					});
				});
			});
		});

		describe("when message is not valid json", () => {
			it("should show notification ", async () => {
				const { notifierModule } = setup();

				const modifiedMessage = `{
					sdf
				}`;
				const messageEvent = new MessageEvent("message", {
					data: modifiedMessage,
				});
				window.dispatchEvent(messageEvent);

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "pages.collabora.jsonError",
					status: "error",
					timeout: 5000,
				});
			});
		});
	});
});
