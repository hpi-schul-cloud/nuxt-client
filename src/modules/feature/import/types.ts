export type ImportDestinationType = "course" | "room" | "column";
export type ImportDestination =
	| { id: string; type: Extract<ImportDestinationType, "course"> }
	| { id: string; type: Extract<ImportDestinationType, "room"> }
	| { id: string; type: Extract<ImportDestinationType, "column">; boardId: string };
export type ImportDestinationItem = { id: string; name: string };
