import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useI18n } from "vue-i18n";
import { useFileStorageNotifier } from "./FileStorageNotifications.composable";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({
			t: jest.fn().mockImplementation((key: string) => key),
			n: jest.fn().mockImplementation((key: string) => key),
		}),
	};
});

const maxFileSize = 100;
const mockI18nModule = jest.mocked(useI18n());

const notifierModule = createModuleMocks(NotifierModule);
const configModule = createModuleMocks(EnvConfigModule, {
	getMaxFileSize: 100,
});

const setupMountComposable = () => {
	return mountComposable(() => useFileStorageNotifier(), {
		global: {
			provide: {
				[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: configModule,
			},
		},
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

			expect(mockI18nModule.t).toHaveBeenCalledWith(i18nKey);
		});

		it("should call showFailure with correctly props", () => {
			const { showForbiddenError } = setupMountComposable();
			const { i18nKey } = setup();

			showForbiddenError();

			expect(notifierModule.show).toHaveBeenCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
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

			expect(mockI18nModule.t).toHaveBeenCalledWith(i18nKey);
		});

		it("should call showFailure with correctly props", () => {
			const { showUnauthorizedError } = setupMountComposable();
			const { i18nKey } = setup();

			showUnauthorizedError();

			expect(notifierModule.show).toHaveBeenCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
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

			expect(mockI18nModule.t).toHaveBeenCalledWith(i18nKey);
		});

		it("should call showFailure with correctly props", () => {
			const { showInternalServerError } = setupMountComposable();
			const { i18nKey } = setup();

			showInternalServerError();

			expect(notifierModule.show).toHaveBeenCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
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

			expect(mockI18nModule.t).toHaveBeenCalledWith(i18nKey);
		});

		it("should call showFailure with correctly props", () => {
			const { showFileExistsError } = setupMountComposable();
			const { i18nKey } = setup();

			showFileExistsError();

			expect(notifierModule.show).toHaveBeenCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
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

			expect(mockI18nModule.t).toHaveBeenCalledWith(i18nKey, props);
		});

		it("should call showFailure with correctly props", () => {
			const { showFileTooBigError } = setupMountComposable();
			const { i18nKey } = setup();

			showFileTooBigError();

			expect(notifierModule.show).toHaveBeenCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
			});
		});
	});

	describe("when showFileNotDeletedError called", () => {
		const setup = () => {
			const i18nKey = "components.board.notifications.errors.fileNotDeleted";

			return { i18nKey };
		};

		it("should call i18n.t with correctly props", () => {
			const { showFileNotDeletedError } = setupMountComposable();
			const { i18nKey } = setup();

			showFileNotDeletedError();

			expect(mockI18nModule.t).toHaveBeenCalledWith(i18nKey);
		});

		it("should call showFailure with correctly props", () => {
			const { showFileNotDeletedError } = setupMountComposable();
			const { i18nKey } = setup();

			showFileNotDeletedError();

			expect(notifierModule.show).toHaveBeenCalledWith({
				status: "error",
				text: i18nKey,
				timeout: 5000,
			});
		});
	});
});
