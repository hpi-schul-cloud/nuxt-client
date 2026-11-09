import { useQuickNavEntries } from "./QuickNavEntries.composable";
import { useQuickNavSourcesStore } from "./QuickNavSources.store";
import { QuickNavEntry, QuickNavGroup, QuickNavKind, QuickNavScope } from "./types";
import { useAppStore } from "@data-app";
import { mdiArrowRight, mdiPlus } from "@icons/material";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

/** shared, so the topbar button, the ⌘K shortcut and the dialog all mean the same palette */
const isOpen = ref(false);

/**
 * Folds character by character rather than over the whole string, so the result has one entry per
 * character of the input. That is what lets the highlight point back at the original text: "Raum"
 * has to be able to mark "Räum" in "Räume".
 */
const foldChars = (value: string): string[] =>
	[...value].map((character) => {
		const folded = character
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")
			.toLowerCase();

		// ß and the like fold to something longer; keep the character so the positions stay aligned
		return folded.length === 1 ? folded : character.toLowerCase();
	});

/**
 * Where the query sits in the title, in characters of the title, or undefined when it is not in
 * there. Diacritics are ignored on both sides — "okosystem" finds "Ökosystem".
 */
export const matchRange = (title: string, query: string): [number, number] | undefined => {
	if (query.length === 0) return undefined;

	// compared character by character, so an emoji (two code units) cannot shift the range
	const characters = foldChars(title);
	const needle = foldChars(query);
	for (let at = 0; at + needle.length <= characters.length; at += 1) {
		if (needle.every((character, offset) => characters[at + offset] === character)) {
			return [at, at + needle.length];
		}
	}

	return undefined;
};

/**
 * Same rule as the server's: nothing when the query does not occur, otherwise how good the hit is.
 * Keeping the two in step matters because the palette sorts server and local entries into one list.
 */
