import { matchRange, score, useQuickNav } from "./QuickNav.composable";
import { useQuickNavSourcesStore } from "./QuickNavSources.store";
import { QuickNavEntry, QuickNavGroup, QuickNavKind } from "./types";
import de from "@/locales/de";
import { initializeAxios } from "@/utils/api";
import { createTestAppStore, createTestEnvStore, mockAxiosInstance, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { Permission, RoleName, SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@util-logger");

const setup = (permissions: Permission[] = [], roles: RoleName[] = []) => {
	const pinia = createTestingPinia();
	setActivePinia(pinia);
	createTestAppStore({ me: { permissions, roles: roles.map((name) => ({ id: name, name })) }, pinia });
	createTestEnvStore({
		ALERT_STATUS_URL: "https://status.dbildungscloud.de",
		ACCESSIBILITY_REPORT_EMAIL: "email",
		FEATURE_MEDIA_SHELF_ENABLED: true,
		SC_THEME: SchulcloudTheme.BRB,
		DOCUMENT_BASE_DIR: "https://example.com/documents/",
	});

	const axios: Mocked<AxiosInstance> = mockAxiosInstance();
	initializeAxios(axios);

	// the real German texts, because what this composable does is match against them
	const quickNav = mountComposable(() => useQuickNav(), {
		global: {
			plugins: [createTestingI18n({ locale: "de", fallbackLocale: ["de"], messages: { de } })],
		},
	});

	// every test starts from a closed, empty palette, and the state is shared on purpose
	quickNav.close();

	return { axios, quickNav };
};

const titlesOf = (groups: { entries: { title: string }[] }[]) =>
	groups.flatMap((group) => group.entries.map((entry) => entry.title));

describe("matchRange", () => {
	it("finds the query where it literally stands", () => {
		expect(matchRange("Ökosystem See", "See")).toEqual([10, 13]);
	});

	it("points at the umlaut the query was spelled without", () => {
		// the range has to cover "Räum", not "aum", or the highlight sits one character off
		expect(matchRange("Räume", "Raum")).toEqual([0, 4]);
	});

	it("counts in characters, so an umlaut before the match does not shift it", () => {
		expect(matchRange("Öko See", "See")).toEqual([4, 7]);
	});

	it("gives nothing when the query is not in the title", () => {
		expect(matchRange("Räume", "Chemie")).toBeUndefined();
	});

	it("gives nothing for an empty query", () => {
		expect(matchRange("Räume", "")).toBeUndefined();
	});

	it("counts an emoji before the match as one character", () => {
		expect(matchRange("😀 See", "See")).toEqual([2, 5]);
	});
});

describe("score", () => {
	it("ranks a word after an emoji as a word start", () => {
		expect(score("😀 See", "See")).toBe(2);
	});
});

describe("QuickNav Composable", () => {
	describe("when nothing has been typed", () => {
		it("suggests a few pages to jump to", () => {
			const { quickNav } = setup();

			expect(quickNav.groups.value[0].label).toBe("Springen zu");
			expect(quickNav.groups.value[0].entries.length).toBeGreaterThan(0);
			expect(quickNav.groups.value[0].entries.every((entry) => entry.kind === QuickNavKind.NAVIGATION)).toBe(true);
		});

		describe("when the user may create something", () => {
			it("also shows what they can create", () => {
				const { quickNav } = setup([Permission.SCHOOL_CREATE_ROOM]);

				const actions = quickNav.flatEntries.value.filter((entry) => entry.kind === QuickNavKind.ACTION);

				expect(actions.map((action) => action.id)).toEqual(["action:create-room"]);
			});
		});
	});

	describe("create actions", () => {
		const actionIds = (quickNav: ReturnType<typeof setup>["quickNav"]) =>
			quickNav.flatEntries.value.filter((entry) => entry.kind === QuickNavKind.ACTION).map((entry) => entry.id);

		describe("when a teacher may create tasks", () => {
			it("offers to create a task on the legacy task page", () => {
				const { quickNav } = setup([Permission.HOMEWORK_CREATE], [RoleName.TEACHER]);

				const createTask = quickNav.flatEntries.value.find((entry) => entry.id === "action:create-task");

				expect(createTask?.href).toBe("/homework/new?returnUrl=tasks");
			});
		});

		describe("when a student has the permission to create tasks", () => {
			it("does not offer it, like the task overview", () => {
				const { quickNav } = setup([Permission.HOMEWORK_CREATE], [RoleName.STUDENT]);

				expect(actionIds(quickNav)).not.toContain("action:create-task");
			});
		});

		describe("when the user may create news", () => {
			it("offers to create news", () => {
				const { quickNav } = setup([Permission.NEWS_CREATE]);

				const createNews = quickNav.flatEntries.value.find((entry) => entry.id === "action:create-news");

				expect(createNews?.to).toBe("/news/new");
			});
		});

		describe("when the user may not create anything", () => {
			it("offers no actions", () => {
				const { quickNav } = setup([], [RoleName.STUDENT]);

				expect(actionIds(quickNav)).toEqual([]);
			});
		});
	});

	describe("placeholder", () => {
		describe("when the user may create something", () => {
			it("mentions creating", () => {
				const { quickNav } = setup([Permission.NEWS_CREATE]);

				expect(quickNav.placeholder.value).toBe("Suchen, springen oder anlegen");
			});
		});

		describe("when the user may not create anything", () => {
			it("does not mention creating", () => {
				const { quickNav } = setup();

				expect(quickNav.placeholder.value).toBe("Suchen und springen");
			});
		});
	});

	describe("help", () => {
		const lastGroup = (groups: QuickNavGroup[]) => groups[groups.length - 1];

		describe("when nothing has been typed", () => {
			it("leaves the help pages out of the overview", () => {
				const { quickNav } = setup([Permission.SCHOOL_CREATE_ROOM]);

				expect(quickNav.groups.value.map((group) => group.label)).not.toContain("Hilfebereich");
			});

			it("still finds the help articles when searched for", () => {
				const { quickNav } = setup();

				quickNav.query.value = "Hilfeartikel";

				expect(titlesOf([lastGroup(quickNav.groups.value)])).toEqual(["Hilfeartikel"]);
			});
		});

		describe("when searching for a help page", () => {
			it("finds it in the help group at the end", () => {
				const { quickNav } = setup();

				quickNav.query.value = "Kontakt";

				expect(titlesOf([lastGroup(quickNav.groups.value)])).toEqual(["Kontakt"]);
			});

			it("opens external help pages in a new tab, like the sidebar", () => {
				const { quickNav } = setup();

				quickNav.query.value = "Fortbildungen";

				expect(lastGroup(quickNav.groups.value).entries[0].target).toBe("_blank");
			});
		});
	});

	describe("file pages", () => {
		const isFilePage = (entry: QuickNavEntry) => entry.id.startsWith("navigation:sidebar-files");

		it("are not suggested before anything is typed", () => {
			const { quickNav } = setup();

			expect(quickNav.flatEntries.value.some(isFilePage)).toBe(false);
		});

		it("are not found when searching for them", () => {
			const { quickNav } = setup();

			quickNav.query.value = "Dateien";

			expect(quickNav.flatEntries.value.some(isFilePage)).toBe(false);
		});
	});

	describe("when a query matches a page", () => {
		it("keeps only the matching pages", () => {
			const { quickNav } = setup();

			quickNav.query.value = "Räume";

			expect(titlesOf(quickNav.groups.value)).toContain("Räume");
			expect(titlesOf(quickNav.groups.value)).not.toContain("Aufgaben");
		});
	});

	describe("when the query is spelled without the umlaut", () => {
		it("still matches", () => {
			const { quickNav } = setup();

			quickNav.query.value = "raume";

			expect(titlesOf(quickNav.groups.value)).toContain("Räume");
		});
	});

	describe("when the user may create a room", () => {
		it("offers that as an action", () => {
			const { quickNav } = setup([Permission.SCHOOL_CREATE_ROOM]);

			quickNav.query.value = "Raum";

			const action = quickNav.flatEntries.value.find((entry) => entry.id === "action:create-room");

			expect(action?.to).toBe("/rooms/new");
		});
	});

	describe("when the user may create a course", () => {
		it("offers that as an action that opens the legacy page", () => {
			const { quickNav } = setup([Permission.COURSE_CREATE]);

			quickNav.query.value = "Kurs";

			const actions = quickNav.flatEntries.value.filter((entry) => entry.kind === QuickNavKind.ACTION);

			expect(actions).toHaveLength(1);
			expect(actions[0].href).toBe("/courses/add");
		});
	});

	describe("when the user may not create a room", () => {
		it("does not offer it", () => {
			const { quickNav } = setup();

			quickNav.query.value = "Raum";

			expect(quickNav.flatEntries.value.filter((entry) => entry.kind === QuickNavKind.ACTION)).toEqual([]);
		});
	});

	describe("when nothing matches", () => {
		it("shows no groups at all", () => {
			const { quickNav } = setup();

			quickNav.query.value = "zzzzzz";

			expect(quickNav.groups.value).toEqual([]);
		});
	});

	describe("selection", () => {
		it("starts on the first entry", () => {
			const { quickNav } = setup();

			expect(quickNav.selectedEntry.value).toBe(quickNav.flatEntries.value[0]);
		});

		it("moves down and wraps around at the end", () => {
			const { quickNav } = setup();
			const last = quickNav.flatEntries.value.length;

			quickNav.moveSelection(1);

			expect(quickNav.selectedEntry.value).toBe(quickNav.flatEntries.value[1]);

			quickNav.moveSelection(last - 1);

			expect(quickNav.selectedEntry.value).toBe(quickNav.flatEntries.value[0]);
		});

		it("moves up from the first entry to the last", () => {
			const { quickNav } = setup();

			quickNav.moveSelection(-1);

			expect(quickNav.selectedEntry.value).toBe(quickNav.flatEntries.value.at(-1));
		});

		it("returns to the first entry when the query changes", () => {
			const { quickNav } = setup();

			quickNav.moveSelection(1);
			quickNav.query.value = "Räume";

			expect(quickNav.selectedEntry.value).toBe(quickNav.flatEntries.value[0]);
		});
	});

	describe("when the palette is closed", () => {
		it("empties the query so it opens fresh next time", () => {
			const { quickNav } = setup();

			quickNav.open();
			quickNav.query.value = "Räume";
			quickNav.close();

			expect(quickNav.isOpen.value).toBe(false);
			expect(quickNav.query.value).toBe("");
		});
	});

	describe("when the palette opens", () => {
		it("loads the rooms, courses, tasks and people to search", () => {
			const { quickNav } = setup();
			const sourcesStore = useQuickNavSourcesStore();

			quickNav.open();

			expect(sourcesStore.load).toHaveBeenCalled();
		});
	});

	describe("when searching the loaded entries", () => {
		const entry = (kind: QuickNavKind, title: string): QuickNavEntry => ({
			id: `${kind}:${title}`,
			kind,
			title,
			icon: "",
			to: `/${kind}/${title}`,
		});

		const setupWithSources = () => {
			const result = setup();
			const sourcesStore = useQuickNavSourcesStore();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Biologie AG"), entry(QuickNavKind.ROOM, "Theater")];
			sourcesStore.courses = [entry(QuickNavKind.COURSE, "Biologie 7a")];
			sourcesStore.tasks = [entry(QuickNavKind.TASK, "Biologie Hausaufgabe")];
			sourcesStore.people = [entry(QuickNavKind.PERSON, "Anna Müller")];

			return result;
		};

		const groupOf = (groups: QuickNavGroup[], label: string) => groups.find((group) => group.label === label);

		it("lists matching rooms and courses in groups of their own, like the filters", () => {
			const { quickNav } = setupWithSources();

			quickNav.query.value = "Bio";

			expect(titlesOf([groupOf(quickNav.groups.value, "Räume")!])).toEqual(["Biologie AG"]);
			expect(titlesOf([groupOf(quickNav.groups.value, "Kurse")!])).toEqual(["Biologie 7a"]);
		});

		it("does not let many matching rooms hide the matching courses", () => {
			const { quickNav } = setupWithSources();
			const sourcesStore = useQuickNavSourcesStore();
			sourcesStore.rooms = Array.from({ length: 8 }, (_, index) => entry(QuickNavKind.ROOM, `Biologie ${index}`));

			quickNav.query.value = "Bio";

			expect(titlesOf([groupOf(quickNav.groups.value, "Kurse")!])).toEqual(["Biologie 7a"]);
		});

		it("lists matching tasks in their own group", () => {
			const { quickNav } = setupWithSources();

			quickNav.query.value = "Hausaufgabe";

			expect(titlesOf([groupOf(quickNav.groups.value, "Aufgaben")!])).toEqual(["Biologie Hausaufgabe"]);
		});

		it("finds people regardless of umlauts", () => {
			const { quickNav } = setupWithSources();

			quickNav.query.value = "muller";

			expect(titlesOf([groupOf(quickNav.groups.value, "Personen")!])).toEqual(["Anna Müller"]);
		});

		it("shows no courses, people or undated tasks before anything is typed", () => {
			const { quickNav } = setupWithSources();

			const titles = titlesOf(quickNav.groups.value);

			expect(titles).not.toContain("Biologie 7a");
			expect(titles).not.toContain("Anna Müller");
			expect(titles).not.toContain("Biologie Hausaufgabe");
		});

		it("shows at most five entries per group", () => {
			const { quickNav } = setup();
			const sourcesStore = useQuickNavSourcesStore();
			sourcesStore.tasks = Array.from({ length: 8 }, (_, index) => entry(QuickNavKind.TASK, `Aufgabe ${index}`));

			quickNav.query.value = "Aufgabe";

			expect(
				groupOf(quickNav.groups.value, "Aufgaben")?.entries.filter((e) => e.kind === QuickNavKind.TASK)
			).toHaveLength(5);
		});

		describe("when a group is cut short", () => {
			const setupWithManyTasks = () => {
				const result = setup();
				useQuickNavSourcesStore().tasks = Array.from({ length: 8 }, (_, index) =>
					entry(QuickNavKind.TASK, `Aufgabe ${index}`)
				);
				result.quickNav.query.value = "Aufgabe";

				return result;
			};

			it("ends it with a line that opens the whole category", () => {
				const { quickNav } = setupWithManyTasks();

				const last = groupOf(quickNav.groups.value, "Aufgaben")?.entries.at(-1);

				expect(last).toEqual(
					expect.objectContaining({
						kind: QuickNavKind.SHOW_ALL,
						showsAll: "tasks",
						title: "Aufgaben: alle 8 anzeigen",
					})
				);
			});

			it("counts what is shown against everything that matches", () => {
				const { quickNav } = setupWithManyTasks();

				expect(quickNav.resultCount.value).toBe(5);
				expect(quickNav.matchCount.value).toBe(8);
			});
		});

		it("counts the matches of each category before any group is cut short", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().tasks = Array.from({ length: 8 }, (_, index) =>
				entry(QuickNavKind.TASK, `Aufgabe ${index}`)
			);

			quickNav.query.value = "Aufgabe";

			expect(quickNav.countIn("tasks")).toBe(8);
			expect(quickNav.countIn("rooms")).toBe(0);
		});

		it("shows at most five pages, too", () => {
			// administrators see many more sidebar pages than anyone else
			const { quickNav } = setup([Permission.ADMIN_VIEW, Permission.TEACHER_LIST, Permission.STUDENT_LIST]);

			quickNav.query.value = "e";

			expect(groupOf(quickNav.groups.value, "Springen zu")?.entries.length).toBeLessThanOrEqual(5);
		});

		it("ranks a title start above a word start above a match inside a word", () => {
			const { quickNav } = setup();
			const sourcesStore = useQuickNavSourcesStore();
			sourcesStore.rooms = [
				entry(QuickNavKind.ROOM, "Mikrobiologie"),
				entry(QuickNavKind.ROOM, "AG Biologie"),
				entry(QuickNavKind.ROOM, "Biologie"),
			];

			quickNav.query.value = "Bio";

			expect(titlesOf([groupOf(quickNav.groups.value, "Räume")!])).toEqual([
				"Biologie",
				"AG Biologie",
				"Mikrobiologie",
			]);
		});
	});

	describe("creating a room under the searched name", () => {
		const room = (title: string): QuickNavEntry => ({ id: `room:${title}`, kind: QuickNavKind.ROOM, title, icon: "" });

		it("is offered to someone who may create rooms", () => {
			const { quickNav } = setup([Permission.SCHOOL_CREATE_ROOM]);

			quickNav.query.value = "Theater AG";

			expect(quickNav.flatEntries.value.find((entry) => entry.id === "action:create-room-named")).toEqual(
				expect.objectContaining({ title: "Raum „Theater AG“ erstellen", to: "/rooms/new?name=Theater%20AG" })
			);
		});

		it("is not offered when a room of that name exists, however it is spelled", () => {
			const { quickNav } = setup([Permission.SCHOOL_CREATE_ROOM]);
			useQuickNavSourcesStore().rooms = [room("Theater-Ä")];

			quickNav.query.value = "theater-a";

			expect(quickNav.flatEntries.value.some((entry) => entry.id === "action:create-room-named")).toBe(false);
		});

		it("is not offered to someone who may not create rooms", () => {
			const { quickNav } = setup();

			quickNav.query.value = "Theater AG";

			expect(quickNav.groups.value).toEqual([]);
		});

		it("is not counted as a result", () => {
			const { quickNav } = setup([Permission.SCHOOL_CREATE_ROOM]);

			quickNav.query.value = "zzzzzz";

			expect(quickNav.resultCount.value).toBe(0);
		});
	});

	describe("recently opened", () => {
		const course = (title: string): QuickNavEntry => ({
			id: `course:${title}`,
			kind: QuickNavKind.COURSE,
			title,
			icon: "",
		});

		beforeEach(() => {
			localStorage.clear();
		});

		it("leads the overview with what was opened last", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().courses = [course("Biologie"), course("Chemie")];

			quickNav.remember(course("Biologie"));
			quickNav.remember(course("Chemie"));

			expect(quickNav.groups.value[0]).toEqual({
				label: "Zuletzt geöffnet",
				entries: [expect.objectContaining({ title: "Chemie" }), expect.objectContaining({ title: "Biologie" })],
				isRecent: true,
				isWide: true,
			});
		});

		it("shows only the last two", () => {
			const { quickNav } = setup();
			const courses = ["Biologie", "Chemie", "Physik"].map(course);
			useQuickNavSourcesStore().courses = courses;

			courses.forEach((entry) => quickNav.remember(entry));

			expect(quickNav.groups.value[0].entries.map((entry) => entry.title)).toEqual(["Physik", "Chemie"]);
		});

		it("forgets everything when cleared, also for the next time", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().courses = [course("Chemie")];
			quickNav.remember(course("Chemie"));

			quickNav.clearRecent();

			expect(quickNav.groups.value.map((group) => group.label)).not.toContain("Zuletzt geöffnet");
			expect(Object.values(localStorage).every((value) => value === "[]")).toBe(true);
		});

		it("leaves out what no longer exists", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().courses = [course("Chemie")];

			quickNav.remember(course("Gelöscht"));

			expect(titlesOf(quickNav.groups.value)).not.toContain("Gelöscht");
		});

		it("does not remember pages, which are one click away in the sidebar", () => {
			const { quickNav } = setup();

			quickNav.remember({ id: "navigation:x", kind: QuickNavKind.NAVIGATION, title: "Räume", icon: "" });

			expect(quickNav.groups.value[0].label).not.toBe("Zuletzt geöffnet");
		});
	});

	describe("ranking", () => {
		const room = (title: string, memberCount?: number): QuickNavEntry => ({
			id: `room:${title}`,
			kind: QuickNavKind.ROOM,
			title,
			icon: "",
			memberCount,
		});

		beforeEach(() => {
			localStorage.clear();
		});

		it("orders equally good matches by name, with numbers in their natural order", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().rooms = [room("Biologie 10a"), room("Biologie 5a"), room("Biologie 7a")];

			quickNav.query.value = "Bio";

			expect(titlesOf(quickNav.groups.value)).toEqual(["Biologie 5a", "Biologie 7a", "Biologie 10a"]);
		});

		it("puts what was opened recently ahead of equally good matches", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().rooms = [room("Biologie 5a"), room("Biologie 7a")];
			quickNav.remember(room("Biologie 7a"));

			quickNav.query.value = "Bio";

			expect(titlesOf(quickNav.groups.value)[0]).toBe("Biologie 7a");
		});

		it("puts the room whose whole name was typed ahead of a recent one that starts the same", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().rooms = [room("Mathematik Leistungskurs"), room("Mathe")];
			quickNav.remember(room("Mathematik Leistungskurs"));

			quickNav.query.value = "mathe";

			expect(titlesOf(quickNav.groups.value)[0]).toBe("Mathe");
		});

		it("keeps a better match ahead of a recent one", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().rooms = [room("Biologie"), room("AG Biologie")];
			quickNav.remember(room("AG Biologie"));

			quickNav.query.value = "Bio";

			expect(titlesOf(quickNav.groups.value)[0]).toBe("Biologie");
		});

		it("sorts a whole category by name when nothing is typed", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().rooms = [room("Deutsch 7a"), room("Biologie 10a"), room("Biologie 5a")];

			quickNav.scope.value = "rooms";

			expect(titlesOf(quickNav.groups.value)).toEqual(["Biologie 5a", "Biologie 10a", "Deutsch 7a"]);
		});

		it("gives each room its number of members as a second line", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().rooms = [room("Theater", 3)];

			quickNav.query.value = "Theater";

			expect(quickNav.flatEntries.value[0].subtitle).toBe("3 Mitglieder");
		});

		it("says in the recently opened group which lines are courses or tasks rather than rooms", () => {
			const { quickNav } = setup();
			const sourcesStore = useQuickNavSourcesStore();
			sourcesStore.rooms = [room("Theater", 1)];
			sourcesStore.courses = [{ id: "course:Mathe", kind: QuickNavKind.COURSE, title: "Mathe", icon: "" }];
			quickNav.remember(sourcesStore.rooms[0]);
			quickNav.remember(sourcesStore.courses[0]);

			expect(quickNav.groups.value[0].entries.map((entry) => entry.subtitle)).toEqual(["Kurs", "1 Mitglied"]);
		});
	});

	describe("due soon", () => {
		const inDays = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
		const task = (title: string, dueDate?: string): QuickNavEntry => ({
			id: `task:${title}`,
			kind: QuickNavKind.TASK,
			title,
			subtitle: "Biologie 7a",
			icon: "",
			dueDate,
		});
		const upcomingOf = (groups: QuickNavGroup[]) => groups.find((group) => group.label === "Bald fällig");

		it("lists the next tasks with a deadline in the coming two weeks, soonest first, at most three", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().tasks = [
				task("Referat", inDays(5)),
				task("Vokabeltest", inDays(1)),
				task("Projekt", inDays(20)),
				task("Überfällig", inDays(-1)),
				task("Ohne Termin"),
				task("Protokoll", inDays(2)),
				task("Lesetagebuch", inDays(9)),
			];

			expect(titlesOf([upcomingOf(quickNav.groups.value)!])).toEqual(["Vokabeltest", "Protokoll", "Referat"]);
		});

		it("says which course a task belongs to and when it is due", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().tasks = [task("Referat", inDays(1))];

			expect(upcomingOf(quickNav.groups.value)?.entries[0].subtitle).toMatch(/^Biologie 7a · fällig \S+/);
		});

		it("is left out when nothing is due soon", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().tasks = [task("Projekt", inDays(30))];

			expect(upcomingOf(quickNav.groups.value)).toBeUndefined();
		});

		it("spans the full width with the recent lines, above the columns", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().tasks = [task("Referat", inDays(1))];
			quickNav.columnCount.value = 2;

			const [lead] = quickNav.blocks.value;

			expect(lead).toEqual(expect.objectContaining({ isFullWidth: true }));
			expect(lead.groups.map((group) => group.label)).toEqual(["Bald fällig"]);
		});
	});

	describe("a group with one entry more than it shows", () => {
		it("shows that entry instead of a line that opens the category", () => {
			const { quickNav } = setup();
			useQuickNavSourcesStore().tasks = Array.from({ length: 6 }, (_, index) => ({
				id: `task:${index}`,
				kind: QuickNavKind.TASK,
				title: `Aufgabe ${index}`,
				icon: "",
			}));

			quickNav.query.value = "Aufgabe";

			const kinds = quickNav.flatEntries.value.map((entry) => entry.kind);
			expect(kinds.filter((kind) => kind === QuickNavKind.TASK)).toHaveLength(6);
			expect(kinds).not.toContain(QuickNavKind.SHOW_ALL);
		});
	});

	describe("overview in two columns", () => {
		const setupInColumns = () => {
			const result = setup([Permission.SCHOOL_CREATE_ROOM]);
			result.quickNav.columnCount.value = 2;
			return result;
		};

		it("walks down the first column before the second", () => {
			const { quickNav } = setupInColumns();

			const order = quickNav.columns.value.flat().flatMap((group) => group.entries.map((entry) => entry.id));

			expect(quickNav.flatEntries.value.map((entry) => entry.id)).toEqual(order);
		});

		it("moves to the line at the same height in the other column", () => {
			const { quickNav } = setupInColumns();
			const [left, right] = quickNav.columns.value.map((column) => column.flatMap((group) => group.entries));

			expect(quickNav.moveColumn(1)).toBe(true);
			expect(quickNav.selectedEntry.value?.id).toBe(right[0].id);

			quickNav.moveColumn(-1);
			expect(quickNav.selectedEntry.value?.id).toBe(left[0].id);
		});

		it("does nothing beyond the last column", () => {
			const { quickNav } = setupInColumns();
			quickNav.moveColumn(1);
			const before = quickNav.selectedEntry.value?.id;

			expect(quickNav.moveColumn(1)).toBe(false);
			expect(quickNav.selectedEntry.value?.id).toBe(before);
		});

		describe("with something opened recently", () => {
			const setupWithRecent = () => {
				const result = setupInColumns();
				const course: QuickNavEntry = { id: "course:Mathe", kind: QuickNavKind.COURSE, title: "Mathe", icon: "" };
				useQuickNavSourcesStore().courses = [course];
				result.quickNav.remember(course);
				return result;
			};

			it("puts it across the full width on top, with the rest in columns below", () => {
				const { quickNav } = setupWithRecent();

				const [lead, ...rest] = quickNav.blocks.value;

				expect(lead.isFullWidth).toBe(true);
				expect(lead.groups.map((group) => group.label)).toEqual(["Zuletzt geöffnet"]);
				expect(rest).toHaveLength(2);
				expect(rest.every((block) => !block.isFullWidth)).toBe(true);
			});

			it("starts the arrow keys on it", () => {
				const { quickNav } = setupWithRecent();

				expect(quickNav.selectedEntry.value?.title).toBe("Mathe");
			});

			it("has no column to move sideways to from there", () => {
				const { quickNav } = setupWithRecent();

				expect(quickNav.moveColumn(1)).toBe(false);
				expect(quickNav.selectedEntry.value?.title).toBe("Mathe");
			});
		});

		it("is one column again while searching", () => {
			const { quickNav } = setupInColumns();

			quickNav.query.value = "Raum";

			expect(quickNav.blocks.value).toEqual([expect.objectContaining({ isFullWidth: true })]);
			expect(quickNav.moveColumn(1)).toBe(false);
		});
	});

	describe("select", () => {
		it("makes the given entry the selected one", () => {
			const { quickNav } = setup();
			quickNav.query.value = "e";
			const second = quickNav.flatEntries.value[1];

			quickNav.select(second.id);

			expect(quickNav.selectedEntry.value).toBe(second);
		});
	});

	describe("toggle", () => {
		describe("when the palette is closed", () => {
			it("opens it", () => {
				const { quickNav } = setup();

				quickNav.toggle();

				expect(quickNav.isOpen.value).toBe(true);
			});
		});

		describe("when the palette is open", () => {
			it("closes it", () => {
				const { quickNav } = setup();
				quickNav.open();

				quickNav.toggle();

				expect(quickNav.isOpen.value).toBe(false);
			});
		});
	});
});
