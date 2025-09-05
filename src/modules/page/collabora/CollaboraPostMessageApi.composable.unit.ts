// Unit tests
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { describe, expect, it, vi } from "vitest";
import {
	CollaboraEvents,
	useCollaboraPostMessageApi,
} from "./CollaboraPostMessageApi.composable";

describe("useCollaboraMessage", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	const notifierModuleMock = createModuleMocks(NotifierModule);

	const setupMountComposable = () => {
		return mountComposable(() => useCollaboraPostMessageApi(), {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY as symbol]: notifierModuleMock,
				},
			},
		});
	};

	it("should show error if message is invalid JSON", () => {
		setupMountComposable();
		const invalidMsg = "not a json";
		window.dispatchEvent(new MessageEvent("message", { data: invalidMsg }));

		expect(notifierModuleMock.show).toHaveBeenCalledWith({
			text: "pages.collabora.jsonError",
			status: "error",
			timeout: 5000,
		});
	});

	it("should show error if messageId is missing", () => {
		setupMountComposable();

		const invalidMsg = JSON.stringify({
			Values: {},
		});
		window.dispatchEvent(new MessageEvent("message", { data: invalidMsg }));

		expect(notifierModuleMock.show).toHaveBeenCalledWith({
			text: "pages.collabora.messageError",
			status: "error",
			timeout: 5000,
		});
	});

	it("should show error if messageId is not a string", () => {
		setupMountComposable();

		const invalidMsg = JSON.stringify({
			MessageId: 123,
			Values: {},
		});
		window.dispatchEvent(new MessageEvent("message", { data: invalidMsg }));

		expect(notifierModuleMock.show).toHaveBeenCalledWith({
			text: "pages.collabora.messageError",
			status: "error",
			timeout: 5000,
		});
	});

	it("should show error if values is missing", () => {
		setupMountComposable();

		const invalidMsg = JSON.stringify({
			MessageId: "Doc_ModifiedStatus",
		});
		window.dispatchEvent(new MessageEvent("message", { data: invalidMsg }));

		expect(notifierModuleMock.show).toHaveBeenCalledWith({
			text: "pages.collabora.messageError",
			status: "error",
			timeout: 5000,
		});
	});

	describe("handleLoadingStatusUpdate", () => {
		const notifierModuleMock = createModuleMocks(NotifierModule);

		const setupMountComposable = () => {
			const targetOrigin = "https://collabora.example.com";

			const iframe = document.createElement("iframe");
			document.body.appendChild(iframe);

			const { setupPostMessageAPI } = mountComposable(
				() => useCollaboraPostMessageApi(),
				{
					global: {
						plugins: [createTestingI18n()],
						provide: {
							[NOTIFIER_MODULE_KEY as symbol]: notifierModuleMock,
						},
					},
				}
			);

			setupPostMessageAPI(iframe, targetOrigin);

			return { setupPostMessageAPI, iframe, targetOrigin };
		};

		it("should handle App_LoadingStatus:Initialized correctly", () => {
			const { iframe, targetOrigin } = setupMountComposable();

			const date = Date.now();
			vi.setSystemTime(date);

			const validMsg = JSON.stringify({
				MessageId: CollaboraEvents.APP_LOADING_STATUS,
				Values: { Status: "Initialized" },
			});

			const expectedMsg1 = JSON.stringify({
				MessageId: CollaboraEvents.HOST_POSTMESSAGE_READY,
				SendTime: date,
				Values: undefined,
			});
			const expectedMsg2 = JSON.stringify({
				MessageId: CollaboraEvents.FEEDBACK_NEVER,
				SendTime: date,
				Values: undefined,
			});

			const spy = vi.spyOn(iframe.contentWindow as Window, "postMessage");
			window.dispatchEvent(new MessageEvent("message", { data: validMsg }));

			expect(spy).toHaveBeenCalledWith(expectedMsg1, targetOrigin);
			expect(spy).toHaveBeenCalledWith(expectedMsg2, targetOrigin);

			document.body.removeChild(iframe);
		});
		describe('Handle App_LoadingStatus:Document_Loaded correctly"', () => {
			it("should send remove button messages", () => {
				const { iframe, targetOrigin } = setupMountComposable();

				const date = Date.now();
				vi.setSystemTime(date);

				const validMsg = JSON.stringify({
					MessageId: CollaboraEvents.APP_LOADING_STATUS,
					Values: { Status: "Document_Loaded" },
				});

				const expectedMsg = {
					MessageId: CollaboraEvents.REMOVE_BUTTON,
					SendTime: date,
					Values: undefined,
				};

				const spy = vi.spyOn(iframe.contentWindow as Window, "postMessage");
				window.dispatchEvent(new MessageEvent("message", { data: validMsg }));

				expect(spy).toHaveBeenNthCalledWith(
					1,
					JSON.stringify({ ...expectedMsg, Values: { id: "feedback-button" } }),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					2,
					JSON.stringify({ ...expectedMsg, Values: { id: "about-button" } }),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					3,
					JSON.stringify({ ...expectedMsg, Values: { id: "latestupdates" } }),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					4,
					JSON.stringify({
						...expectedMsg,
						Values: { id: "signature-button" },
					}),
					targetOrigin
				);

				document.body.removeChild(iframe);
			});

			it("should send hide menu item messages", () => {
				const { iframe, targetOrigin } = setupMountComposable();

				const date = Date.now();
				vi.setSystemTime(date);

				const validMsg = JSON.stringify({
					MessageId: CollaboraEvents.APP_LOADING_STATUS,
					Values: { Status: "Document_Loaded" },
				});

				const expectedMsg = {
					MessageId: CollaboraEvents.HIDE_MENU_ITEM,
					SendTime: date,
					Values: undefined,
				};

				const spy = vi.spyOn(iframe.contentWindow as Window, "postMessage");
				window.dispatchEvent(new MessageEvent("message", { data: validMsg }));

				expect(spy).toHaveBeenNthCalledWith(
					5,
					JSON.stringify({ ...expectedMsg, Values: { id: "report-an-issue" } }),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					6,
					JSON.stringify({ ...expectedMsg, Values: { id: "feedback" } }),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					7,
					JSON.stringify({ ...expectedMsg, Values: { id: "about" } }),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					8,
					JSON.stringify({ ...expectedMsg, Values: { id: "latestupdates" } }),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					9,
					JSON.stringify({
						...expectedMsg,
						Values: { id: "serveraudit" },
					}),
					targetOrigin
				);
				expect(spy).toHaveBeenNthCalledWith(
					10,
					JSON.stringify({
						...expectedMsg,
						Values: { id: "signature" },
					}),
					targetOrigin
				);

				document.body.removeChild(iframe);
			});
		});
	});
});
