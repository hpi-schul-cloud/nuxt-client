import { useFormerMembershipStore } from "./former-membership.store";
import { useNotificationStore } from "./notification-store";
import * as apiModule from "@/utils/api";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/utils/api", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/utils/api")>();
	return {
		...actual,
		$axios: {
			get: vi.fn(),
			post: vi.fn(),
			delete: vi.fn(),
		},
	};
});

describe("useFormerMembershipStore", () => {
	const mockedAxiosGet = vi.mocked(apiModule.$axios.get);
	const mockedAxiosPost = vi.mocked(apiModule.$axios.post);
	const mockedAxiosDelete = vi.mocked(apiModule.$axios.delete);

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.clearAllMocks();
		vi.spyOn(logger, "error").mockImplementation(vi.fn());
	});

	it("initializes with default empty state", () => {
		const store = useFormerMembershipStore();
		expect(store.items).toEqual([]);
		expect(store.hasFormerMemberships).toBe(false);
		expect(store.courseCount).toBe(0);
		expect(store.roomCount).toBe(0);
		expect(store.isDismissed).toBe(false);
	});

	it("fetches former memberships and updates counts", async () => {
		const mockData = [
			{ type: "course" as const, refId: "c-1", name: "Mathematik 10", schoolId: "s-1", schoolName: "Schule A" },
			{ type: "room" as const, refId: "r-1", name: "Lehrerzimmer", schoolId: "s-1", schoolName: "Schule A" },
		];
		mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

		const store = useFormerMembershipStore();
		const result = await store.fetchFormerMemberships();

		expect(mockedAxiosGet).toHaveBeenCalledWith("/v3/users/me/former-memberships");
		expect(result).toEqual(mockData);
		expect(store.items).toEqual(mockData);
		expect(store.hasFormerMemberships).toBe(true);
		expect(store.courseCount).toBe(1);
		expect(store.roomCount).toBe(1);
	});

	it("transfers a membership, removes it from items, and notifies success", async () => {
		const store = useFormerMembershipStore();
		store.items = [
			{ type: "course", refId: "c-1", name: "Mathematik 10", schoolId: "s-1" },
			{ type: "room", refId: "r-1", name: "Lehrerzimmer", schoolId: "s-1" },
		];

		mockedAxiosPost.mockResolvedValueOnce({
			data: { success: true, type: "course", refId: "c-1", newRefId: "c-new" },
		});

		const success = await store.transferMembership("course", "c-1", "Mathematik 10");

		expect(mockedAxiosPost).toHaveBeenCalledWith("/v3/users/me/former-memberships/course/c-1/transfer");
		expect(success).toBe(true);
		expect(store.items).toHaveLength(1);
		expect(store.items[0].refId).toBe("r-1");
		expect(useNotificationStore().notify).toHaveBeenCalledWith(expect.objectContaining({ status: "success" }));
	});

	it("transfers all memberships, removes transferred items, and notifies success", async () => {
		const store = useFormerMembershipStore();
		store.items = [
			{ type: "course", refId: "c-1", name: "Mathematik 10", schoolId: "s-1" },
			{ type: "room", refId: "r-1", name: "Lehrerzimmer", schoolId: "s-1" },
		];

		mockedAxiosPost.mockResolvedValueOnce({
			data: {
				total: 2,
				transferred: 2,
				failed: 0,
				results: [
					{ success: true, type: "course", refId: "c-1", newRefId: "c-2" },
					{ success: true, type: "room", refId: "r-1", newRefId: "r-2" },
				],
			},
		});

		const res = await store.transferAllMemberships();

		expect(mockedAxiosPost).toHaveBeenCalledWith("/v3/users/me/former-memberships/transfer-all");
		expect(res?.transferred).toBe(2);
		expect(store.items).toHaveLength(0);
		expect(useNotificationStore().notify).toHaveBeenCalledWith(expect.objectContaining({ status: "success" }));
	});

	it("discards a membership, removes it from items, and notifies success", async () => {
		const store = useFormerMembershipStore();
		store.items = [{ type: "course", refId: "c-1", name: "Mathematik 10", schoolId: "s-1" }];

		mockedAxiosDelete.mockResolvedValueOnce({ status: 204 });

		const success = await store.discardMembership("course", "c-1", "Mathematik 10");

		expect(mockedAxiosDelete).toHaveBeenCalledWith("/v3/users/me/former-memberships/course/c-1");
		expect(success).toBe(true);
		expect(store.items).toHaveLength(0);
		expect(useNotificationStore().notify).toHaveBeenCalledWith(expect.objectContaining({ status: "success" }));
	});

	it("dismisses the banner", () => {
		const store = useFormerMembershipStore();
		expect(store.isDismissed).toBe(false);
		store.dismissBanner();
		expect(store.isDismissed).toBe(true);
	});
});
