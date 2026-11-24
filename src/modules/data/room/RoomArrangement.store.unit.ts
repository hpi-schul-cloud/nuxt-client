import { ROOM_ARRANGEMENT_REQUEST_TIMEOUT_MS, useRoomArrangementStore } from "./RoomArrangement.store";
import { RoomItem } from "@/types/room/Room";
import {
	createTestAppStoreWithUser,
	expectNotification,
	mockApi,
	mockApiResponse,
	roomArrangementResponseFactory,
	roomGroupResponseFactory,
	roomItemFactory,
} from "@@/tests/test-utils";
import {
	Configuration,
	RoomApiFactory,
	RoomArrangementApiFactory,
	RoomArrangementResponse,
	RoomGroupCreatedResponse,
	RoomListResponse,
} from "@api-server";
import { useAppStore, useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { nextTick } from "vue";

vi.mock("@api-server");

type ArrangementApi = ReturnType<typeof RoomArrangementApiFactory>;
type RoomApi = ReturnType<typeof RoomApiFactory>;

// Real AxiosError instances: useSafeTask wraps anything that is not an Error.
const apiError = (status: number, type: string, details?: Record<string, unknown>) =>
	new AxiosError("Request failed", "ERR_BAD_REQUEST", undefined, undefined, {
		status,
		statusText: "",
		headers: {},
		config: { headers: new AxiosHeaders() },
		data: { code: status, type, title: type, message: "server text", details },
	});

const networkError = () => new AxiosError("Network Error", AxiosError.ERR_NETWORK);

const deferred = <T>() => {
	let resolve: (value: T) => void = () => undefined;
	let reject: (reason: unknown) => void = () => undefined;
	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
};

describe("useRoomArrangementStore", () => {
	let arrangementApi: Mocked<ArrangementApi>;
	let roomApi: Mocked<RoomApi>;
	let rooms: RoomItem[];

	const respond = <T>(data: T): AxiosResponse<T> => mockApiResponse<T>({ data });

	const mockRooms = (items: RoomItem[]) => {
		roomApi.roomControllerGetRooms.mockResolvedValue(respond<RoomListResponse>({ data: items }));
	};

	const mockArrangement = (arrangement: RoomArrangementResponse) => {
		arrangementApi.roomArrangementControllerGetArrangement.mockResolvedValue(respond(arrangement));
	};

	const groupA = roomGroupResponseFactory.build({ id: "aaaaaaaaaaaaaaaaaaaaaaaa", name: "Informatik" });
	const groupB = roomGroupResponseFactory.build({ id: "bbbbbbbbbbbbbbbbbbbbbbbb", name: "Deutsch" });

	const setupLoaded = async (arrangement?: Partial<RoomArrangementResponse>) => {
		const initial = roomArrangementResponseFactory.build({
			revision: 3,
			ungroupedRoomIds: [rooms[0].id],
			groups: [
				{ ...groupA, roomIds: [rooms[1].id, rooms[2].id] },
				{ ...groupB, roomIds: [] },
			],
			...arrangement,
		});
		mockRooms(rooms);
		mockArrangement(initial);
		const store = useRoomArrangementStore();
		await store.loadOverview();
		return { store, initial };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		arrangementApi = mockApi<ArrangementApi>();
		roomApi = mockApi<RoomApi>();
		vi.mocked(RoomArrangementApiFactory).mockReturnValue(arrangementApi);
		vi.mocked(RoomApiFactory).mockReturnValue(roomApi);
		vi.spyOn(logger, "error").mockImplementation(vi.fn());
		rooms = roomItemFactory.buildList(3);
	});

	describe("loadOverview", () => {
		it("loads rooms and arrangement and enables editing", async () => {
			const { store } = await setupLoaded();

			expect(store.isReady).toBe(true);
			expect(store.canEdit).toBe(true);
			expect(store.view?.ungrouped.map((r) => r.id)).toEqual([rooms[0].id]);
			expect(store.view?.groups.map((g) => g.rooms.map((r) => r.id))).toEqual([[rooms[1].id, rooms[2].id], []]);
			expect(useNotificationStore().notify).not.toHaveBeenCalled();
		});

		it("keeps empty groups", async () => {
			const { store } = await setupLoaded();

			expect(store.view?.groups[1]).toEqual({ id: groupB.id, name: "Deutsch", collapsed: false, rooms: [] });
		});

		it("never presents a failed arrangement fetch as an empty arrangement", async () => {
			mockRooms(rooms);
			arrangementApi.roomArrangementControllerGetArrangement.mockRejectedValue(apiError(500, "INTERNAL"));
			const store = useRoomArrangementStore();

			const success = await store.loadOverview();

			expect(success).toBe(false);
			expect(store.arrangementStatus).toBe("error");
			expect(store.hasLoadError).toBe(true);
			expect(store.view).toBeUndefined();
			expect(store.isEmpty).toBe(false);
			expect(store.canEdit).toBe(false);
			expectNotification("error");
		});

		it("disables editing when the rooms could not be loaded", async () => {
			roomApi.roomControllerGetRooms.mockRejectedValue(apiError(500, "INTERNAL"));
			mockArrangement(roomArrangementResponseFactory.build());
			const store = useRoomArrangementStore();

			const success = await store.loadOverview();

			expect(success).toBe(false);
			expect(store.roomsStatus).toBe("error");
			expect(store.canEdit).toBe(false);
		});

		it("shows rooms missing in the arrangement at the end of the ungrouped section only", async () => {
			const extraRoom = roomItemFactory.build();
			rooms.push(extraRoom);
			const { store } = await setupLoaded();

			expect(store.view?.ungrouped.map((r) => r.id)).toEqual([rooms[0].id, extraRoom.id]);
			expect(arrangementApi.roomArrangementControllerMoveRoom).not.toHaveBeenCalled();
		});

		it("refetches rooms and arrangement exactly once for unknown room ids without treating them as deleted", async () => {
			const { store } = await setupLoaded({ ungroupedRoomIds: [rooms[0].id, "unknown-room"] });

			expect(roomApi.roomControllerGetRooms).toHaveBeenCalledTimes(2);
			expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(2);
			expect(store.unknownRoomIds).toEqual(["unknown-room"]);
			expect(store.confirmed?.ungroupedRoomIds).toEqual([rooms[0].id, "unknown-room"]);
			expect(store.view?.ungrouped.map((r) => r.id)).toEqual([rooms[0].id]);
		});

		it("ignores the response of an outdated load", async () => {
			mockRooms(rooms);
			const first = deferred<AxiosResponse<RoomArrangementResponse>>();
			arrangementApi.roomArrangementControllerGetArrangement
				.mockReturnValueOnce(first.promise)
				.mockResolvedValueOnce(respond(roomArrangementResponseFactory.build({ revision: 7 })));
			const store = useRoomArrangementStore();

			const firstLoad = store.loadOverview();
			await store.loadOverview();
			first.resolve(respond(roomArrangementResponseFactory.build({ revision: 1, ungroupedRoomIds: [rooms[0].id] })));
			await firstLoad;

			expect(store.confirmed?.revision).toBe(7);
		});
	});

	describe("createGroup", () => {
		it("sends the name with the confirmed revision and returns the created group id", async () => {
			const { store } = await setupLoaded();
			const created: RoomGroupCreatedResponse = {
				...roomArrangementResponseFactory.build({
					revision: 4,
					groups: [groupA, groupB, { ...groupA, id: "c".repeat(24) }],
				}),
				createdGroupId: "c".repeat(24),
			};
			arrangementApi.roomArrangementControllerCreateGroup.mockResolvedValue(respond(created));

			const result = await store.createGroup("Mathe");

			expect(arrangementApi.roomArrangementControllerCreateGroup).toHaveBeenCalledWith({
				expectedRevision: 3,
				name: "Mathe",
			});
			expect(result).toEqual(expect.objectContaining({ success: true, createdGroupId: "c".repeat(24) }));
			expect(store.confirmed?.revision).toBe(4);
			expect(store.canEdit).toBe(true);
		});

		it.each(["REQUIRED", "TOO_LONG", "INVALID_CHARACTERS"] as const)(
			"returns name error %s for inline display without a toast",
			async (reason) => {
				const { store } = await setupLoaded();
				arrangementApi.roomArrangementControllerCreateGroup.mockRejectedValue(
					apiError(400, "ROOM_GROUP_NAME_INVALID", { field: "name", reason })
				);

				const result = await store.createGroup("x");

				expect(result).toEqual({ success: false, failure: "name", nameError: reason });
				expect(useNotificationStore().notify).not.toHaveBeenCalled();
				expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(1);
			}
		);

		it("returns duplicate name errors for inline display without a toast", async () => {
			const { store } = await setupLoaded();
			arrangementApi.roomArrangementControllerCreateGroup.mockRejectedValue(
				apiError(400, "ROOM_GROUP_NAME_DUPLICATE", { field: "name" })
			);

			const result = await store.createGroup("informatik");

			expect(result).toEqual({ success: false, failure: "name", nameError: "DUPLICATE" });
			expect(useNotificationStore().notify).not.toHaveBeenCalled();
		});

		it("does not report success, refetches and never retries when the response got lost", async () => {
			const { store } = await setupLoaded();
			arrangementApi.roomArrangementControllerCreateGroup.mockRejectedValue(networkError());

			const result = await store.createGroup("Mathe");

			expect(result).toEqual({ success: false, failure: "uncertain" });
			expect(arrangementApi.roomArrangementControllerCreateGroup).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(2);
			expect(roomApi.roomControllerGetRooms).toHaveBeenCalledTimes(2);
			expect(useNotificationStore().notify).toHaveBeenCalledTimes(1);
			expectNotification("error");
		});

		it("configures a request timeout so a hanging request cannot block editing", async () => {
			await setupLoaded();

			expect(Configuration).toHaveBeenCalledWith({ baseOptions: { timeout: ROOM_ARRANGEMENT_REQUEST_TIMEOUT_MS } });
			expect(vi.mocked(RoomArrangementApiFactory).mock.calls[0][0]).toBeInstanceOf(Configuration);
		});

		it("treats a timed out request as an unknown outcome and refetches", async () => {
			const { store } = await setupLoaded();
			arrangementApi.roomArrangementControllerCreateGroup.mockRejectedValue(
				new AxiosError("timeout of 20000ms exceeded", AxiosError.ECONNABORTED)
			);

			const result = await store.createGroup("Mathe");

			expect(result).toEqual({ success: false, failure: "uncertain" });
			expect(arrangementApi.roomArrangementControllerCreateGroup).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(2);
			expect(store.canEdit).toBe(true);
		});

		it("treats an unusable success response as an unknown outcome", async () => {
			const { store } = await setupLoaded();
			// mockApiResponse without data yields an empty body
			arrangementApi.roomArrangementControllerCreateGroup.mockResolvedValue(
				mockApiResponse<RoomGroupCreatedResponse>({})
			);

			const result = await store.createGroup("Mathe");

			expect(result).toEqual({ success: false, failure: "uncertain" });
			expect(store.confirmed?.revision).toBe(3);
		});

		it("treats a server error as an unknown outcome", async () => {
			const { store } = await setupLoaded();
			arrangementApi.roomArrangementControllerCreateGroup.mockRejectedValue(apiError(503, "UNAVAILABLE"));

			const result = await store.createGroup("Mathe");

			expect(result).toEqual({ success: false, failure: "uncertain" });
			expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(2);
		});
	});

	describe("optimistic updates", () => {
		it("applies a rename optimistically and replaces it with the server response", async () => {
			const { store, initial } = await setupLoaded();
			const request = deferred<AxiosResponse<RoomArrangementResponse>>();
			arrangementApi.roomArrangementControllerUpdateGroup.mockReturnValue(request.promise);

			const pending = store.renameGroup(groupA.id, "Info");

			expect(store.view?.groups[0].name).toBe("Info");
			expect(store.isMutating).toBe(true);
			expect(store.canEdit).toBe(false);

			const saved = { ...initial, revision: 4, groups: [{ ...initial.groups[0], name: "Info " }, initial.groups[1]] };
			request.resolve(respond(saved));
			await pending;

			expect(store.view?.groups[0].name).toBe("Info ");
			expect(store.confirmed?.revision).toBe(4);
			expect(store.isMutating).toBe(false);
		});

		it("rolls back and shows a translated error on a rejected request without refetching", async () => {
			const { store } = await setupLoaded();
			arrangementApi.roomArrangementControllerUpdateGroup.mockRejectedValue(apiError(404, "ROOM_GROUP_NOT_FOUND"));

			const result = await store.renameGroup(groupA.id, "Info");

			expect(result).toEqual({ success: false, failure: "rejected" });
			expect(store.view?.groups[0].name).toBe("Informatik");
			expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(1);
			expectNotification("error");
		});

		it("rolls back and refetches arrangement and rooms on a revision conflict", async () => {
			const { store } = await setupLoaded();
			arrangementApi.roomArrangementControllerMoveRoom.mockRejectedValue(
				apiError(409, "ROOM_ARRANGEMENT_CONFLICT", { reason: "REVISION" })
			);
			const refreshed = roomArrangementResponseFactory.build({
				revision: 9,
				ungroupedRoomIds: rooms.map((room) => room.id),
			});
			mockArrangement(refreshed);

			const result = await store.moveRoom({
				roomId: rooms[0].id,
				sourceGroupId: null,
				targetGroupId: groupB.id,
				beforeRoomId: null,
			});

			expect(result).toEqual({ success: false, failure: "uncertain" });
			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenCalledTimes(1);
			expect(roomApi.roomControllerGetRooms).toHaveBeenCalledTimes(2);
			expect(store.confirmed?.revision).toBe(9);
			expect(store.view?.ungrouped.map((r) => r.id)).toEqual(rooms.map((room) => room.id));
			expect(store.canEdit).toBe(true);
		});

		it("rejects further mutations while one is in flight", async () => {
			const { store } = await setupLoaded();
			arrangementApi.roomArrangementControllerUpdateGroup.mockReturnValue(new Promise(() => undefined));

			store.setGroupCollapsed(groupA.id, true);
			const second = await store.createGroup("Mathe");

			expect(second).toEqual({ success: false, failure: "busy" });
			expect(arrangementApi.roomArrangementControllerCreateGroup).not.toHaveBeenCalled();
		});

		it("rejects mutations before the overview is loaded", async () => {
			const store = useRoomArrangementStore();

			const result = await store.createGroup("Mathe");

			expect(result).toEqual({ success: false, failure: "busy" });
		});
	});

	describe("request serialization", () => {
		it("collapses a group", async () => {
			const { store } = await setupLoaded();

			store.setGroupCollapsed(groupA.id, true);

			expect(store.view?.groups[0].collapsed).toBe(true);
			expect(arrangementApi.roomArrangementControllerUpdateGroup).toHaveBeenCalledWith(groupA.id, {
				expectedRevision: 3,
				collapsed: true,
			});
		});

		it("deletes a group without opting out of confirmations", async () => {
			const { store } = await setupLoaded();

			store.deleteGroup(groupA.id);

			expect(arrangementApi.roomArrangementControllerDeleteGroup).toHaveBeenCalledWith(groupA.id, {
				expectedRevision: 3,
			});
			expect(store.view?.groups.map((g) => g.id)).toEqual([groupB.id]);
			expect(store.view?.ungrouped.map((r) => r.id)).toEqual(rooms.map((room) => room.id));
		});

		it("deletes a group and opts out of future confirmations in the same request", async () => {
			const { store } = await setupLoaded();

			store.deleteGroup(groupA.id, true);

			expect(arrangementApi.roomArrangementControllerDeleteGroup).toHaveBeenCalledWith(groupA.id, {
				expectedRevision: 3,
				disableFutureConfirmation: true,
			});
			expect(store.working?.confirmGroupDeletion).toBe(false);
		});

		it("sends room moves with explicit null fields", async () => {
			const { store } = await setupLoaded();

			store.moveRoom({ roomId: rooms[1].id, sourceGroupId: groupA.id, targetGroupId: null, beforeRoomId: null });

			const [body] = arrangementApi.roomArrangementControllerMoveRoom.mock.calls[0];
			expect(body).toStrictEqual({
				expectedRevision: 3,
				roomId: rooms[1].id,
				sourceGroupId: groupA.id,
				targetGroupId: null,
				beforeRoomId: null,
			});
			expect(JSON.parse(JSON.stringify(body))).toHaveProperty("beforeRoomId", null);
			expect(store.view?.ungrouped.map((r) => r.id)).toEqual([rooms[0].id, rooms[1].id]);
		});

		it("inserts optimistically before the anchor room", async () => {
			const { store } = await setupLoaded();

			store.moveRoom({ roomId: rooms[0].id, sourceGroupId: null, targetGroupId: groupA.id, beforeRoomId: rooms[2].id });

			expect(store.view?.groups[0].rooms.map((r) => r.id)).toEqual([rooms[1].id, rooms[0].id, rooms[2].id]);
		});

		it("sends the group order", async () => {
			const { store } = await setupLoaded();

			store.moveGroup(groupA.id, 1);

			expect(arrangementApi.roomArrangementControllerUpdateGroupOrder).toHaveBeenCalledWith({
				expectedRevision: 3,
				groupIds: [groupB.id, groupA.id],
			});
			expect(store.view?.groups.map((g) => g.id)).toEqual([groupB.id, groupA.id]);
		});

		it("does not move the first group further up", async () => {
			const { store } = await setupLoaded();

			const result = await store.moveGroup(groupA.id, -1);

			expect(result.success).toBe(false);
			expect(arrangementApi.roomArrangementControllerUpdateGroupOrder).not.toHaveBeenCalled();
		});

		it("updates the deletion confirmation preference", async () => {
			const { store } = await setupLoaded({ confirmGroupDeletion: false });

			store.setConfirmGroupDeletion(true);

			expect(arrangementApi.roomArrangementControllerUpdatePreferences).toHaveBeenCalledWith({
				expectedRevision: 3,
				confirmGroupDeletion: true,
			});
		});
	});

	describe("reset", () => {
		it("clears all state and ignores responses of requests started before", async () => {
			const { store } = await setupLoaded();
			const request = deferred<AxiosResponse<RoomArrangementResponse>>();
			arrangementApi.roomArrangementControllerUpdateGroup.mockReturnValue(request.promise);

			const pending = store.renameGroup(groupA.id, "Info");
			store.reset();
			request.resolve(respond(roomArrangementResponseFactory.build({ revision: 4, groups: [groupA] })));
			const result = await pending;

			expect(result).toEqual({ success: false, failure: "stale" });
			expect(store.confirmed).toBeNull();
			expect(store.view).toBeUndefined();
			expect(store.isMutating).toBe(false);
			expect(store.arrangementStatus).toBe("idle");
		});

		it("resets when the authenticated user changes", async () => {
			createTestAppStoreWithUser("user-a");
			const { store } = await setupLoaded();

			createTestAppStoreWithUser("user-b");
			await nextTick();

			expect(store.confirmed).toBeNull();
			expect(store.view).toBeUndefined();
		});

		it("resets on logout", async () => {
			useAppStore().$patch({ isLoggedIn: true });
			const { store } = await setupLoaded();

			useAppStore().$patch({ isLoggedIn: false });
			await nextTick();

			expect(store.confirmed).toBeNull();
		});
	});

	describe("round 3 commands", () => {
		it("collapses all groups with one request", async () => {
			const { store } = await setupLoaded();

			store.setAllGroupsCollapsed(true);

			expect(arrangementApi.roomArrangementControllerUpdateGroupsCollapsed).toHaveBeenCalledWith({
				expectedRevision: 3,
				collapsed: true,
			});
			expect(store.view?.groups.every((group) => group.collapsed)).toBe(true);
		});

		it("moves several rooms with one request and appends them in the given order", async () => {
			const { store } = await setupLoaded();

			store.moveRooms([rooms[2].id, rooms[0].id], groupB.id);

			expect(arrangementApi.roomArrangementControllerMoveRooms).toHaveBeenCalledWith({
				expectedRevision: 3,
				roomIds: [rooms[2].id, rooms[0].id],
				targetGroupId: groupB.id,
			});
			expect(store.view?.groups[1].rooms.map((r) => r.id)).toEqual([rooms[2].id, rooms[0].id]);
			expect(store.view?.ungrouped).toEqual([]);
		});
	});

	describe("collapse toggles while a change is saved", () => {
		it("shows the new state at once and persists it after the pending change", async () => {
			const { initial } = await setupLoaded();
			const store = useRoomArrangementStore();
			const order = deferred<AxiosResponse<RoomArrangementResponse>>();
			arrangementApi.roomArrangementControllerUpdateGroupOrder.mockReturnValue(order.promise);
			const reordered = { ...initial, revision: 4, groups: [initial.groups[1], initial.groups[0]] };
			arrangementApi.roomArrangementControllerUpdateGroup.mockResolvedValue(
				respond({
					...reordered,
					revision: 5,
					groups: [{ ...reordered.groups[0], collapsed: true }, reordered.groups[1]],
				})
			);

			const pendingOrder = store.moveGroup(groupA.id, 1);
			const isApplied = await store.requestGroupCollapsed(groupB.id, true);

			expect(isApplied).toBe(true);
			expect(store.view?.groups.find((g) => g.id === groupB.id)?.collapsed).toBe(true);
			expect(arrangementApi.roomArrangementControllerUpdateGroup).not.toHaveBeenCalled();

			order.resolve(respond(reordered));
			await pendingOrder;

			expect(arrangementApi.roomArrangementControllerUpdateGroup).toHaveBeenCalledWith(groupB.id, {
				expectedRevision: 4,
				collapsed: true,
			});
			expect(store.confirmed?.revision).toBe(5);
			expect(store.view?.groups.find((g) => g.id === groupB.id)?.collapsed).toBe(true);
		});

		it("does not send anything when the queued state equals the saved state", async () => {
			const { initial } = await setupLoaded();
			const store = useRoomArrangementStore();
			const order = deferred<AxiosResponse<RoomArrangementResponse>>();
			arrangementApi.roomArrangementControllerUpdateGroupOrder.mockReturnValue(order.promise);

			const pendingOrder = store.moveGroup(groupA.id, 1);
			await store.requestGroupCollapsed(groupB.id, true);
			await store.requestGroupCollapsed(groupB.id, false);
			order.resolve(respond({ ...initial, revision: 4 }));
			await pendingOrder;

			expect(arrangementApi.roomArrangementControllerUpdateGroup).not.toHaveBeenCalled();
		});
	});

	describe("undo", () => {
		it("moves a room back before its original neighbour", async () => {
			const { store, initial } = await setupLoaded();
			const moved = {
				...initial,
				revision: 4,
				ungroupedRoomIds: [rooms[0].id, rooms[1].id],
				groups: [{ ...initial.groups[0], roomIds: [rooms[2].id] }, initial.groups[1]],
			};
			arrangementApi.roomArrangementControllerMoveRoom
				.mockResolvedValueOnce(respond(moved))
				.mockResolvedValueOnce(respond({ ...initial, revision: 5 }));

			await store.moveRoom({ roomId: rooms[1].id, sourceGroupId: groupA.id, targetGroupId: null, beforeRoomId: null });
			expect(store.canUndo).toBe(true);
			expect(store.undoDescription).toEqual(
				expect.objectContaining({ kind: "moveRoom", targetName: null, reordered: false })
			);

			const isUndone = await store.undo();

			expect(isUndone).toBe(true);
			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenLastCalledWith({
				expectedRevision: 4,
				roomId: rooms[1].id,
				sourceGroupId: null,
				targetGroupId: groupA.id,
				beforeRoomId: rooms[2].id,
			});
			expect(store.canUndo).toBe(false);
		});

		it("is only offered while nothing changed since the action", async () => {
			const { store, initial } = await setupLoaded();
			arrangementApi.roomArrangementControllerMoveRoom.mockResolvedValue(respond({ ...initial, revision: 4 }));
			arrangementApi.roomArrangementControllerUpdateGroup.mockResolvedValue(respond({ ...initial, revision: 5 }));

			await store.moveRoom({ roomId: rooms[0].id, sourceGroupId: null, targetGroupId: groupB.id, beforeRoomId: null });
			await store.setGroupCollapsed(groupB.id, true);

			expect(store.isUndoOffered).toBe(false);
			expect(await store.undo()).toBe(false);
			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenCalledTimes(1);
		});

		it("restores a deleted group with its name, rooms, position and collapsed state", async () => {
			const collapsedA = { ...groupA, collapsed: true, roomIds: [rooms[1].id, rooms[2].id] };
			const { store } = await setupLoaded({ groups: [collapsedA, { ...groupB, roomIds: [] }] });
			const restoredId = "c".repeat(24);
			const afterDelete = roomArrangementResponseFactory.build({
				revision: 4,
				ungroupedRoomIds: rooms.map((room) => room.id),
				groups: [{ ...groupB, roomIds: [] }],
			});
			arrangementApi.roomArrangementControllerDeleteGroup.mockResolvedValue(respond(afterDelete));
			arrangementApi.roomArrangementControllerCreateGroup.mockResolvedValue(
				respond({
					...afterDelete,
					revision: 5,
					groups: [...afterDelete.groups, { id: restoredId, name: "Informatik", collapsed: false, roomIds: [] }],
					createdGroupId: restoredId,
				})
			);
			const withRooms = {
				...afterDelete,
				revision: 6,
				ungroupedRoomIds: [rooms[0].id],
				groups: [
					...afterDelete.groups,
					{ id: restoredId, name: "Informatik", collapsed: false, roomIds: [rooms[1].id, rooms[2].id] },
				],
			};
			arrangementApi.roomArrangementControllerMoveRooms.mockResolvedValue(respond(withRooms));
			const reordered = { ...withRooms, revision: 7, groups: [withRooms.groups[1], withRooms.groups[0]] };
			arrangementApi.roomArrangementControllerUpdateGroupOrder.mockResolvedValue(respond(reordered));
			arrangementApi.roomArrangementControllerUpdateGroup.mockResolvedValue(
				respond({
					...reordered,
					revision: 8,
					groups: [{ ...reordered.groups[0], collapsed: true }, reordered.groups[1]],
				})
			);

			await store.deleteGroup(groupA.id);
			expect(store.undoDescription).toEqual({ kind: "deleteGroup", groupName: "Informatik" });
			const isUndone = await store.undo();

			expect(isUndone).toBe(true);
			expect(arrangementApi.roomArrangementControllerCreateGroup).toHaveBeenCalledWith({
				expectedRevision: 4,
				name: "Informatik",
			});
			expect(arrangementApi.roomArrangementControllerMoveRooms).toHaveBeenCalledWith({
				expectedRevision: 5,
				roomIds: [rooms[1].id, rooms[2].id],
				targetGroupId: restoredId,
			});
			expect(arrangementApi.roomArrangementControllerUpdateGroupOrder).toHaveBeenCalledWith({
				expectedRevision: 6,
				groupIds: [restoredId, groupB.id],
			});
			expect(arrangementApi.roomArrangementControllerUpdateGroup).toHaveBeenCalledWith(restoredId, {
				expectedRevision: 7,
				collapsed: true,
			});
			expect(store.view?.groups[0]).toEqual(expect.objectContaining({ name: "Informatik", collapsed: true }));
			expect(useNotificationStore().notify).not.toHaveBeenCalled();
		});

		it("refetches and shows the changed elsewhere notice when undo fails", async () => {
			const { store, initial } = await setupLoaded();
			arrangementApi.roomArrangementControllerDeleteGroup.mockResolvedValue(
				respond({ ...initial, revision: 4, groups: [initial.groups[1]] })
			);
			arrangementApi.roomArrangementControllerCreateGroup.mockRejectedValue(
				apiError(409, "ROOM_ARRANGEMENT_CONFLICT", { reason: "REVISION" })
			);

			await store.deleteGroup(groupA.id);
			const isUndone = await store.undo();

			expect(isUndone).toBe(false);
			expect(arrangementApi.roomArrangementControllerCreateGroup).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(2);
			expect(useNotificationStore().notify).toHaveBeenCalledTimes(1);
			expectNotification("error");
			expect(store.isUndoOffered).toBe(false);
		});

		it("does not offer undo for a move that changed nothing", async () => {
			const { store, initial } = await setupLoaded();
			arrangementApi.roomArrangementControllerMoveRoom.mockResolvedValue(respond(initial));

			await store.moveRoom({ roomId: rooms[0].id, sourceGroupId: null, targetGroupId: null, beforeRoomId: null });

			expect(store.isUndoOffered).toBe(false);
		});
	});
});
