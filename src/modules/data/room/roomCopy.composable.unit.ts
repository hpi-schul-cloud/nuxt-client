import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { envsFactory, mountComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useRoomCopy } from "./roomCopy.composable";

describe("roomCopy", () => {
	const setupComposable = (options: {
		featureFlag: boolean;
		mockedLoadingState?: jest.Mocked<LoadingStateModule>;
	}) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_ROOMS_DUPLICATION_ENABLED: options.featureFlag,
			}),
		});
		const loadingStateModuleMock =
			options.mockedLoadingState ?? createModuleMocks(LoadingStateModule);
		const notifierModuleMock = createModuleMocks(NotifierModule);

		const composable = mountComposable(() => useRoomCopy(), {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
					loadingStateModule: loadingStateModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				},
			},
		});

		return composable;
	};

	describe("feature check", () => {
		describe("when the feature is enabled", () => {
			const setup = () => {
				const { isRoomCopyFeatureEnabled } = setupComposable({
					featureFlag: true,
				});
				return { isRoomCopyFeatureEnabled };
			};

			it("should tell that it's is enabled", () => {
				const { isRoomCopyFeatureEnabled } = setup();
				expect(isRoomCopyFeatureEnabled.value).toBe(true);
			});
		});
		describe("when the feature is disabled", () => {
			const setup = () => {
				const { isRoomCopyFeatureEnabled } = setupComposable({
					featureFlag: false,
				});
				return { isRoomCopyFeatureEnabled };
			};

			it("should tell that it's is disabled", () => {
				const { isRoomCopyFeatureEnabled } = setup();
				expect(isRoomCopyFeatureEnabled.value).toBe(false);
			});
		});
	});

	describe("duplication info dialog", () => {
		const setup = () => {
			const {
				isRoomCopyInfoDialogOpen,
				openRoomCopyInfoDialog,
				closeRoomCopyInfoDialog,
			} = setupComposable({
				featureFlag: true,
			});
			return {
				isRoomCopyInfoDialogOpen,
				openRoomCopyInfoDialog,
				closeRoomCopyInfoDialog,
			};
		};

		it("should be closed by default", () => {
			const { isRoomCopyInfoDialogOpen } = setup();
			expect(isRoomCopyInfoDialogOpen.value).toBe(false);
		});

		describe("when open RoomCopyInfoDialog is called", () => {
			it("should open the dialog", () => {
				const { isRoomCopyInfoDialogOpen, openRoomCopyInfoDialog } = setup();
				openRoomCopyInfoDialog();
				expect(isRoomCopyInfoDialogOpen.value).toBe(true);
			});
		});

		describe("when close RoomCopyInfoDialog is called", () => {
			it("should close the dialog", () => {
				const { isRoomCopyInfoDialogOpen, closeRoomCopyInfoDialog } = setup();
				closeRoomCopyInfoDialog();
				expect(isRoomCopyInfoDialogOpen.value).toBe(false);
			});
		});
	});

	// TODO BC-9401: improve tests
	describe("copy", () => {
		const setup = () => {
			const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
			const { copy, isRoomCopyInfoDialogOpen } = setupComposable({
				featureFlag: true,
				mockedLoadingState: loadingStateModuleMock,
			});
			return { copy, isRoomCopyInfoDialogOpen, loadingStateModuleMock };
		};

		it("should close CopyInfoDialog when copying", async () => {
			const { copy, isRoomCopyInfoDialogOpen } = setup();
			await copy("string");
			expect(isRoomCopyInfoDialogOpen.value).toBe(false);
		});

		it("should open loading state when copying", async () => {
			const { copy, loadingStateModuleMock } = setup();
			await copy("string");
			expect(loadingStateModuleMock.open).toHaveBeenCalledWith(
				expect.objectContaining({
					text: expect.any(String),
				})
			);
		});

		it("should close loading state after duplicating", async () => {
			const { copy, loadingStateModuleMock } = setup();
			await copy("string");
			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});
	});
});
