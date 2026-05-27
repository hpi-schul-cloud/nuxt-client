import { checkFolderFeature } from "@/router/guards/check-folder-feature.guard";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("checkFolderFeature Guard", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should call next with no arguments when FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED is true", () => {
		createTestEnvStore({ FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true });
		const next = checkFolderFeature();
		expect(next).toEqual(true);
	});

	it("should call next with correct arguments when FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED is false", () => {
		createTestEnvStore({ FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: false });

		const next = checkFolderFeature();
		expect(next).toEqual("/");
	});
});
