import { useSystem } from "./system.composable";
import { mockApi, mockApiResponse } from "@@/tests/test-utils";
import { publicSystemResponseFactory } from "@@/tests/test-utils/factory/publicSystemResponseFactory";
import * as serverApi from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { ref } from "vue";

describe("useSystem", () => {
	let systemApiMock: Mocked<serverApi.SystemsApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		systemApiMock = mockApi<serverApi.SystemsApiInterface>();
		vi.spyOn(serverApi, "SystemsApiFactory").mockReturnValue(systemApiMock);
	});

	it("fetches and sets system data when systemId is provided", async () => {
		const systemId = ref("abc");
		const mockSystem = publicSystemResponseFactory.build();
		systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockSystem }));

		const { system, systemName } = useSystem(systemId);
		await flushPromises();

		expect(system.value).toEqual(mockSystem);
		expect(systemName.value).toEqual(mockSystem.displayName);
	});

	it("does not fetch system if systemId is undefined", async () => {
		const systemId = ref<string | undefined>(undefined);

		useSystem(systemId);
		await flushPromises();
		expect(systemApiMock.systemControllerGetSystem).not.toHaveBeenCalled();
	});

	it("does not set system if fetch fails", async () => {
		const systemId = ref("fail");
		systemApiMock.systemControllerGetSystem.mockRejectedValueOnce({});

		const { system } = useSystem(systemId);
		await flushPromises();

		expect(system.value).toBeUndefined();
	});
});
