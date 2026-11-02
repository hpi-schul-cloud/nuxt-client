const normalizeForSearch = (value: string): string =>
	value
		.normalize("NFD")
		.replaceAll(/\p{Diacritic}/gu, "")
		.toLowerCase();

/**
 * Returns the rooms whose name contains the query, ignoring case and accents (e.g. "okolo" finds "Ökologie").
 * The order of the rooms is kept. An empty query returns all rooms.
 */
export const filterRoomsByName = <T extends { name: string }>(rooms: T[], query: string): T[] => {
	const normalizedQuery = normalizeForSearch(query.trim());
	if (normalizedQuery.length === 0) return rooms;

	return rooms.filter((room) => normalizeForSearch(room.name).includes(normalizedQuery));
};
