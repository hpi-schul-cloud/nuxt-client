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

describe("QuickNavTrigger", () => {
	// every mounted trigger registers its own shortcut listener on window
	enableAutoUnmount(afterEach);

	const setup = (platform: string) => {
		vi.spyOn(navigator, "platform", "get").mockReturnValue(platform);

		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([], pinia);
		createTestEnvStore({ SC_THEME: SchulcloudTheme.BRB });

		return mount(QuickNavTrigger, {
			global: {
				plugins: [
					pinia,
					createTestingVuetify(),
					createTestingI18n({ locale: "en", fallbackLocale: ["en"], messages: { en } }),
				],
			},
		});
	};

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("names the icon button for assistive technology", () => {
		const wrapper = setup("MacIntel");

		expect(wrapper.get("[data-testid=quick-nav-trigger]").attributes("aria-label")).toBe("Search everywhere");
	});

	it.each([
		["MacIntel", "⌘K"],
		["Win32", "Ctrl+K"],
	])("shows the shortcut inline for %s", (platform, shortcut) => {
		const wrapper = setup(platform);

		expect(wrapper.get("[data-testid=quick-nav-shortcut]").text()).toBe(shortcut);
	});

	it("tells assistive technology about the shortcut", () => {
		const wrapper = setup("Win32");

		expect(wrapper.get("[data-testid=quick-nav-trigger]").attributes("aria-keyshortcuts")).toBe("Control+K Meta+K");
	});

	describe("keyboard shortcut", () => {
		const keyK = (modifiers: { metaKey?: boolean; ctrlKey?: boolean } = {}) =>
			new KeyboardEvent("keydown", { key: "k", bubbles: true, cancelable: true, ...modifiers });

		const pressK = (modifiers: { metaKey?: boolean; ctrlKey?: boolean } = {}) => window.dispatchEvent(keyK(modifiers));

		const setupWithPalette = () => {
			const wrapper = setup("MacIntel");
			const palette = mountComposable(() => useQuickNav(), {
				global: { plugins: [createTestingI18n()] },
			});
			palette.close();

			return { wrapper, palette };
		};

		it("opens the palette with ⌘K", () => {
			const { palette } = setupWithPalette();

			pressK({ metaKey: true });

			expect(palette.isOpen.value).toBe(true);
		});

		it("closes the palette when Ctrl+K is pressed again", () => {
			const { palette } = setupWithPalette();

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
				const { palette } = setupWithPalette();

				pressK({ metaKey: true });
				holdK();
				holdK();
				holdK();

				expect(palette.isOpen.value).toBe(true);
			});

			it("still keeps the browser from handling the repeats", () => {
				setupWithPalette();
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
			const { palette } = setupWithPalette();

			pressK();

			expect(palette.isOpen.value).toBe(false);
		});

		it("keeps the browser from handling the shortcut itself", () => {
			setupWithPalette();
			const event = keyK({ metaKey: true });

			window.dispatchEvent(event);

			expect(event.defaultPrevented).toBe(true);
		});
	});
});
