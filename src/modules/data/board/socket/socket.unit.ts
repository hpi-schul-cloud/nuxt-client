import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useSocketConnection } from "@data-board";

import * as socketModule from "socket.io-client";

jest.mock("socket.io-client");
const mockSocketIOClient = jest.mocked(socketModule);

describe("socket.ts", () => {
	let dispatchMock: jest.Mock;
	let mockSocket: Partial<socketModule.Socket>;
	let timeoutResponseMock: { emitWithAck: jest.Mock };

	beforeAll(() => {
		timeoutResponseMock = { emitWithAck: jest.fn() };
		mockSocket = {
			connected: false,
			emit: jest.fn(),
			connect: jest.fn(),
			disconnect: jest.fn(),
			onAny: jest.fn(),
			timeout: jest.fn().mockReturnValue(timeoutResponseMock),
		};
		mockSocketIOClient.io.mockReturnValue(mockSocket as socketModule.Socket);
	});

	beforeEach(() => {
		setupStores({ envConfigModule: EnvConfigModule });
		const envs = envsFactory.build({
			BOARD_COLLABORATION_URI: "mockedUri",
		});
		envConfigModule.setEnvs(envs);

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
