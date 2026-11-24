export const ROOM_GROUP_NAME_MAX_LENGTH = 100;

export type RoomGroupNameErrorReason = "REQUIRED" | "TOO_LONG" | "INVALID_CHARACTERS" | "DUPLICATE";

export type RoomGroupNameValidationResult =
	{ valid: true; normalized: string } | { valid: false; reason: RoomGroupNameErrorReason };

type ExistingGroup = { id: string; name: string };

const INVALID_CHARACTER_PATTERN = /[\p{Cc}\p{Zl}\p{Zp}]/u;

export const normalizeRoomGroupName = (raw: string) => raw.normalize("NFC").trim();

export const countRoomGroupNameLength = (raw: string) => [...normalizeRoomGroupName(raw)].length;

// Mirrors the server policy (SVSDEV-1 API contract). The server stays authoritative.
export const validateRoomGroupName = (
	raw: string,
	existingGroups: ExistingGroup[] = [],
	ownGroupId?: string
): RoomGroupNameValidationResult => {
	const normalized = normalizeRoomGroupName(raw);

	if (normalized.length === 0) {
		return { valid: false, reason: "REQUIRED" };
	}
	if (INVALID_CHARACTER_PATTERN.test(normalized)) {
		return { valid: false, reason: "INVALID_CHARACTERS" };
	}
	if ([...normalized].length > ROOM_GROUP_NAME_MAX_LENGTH) {
		return { valid: false, reason: "TOO_LONG" };
	}

	const comparable = normalized.toLowerCase();
	const isDuplicate = existingGroups.some(
		(group) => group.id !== ownGroupId && group.name.normalize("NFC").trim().toLowerCase() === comparable
	);
	if (isDuplicate) {
		return { valid: false, reason: "DUPLICATE" };
	}

	return { valid: true, normalized };
};
