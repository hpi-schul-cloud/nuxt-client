import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useBoardStore, useSocketConnection } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { setActivePinia } from "pinia";
import * as socketModule from "socket.io-client";
import { useI18n } from "vue-i18n";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("socket.io-client");
const mockSocketIOClient = jest.mocked(socketModule);

jest.mock("@util-board/BoardNotifier.composable");
const mockUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("../boardActions/boardSocketApi.composable");
jest.mock("../boardActions/boardRestApi.composable");

describe("socket.ts", () => {
	let dispatchMock: jest.Mock;
	let mockSocket: Partial<socketModule.Socket>;
	let timeoutResponseMock: { emitWithAck: jest.Mock };
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeAll(() => {
		timeoutResponseMock = { emitWithAck: jest.fn() };
		mockSocket = {
			connected: false,
			on: jest.fn(),
			emit: jest.fn(),
			connect: jest.fn(),
			disconnect: jest.fn(),
			onAny: jest.fn(),
			timeout: jest.fn().mockReturnValue(timeoutResponseMock),
		};
		mockSocketIOClient.io.mockReturnValue(mockSocket as socketModule.Socket);
	});

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			BOARD_COLLABORATION_URI: "mockedUri",
			FEATURE_COLUMN_BOARD_SOCKET_ENABLED: true,
		});
		envConfigModule.setEnvs(envs);

		mockedPiniaStoreTyping(useBoardStore);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		dispatchMock = jest.fn();
		mockSocket.connected = true;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("emitOnSocket", () => {
		it("should call emit", () => {
			const { emitOnSocket } = useSocketConnection(dispatchMock);

			emitOnSocket("deleteCard", {});

			expect(mockSocket.emit).toHaveBeenCalledWith("deleteCard", {});
		});

		it("should not call connect if connected already", () => {
			mockSocket.connected = true;
			const { emitOnSocket } = useSocketConnection(dispatchMock);

			emitOnSocket("deleteCard", {});

			expect(mockSocket.connect).not.toHaveBeenCalled();
		});

		it("should call connect if not connected yet", () => {
			mockSocket.connected = false;
			const { emitOnSocket } = useSocketConnection(dispatchMock);

			emitOnSocket("deleteCard", {});

			expect(mockSocket.connect).toHaveBeenCalled();
		});
	});

	describe("emitWithAck", () => {
		it("should call emitWithAck", () => {
			const { emitWithAck } = useSocketConnection(dispatchMock);

			emitWithAck("deleteCard", {});

			expect(mockSocket.timeout).toHaveBeenCalledWith(30000);
			expect(timeoutResponseMock.emitWithAck).toHaveBeenCalledWith(
				"deleteCard",
				{}
			);
		});
		it("should not call connect if connected already", () => {
			mockSocket.connected = true;
			const { emitWithAck } = useSocketConnection(dispatchMock);

			emitWithAck("deleteCard", {});

			expect(mockSocket.connect).not.toHaveBeenCalled();
		});

		it("should call connect if not connected yet", () => {
			mockSocket.connected = false;
			const { emitWithAck } = useSocketConnection(dispatchMock);

			emitWithAck("deleteCard", {});

			expect(mockSocket.connect).toHaveBeenCalled();
		});
	});

	describe("disconnectSocket", () => {
		it("should call disconnect", () => {
			const { disconnectSocket } = useSocketConnection(dispatchMock);

			disconnectSocket();

			expect(mockSocket.disconnect).toHaveBeenCalled();
		});
	});
});
