/** What a line in the palette stands for. Also decides which group it is listed under. */
export enum QuickNavKind {
	/** a page from the main navigation */
	NAVIGATION = "navigation",
	ROOM = "room",
	COURSE = "course",
	TASK = "task",
	PERSON = "person",
	/** something the palette does instead of navigating, e.g. creating a room */
	ACTION = "action",
}

export type QuickNavEntry = {
	/** stable across renders, so the selected line survives a result update */
	id: string;
	kind: QuickNavKind;
	/** already translated — the palette does not look up keys */
	title: string;
	subtitle?: string;
	icon: string;
	/** an in-app route; exactly one of `to`, `href` and `action` is set */
	to?: string;
	/** a full page load, for the parts of the cloud that are not in this client */
	href?: string;
	action?: () => void;
};

export type QuickNavGroup = {
	/** translated caption above the group */
	label: string;
	entries: QuickNavEntry[];
};
