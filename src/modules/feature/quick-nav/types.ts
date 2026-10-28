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
	/** the last line of a group cut short, which opens the whole category */
	SHOW_ALL = "show-all",
}

export type QuickNavEntry = {
	/** stable across renders, so the selected line survives a result update */
	id: string;
	kind: QuickNavKind;
	/** already translated — the palette does not look up keys */
	title: string;
	subtitle?: string;
	icon: string;
	/** tasks only: when it is due, as an ISO date */
	dueDate?: string;
	/** tasks only: the due date has passed and the task is not finished */
	isOverdue?: boolean;
	/** rooms only: how many people are in it, shown as the second line */
	memberCount?: number;
	/** shown instead of the icon: the coloured tile people know a room or course by from its overview */
	avatar?: QuickNavAvatar;
	/** an in-app route; exactly one of `to`, `href`, `action` and `showsAll` is set */
	to?: string;
	/** a full page load, for the parts of the cloud that are not in this client */
	href?: string;
	/** "_blank" opens `href` in a new tab, as the sidebar does for external links */
	target?: string;
	action?: () => void;
	/** opens this category inside the palette instead of going anywhere */
	showsAll?: QuickNavScope;
};

export type QuickNavAvatar = {
	initials: string;
	/** a room colour, as one of the global `room-color--*` classes */
	colorClass?: string;
	/** a course colour, as any CSS colour */
	color?: string;
	/** dark initials, for the colours white text cannot be read on */
	isLight: boolean;
};

export type QuickNavGroup = {
	/** translated caption above the group */
	label: string;
	entries: QuickNavEntry[];
	/** the history of recently opened lines, which the user can clear */
	isRecent?: boolean;
	/** spans the full width of the overview, above the columns of pages and actions */
	isWide?: boolean;
};

export type QuickNavScope = "rooms" | "courses" | "tasks" | "people";
