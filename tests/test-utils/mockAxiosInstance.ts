import type { AxiosInstance } from "axios";
import { Mocked } from "vitest";

export const mockAxiosInstance = (): Mocked<AxiosInstance> =>
	({
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		delete: vi.fn(),
		patch: vi.fn(),
		head: vi.fn(),
		options: vi.fn(),
		request: vi.fn(),
		defaults: {},
		interceptors: {
			request: { use: vi.fn(), eject: vi.fn() },
			response: { use: vi.fn(), eject: vi.fn() },
		},
	}) as unknown as Mocked<AxiosInstance>;
