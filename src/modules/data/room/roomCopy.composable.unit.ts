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
				isDuplicationInfoDialogOpen,
				openDuplicationInfoDialog,
				closeDuplicationInfoDialog,
			} = setupComposable({
				featureFlag: true,
			});
			return {
				isDuplicationInfoDialogOpen,
				openDuplicationInfoDialog,
				closeDuplicationInfoDialog,
			};
		};

		it("should be closed by default", () => {
			const { isDuplicationInfoDialogOpen } = setup();
			expect(isDuplicationInfoDialogOpen.value).toBe(false);
		});

		describe("when open DuplicationInfoDialog is called", () => {
			it("should open the dialog", () => {
				const { isDuplicationInfoDialogOpen, openDuplicationInfoDialog } =
					setup();
				openDuplicationInfoDialog();
				expect(isDuplicationInfoDialogOpen.value).toBe(true);
			});
		});

		describe("when close DuplicationInfoDialog is called", () => {
			it("should close the dialog", () => {
				const { isDuplicationInfoDialogOpen, closeDuplicationInfoDialog } =
					setup();
				closeDuplicationInfoDialog();
				expect(isDuplicationInfoDialogOpen.value).toBe(false);
			});
		});
	});

	// TODO BC-9401: improve tests
	describe("duplicate", () => {
		const setup = () => {
			const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
			const { duplicate, isDuplicationInfoDialogOpen } = setupComposable({
				featureFlag: true,
				mockedLoadingState: loadingStateModuleMock,
			});
			return { duplicate, isDuplicationInfoDialogOpen, loadingStateModuleMock };
		};

		it("should close DuplicationInfoDialog when duplicating", async () => {
			const { duplicate, isDuplicationInfoDialogOpen } = setup();
			await duplicate("string");
			expect(isDuplicationInfoDialogOpen.value).toBe(false);
		});

		it("should open loading state when duplicating", async () => {
			const { duplicate, loadingStateModuleMock } = setup();
			await duplicate("string");
			expect(loadingStateModuleMock.open).toHaveBeenCalledWith(
				expect.objectContaining({
					text: expect.any(String),
				})
			);
		});

		it("should close loading state after duplicating", async () => {
			const { duplicate, loadingStateModuleMock } = setup();
			await duplicate("string");
			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});
	});
});
