import type { RoomArrangementResponse } from "@api-server";

type Arrangement = RoomArrangementResponse;

/** Where a room has to be put back: into a section (null = ungrouped), before a neighbour or appended. */
export type RoomPlacement = { roomId: string; groupId: string | null; beforeRoomId: string | null };

const sectionsOf = (arrangement: Arrangement) => [
	{ groupId: null, roomIds: arrangement.ungroupedRoomIds },
	...arrangement.groups.map((group) => ({ groupId: group.id, roomIds: group.roomIds })),
];

/** Returns the section of a room (null = ungrouped) or undefined when the room is not arranged. */
export const findRoomSection = (arrangement: Arrangement, roomId: string): { groupId: string | null } | undefined => {
	const section = sectionsOf(arrangement).find(({ roomIds }) => roomIds.includes(roomId));
	return section ? { groupId: section.groupId } : undefined;
};

/**
 * Original positions of the given rooms, ordered so that restoring them one after another works:
 * each section is processed from its end, so a neighbour that was moved as well is already back in place.
 */
export const getRestorePlacements = (before: Arrangement, roomIds: string[]): RoomPlacement[] => {
	const moved = new Set(roomIds);
	const placements: RoomPlacement[] = [];

	for (const { groupId, roomIds: sectionIds } of sectionsOf(before)) {
		for (let index = sectionIds.length - 1; index >= 0; index--) {
			const roomId = sectionIds[index];
			if (moved.has(roomId)) {
				placements.push({ roomId, groupId, beforeRoomId: sectionIds[index + 1] ?? null });
			}
		}
	}

	return placements;
};

/** Mirrors PATCH /room-positions: remove the rooms everywhere, then append them to the target in the given order. */
export const applyRoomsMove = (arrangement: Arrangement, roomIds: string[], targetGroupId: string | null) => {
	const target =
		targetGroupId === null
			? arrangement.ungroupedRoomIds
			: arrangement.groups.find((group) => group.id === targetGroupId)?.roomIds;
	if (!target) return;

	const moved = new Set(roomIds);
	arrangement.ungroupedRoomIds = arrangement.ungroupedRoomIds.filter((id) => !moved.has(id));
	arrangement.groups.forEach((group) => {
		group.roomIds = group.roomIds.filter((id) => !moved.has(id));
	});

	const refreshedTarget =
		targetGroupId === null
			? arrangement.ungroupedRoomIds
			: arrangement.groups.find((group) => group.id === targetGroupId)?.roomIds;
	refreshedTarget?.push(...roomIds);
};
