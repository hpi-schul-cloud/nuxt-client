import { useQuickNav } from "./QuickNav.composable";
import QuickNavTrigger from "./QuickNavTrigger.vue";
import en from "@/locales/en";
import { createTestAppStoreWithPermissions, createTestEnvStore, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

vi.mock("@util-logger");

const { mockRoute } = vi.hoisted(() => ({ mockRoute: { name: "" } }));
vi.mock("vue-router", () => ({ useRoute: () => mockRoute }));

describe("QuickNavTrigger", () => {
	// every mounted trigger registers its own shortcut listener on window
	enableAutoUnmount(afterEach);

	const setup = ({ platform = "MacIntel", routeName = "rooms-board", width = 1300 } = {}) => {
		vi.spyOn(navigator, "platform", "get").mockReturnValue(platform);
		mockRoute.name = routeName;
		Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });

		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([], pinia);
		createTestEnvStore({ SC_THEME: SchulcloudTheme.BRB });

		const i18n = createTestingI18n({ locale: "en", fallbackLocale: ["en"], messages: { en } });
		const wrapper = mount(QuickNavTrigger, {
			global: { plugins: [pinia, createTestingVuetify(), i18n] },
		});
		const palette = mountComposable(() => useQuickNav(), { global: { plugins: [i18n] } });
		palette.close();

		return { wrapper, palette, trigger: () => wrapper.get("[data-testid=quick-nav-trigger]") };
	};

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("on tablets and larger screens", () => {
		it("looks like a search field but is a button that opens a dialog", () => {
			const { trigger } = setup();

			expect(trigger().element.tagName).toBe("BUTTON");
			expect(trigger().attributes("type")).toBe("button");
			expect(trigger().attributes("aria-haspopup")).toBe("dialog");
			expect(trigger().classes()).toContain("quick-nav-field");
		});

		it("names itself with its visible text, without reading out the shortcut badge", () => {
			const { wrapper } = setup();

			expect(wrapper.get("[data-testid=quick-nav-trigger-label]").text()).toBe("Search everywhere");
			expect(wrapper.get("[data-testid=quick-nav-shortcut]").attributes("aria-hidden")).toBe("true");
		});

		it.each([
			["MacIntel", "⌘K"],
			["Win32", "Ctrl+K"],
		])("shows the shortcut inside the field for %s", (platform, shortcut) => {
			const { wrapper } = setup({ platform });

			expect(wrapper.get("[data-testid=quick-nav-shortcut]").text()).toBe(shortcut);
		});
	});

	describe("on phones", () => {
		it("stays a compact icon button with a name for assistive technology", () => {
			const { trigger } = setup({ width: 500 });

			expect(trigger().classes()).not.toContain("quick-nav-field");
			expect(trigger().attributes("aria-label")).toBe("Search everywhere");
			expect(trigger().find("[data-testid=quick-nav-shortcut]").exists()).toBe(false);
		});

		it("opens the same palette as the field", async () => {
			const { trigger, palette } = setup({ width: 500 });

			await trigger().trigger("click");

			expect(palette.isOpen.value).toBe(true);
			expect(trigger().attributes("aria-expanded")).toBe("true");
		});
	});

	describe("on a page with its own list", () => {
		it.each([
			["rooms", "Search in Rooms", "rooms"],
			["course-room-overview", "Search in Courses", "courses"],
			["course-room-list", "Search in Courses", "courses"],
			["tasks", "Search in Tasks", "tasks"],
		])("on %s says what it searches and opens in that list", async (routeName, label, scope) => {
			const { wrapper, trigger, palette } = setup({ routeName });

			expect(wrapper.get("[data-testid=quick-nav-trigger-label]").text()).toBe(label);
			await trigger().trigger("click");

			expect(palette.isOpen.value).toBe(true);
			expect(palette.scope.value).toBe(scope);
		});
	});

	describe("on any other page", () => {
		it("searches everything", async () => {
			const { trigger, palette } = setup({ routeName: "rooms-board" });

			await trigger().trigger("click");

			expect(palette.isOpen.value).toBe(true);
			expect(palette.scope.value).toBeUndefined();
		});
	});

	it("tells assistive technology about the shortcut", () => {
		const { trigger } = setup({ platform: "Win32" });

		expect(trigger().attributes("aria-keyshortcuts")).toBe("Control+K Meta+K");
	});

	describe("keyboard shortcut", () => {
		const keyK = (modifiers: { metaKey?: boolean; ctrlKey?: boolean } = {}) =>
			new KeyboardEvent("keydown", { key: "k", bubbles: true, cancelable: true, ...modifiers });

		const pressK = (modifiers: { metaKey?: boolean; ctrlKey?: boolean } = {}) => window.dispatchEvent(keyK(modifiers));

		it("opens the palette with ⌘K", () => {
			const { palette } = setup();

			pressK({ metaKey: true });

			expect(palette.isOpen.value).toBe(true);
		});

		it("opens in the list of the current page, like the field", () => {
			const { palette } = setup({ routeName: "tasks" });

			pressK({ metaKey: true });

			expect(palette.scope.value).toBe("tasks");
		});

		it("closes the palette when Ctrl+K is pressed again", () => {
			const { palette } = setup();

			pressK({ ctrlKey: true });
			pressK({ ctrlKey: true });

			expect(palette.isOpen.value).toBe(false);
		});

		describe("when the keys are held down", () => {
			const holdK = () =>
				window.dispatchEvent(
					new KeyboardEvent("keydown", { key: "k", metaKey: true, repeat: true, bubbles: true, cancelable: true })
				);

			it("opens the palette once and keeps it open", () => {
				const { palette } = setup();

				pressK({ metaKey: true });
				holdK();
				holdK();
				holdK();

				expect(palette.isOpen.value).toBe(true);
			});

			it("still keeps the browser from handling the repeats", () => {
				setup();
				const repeat = new KeyboardEvent("keydown", {
					key: "k",
					metaKey: true,
					repeat: true,
					bubbles: true,
					cancelable: true,
				});

				window.dispatchEvent(repeat);

				expect(repeat.defaultPrevented).toBe(true);
			});
		});

		it("ignores K without a modifier, so typing is not interrupted", () => {
			const { palette } = setup();

			pressK();

			expect(palette.isOpen.value).toBe(false);
		});

		it("keeps the browser from handling the shortcut itself", () => {
			setup();
			const event = keyK({ metaKey: true });

			window.dispatchEvent(event);

			expect(event.defaultPrevented).toBe(true);
		});
	});
});
