import { useRoomStore } from "./room.store";
import { RoomApiFactory, RoomColor, RoomCreatedResponse, RoomItemResponse, RoomListResponse } from "@/serverApi/v3";
import { RoomCreateParams } from "@/types/room/Room";
import { createTestRoomStore, expectNotification, mockApiResponse, roomItemFactory } from "@@/tests/test-utils";
import { useNotificationStore } from "@data-app";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/serverApi/v3");

describe("useRoomStore", () => {
	const roomApiMock = createMock<ReturnType<typeof RoomApiFactory>>();

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		vi.mocked(RoomApiFactory).mockReturnValue(roomApiMock);
	});

	describe("fetchRooms & fetchRoomsPlain", () => {
		it("should load rooms successfully", async () => {
			const mockRooms = [
				{ id: "1", name: "Room 1" },
				{ id: "2", name: "Room 2" },
			];
			roomApiMock.roomControllerGetRooms.mockResolvedValue(
				mockApiResponse<RoomListResponse>({ data: { data: mockRooms as RoomItemResponse[] } })
			);

			const store = useRoomStore();
			await store.fetchRooms();

			expect(store.rooms).toEqual(mockRooms);
			expect(store.isEmpty).toBe(false);
			expect(useNotificationStore().notify).not.toHaveBeenCalled();
		});

		it("should show error notification when fetch fails", async () => {
			vi.spyOn(logger, "error").mockImplementation(vi.fn());
			roomApiMock.roomControllerGetRooms.mockRejectedValue(new Error("Network error"));

			await useRoomStore().fetchRooms();

			expect(useRoomStore().rooms).toEqual([]);
			expectNotification("error");
		});
	});

	describe("createRoom", () => {
		const createParams: RoomCreateParams = { name: "New Room", color: RoomColor.Blue, features: [] };

		it("should create room successfully", async () => {
			roomApiMock.roomControllerCreateRoom.mockResolvedValue(mockApiResponse<RoomCreatedResponse>({ data: undefined }));
			await useRoomStore().createRoom(createParams);
			expect(roomApiMock.roomControllerCreateRoom).toHaveBeenCalled();
		});

		it("should show error notification when create fails", async () => {
			vi.spyOn(logger, "error").mockImplementation(vi.fn());
			roomApiMock.roomControllerCreateRoom.mockRejectedValue(new Error("Create failed"));
			await useRoomStore().createRoom(createParams);
			expectNotification("error");
		});
	});

	describe("deleteRoom", () => {
		it("should delete room successfully", async () => {
			roomApiMock.roomControllerDeleteRoom.mockResolvedValue(mockApiResponse({ data: undefined }));
			await useRoomStore().deleteRoom("room-123");
			expect(roomApiMock.roomControllerDeleteRoom).toHaveBeenCalledWith("room-123");
		});

		it("should show error notification when delete fails", async () => {
			vi.spyOn(logger, "error").mockImplementation(vi.fn());
			roomApiMock.roomControllerDeleteRoom.mockRejectedValue(new Error("Delete failed"));
			await useRoomStore().deleteRoom("room-123");
			expectNotification("error");
		});
	});

	describe("leaveRoom", () => {
		it("should leave room successfully", async () => {
			roomApiMock.roomControllerLeaveRoom.mockResolvedValue(mockApiResponse({ data: "room-123" }));
			await useRoomStore().leaveRoom("room-123");
			expect(roomApiMock.roomControllerLeaveRoom).toHaveBeenCalledWith("room-123");
		});

		it("should show error notification when leave fails", async () => {
			vi.spyOn(logger, "error").mockImplementation(vi.fn());
			roomApiMock.roomControllerLeaveRoom.mockRejectedValue(new Error("Leave failed"));
			await useRoomStore().leaveRoom("room-123");
			expectNotification("error");
		});
	});

	describe("isEmpty", () => {
		it("should be true when no rooms", () => {
			const store = useRoomStore();
			expect(store.isEmpty).toBe(true);
		});

		it("should be false when rooms exist", async () => {
			createTestRoomStore([roomItemFactory.build()]);
			expect(useRoomStore().isEmpty).toBe(false);
		});
	});

	describe("isLoading", () => {
		it("should be true during API call", async () => {
			roomApiMock.roomControllerLeaveRoom.mockResolvedValue(mockApiResponse({ data: "room-123" }));
			const leavePromise = useRoomStore().leaveRoom("room-123");

			expect(useRoomStore().isLoading).toBe(true);
			await leavePromise;
			expect(useRoomStore().isLoading).toBe(false);
		});
	});
});
