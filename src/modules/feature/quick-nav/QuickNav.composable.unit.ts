import { matchRange, useQuickNav } from "./QuickNav.composable";
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
});

describe("QuickNav Composable", () => {
	describe("when nothing has been typed", () => {
		it("suggests a few pages to jump to", () => {
			const { quickNav } = setup();

			expect(quickNav.groups.value).toHaveLength(1);
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

			const actions = quickNav.flatEntries.value.filter((entry) => entry.kind === QuickNavKind.ACTION);

			expect(actions).toHaveLength(1);
			expect(actions[0].to).toBe("/rooms/new");
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

		it("lists matching rooms and courses together", () => {
			const { quickNav } = setupWithSources();

			quickNav.query.value = "Bio";

			expect(titlesOf([groupOf(quickNav.groups.value, "Räume und Kurse")!])).toEqual(["Biologie AG", "Biologie 7a"]);
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

		it("shows no loaded entries before anything is typed", () => {
			const { quickNav } = setupWithSources();

			expect(titlesOf(quickNav.groups.value)).not.toContain("Biologie AG");
		});

		it("shows at most five entries per group", () => {
			const { quickNav } = setup();
			const sourcesStore = useQuickNavSourcesStore();
			sourcesStore.tasks = Array.from({ length: 8 }, (_, index) => entry(QuickNavKind.TASK, `Aufgabe ${index}`));

			quickNav.query.value = "Aufgabe";

			expect(groupOf(quickNav.groups.value, "Aufgaben")?.entries).toHaveLength(5);
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

			expect(titlesOf([groupOf(quickNav.groups.value, "Räume und Kurse")!])).toEqual([
				"Biologie",
				"AG Biologie",
				"Mikrobiologie",
			]);
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
