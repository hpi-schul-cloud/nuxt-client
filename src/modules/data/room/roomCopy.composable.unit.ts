import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { envsFactory, mountComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useRoomsState } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useRoomCopy } from "./roomCopy.composable";
import {
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "@/serverApi/v3";

jest.mock("@data-room/Rooms.state");

describe("roomCopy", () => {
	let useRoomsStateMock: DeepMocked<ReturnType<typeof useRoomsState>>;

	beforeEach(() => {
		useRoomsStateMock = createMock<ReturnType<typeof useRoomsState>>({
			copyRoom: jest.fn(),
		});
		jest.mocked(useRoomsState).mockReturnValue(useRoomsStateMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const setupComposable = (options: {
		featureFlag: boolean;
		mockedLoadingState?: jest.Mocked<LoadingStateModule>;
	}) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({
				FEATURE_ROOM_COPY_ENABLED: options.featureFlag,
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
	describe("executeRoomCopy", () => {
		const setupCopyExecution = () => {
			const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
			const { executeRoomCopy, isRoomCopyInfoDialogOpen } = setupComposable({
				featureFlag: true,
				mockedLoadingState: loadingStateModuleMock,
			});
			return {
				executeRoomCopy,
				isRoomCopyInfoDialogOpen,
				loadingStateModuleMock,
			};
		};

		describe("when copyRoom is successful", () => {
			const setup = () => {
				useRoomsStateMock.copyRoom.mockResolvedValue({
					id: "copyRoomId",
					type: CopyApiResponseTypeEnum.Room,
					status: CopyApiResponseStatusEnum.Success,
				});
				const composable = setupCopyExecution();
				return composable;
			};

			it("should call copyRoom with the correct roomId", async () => {
				const { executeRoomCopy } = setup();
				await executeRoomCopy("roomId");
				expect(useRoomsStateMock.copyRoom).toHaveBeenCalledWith("roomId");
			});

			it("should close CopyInfoDialog when copying", async () => {
				const { executeRoomCopy, isRoomCopyInfoDialogOpen } = setup();
				await executeRoomCopy("roomId");
				expect(isRoomCopyInfoDialogOpen.value).toBe(false);
			});

			it("should open loading state when copying", async () => {
				const { executeRoomCopy, loadingStateModuleMock } = setup();
				await executeRoomCopy("roomId");
				expect(loadingStateModuleMock.open).toHaveBeenCalledWith(
					expect.objectContaining({
						text: expect.any(String),
					})
				);
			});

			it("should close loading state after copying", async () => {
				const { executeRoomCopy, loadingStateModuleMock } = setup();
				await executeRoomCopy("roomId");
				expect(loadingStateModuleMock.close).toHaveBeenCalled();
			});
		});

		describe("when copyRoom fails", () => {
			const setup = () => {
				useRoomsStateMock.copyRoom.mockRejectedValue(new Error("error"));
				const composable = setupCopyExecution();
				return composable;
			};

			it("should call copyRoom with the correct roomId", async () => {
				const { executeRoomCopy } = setup();
				await expect(executeRoomCopy("roomId")).rejects.toThrow(
					new Error("error")
				);
				expect(useRoomsStateMock.copyRoom).toHaveBeenCalledWith("roomId");
			});

			it("should close loading state after copying", async () => {
				const { executeRoomCopy, loadingStateModuleMock } = setup();
				await expect(executeRoomCopy("roomId")).rejects.toThrow(
					new Error("error")
				);
				expect(loadingStateModuleMock.close).toHaveBeenCalled();
			});
		});

		describe("when copyRoom returns no id", () => {
			const setup = () => {
				useRoomsStateMock.copyRoom.mockResolvedValue({
					id: undefined,
					type: CopyApiResponseTypeEnum.Room,
					status: CopyApiResponseStatusEnum.Failure,
				});
				const composable = setupCopyExecution();
				return composable;
			};

			it("should call copyRoom with the correct roomId", async () => {
				const { executeRoomCopy } = setup();
				await expect(executeRoomCopy("roomId")).rejects.toThrow();
				expect(useRoomsStateMock.copyRoom).toHaveBeenCalledWith("roomId");
			});

			it("should close loading state after copying", async () => {
				const { executeRoomCopy, loadingStateModuleMock } = setup();
				await expect(executeRoomCopy("roomId")).rejects.toThrow();
				expect(loadingStateModuleMock.close).toHaveBeenCalled();
			});
		});
	});
});
