import { checkFolderFeature } from "@/router/guards/check-folder-feature.guard";
import { RouteLocationNormalized } from "vue-router";
import { createTestEnvStore } from "@@/tests/test-utils";

vi.mock("@/utils/inject");

describe("checkFolderFeature Guard", () => {
	it("should call next with no arguments when FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED is true", () => {
		createTestEnvStore({ FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true });

		const to = {} as RouteLocationNormalized;
		const from = {} as RouteLocationNormalized;
		const next = vi.fn();

		checkFolderFeature(to, from, next);
		expect(next).toHaveBeenCalledWith();
	});

	it("should call next with correct arguments when FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED is false", () => {
		createTestEnvStore({ FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: false });

		const to = {} as RouteLocationNormalized;
		const from = {} as RouteLocationNormalized;
		const next = vi.fn();

		checkFolderFeature(to, from, next);
		expect(next).toHaveBeenCalledWith("/");
	});
});
