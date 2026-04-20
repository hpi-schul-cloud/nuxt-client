import * as asyncTasks from "@/composables/async-tasks.composable";
import { mountComposable } from "@@/tests/test-utils";
import * as apiServer from "@api-server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

const SYSTEM_ID = "system-1";
const SYSTEM_RESPONSE = {
	data: {
		id: SYSTEM_ID,
		displayName: "Test System",
		oauthConfig: { endSessionEndpoint: "some-endpoint" },
	},
};

describe("useSystem", () => {
	let systemApi: { systemControllerGetSystem: ReturnType<typeof vi.fn> };
	let execute: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		systemApi = { systemControllerGetSystem: vi.fn() };
		vi.spyOn(apiServer, "SystemsApiFactory").mockReturnValue(
			systemApi as unknown as ReturnType<typeof apiServer.SystemsApiFactory>
		);
		execute = vi.fn();
		vi.spyOn(asyncTasks, "useSafeAxiosTask").mockReturnValue({ execute } as unknown as ReturnType<
			typeof asyncTasks.useSafeAxiosTask
		>);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("fetches system data and sets refs on success", async () => {
		execute.mockResolvedValueOnce({ result: SYSTEM_RESPONSE });
		const { useSystem } = await import("./system.composable");
		const { system, systemName, fetchSystem } = mountComposable(() => useSystem(SYSTEM_ID, false));

		await fetchSystem();
		await nextTick();

		expect(system.value).toEqual({
			id: SYSTEM_ID,
			displayName: "Test System",
			hasEndSessionEndpoint: true,
		});
		expect(systemName.value).toBe("Test System");
		expect(execute).toHaveBeenCalledWith(expect.any(Function));
	});

	it("does not set refs if result is undefined", async () => {
		execute.mockResolvedValueOnce({ result: undefined });
		const { useSystem } = await import("./system.composable");
		const { system, systemName, fetchSystem } = mountComposable(() => useSystem(SYSTEM_ID, false));

		await fetchSystem();
		await nextTick();

		expect(system.value).toBeUndefined();
		expect(systemName.value).toBeUndefined();
	});

	it("fetches immediately if fetchImmediate is true", async () => {
		execute.mockResolvedValueOnce({ result: SYSTEM_RESPONSE });
		const { useSystem } = await import("./system.composable");
		mountComposable(() => useSystem(SYSTEM_ID, true));

		await nextTick();

		expect(execute).toHaveBeenCalledWith(expect.any(Function));
	});
});
