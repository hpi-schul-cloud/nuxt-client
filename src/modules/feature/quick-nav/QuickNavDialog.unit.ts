import { useQuickNav } from "./QuickNav.composable";
import QuickNavDialog from "./QuickNavDialog.vue";
import { useQuickNavSourcesStore } from "./QuickNavSources.store";
import { QuickNavEntry, QuickNavKind } from "./types";
import en from "@/locales/en";
import { createTestAppStoreWithPermissions, createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
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
	const setup = () => {
		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([], pinia);
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

			expect(wrapper.get("[data-testid=quick-nav-empty]").text()).toBe("Nothing found.");
		});

		it("says that entries could not be loaded when a source failed", async () => {
			const { wrapper, sourcesStore, openWith } = setup();
			sourcesStore.hasFailed = true;

			await openWith("zzzzzz");

			expect(wrapper.get("[data-testid=quick-nav-empty]").text()).toBe(
				"Rooms, courses, tasks and people could not be fully loaded."
			);
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
});
