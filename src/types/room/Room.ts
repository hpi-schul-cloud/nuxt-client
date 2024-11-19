import {
	CreateRoomBodyParams,
	RoomBoardItemResponse,
	RoomDetailsResponse,
	RoomItemResponse,
	UpdateRoomBodyParams,
} from "@/serverApi/v3";

export type RoomItem = RoomItemResponse;
export type RoomDetails = RoomDetailsResponse;
export type RoomBoardItem = RoomBoardItemResponse;

export type RoomCreateParams = CreateRoomBodyParams;
export type RoomUpdateParams = UpdateRoomBodyParams;

export class RoomApiError extends Error {
	readonly type: string;
	readonly code: number;

	constructor({
		message,
		type,
		code,
	}: {
		message: string;
		type: string;
		code: number;
	}) {
		super(message);
		this.type = type;
		this.code = code;
	}
}
