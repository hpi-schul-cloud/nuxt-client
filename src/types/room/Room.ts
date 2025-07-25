import {
	CreateRoomBodyParams,
	RoomBoardItemResponse,
	RoomDetailsResponse,
	RoomItemResponse,
	UpdateRoomBodyParams,
	RoomColor,
} from "@/serverApi/v3";

export type RoomItem = RoomItemResponse;
export type RoomDetails = RoomDetailsResponse;
export type RoomBoardItem = RoomBoardItemResponse;

export type RoomCreateParams = CreateRoomBodyParams;
export type RoomUpdateParams = UpdateRoomBodyParams;

export { RoomColor };
