import { EditorMode } from "@/types/file/File";
import {
	authorizedCollaboraDocumentUrlResponseFactory,
	createTestAppStoreWithUser,
	expectNotification,
	ObjectIdMock,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { flushPromises } from "@vue/test-utils";
import CollaboraPage from "./Collabora.page.vue";
import { useAppStore } from "@data-app";
import { beforeEach } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("Collabora.page", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		vi.resetAllMocks();
	});

	const setup = () => {
		const fileRecordId = ObjectIdMock();
		const editorMode = EditorMode.EDIT;
		const authorizedCollaboraDocumentUrlResponse =
			authorizedCollaboraDocumentUrlResponseFactory.build();

		const { mockedMe } = createTestAppStoreWithUser("user-id");

		const fileStorageApiMock =
			createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
		vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
			fileStorageApiMock
		);
		fileStorageApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl
		);

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

		expect(
			fileStorageApiMock.getAuthorizedCollaboraDocumentUrl
		).toHaveBeenCalledWith(
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
			authorizedCollaboraDocumentUrlResponse.authorizedCollaboraDocumentUrl +
				`?lang=${useAppStore().locale}`
		);
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
});