export const score = (title: string, query: string): number => {
	const range = matchRange(title, query);
	if (!range) return 0;

	const [at] = range;
	if (at === 0) return 3;
	if (/[\s\-_/(]/.test(foldChars(title)[at - 1])) return 2;

	return 1;
};

const isWholeTitle = (title: string, query: string): boolean => {
	const range = matchRange(title, query);
	return range !== undefined && range[0] === 0 && range[1] === [...title].length;
};

/** a stretch of the list: either the full width, or one of the columns side by side */
type QuickNavBlock = { groups: QuickNavGroup[]; isFullWidth: boolean };

type Comparator = (a: QuickNavEntry, b: QuickNavEntry) => number;

/** the matches, best first; `tieBreak` orders the ones that match equally well, and everything when nothing is typed */
const byQuery = (entries: QuickNavEntry[], query: string, tieBreak: Comparator = () => 0): QuickNavEntry[] => {
	if (query.length === 0) return [...entries].sort(tieBreak);

	// typing a whole title means that one, before anything recent that merely starts the same way
	const isExact = (entry: QuickNavEntry) => (isWholeTitle(entry.title, query) ? 0 : 1);

	return entries
		.map((entry): [number, QuickNavEntry] => [score(entry.title, query), entry])
		.filter(([hit]) => hit > 0)
		.sort(([a, first], [b, second]) => b - a || isExact(first) - isExact(second) || tieBreak(first, second))
		.map(([, entry]) => entry);
};

/** How many pages to offer before anything is typed — enough to be useful, short enough to scan. */
const SUGGESTION_COUNT = 5;
const RESULTS_PER_GROUP = 5;
const RECENT_COUNT = 2;
const UPCOMING_COUNT = 3;
/** how far ahead "due soon" looks; further out is not soon */
const UPCOMING_DAYS = 14;
/** kept a little longer than shown, so a deleted room does not leave the group short */
const RECENT_MEMORY = 10;
/** the longest name the room form accepts */
const ROOM_NAME_MAX_LENGTH = 100;

/** what is worth coming back to; the pages are one click away in the sidebar anyway */
const REMEMBERED_KINDS = [QuickNavKind.ROOM, QuickNavKind.COURSE, QuickNavKind.TASK];

/** shared like `isOpen`, so every user of the composable sees the same history */
const recentIds = ref<string[]>([]);
let recentStorageKey: string | undefined;

// storage can be missing or full (private windows, strict settings); the history is a convenience
const readRecentIds = (key: string): string[] => {
	try {
		const stored: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
		return Array.isArray(stored) ? stored.filter((id): id is string => typeof id === "string") : [];
	} catch {
		return [];
	}
};

const writeRecentIds = (key: string, ids: string[]): void => {
	try {
		localStorage.setItem(key, JSON.stringify(ids));
	} catch {
		// nothing to do: the history simply is not kept
	}
};

/** the line that offers to create a room under the searched name */
export const CREATE_ROOM_NAMED_ID = "action:create-room-named";

export const useQuickNav = () => {
	const { t, locale } = useI18n();
	const { navigationEntries, actionEntries, helpEntries } = useQuickNavEntries();
	const sourcesStore = useQuickNavSourcesStore();
	const { rooms, courses, tasks, people, isLoading, failedScopes } = storeToRefs(sourcesStore);

	const userId = useAppStore().user?.id;
	// per user, because school computers are shared
	const storageKey = userId ? `quickNav.recent.${userId}` : undefined;
	if (storageKey !== recentStorageKey) {
		recentStorageKey = storageKey;
		recentIds.value = storageKey ? readRecentIds(storageKey) : [];
	}

	const query = ref("");
	const scope = ref<QuickNavScope>();
	const selectedId = ref<string | undefined>(undefined);

	const trimmedQuery = computed(() => query.value.trim());

	// "5a" before "10a", and "Ärzte" next to "Arzt", as people sort names themselves
	const collator = computed(() => new Intl.Collator(locale.value, { numeric: true, sensitivity: "base" }));
	/** among equally good matches, what was opened recently comes first, then the rest by name */
	const tieBreak: Comparator = (a, b) => {
		const recency = (entry: QuickNavEntry) => {
			const index = recentIds.value.indexOf(entry.id);
			return index === -1 ? recentIds.value.length : index;
		};
		return recency(a) - recency(b) || collator.value.compare(a.title, b.title);
	};
	const rank = (entries: QuickNavEntry[], q: string) => byQuery(entries, q, tieBreak);

	// a hundred rooms named after subjects and classes need a second line to tell them apart
	const roomsWithMembers = computed(() =>
		rooms.value.map((room) =>
			room.memberCount === undefined
				? room
				: { ...room, subtitle: `${room.memberCount} ${t("common.words.member", room.memberCount)}` }
		)
	);

	const categories = computed(() => [
		{ scope: "rooms" as const, label: t("common.labels.room", 2), entries: roomsWithMembers.value },
		{ scope: "courses" as const, label: t("feature.quickNav.group.courses"), entries: courses.value },
		{ scope: "tasks" as const, label: t("feature.quickNav.group.tasks"), entries: tasks.value },
		{ scope: "people" as const, label: t("feature.quickNav.group.people"), entries: people.value },
	]);
	const activeCategory = computed(() => categories.value.find((category) => category.scope === scope.value));

	/** how many entries of a category match the query, before any group is cut short */
	const countIn = (value: QuickNavScope): number => {
		const category = categories.value.find((candidate) => candidate.scope === value);
		return category ? rank(category.entries, trimmedQuery.value).length : 0;
	};

	const recentEntries = computed(() => {
		// rooms, courses and tasks share this group, so courses and tasks say what they are; a room
		// already does, with its tile and its members, and most lines here are rooms
		const kindLabel: Partial<Record<QuickNavKind, string>> = {
			[QuickNavKind.COURSE]: t("common.labels.course"),
			[QuickNavKind.TASK]: t("common.words.task"),
		};
		const known = new Map<string, QuickNavEntry>(
			[...roomsWithMembers.value, ...courses.value, ...tasks.value].map((entry) => [
				entry.id,
				{ ...entry, subtitle: [kindLabel[entry.kind], entry.subtitle].filter(Boolean).join(" · ") },
			])
		);
		return recentIds.value
			.map((id) => known.get(id))
			.filter((entry): entry is QuickNavEntry => entry !== undefined)
			.slice(0, RECENT_COUNT);
	});

	const dueDateFormat = computed(
		() => new Intl.DateTimeFormat(locale.value, { weekday: "short", day: "2-digit", month: "2-digit" })
	);

	/** the next few tasks with a deadline; something to do even before anything has been opened */
	const upcomingEntries = computed(() => {
		const now = Date.now();
		const horizon = now + UPCOMING_DAYS * 24 * 60 * 60 * 1000;

		return tasks.value
			.filter((task) => {
				const due = task.dueDate ? new Date(task.dueDate).getTime() : NaN;
				return due >= now && due <= horizon;
			})
			.sort((a, b) => new Date(a.dueDate as string).getTime() - new Date(b.dueDate as string).getTime())
			.slice(0, UPCOMING_COUNT)
			.map((task) => ({
				...task,
				subtitle: [
					task.subtitle,
					t("feature.quickNav.dueOn", { date: dueDateFormat.value.format(new Date(task.dueDate as string)) }),
				]
					.filter(Boolean)
					.join(" · "),
			}));
	});

	// a search for a room that does not exist yet is often the moment someone wants to create it
	const createRoomEntry = computed((): QuickNavEntry | undefined => {
		const name = trimmedQuery.value.slice(0, ROOM_NAME_MAX_LENGTH);
		const mayCreateRoom = actionEntries.value.some((entry) => entry.id === "action:create-room");
		if (!name || !mayCreateRoom || rooms.value.some((room) => isWholeTitle(room.title, name))) return undefined;

		return {
			id: CREATE_ROOM_NAMED_ID,
			kind: QuickNavKind.ACTION,
			title: t("feature.quickNav.createRoomNamed", { name }),
			icon: mdiPlus,
			to: `/rooms/new?name=${encodeURIComponent(name)}`,
		};
	});

	/** a group cut short ends in a line that opens its category, so nothing is hidden without a way to it */
	const showAllEntry = (value: QuickNavScope, label: string, count: number): QuickNavEntry => ({
		id: `show-all:${value}`,
		kind: QuickNavKind.SHOW_ALL,
		title: t("feature.quickNav.showAll", { count, category: label }),
		icon: mdiArrowRight,
		showsAll: value,
	});

	const searchGroups = computed((): QuickNavGroup[] => {
		const q = trimmedQuery.value;
		const topMatches = (entries: QuickNavEntry[]) => rank(entries, q).slice(0, RESULTS_PER_GROUP);

		const categoryGroups = categories.value.map((category) => {
			const matches = rank(category.entries, q);
			// a line that opens the category only pays off when it saves more than one line
			const fitsWhole = matches.length <= RESULTS_PER_GROUP + 1;
			const entries = fitsWhole ? matches : matches.slice(0, RESULTS_PER_GROUP);
			if (!fitsWhole) {
				entries.push(showAllEntry(category.scope, category.label, matches.length));
			}
			return { label: category.label, entries };
		});

		return [
			{ label: t("feature.quickNav.group.navigation"), entries: topMatches(navigationEntries.value) },
			...categoryGroups,
			{
				label: t("feature.quickNav.group.actions"),
				entries: [...topMatches(actionEntries.value), ...(createRoomEntry.value ? [createRoomEntry.value] : [])],
			},
			{ label: t("global.sidebar.item.helpArea"), entries: topMatches(helpEntries.value) },
		].filter((group) => group.entries.length > 0);
	});

	const groups: ComputedRef<QuickNavGroup[]> = computed(() => {
		const q = trimmedQuery.value;

		if (activeCategory.value) {
			return [{ label: activeCategory.value.label, entries: rank(activeCategory.value.entries, q) }].filter(
				(group) => group.entries.length > 0
			);
		}

		if (q.length === 0) {
			return [
				{ label: t("feature.quickNav.group.recent"), entries: recentEntries.value, isRecent: true, isWide: true },
				{ label: t("feature.quickNav.group.upcoming"), entries: upcomingEntries.value, isWide: true },
				{ label: t("feature.quickNav.group.navigation"), entries: navigationEntries.value.slice(0, SUGGESTION_COUNT) },
				// the help pages are found by typing, so the overview stays with what is used every day
				{ label: t("feature.quickNav.group.actions"), entries: actionEntries.value },
			].filter((group) => group.entries.length > 0);
		}

		return searchGroups.value;
	});

	/** the lines that stand for something found, not the ones that open a category or create a room */
	const isFound = (entry: QuickNavEntry) =>
		entry.kind !== QuickNavKind.SHOW_ALL && entry.id !== createRoomEntry.value?.id;

	/** found entries on screen, against everything that matches; they differ when groups are cut short */
	const resultCount = computed(() => groups.value.flatMap((group) => group.entries).filter(isFound).length);
	const matchCount = computed(() => {
		const q = trimmedQuery.value;
		if (activeCategory.value) return rank(activeCategory.value.entries, q).length;

		return [navigationEntries.value, actionEntries.value, helpEntries.value, ...categories.value.map((c) => c.entries)]
			.map((entries) => byQuery(entries, q).length)
			.reduce((sum, count) => sum + count, 0);
	});

	/** whether leaving the category would show anything, so an empty category can point there honestly */
	const hasResultsOutsideScope = computed(
		() => scope.value !== undefined && searchGroups.value.some((group) => group.entries.some(isFound))
	);

	const failedCategories = computed(() =>
		categories.value.filter((category) => failedScopes.value.includes(category.scope)).map((c) => c.label)
	);

	// only promise "create" to users who can actually create something
	const placeholder = computed(() => {
		if (activeCategory.value) return t("feature.quickNav.scopedPlaceholder", { category: activeCategory.value.label });
		return actionEntries.value.length > 0
			? t("feature.quickNav.placeholder")
			: t("feature.quickNav.placeholderWithoutCreate");
	});

	/** set by the dialog from the width it has; the overview lays its groups out in this many columns */
	const columnCount = ref(1);
	const isOverview = computed(() => trimmedQuery.value.length === 0 && !scope.value);

	/**
	 * How the overview is laid out. What was opened recently spans the full width on top: it is what
	 * people come back for, and its lines need the room for their context. The pages and actions below
	 * are short single lines, so they share the width in columns that line up.
	 */
	const blocks = computed((): QuickNavBlock[] => {
		if (!isOverview.value || columnCount.value < 2) return [{ groups: groups.value, isFullWidth: true }];

		const lead = groups.value.filter((group) => group.isWide);
		const rest = groups.value.filter((group) => !group.isWide);
		const columns = Array.from({ length: columnCount.value }, (_, column) => ({
			groups: rest.filter((_group, index) => index % columnCount.value === column),
			isFullWidth: false,
		}));

		return lead.length > 0 ? [{ groups: lead, isFullWidth: true }, ...columns] : columns;
	});

	/** the columns only, which is what the left and right arrow keys move between */
	const columns = computed(() => blocks.value.filter((block) => !block.isFullWidth).map((block) => block.groups));

	/** top to bottom, and down one column before the next, which is the order the arrow keys walk */
	const flatEntries: ComputedRef<QuickNavEntry[]> = computed(() =>
		blocks.value.flatMap((block) => block.groups).flatMap((group) => group.entries)
	);

	const selectedEntry = computed(
		() => flatEntries.value.find((entry) => entry.id === selectedId.value) ?? flatEntries.value[0]
	);

	const moveSelection = (offset: number): void => {
		const entries = flatEntries.value;
		if (entries.length === 0) return;

		const current = entries.findIndex((entry) => entry.id === selectedEntry.value?.id);
		const next = (current + offset + entries.length) % entries.length;
		selectedId.value = entries[next].id;
	};

	/** to the line at the same height in the next column over, or the last one when that column is shorter */
	const moveColumn = (direction: 1 | -1): boolean => {
		if (columns.value.length < 2) return false;

		const lines = columns.value.map((column) => column.flatMap((group) => group.entries));
		const from = lines.findIndex((column) => column.some((entry) => entry.id === selectedEntry.value?.id));
		const target = lines[from + direction];
		if (from === -1 || !target?.length) return false;

		const row = lines[from].findIndex((entry) => entry.id === selectedEntry.value?.id);
		selectedId.value = target[Math.min(row, target.length - 1)].id;
		return true;
	};

	const select = (id: string): void => {
		selectedId.value = id;
	};

	/** puts an opened room, course or task at the top of "recently opened" */
	const remember = (entry: QuickNavEntry): void => {
		if (!REMEMBERED_KINDS.includes(entry.kind)) return;

		recentIds.value = [entry.id, ...recentIds.value.filter((id) => id !== entry.id)].slice(0, RECENT_MEMORY);
		if (storageKey) writeRecentIds(storageKey, recentIds.value);
	};

	/** forgets everything opened so far, on this computer, for this user */
	const clearRecent = (): void => {
		recentIds.value = [];
		if (storageKey) writeRecentIds(storageKey, []);
	};

	const open = (): void => {
		isOpen.value = true;
		void sourcesStore.load();
	};

	const close = (): void => {
		isOpen.value = false;
		query.value = "";
		scope.value = undefined;
		selectedId.value = undefined;
	};

	const toggle = (): void => {
		if (isOpen.value) {
			close();
		} else {
			open();
		}
	};

	watch([trimmedQuery, scope], () => {
		// a new query invalidates the old selection, so the first hit is highlighted again
		selectedId.value = undefined;
	});

	return {
		isOpen,
		query,
		trimmedQuery,
		scope,
		categories,
		activeCategory,
		countIn,
		retry: sourcesStore.load,
		groups,
		blocks,
		columns,
		columnCount,
		isFirstRun: computed(() => isOverview.value && recentEntries.value.length === 0),
		flatEntries,
		selectedEntry,
		resultCount,
		matchCount,
		hasResultsOutsideScope,
		failedCategories,
		placeholder,
		isLoading,
		hasFailed: computed(() => failedScopes.value.length > 0),
		failedScopes,
		moveSelection,
		moveColumn,
		select,
		remember,
		clearRecent,
		open,
		close,
		toggle,
	};
};
