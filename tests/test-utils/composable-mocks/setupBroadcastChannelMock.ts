import { vi } from "vitest";

export function setupBroadcastChannelMock() {
	// Mock BroadcastChannel
	const mockBroadcastChannel = {
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		postMessage: vi.fn(),
		close: vi.fn(),
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

	return {
		mockBroadcastChannel,
	};
}
