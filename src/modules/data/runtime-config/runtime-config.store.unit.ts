import { useRuntimeConfigStore } from "./runtime-config.store";
import { mockApi, mockApiResponse, runtimeConfigValueFactory } from "@@/tests/test-utils";
import { RuntimeConfigApiFactory, RuntimeConfigListItemResponseType, RuntimeConfigListResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@api-server");

describe("useRuntimeConfigStore", () => {
	const runtimeApiMock = mockApi<ReturnType<typeof RuntimeConfigApiFactory>>();

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.mocked(RuntimeConfigApiFactory).mockReturnValue(runtimeApiMock);
	});

	describe("fetchRuntimeConfig", () => {
		it("should fetch and store runtime config successfully", async () => {
			const configItems = runtimeConfigValueFactory.buildList(3);
			runtimeApiMock.runtimeConfigControllerGetRuntimeConfig.mockResolvedValue(
				mockApiResponse<RuntimeConfigListResponse>({ data: { data: configItems } })
			);

			const store = useRuntimeConfigStore();
			await store.fetchRuntimeConfig();

			expect(runtimeApiMock.runtimeConfigControllerGetRuntimeConfig).toHaveBeenCalled();
			expect(store.runtimeConfig[configItems[0].key]).toBe(configItems[0].value);
			expect(store.runtimeConfig[configItems[1].key]).toBe(configItems[1].value);
			expect(store.runtimeConfig[configItems[2].key]).toBe(configItems[2].value);
		});

		it("should show error notification when fetch fails", async () => {
			vi.spyOn(logger, "error").mockImplementation(vi.fn());
			runtimeApiMock.runtimeConfigControllerGetRuntimeConfig.mockRejectedValue(new Error("Network error"));

			const store = useRuntimeConfigStore();
			const success = await store.fetchRuntimeConfig();

			expect(success).toBe(false);
		});

		it("should handle config with missing description", async () => {
			const configItems = [
				runtimeConfigValueFactory.build({
					key: "CONFIG_KEY",
					value: "test-value",
					description: undefined,
				}),
			];
			runtimeApiMock.runtimeConfigControllerGetRuntimeConfig.mockResolvedValue(
				mockApiResponse<RuntimeConfigListResponse>({ data: { data: configItems } })
			);

			const store = useRuntimeConfigStore();
			await store.fetchRuntimeConfig();

			expect(store.runtimeConfig.CONFIG_KEY).toBe("test-value");
		});
	});

	describe("runtimeConfig", () => {
		it("should return an empty object when no config is loaded", () => {
			const store = useRuntimeConfigStore();

			expect(store.runtimeConfig).toEqual({});
		});

		it("should return transformed config with key-value pairs", async () => {
			const configItems = [
				runtimeConfigValueFactory.build({ key: "FEATURE_FLAG_A", value: "enabled" }),
				runtimeConfigValueFactory.build({
					key: "MAX_ITEMS",
					value: 100,
					type: RuntimeConfigListItemResponseType.NUMBER,
				}),
			];
			runtimeApiMock.runtimeConfigControllerGetRuntimeConfig.mockResolvedValue(
				mockApiResponse<RuntimeConfigListResponse>({ data: { data: configItems } })
			);

			const store = useRuntimeConfigStore();
			await store.fetchRuntimeConfig();

			expect(store.runtimeConfig).toEqual({
				FEATURE_FLAG_A: "enabled",
				MAX_ITEMS: 100,
			});
		});

		it("should be readonly", async () => {
			const configItems = runtimeConfigValueFactory.buildList(1);
			runtimeApiMock.runtimeConfigControllerGetRuntimeConfig.mockResolvedValue(
				mockApiResponse<RuntimeConfigListResponse>({ data: { data: configItems } })
			);

			const store = useRuntimeConfigStore();
			await store.fetchRuntimeConfig();

			// Attempting to modify should have no effect (readonly)
			const originalValue = store.runtimeConfig[configItems[0].key];
			(store.runtimeConfig as Record<string, string>)[configItems[0].key] = "modified";
			expect(store.runtimeConfig[configItems[0].key]).toBe(originalValue);
		});
	});

	describe("isLoading", () => {
		it("should be false initially", () => {
			const store = useRuntimeConfigStore();

			expect(store.isLoading).toBe(false);
		});

		it("should be true during API call", async () => {
			runtimeApiMock.runtimeConfigControllerGetRuntimeConfig.mockResolvedValue(
				mockApiResponse<RuntimeConfigListResponse>({ data: { data: [] } })
			);

			const store = useRuntimeConfigStore();
			const fetchPromise = store.fetchRuntimeConfig();

			expect(store.isLoading).toBe(true);
			await fetchPromise;
			expect(store.isLoading).toBe(false);
		});

		it("should be false after API call fails", async () => {
			vi.spyOn(logger, "error").mockImplementation(vi.fn());
			runtimeApiMock.runtimeConfigControllerGetRuntimeConfig.mockRejectedValue(new Error("Network error"));

			const store = useRuntimeConfigStore();
			await store.fetchRuntimeConfig();

			expect(store.isLoading).toBe(false);
		});
	});
});
