import type { RoomArrangementView, RoomMoveCommand } from "@data-room";
import type { SortableEvent } from "sortablejs";

export const UNGROUPED_SECTION_KEY = "ungrouped";
export const ROOM_SORTABLE_GROUP = "arranged-rooms";

/**
 * A completed room drop or keyboard/menu reorder, described by stable ids and the
 * index the room has in the target section once the move is applied.
 */
export type RoomDrop = {
	roomId: string;
	fromKey: string;
	toKey: string;
	oldIndex: number;
	newIndex: number;
	appendOnly?: boolean;
};

export type RoomMoveTarget = { key: string; label: string; testId: string };

export const sectionKeyToGroupId = (key: string) => (key === UNGROUPED_SECTION_KEY ? null : key);

export const groupIdToSectionKey = (groupId: string | null) => groupId ?? UNGROUPED_SECTION_KEY;

export const getSectionRooms = (view: RoomArrangementView, key: string) =>
	key === UNGROUPED_SECTION_KEY ? view.ungrouped : view.groups.find((group) => group.id === key)?.rooms;

export const findRoomSectionKey = (view: RoomArrangementView, roomId: string) => {
	if (view.ungrouped.some((room) => room.id === roomId)) return UNGROUPED_SECTION_KEY;
	return view.groups.find((group) => group.rooms.some((room) => room.id === roomId))?.id;
};

// The anchor is resolved after removing the moved room, so it is the room that ends up right behind it.
export const toRoomMoveCommand = (view: RoomArrangementView, drop: RoomDrop): RoomMoveCommand | undefined => {
	const sourceRooms = getSectionRooms(view, drop.fromKey);
	const targetRooms = getSectionRooms(view, drop.toKey);
	if (!sourceRooms || !targetRooms) return undefined;
	if (!sourceRooms.some((room) => room.id === drop.roomId)) return undefined;

	const isSameSection = drop.fromKey === drop.toKey;
	if (isSameSection && (drop.appendOnly || drop.oldIndex === drop.newIndex)) return undefined;
	if (drop.newIndex < 0) return undefined;

	const remainingIds = targetRooms.map((room) => room.id).filter((id) => id !== drop.roomId);
	const beforeRoomId = drop.appendOnly ? null : (remainingIds[drop.newIndex] ?? null);

	return {
		roomId: drop.roomId,
		sourceGroupId: sectionKeyToGroupId(drop.fromKey),
		targetGroupId: sectionKeyToGroupId(drop.toKey),
		beforeRoomId,
	};
};

export const toRoomDrop = (event: SortableEvent): RoomDrop | undefined => {
	const { item, from, to, oldIndex, newIndex } = event;
	const roomId = item?.dataset.roomId;
	const fromKey = from?.dataset.sectionKey;
	const toKey = to?.dataset.sectionKey;

	if (!roomId || !fromKey || !toKey || oldIndex === undefined || newIndex === undefined) return undefined;

	return { roomId, fromKey, toKey, oldIndex, newIndex, appendOnly: to.dataset.appendOnly === "true" };
};

type DomPosition = { parent: Node; nextSibling: Node | null };

export const rememberDomPosition = (element: HTMLElement | undefined): DomPosition | undefined =>
	element?.parentNode ? { parent: element.parentNode, nextSibling: element.nextSibling } : undefined;

// SortableJS moves DOM nodes itself; put the node back so Vue renders the result from store state only.
export const restoreDomPosition = (element: HTMLElement | undefined, position: DomPosition | undefined) => {
	if (!element || !position) return;
	if (element.parentNode === position.parent && element.nextSibling === position.nextSibling) return;

	const nextSibling = position.nextSibling?.parentNode === position.parent ? position.nextSibling : null;
	position.parent.insertBefore(element, nextSibling);
};
