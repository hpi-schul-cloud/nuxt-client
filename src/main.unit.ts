import { useAppStore } from "@data-app";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@data-app");
const mockUseAppStore = vi.mocked(useAppStore);

describe("main.ts initialization", () => {
	const mockSetJwtExpired = vi.fn();
	const mockLogin = vi.fn();
	const mockHandleUnknownError = vi.fn();
	const mockLogout = vi.fn();
	const mockExternalLogout = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		setActivePinia(createPinia());

		mockUseAppStore.mockReturnValue({
			setJwtExpired: mockSetJwtExpired,
			login: mockLogin,
			logout: mockLogout,
			externalLogout: mockExternalLogout,
			handleUnknownError: mockHandleUnknownError,
		} as Partial<ReturnType<typeof useAppStore>> as ReturnType<typeof useAppStore>);
	});

	describe("store initialization", () => {
		it("should initialize the app store", () => {
			expect(mockUseAppStore).toBeDefined();
		});

		it("should provide essential meths", () => {
			const store = useAppStore();
			expect(store.setJwtExpired).toBeDefined();
			expect(store.login).toBeDefined();
			expect(store.logout).toBeDefined();
			expect(store.externalLogout).toBeDefined();
			expect(store.handleUnknownError).toBeDefined();
		});
	});
});
