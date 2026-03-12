import {
	CreateRoomBodyParams,
	RoomBoardItemResponse,
	RoomColor,
	RoomDetailsResponse,
	RoomItemResponse,
	UpdateRoomBodyParams,
} from "@api-server";

export type RoomItem = RoomItemResponse;
export type RoomDetails = RoomDetailsResponse;
export type RoomBoardItem = RoomBoardItemResponse;

export type RoomCreateParams = CreateRoomBodyParams;
export type RoomUpdateParams = UpdateRoomBodyParams;

export { RoomColor };
