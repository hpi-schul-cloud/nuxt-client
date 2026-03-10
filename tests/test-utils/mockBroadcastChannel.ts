import { Mocked, vi } from "vitest";

export function mockBroadcastChannel(customImplementations: Partial<BroadcastChannel> = {}) {
	// Create shared mock that implements full BroadcastChannel interface
	const sharedMocks: BroadcastChannel = {
		name: "",
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		postMessage: vi.fn(),
		close: vi.fn(),
		dispatchEvent: vi.fn(),
		onmessage: vi.fn(),
		onmessageerror: vi.fn(),
		...customImplementations,
	};

	// Create mock constructor function that implements BroadcastChannel interface
	class MockBroadcastChannelClass implements BroadcastChannel {
		readonly name: string;
		addEventListener = sharedMocks.addEventListener;
		removeEventListener = sharedMocks.removeEventListener;
		postMessage = sharedMocks.postMessage;
		close = sharedMocks.close;
		dispatchEvent = sharedMocks.dispatchEvent;
		onmessage = sharedMocks.onmessage;
		onmessageerror = sharedMocks.onmessageerror;

		constructor(name: string) {
			this.name = name;
		}
	}

	// Set up global mock
	Object.defineProperty(globalThis, "BroadcastChannel", {
		value: MockBroadcastChannelClass,
		writable: true,
		configurable: true,
	});

	return sharedMocks as Mocked<BroadcastChannel>;
}
