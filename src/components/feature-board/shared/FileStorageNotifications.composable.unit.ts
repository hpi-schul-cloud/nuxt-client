import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useFileStorageNotifier } from "./FileStorageNotifications.composable";

const maxFileSize = 100;
const i18nModule = {
	t: jest.fn().mockImplementation((key: string) => key),
	n: jest.fn().mockImplementation((key: number) => key),
};
const notifierModule = createModuleMocks(NotifierModule);
const configModule = createModuleMocks(EnvConfigModule, {
	getMaxFileSize: 100,
});

const setupMountComposable = () => {
	return mountComposable(() => useFileStorageNotifier(), {
		[I18N_KEY as symbol]: i18nModule,
		[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
		[ENV_CONFIG_MODULE_KEY as symbol]: configModule,
	});
};

describe("FileStorageNotifier.composable", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("when showForbiddenError called", () => {
		const setup = () => {
			const i18nKey = "error.403";

			return { i18nKey };
		};

		it("should call i18n.t with correctly props", () => {
			const { showForbiddenError } = setupMountComposable();
			const { i18nKey } = setup();

			showForbiddenError();

			expect(i18nModule.t).toBeCalledWith(i18nKey, undefined);
		});

		it("should call showFailure with correctly props", () => {
			const { showForbiddenError } = setupMountComposable();
			const { i18nKey } = setup();

			showForbiddenError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 10000,
			});
		});
	});

	describe("when showUnauthorizedError called", () => {
		const setup = () => {
			const i18nKey = "error.401";

			return { i18nKey };
		};

		it("should call i18n.t with correctly props", () => {
			const { showUnauthorizedError } = setupMountComposable();
			const { i18nKey } = setup();

			showUnauthorizedError();

			expect(i18nModule.t).toBeCalledWith(i18nKey, undefined);
		});

		it("should call showFailure with correctly props", () => {
			const { showUnauthorizedError } = setupMountComposable();
			const { i18nKey } = setup();

			showUnauthorizedError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 10000,
			});
		});
	});

	describe("when showInternalServerError called", () => {
		const setup = () => {
			const i18nKey =
				"components.board.notifications.errors.fileServiceNotAvailable";

			return { i18nKey };
		};

		it("should call i18n.t with correctly props", () => {
			const { showInternalServerError } = setupMountComposable();
			const { i18nKey } = setup();

			showInternalServerError();

			expect(i18nModule.t).toBeCalledWith(i18nKey, undefined);
		});

		it("should call showFailure with correctly props", () => {
			const { showInternalServerError } = setupMountComposable();
			const { i18nKey } = setup();

			showInternalServerError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 10000,
			});
		});
	});

	describe("when showFileExistsError called", () => {
		const setup = () => {
			const i18nKey = "components.board.notifications.errors.fileNameExists";

			return { i18nKey };
		};

		it("should call i18n.t with correctly props", () => {
			const { showFileExistsError } = setupMountComposable();
			const { i18nKey } = setup();

			showFileExistsError();

			expect(i18nModule.t).toBeCalledWith(i18nKey, undefined);
		});

		it("should call showFailure with correctly props", () => {
			const { showFileExistsError } = setupMountComposable();
			const { i18nKey } = setup();

			showFileExistsError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 10000,
			});
		});
	});

	describe("when showFileTooBigError called", () => {
		const setup = () => {
			const i18nKey = "components.board.notifications.errors.fileToBig";
			const props = { maxFileSizeWithUnit: `${maxFileSize} B` };

			return { i18nKey, props };
		};

		it("should call i18n.t with correctly props", () => {
			const { showFileTooBigError } = setupMountComposable();
			const { i18nKey, props } = setup();

			showFileTooBigError();

			expect(i18nModule.t).toBeCalledWith(i18nKey, props);
		});

		it("should call showFailure with correctly props", () => {
			const { showFileTooBigError } = setupMountComposable();
			const { i18nKey } = setup();

			showFileTooBigError();

			expect(notifierModule.show).toBeCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 10000,
			});
		});
	});
});
