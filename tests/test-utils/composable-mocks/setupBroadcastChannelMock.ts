import { vi } from "vitest";

export function setupBroadcastChannelMock() {
	const broadcastPostMock = vi.fn();
	const broadcastCloseMock = vi.fn();

	// Mock BroadcastChannel
	const mockBroadcastChannel = {
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		postMessage: broadcastPostMock,
		close: broadcastCloseMock,
	};

	// Create mock constructor function
	class MockBroadcastChannelClass {
		addEventListener = mockBroadcastChannel.addEventListener;
		removeEventListener = mockBroadcastChannel.removeEventListener;
		postMessage = mockBroadcastChannel.postMessage;
		close = mockBroadcastChannel.close;

		constructor(name: string) {
			// constructor does nothing
		}
	}

	// Set up global mock
	Object.defineProperty(globalThis, "BroadcastChannel", {
		value: MockBroadcastChannelClass,
		writable: true,
		configurable: true,
	});

	const clearBroadcastChannelMocks = () => {
		broadcastPostMock.mockClear();
		broadcastCloseMock.mockClear();
		mockBroadcastChannel.addEventListener.mockClear();
		mockBroadcastChannel.removeEventListener.mockClear();
	};

	return {
		broadcastPostMock,
		broadcastCloseMock,
		mockBroadcastChannel,
		clearBroadcastChannelMocks,
	};
}
