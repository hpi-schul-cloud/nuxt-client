export type ImportDestinationType = "course" | "room" | "column" | "board";
export type ImportDestination =
	| { id: string; type: Extract<ImportDestinationType, "course"> }
	| { id: string; type: Extract<ImportDestinationType, "room"> }
	| { id: string; type: Extract<ImportDestinationType, "column">; boardId: string }
	| { id: string; type: Extract<ImportDestinationType, "board"> };
export type ImportDestinationItem = { id: string; name: string };
