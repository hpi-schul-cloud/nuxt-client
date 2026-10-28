import { useQuickNav } from "./QuickNav.composable";
import QuickNavDialog from "./QuickNavDialog.vue";
import { useQuickNavSourcesStore } from "./QuickNavSources.store";
import { QuickNavEntry, QuickNavKind } from "./types";
import en from "@/locales/en";
import { createTestAppStoreWithPermissions, createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission, SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VDialog, VProgressCircular } from "vuetify/components";

vi.mock("@util-logger");

const VDialogStub = {
	name: "VDialog",
	emits: ["update:modelValue", "click:outside", "after-leave"],
	props: VDialog.props,
	template: `<div v-if="modelValue" class="v-dialog-stub"><slot /></div>`,
};

const entry = (kind: QuickNavKind, title: string, target: Partial<QuickNavEntry> = {}): QuickNavEntry => ({
	id: `${kind}:${title}`,
	kind,
	title,
	icon: "",
	to: `/${kind}/${title}`,
	...target,
});

describe("QuickNavDialog", () => {
	enableAutoUnmount(afterEach);

	beforeAll(() => {
		// jsdom does not implement scrolling
		Element.prototype.scrollIntoView = vi.fn();
	});

	const setup = (permissions: Permission[] = []) => {
		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions(permissions, pinia);
		createTestEnvStore({ SC_THEME: SchulcloudTheme.BRB });

		const router = createRouterMock();
		injectRouterMock(router);

		Object.defineProperty(window, "location", {
			configurable: true,
			value: { assign: vi.fn() },
		});

		const i18n = createTestingI18n({ locale: "en", fallbackLocale: ["en"], messages: { en } });
		const palette = mountComposable(() => useQuickNav(), { global: { plugins: [i18n] } });
		palette.close();

		const sourcesStore = useQuickNavSourcesStore();

		const wrapper = mount(QuickNavDialog, {
			attachTo: document.body,
			global: {
				plugins: [pinia, createTestingVuetify(), i18n],
				stubs: { VDialog: VDialogStub },
			},
		});

		const openWith = async (query: string) => {
			palette.open();
			await nextTick();
			await wrapper.get("[data-testid=quick-nav-input]").setValue(query);
		};

		return { wrapper, palette, sourcesStore, router, openWith };
	};

	afterEach(() => {
		document.body.innerHTML = "";
	});

	describe("when it opens", () => {
		it("focuses the search field", async () => {
			const { wrapper, palette } = setup();

			palette.open();
			await nextTick();
			await nextTick();

			expect(document.activeElement).toBe(wrapper.get("[data-testid=quick-nav-input]").element);
		});

		it("shows a spinner while entries are loading", async () => {
			const { wrapper, palette, sourcesStore } = setup();
			sourcesStore.isLoading = true;

			palette.open();
			await nextTick();

			expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
		});
	});

	describe("when something matches", () => {
		const setupWithTask = async () => {
			const result = setup();
			result.sourcesStore.tasks = [entry(QuickNavKind.TASK, "Biologie Hausaufgabe", { subtitle: "Biologie 7a" })];
			await result.openWith("Hausaufgabe");

			return result;
		};

		it("shows the label of the group", async () => {
			const { wrapper } = await setupWithTask();

			expect(wrapper.text()).toContain("Tasks");
		});

		it("shows the title of the entry", async () => {
			const { wrapper } = await setupWithTask();

			expect(wrapper.text()).toContain("Biologie Hausaufgabe");
		});

		it("marks an overdue task, the way the task overview does", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.tasks = [entry(QuickNavKind.TASK, "Referat", { isOverdue: true })];

			await openWith("Referat");

			expect(wrapper.get("[data-testid=quick-nav-overdue]").text()).toBe("Overdue");
		});

		it("shows the subtitle of the entry", async () => {
			const { wrapper } = await setupWithTask();

			expect(wrapper.text()).toContain("Biologie 7a");
		});

		it("highlights the matching part of the title", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Räume der AG")];

			await openWith("Raum");

			expect(wrapper.get("mark").text()).toBe("Räum");
		});

		it("points the field at the selected entry", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];

			await openWith("Theater");

			const input = wrapper.get("[data-testid=quick-nav-input]");
			expect(input.attributes("aria-activedescendant")).toContain("room:Theater");
		});
	});

	describe("when nothing matches", () => {
		it("says that nothing was found", async () => {
			const { wrapper, openWith } = setup();

			await openWith("zzzzzz");

			expect(wrapper.get("[data-testid=quick-nav-empty]").text()).toContain("Nothing found.");
		});

		it("names what could not be loaded", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.failedScopes = ["rooms", "people"];

			await openWith("zzzzzz");

			expect(wrapper.get("[data-testid=quick-nav-error]").text()).toContain(
				"Rooms and People could not be loaded. The results are incomplete."
			);
		});

		it("announces the failure once, as an alert, instead of with every result count", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.failedScopes = ["tasks"];
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];

			await openWith("Theater");

			expect(wrapper.get("[data-testid=quick-nav-error]").attributes("role")).toBe("alert");
			expect(wrapper.get("[data-testid=quick-nav-status]").text()).toBe("Results: 1");
		});

		it("gives no count for a category that could not be loaded", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.failedScopes = ["tasks"];
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];

			await openWith("Theater");

			const tasks = wrapper.get("[data-testid=quick-nav-filter-tasks]");
			expect(tasks.text()).toContain("–");
			expect(tasks.attributes("aria-label")).toBe("Tasks, not loaded");
		});
	});

	describe("focused search", () => {
		it("shows all matching rooms, excludes courses and preserves the query on return", async () => {
			const { wrapper, sourcesStore, openWith, palette } = setup();
			sourcesStore.rooms = Array.from({ length: 7 }, (_, index) => entry(QuickNavKind.ROOM, `Theater ${index}`));
			sourcesStore.courses = [entry(QuickNavKind.COURSE, "Theater course")];
			await openWith("Theater");
			// five rooms, the line that opens all of them, and the course in its own group
			expect(wrapper.findAll("[role=option]")).toHaveLength(7);
			expect(wrapper.get("[data-testid=quick-nav-entry-show-all\\:rooms]").text()).toContain("Rooms: show all 7");

			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");

			expect(wrapper.findAll("[role=option]")).toHaveLength(7);
			expect(wrapper.text()).not.toContain("Theater course");
			expect(wrapper.get("h2").text()).toBe("Rooms");
			expect(wrapper.get("[data-testid=quick-nav-filter-rooms]").attributes("aria-pressed")).toBe("true");
			expect(document.activeElement).toBe(wrapper.get("[data-testid=quick-nav-input]").element);

			await wrapper.get("[data-testid=quick-nav-input]").trigger("keydown", { key: "Escape" });

			expect(wrapper.get<HTMLInputElement>("[data-testid=quick-nav-input]").element.value).toBe("Theater");
			expect(wrapper.get("[data-testid=quick-nav-filter-all]").attributes("aria-pressed")).toBe("true");
			expect(palette.isOpen.value).toBe(true);
		});

		it("tones down the categories without a hit", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("Theater");

			expect(wrapper.get("[data-testid=quick-nav-filter-rooms]").classes()).not.toContain("quick-nav-filter-empty");
			expect(wrapper.get("[data-testid=quick-nav-filter-people]").classes()).toContain("quick-nav-filter-empty");
		});

		it("browses a category without a query and resets the scope when closed", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("");
			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");
			expect(wrapper.findAll("[role=option]")).toHaveLength(1);

			await wrapper.get("[data-testid=quick-nav-close]").trigger("click");
			await openWith("");

			expect(wrapper.get("[data-testid=quick-nav-filter-all]").attributes("aria-pressed")).toBe("true");
		});

		it.each(["courses", "tasks", "people"] as const)("isolates %s", async (scope) => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Room")];
			sourcesStore.courses = [entry(QuickNavKind.COURSE, "Course")];
			sourcesStore.tasks = [entry(QuickNavKind.TASK, "Task")];
			sourcesStore.people = [entry(QuickNavKind.PERSON, "Person")];
			await openWith("");
			await wrapper.get(`[data-testid=quick-nav-filter-${scope}]`).trigger("click");

			expect(wrapper.findAll("[role=option]")).toHaveLength(1);
			expect(wrapper.get("[role=option]").text()).toBe(sourcesStore[scope][0].title);
		});

		it("clears the query without leaving the selected category", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater"), entry(QuickNavKind.ROOM, "Music")];
			await openWith("Theater");
			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");

			await wrapper.get("[data-testid=quick-nav-clear]").trigger("click");

			expect(wrapper.get<HTMLInputElement>("[data-testid=quick-nav-input]").element.value).toBe("");
			expect(wrapper.get("h2").text()).toBe("Rooms");
			expect(wrapper.findAll("[role=option]")).toHaveLength(2);
			expect(document.activeElement).toBe(wrapper.get("[data-testid=quick-nav-input]").element);
		});

		it("returns to all results through the category control", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			sourcesStore.tasks = [entry(QuickNavKind.TASK, "Theater task")];
			await openWith("Theater");
			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");
			await wrapper.get("[data-testid=quick-nav-filter-all]").trigger("click");

			expect(wrapper.findAll("[role=option]")).toHaveLength(2);
			expect(wrapper.get("[data-testid=quick-nav-filter-all]").attributes("aria-pressed")).toBe("true");
		});

		it("keeps Esc from reaching the window, where the dialog would close itself", async () => {
			const { wrapper, sourcesStore, openWith, palette } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("");
			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");
			const reachedWindow = vi.fn();
			window.addEventListener("keydown", reachedWindow);

			wrapper
				.get("[data-testid=quick-nav-input]")
				.element.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
			await nextTick();
			window.removeEventListener("keydown", reachedWindow);

			expect(reachedWindow).not.toHaveBeenCalled();
			expect(palette.isOpen.value).toBe(true);
			expect(wrapper.get("[data-testid=quick-nav-filter-all]").attributes("aria-pressed")).toBe("true");
		});

		it("says in the key hints that Esc goes back while a category is open", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("");

			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");

			expect(wrapper.get(".quick-nav-keyboard").text()).toContain("Esc to go back");
		});

		it("says that nothing was found when the only line left offers to create a room", async () => {
			const { wrapper, openWith } = setup([Permission.SCHOOL_CREATE_ROOM]);

			await openWith("Theater AG");

			expect(wrapper.get("[data-testid=quick-nav-nothing-for]").text()).toBe("Nothing found for “Theater AG”.");
			expect(wrapper.get("[data-testid=quick-nav-status]").text()).toBe("Nothing found for “Theater AG”.");
		});

		it("clears what was opened recently and puts the focus back into the field", async () => {
			const { wrapper, sourcesStore, openWith, palette } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			palette.remember(sourcesStore.rooms[0]);
			await openWith("");

			const clear = wrapper.get("[data-testid=quick-nav-clear-recent]");
			expect(clear.attributes("aria-label")).toBe("Clear recently opened");
			await clear.trigger("click");
			await nextTick();

			expect(wrapper.find("[data-testid=quick-nav-clear-recent]").exists()).toBe(false);
			expect(wrapper.text()).not.toContain("Theater");
			// back to the first-run hint in the history's place
			expect(wrapper.find("[data-testid=quick-nav-recent-placeholder]").exists()).toBe(true);
			expect(document.activeElement).toBe(wrapper.get("[data-testid=quick-nav-input]").element);
		});

		describe("before anything has been opened", () => {
			it("says where the recently opened lines will appear and gives a tip", async () => {
				const { wrapper, openWith } = setup();

				await openWith("");

				expect(wrapper.get("[data-testid=quick-nav-recent-placeholder]").text()).toContain(
					"Rooms, courses and tasks you open will appear here."
				);
				expect(wrapper.get("[data-testid=quick-nav-tips]").text()).toBe(
					"Tip: Accents are optional, and Backspace leaves a filter."
				);
			});

			it("keeps both out of the list the arrow keys walk", async () => {
				const { wrapper, openWith } = setup();

				await openWith("");

				expect(wrapper.get("[role=listbox]").find("[data-testid=quick-nav-tips]").exists()).toBe(false);
				expect(wrapper.get("[role=listbox]").find("[data-testid=quick-nav-recent-placeholder]").exists()).toBe(false);
			});

			it("shows neither once something has been opened", async () => {
				const { wrapper, sourcesStore, openWith, palette } = setup();
				sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
				palette.remember(sourcesStore.rooms[0]);

				await openWith("");

				expect(wrapper.find("[data-testid=quick-nav-recent-placeholder]").exists()).toBe(false);
				expect(wrapper.find("[data-testid=quick-nav-tips]").exists()).toBe(false);
			});

			it("shows neither while searching", async () => {
				const { wrapper, openWith } = setup();

				await openWith("Theater");

				expect(wrapper.find("[data-testid=quick-nav-tips]").exists()).toBe(false);
			});
		});

		it("leaves the category on Backspace in an empty field", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("");
			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");

			await wrapper.get("[data-testid=quick-nav-input]").trigger("keydown", { key: "Backspace" });

			expect(wrapper.get("[data-testid=quick-nav-filter-all]").attributes("aria-pressed")).toBe("true");
		});

		it("keeps the category on Backspace while there is text to delete", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("Th");
			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");

			await wrapper.get("[data-testid=quick-nav-input]").trigger("keydown", { key: "Backspace" });

			expect(wrapper.get("[data-testid=quick-nav-filter-rooms]").attributes("aria-pressed")).toBe("true");
		});

		it("opens the whole category from the line at the end of a cut-short group, without closing", async () => {
			const { wrapper, sourcesStore, openWith, palette } = setup();
			sourcesStore.rooms = Array.from({ length: 7 }, (_, index) => entry(QuickNavKind.ROOM, `Theater ${index}`));
			await openWith("Theater");

			await wrapper.get("[data-testid=quick-nav-entry-show-all\\:rooms]").trigger("click");

			expect(palette.isOpen.value).toBe(true);
			expect(wrapper.get("[data-testid=quick-nav-filter-rooms]").attributes("aria-pressed")).toBe("true");
			expect(wrapper.findAll("[role=option]")).toHaveLength(7);
		});

		it("does not mark the query in lines that only repeat it", async () => {
			const { wrapper, sourcesStore, openWith } = setup([Permission.SCHOOL_CREATE_ROOM]);
			sourcesStore.rooms = Array.from({ length: 7 }, (_, index) => entry(QuickNavKind.ROOM, `Rooms ${index}`));
			await openWith("Rooms");

			expect(wrapper.get("[data-testid=quick-nav-entry-show-all\\:rooms]").find("mark").exists()).toBe(false);
			expect(wrapper.get("[data-testid=quick-nav-entry-action\\:create-room-named]").find("mark").exists()).toBe(false);
			expect(wrapper.get("[data-testid=quick-nav-entry-room\\:Rooms\\ 0]").find("mark").exists()).toBe(true);
		});

		it("says how many of the matches are shown when groups are cut short", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = Array.from({ length: 7 }, (_, index) => entry(QuickNavKind.ROOM, `Theater ${index}`));
			await openWith("Theater");

			expect(wrapper.get("[data-testid=quick-nav-status]").text()).toBe("5 of 7 shown");
		});

		it("gives each filter its number of matches as part of its name", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("Theater");

			expect(wrapper.get("[data-testid=quick-nav-filter-rooms]").attributes("aria-label")).toBe("Rooms, Results: 1");
		});

		it("does not point to all results from an empty category when they are empty, too", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("zzzzzz");
			await wrapper.get("[data-testid=quick-nav-filter-rooms]").trigger("click");

			expect(wrapper.get("[data-testid=quick-nav-empty]").text()).not.toContain("All results");
		});

		it("does not announce an empty result while loading", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.isLoading = true;
			await openWith("unknown");

			expect(wrapper.find("[data-testid=quick-nav-empty]").exists()).toBe(false);
			expect(wrapper.get("[data-testid=quick-nav-status]").text()).toBe("Loading results…");
			// the list area shows the same words, so the footer only announces them
			expect(wrapper.get("[data-testid=quick-nav-status]").classes()).toContain("d-sr-only");
		});

		it("offers retry even when partial results exist", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.failedScopes = ["tasks"];
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater")];
			await openWith("Theater");
			vi.mocked(sourcesStore.load).mockClear();

			await wrapper.get("[data-testid=quick-nav-retry]").trigger("click");

			expect(sourcesStore.load).toHaveBeenCalledOnce();
			expect(wrapper.findAll("[role=option]")).toHaveLength(1);
		});
	});

	describe("keyboard", () => {
		const setupWithRooms = async () => {
			const result = setup();
			result.sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater A"), entry(QuickNavKind.ROOM, "Theater B")];
			await result.openWith("Theater");

			return { ...result, input: result.wrapper.get("[data-testid=quick-nav-input]") };
		};

		it("opens the selected entry on Enter", async () => {
			const { router, input } = await setupWithRooms();

			await input.trigger("keydown.enter");

			expect(router.push).toHaveBeenCalledWith("/room/Theater A");
		});

		it("moves the selection down and up with the arrow keys", async () => {
			const { router, input } = await setupWithRooms();

			await input.trigger("keydown.down");
			await input.trigger("keydown.down");
			await input.trigger("keydown.up");
			await input.trigger("keydown.enter");

			expect(router.push).toHaveBeenCalledWith("/room/Theater B");
		});

		it("scrolls the selected entry into view", async () => {
			const { input } = await setupWithRooms();
			const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
			scrollIntoView.mockClear();

			await input.trigger("keydown.down");
			await flushPromises();

			expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
			expect(scrollIntoView.mock.contexts.at(-1)).toBe(
				document.getElementById(input.attributes("aria-activedescendant") ?? "")
			);
		});

		it("closes on Escape", async () => {
			const { palette, input } = await setupWithRooms();

			await input.trigger("keydown.esc");

			expect(palette.isOpen.value).toBe(false);
		});
	});

	describe("mouse", () => {
		it("selects the entry under the pointer", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater A"), entry(QuickNavKind.ROOM, "Theater B")];
			await openWith("Theater");

			await wrapper.get("[data-testid='quick-nav-entry-room:Theater B']").trigger("mousemove");

			expect(wrapper.get("[data-testid='quick-nav-entry-room:Theater B']").attributes("aria-selected")).toBe("true");
		});

		it("loads the page for entries that live outside this client", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.tasks = [entry(QuickNavKind.TASK, "Hausaufgabe", { to: undefined, href: "/homework/1" })];
			await openWith("Hausaufgabe");

			await wrapper.get("[data-testid='quick-nav-entry-task:Hausaufgabe']").trigger("click");

			expect(window.location.assign).toHaveBeenCalledWith("/homework/1");
		});

		it("opens entries meant for a new tab in a new tab", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			const openSpy = vi.spyOn(window, "open").mockReturnValue(null);
			sourcesStore.tasks = [
				entry(QuickNavKind.TASK, "Fortbildung", { to: undefined, href: "https://example.org", target: "_blank" }),
			];
			await openWith("Fortbildung");

			await wrapper.get("[data-testid='quick-nav-entry-task:Fortbildung']").trigger("click");

			expect(openSpy).toHaveBeenCalledWith("https://example.org", "_blank", "noopener");
		});

		describe("when the user clicks an action entry", () => {
			const setupAndClickAction = async () => {
				const result = setup();
				const action = vi.fn();
				result.sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater", { to: undefined, action })];
				await result.openWith("Theater");

				await result.wrapper.get("[data-testid='quick-nav-entry-room:Theater']").trigger("click");

				return { ...result, action };
			};

			it("runs the action", async () => {
				const { action } = await setupAndClickAction();

				expect(action).toHaveBeenCalled();
			});

			it("closes the palette", async () => {
				const { palette } = await setupAndClickAction();

				expect(palette.isOpen.value).toBe(false);
			});
		});
	});

	describe("accessibility", () => {
		it("names the dialog", async () => {
			const { wrapper, palette } = setup();

			palette.open();
			await nextTick();

			expect(wrapper.get(".v-dialog-stub").attributes("aria-label")).toBe("Quick navigation");
		});

		it("labels each group of results with its heading", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.tasks = [entry(QuickNavKind.TASK, "Hausaufgabe")];
			await openWith("Hausaufgabe");

			// a fieldset is a group without needing the role attribute
			const group = wrapper.get("[role=listbox] fieldset");
			const heading = wrapper.get(`[id="${group.attributes("aria-labelledby")}"]`);

			expect(heading.text()).toBe("Tasks");
		});

		it("keeps the empty message out of the list of results", async () => {
			const { wrapper, openWith } = setup();

			await openWith("zzzzzz");

			expect(wrapper.get("[role=listbox]").find("[data-testid=quick-nav-empty]").exists()).toBe(false);
		});

		describe("status message for screen readers", () => {
			it("announces how many results were found", async () => {
				const { wrapper, sourcesStore, openWith } = setup();
				sourcesStore.rooms = [entry(QuickNavKind.ROOM, "Theater A"), entry(QuickNavKind.ROOM, "Theater B")];

				await openWith("Theater");

				expect(wrapper.get("[data-testid=quick-nav-status]").text()).toBe("Results: 2");
			});

			it("announces when nothing was found", async () => {
				const { wrapper, openWith } = setup();

				await openWith("zzzzzz");

				expect(wrapper.get("[data-testid=quick-nav-status]").text()).toBe("Nothing found.");
			});

			it("is only visually hidden while the empty state says the same", async () => {
				const { wrapper, openWith } = setup();

				await openWith("zzzzzz");

				expect(wrapper.get("[data-testid=quick-nav-status]").classes()).toContain("d-sr-only");
			});

			it("announces nothing before anything is typed", async () => {
				const { wrapper, palette } = setup();

				palette.open();
				await nextTick();

				expect(wrapper.get("[data-testid=quick-nav-status]").text()).toBe("");
			});

			it("is a status output", async () => {
				const { wrapper, palette } = setup();

				palette.open();
				await nextTick();

				expect(wrapper.get("[data-testid=quick-nav-status]").element.tagName).toBe("OUTPUT");
			});

			it("is announced politely", async () => {
				const { wrapper, palette } = setup();

				palette.open();
				await nextTick();

				expect(wrapper.get("[data-testid=quick-nav-status]").attributes("aria-live")).toBe("polite");
			});
		});

		describe("when the palette closes", () => {
			it("returns focus to where it was before opening", async () => {
				const { palette } = setup();
				const button = document.createElement("button");
				document.body.appendChild(button);
				button.focus();

				palette.open();
				await nextTick();
				await nextTick();
				palette.close();
				await nextTick();

				expect(document.activeElement).toBe(button);
			});
		});
	});
});
