import { useRegistrationStore } from "./registration.store";
import { useRegistrationStepper } from "./registrationStepper.composable";
import { LanguageType } from "@/serverApi/v3";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";

vi.mock("vue-i18n", async () => {
	const actual = await vi.importActual<typeof import("vue-i18n")>("vue-i18n");

	return {
		...actual,
		useI18n: () => ({
			t: vi.fn((key: string) => key),
			locale: ref(LanguageType.En),
		}),
	};
});

let registrationStore: ReturnType<typeof useRegistrationStore>;

describe("useRegistrationStepper", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
		registrationStore = mockedPiniaStoreTyping(useRegistrationStore);

		Object.defineProperty(document, "cookie", {
			writable: true,
			value: "",
		});
	});

	const setup = () => useRegistrationStepper();

	it("should initialize with undefined selectedLanguage", () => {
		const { selectedLanguage } = setup();
		expect(selectedLanguage.value).toBeUndefined();
	});

	it("should keep selectedLanguage undefined if no USER_LANG cookie is set", () => {
		const { selectedLanguage, initializeLanguage } = setup();

		initializeLanguage();

		expect(selectedLanguage.value).toBeUndefined();
	});

	it("should initialize selectedLanguage from USER_LANG cookie", () => {
		document.cookie = `USER_LANG=${LanguageType.En}`;

		const { selectedLanguage, initializeLanguage } = setup();
		initializeLanguage();

		expect(selectedLanguage.value).toBe(LanguageType.En);
	});

	describe("when setSelectedLanguage is called", () => {
		it("should set USER_LANG cookie", () => {
			const { setSelectedLanguage } = setup();

			const expires = new Date();
			const oneDay = 24 * 60 * 60 * 1000;
			expires.setTime(expires.getTime() + oneDay);

			setSelectedLanguage(LanguageType.De);

			expect(document.cookie).toBe(
				`USER_LANG=${LanguageType.De}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
			);
		});

		it("should update selectedLanguage", () => {
			const { selectedLanguage, setSelectedLanguage } = setup();

			expect(selectedLanguage.value).toBeUndefined();

			setSelectedLanguage(LanguageType.Es);

			expect(selectedLanguage.value).toBe(LanguageType.Es);
		});
	});

	it("should compute fullName from store userData", async () => {
		const { fullName } = setup();

		expect(fullName.value).toBe("");

		registrationStore.userData = {
			firstName: "Jane",
			lastName: "Doe",
			email: "",
		};

		expect(fullName.value).toBe("Jane Doe");
	});
});
