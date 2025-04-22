import { checkFolderFeature } from "@/router/guards/check-folder-feature.guard";
import { injectStrict } from "@/utils/inject";
import { RouteLocationNormalized } from "vue-router";

jest.mock("@/utils/inject");
const mockedInjectStrict = jest.mocked(injectStrict);

describe("checkFolderFeature Guard", () => {
	describe("when FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED is true", () => {
		const setup = () => {
			mockedInjectStrict.mockImplementationOnce(() => {
				return {
					getEnv: {
						FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: true,
					},
				};
			});
		};

		it("should call next with no arguments", () => {
			setup();

			const to = {} as RouteLocationNormalized;
			const from = {} as RouteLocationNormalized;
			const next = jest.fn();

			checkFolderFeature(to, from, next);
			expect(next).toHaveBeenCalledWith();
		});
	});

	describe("when FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED is false", () => {
		const setup = () => {
			mockedInjectStrict.mockImplementationOnce(() => {
				return {
					getEnv: {
						FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED: false,
					},
				};
			});
		};

		it("should call next with correct arguments", () => {
			setup();

			const to = {} as RouteLocationNormalized;
			const from = {} as RouteLocationNormalized;
			const next = jest.fn();

			checkFolderFeature(to, from, next);
			expect(next).toHaveBeenCalledWith("/");
		});
	});
});
