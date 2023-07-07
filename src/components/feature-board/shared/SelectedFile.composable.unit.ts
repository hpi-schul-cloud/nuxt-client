import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { setupFileStorageNotifier } from "@@/tests/test-utils/composable-mocks/fileStorageNotifier";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useSelectedFile } from "./SelectedFile.composable";
jest.mock("./FileStorageNotifications.composable");

const configModule = createModuleMocks(EnvConfigModule, {
	getMaxFileSize: 100,
});

const setupMountComposable = () => {
	return mountComposable(() => useSelectedFile(), {
		[ENV_CONFIG_MODULE_KEY.valueOf()]: configModule,
	});
};

describe("SelectedFile.composable", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when file size correctly", () => {
		const setup = () => {
			const { showFileTooBigError } = setupFileStorageNotifier();
			const file = new File([""], "filename");

			return { file, showFileTooBigError };
		};

		it("should set selectedFile and return true", () => {
			const { file } = setup();
			const { setSelectedFile, getSelectedFile } = setupMountComposable();

			const result = setSelectedFile(file);

			expect(result).toBe(true);
			expect(getSelectedFile()).toBe(file);
		});

		it("should set selectedFile to undefined", () => {
			setup();
			const { setSelectedFile, getSelectedFile } = setupMountComposable();

			const result = setSelectedFile();

			expect(result).toBe(true);
			expect(getSelectedFile()).toBe(undefined);
		});
	});

	describe("when file size is to big", () => {
		const setup = () => {
			const file = new File([""], "filename");
			Object.defineProperty(file, "size", { value: 1024 });
			const { showFileTooBigError } = setupFileStorageNotifier();

			return { file, showFileTooBigError };
		};

		it("should not set selectedFile and return false", () => {
			const { file } = setup();
			const { setSelectedFile, getSelectedFile } = setupMountComposable();

			const result = setSelectedFile(file);

			expect(result).toBe(false);
			expect(getSelectedFile()).toBe(undefined);
		});

		it.skip("should call showFileTooBigError", () => {
			const { file, showFileTooBigError } = setup();
			const { setSelectedFile } = setupMountComposable();

			const result = setSelectedFile(file);

			expect(result).toBe(false);
			expect(showFileTooBigError).toBeCalledTimes(1);
		});
	});
});
