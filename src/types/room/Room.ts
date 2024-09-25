import {
	CreateRoomBodyParams,
	RoomDetailsResponse,
	RoomItemResponse,
	UpdateRoomBodyParams,
} from "@/serverApi/v3";

export type RoomItem = RoomItemResponse;
export type RoomDetails = RoomDetailsResponse;

export type RoomCreateParams = CreateRoomBodyParams;
export type RoomUpdateParams = UpdateRoomBodyParams;
