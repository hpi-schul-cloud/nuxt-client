// Unit tests
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { describe, expect, it } from "vitest";
import { useCollaboraPostMessageApi } from "./CollaboraPostMessageApi.composable";

describe("useCollaboraMessage", () => {
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

	it("should set documentHasUnsavedChanges to true when receiving a valid modified message", () => {
		const { documentHasUnsavedChanges } = setupMountComposable();

		const validMsg = JSON.stringify({
			MessageId: "Doc_ModifiedStatus",
			Values: { Modified: true },
		});
		window.dispatchEvent(new MessageEvent("message", { data: validMsg }));

		expect(documentHasUnsavedChanges.value).toBe(true);
	});

	it("should set documentHasUnsavedChanges to false when receiving a valid modified message with Modified false", () => {
		const { documentHasUnsavedChanges } = setupMountComposable();

		const validMsgWithTrue = JSON.stringify({
			MessageId: "Doc_ModifiedStatus",
			Values: { Modified: true },
		});
		window.dispatchEvent(
			new MessageEvent("message", { data: validMsgWithTrue })
		);

		const validMsgWithFalse = JSON.stringify({
			MessageId: "Doc_ModifiedStatus",
			Values: { Modified: false },
		});
		window.dispatchEvent(
			new MessageEvent("message", { data: validMsgWithFalse })
		);

		expect(documentHasUnsavedChanges.value).toBe(false);
	});

	it("should not change documentHasUnsavedChanges for unrelated messageId", () => {
		const { documentHasUnsavedChanges } = setupMountComposable();
		const unrelatedMsg = JSON.stringify({
			MessageId: "Other_Message",
			Values: {},
		});
		window.dispatchEvent(new MessageEvent("message", { data: unrelatedMsg }));

		expect(documentHasUnsavedChanges.value).toBe(false);
	});

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

	it("should show error if Values is not valid for modifiedStatusValueSchema", () => {
		setupMountComposable();

		const invalidValuesMsg = JSON.stringify({
			MessageId: "Doc_ModifiedStatus",
			Values: { Modified: "notABool" },
		});
		window.dispatchEvent(
			new MessageEvent("message", { data: invalidValuesMsg })
		);

		expect(notifierModuleMock.show).toHaveBeenCalledWith({
			text: "pages.collabora.messageError",
			status: "error",
			timeout: 5000,
		});
	});

	it("should export documentHasUnsavedChanges as a ref", () => {
		const { documentHasUnsavedChanges } = setupMountComposable();

		expect(documentHasUnsavedChanges).toHaveProperty("value");
	});
});
