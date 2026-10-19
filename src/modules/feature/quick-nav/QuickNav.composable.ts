import { useQuickNavEntries } from "./QuickNavEntries.composable";
import { useQuickNavSourcesStore } from "./QuickNavSources.store";
import { QuickNavEntry, QuickNavGroup } from "./types";
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

	const characters = foldChars(title);
	const at = characters.join("").indexOf(foldChars(query).join(""));

	return at < 0 ? undefined : [at, at + [...query].length];
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

const byQuery = (entries: QuickNavEntry[], query: string): QuickNavEntry[] => {
	if (query.length === 0) return entries;

	return entries
		.map((entry): [number, QuickNavEntry] => [score(entry.title, query), entry])
		.filter(([hit]) => hit > 0)
		.sort(([a], [b]) => b - a)
		.map(([, entry]) => entry);
};

/** How many pages to offer before anything is typed — enough to be useful, short enough to scan. */
const SUGGESTION_COUNT = 5;
const RESULTS_PER_GROUP = 5;

export const useQuickNav = () => {
	const { t } = useI18n();
	const { navigationEntries, actionEntries } = useQuickNavEntries();
	const sourcesStore = useQuickNavSourcesStore();
	const { rooms, courses, tasks, people, isLoading, hasFailed } = storeToRefs(sourcesStore);

	const query = ref("");
	const selectedId = ref<string | undefined>(undefined);

	const trimmedQuery = computed(() => query.value.trim());

	// rooms and courses share a group, so each line says which one it is
	const roomsAndCourses = computed(() => [
		...rooms.value.map((entry) => ({ ...entry, subtitle: t("common.labels.room", 1) })),
		...courses.value.map((entry) => ({ ...entry, subtitle: t("common.labels.course") })),
	]);

	const groups: ComputedRef<QuickNavGroup[]> = computed(() => {
		const q = trimmedQuery.value;

		if (q.length === 0) {
			return [
				{ label: t("feature.quickNav.group.navigation"), entries: navigationEntries.value.slice(0, SUGGESTION_COUNT) },
				{ label: t("feature.quickNav.group.actions"), entries: actionEntries.value },
			].filter((group) => group.entries.length > 0);
		}

		const topMatches = (entries: QuickNavEntry[]) => byQuery(entries, q).slice(0, RESULTS_PER_GROUP);

		return [
			{ label: t("feature.quickNav.group.navigation"), entries: byQuery(navigationEntries.value, q) },
			{ label: t("feature.quickNav.group.roomsAndCourses"), entries: topMatches(roomsAndCourses.value) },
			{ label: t("feature.quickNav.group.tasks"), entries: topMatches(tasks.value) },
			{ label: t("feature.quickNav.group.people"), entries: topMatches(people.value) },
			{ label: t("feature.quickNav.group.actions"), entries: byQuery(actionEntries.value, q) },
		].filter((group) => group.entries.length > 0);
	});

	// only promise "create" to users who can actually create something
	const placeholder = computed(() =>
		actionEntries.value.length > 0 ? t("feature.quickNav.placeholder") : t("feature.quickNav.placeholderWithoutCreate")
	);

	/** the groups laid out end to end, which is the order the arrow keys walk */
	const flatEntries: ComputedRef<QuickNavEntry[]> = computed(() => groups.value.flatMap((group) => group.entries));

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

	const select = (id: string): void => {
		selectedId.value = id;
	};

	const open = (): void => {
		isOpen.value = true;
		void sourcesStore.load();
	};

	const close = (): void => {
		isOpen.value = false;
		query.value = "";
		selectedId.value = undefined;
	};

	const toggle = (): void => {
		if (isOpen.value) {
			close();
		} else {
			open();
		}
	};

	watch(trimmedQuery, () => {
		// a new query invalidates the old selection, so the first hit is highlighted again
		selectedId.value = undefined;
	});

	return {
		isOpen,
		query,
		groups,
		flatEntries,
		selectedEntry,
		placeholder,
		isLoading,
		hasFailed,
		moveSelection,
		select,
		open,
		close,
		toggle,
	};
};
