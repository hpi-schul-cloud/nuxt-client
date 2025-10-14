import { useRegistration } from "./registration.composable";
import { LanguageType } from "@/serverApi/v3";
import { ref } from "vue";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: vi.fn().mockImplementation((key) => key),
		locale: ref(LanguageType.En),
	}),
}));

describe("useRegistration", () => {
	const setup = () => {
		const { selectedLanguage, setCookie, setSelectedLanguage, getLanguageFromCookie } = useRegistration();
		return { selectedLanguage, setCookie, setSelectedLanguage, getLanguageFromCookie };
	};

	it("should initialize with undefined selectedLanguage", () => {
		const { selectedLanguage } = setup();
		expect(selectedLanguage.value).toBeUndefined();
	});

	it("should return undefined if no USER_LANG cookie is set", () => {
		Object.defineProperty(document, "cookie", {
			writable: true,
			value: "",
		});
		const { selectedLanguage, getLanguageFromCookie } = setup();
		getLanguageFromCookie();

		expect(selectedLanguage.value).toBeUndefined();
	});

	it("should return the correct language from USER_LANG cookie", () => {
		Object.defineProperty(document, "cookie", {
			writable: true,
			value: `USER_LANG=${LanguageType.En}`,
		});
		const { selectedLanguage, getLanguageFromCookie } = setup();
		getLanguageFromCookie();

		expect(selectedLanguage.value).toBe(LanguageType.En);
	});

	it("should set the USER_LANG cookie when setCookie is called", () => {
		const { setCookie } = setup();
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1);
		const expectedCookie = `USER_LANG=${LanguageType.De}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;

		Object.defineProperty(document, "cookie", {
			writable: true,
			value: "",
		});

		setCookie();

		expect(document.cookie).toBe(expectedCookie);
	});

	it("should set the selectedLanguage and update i18n locale when setSelectedLanguage is called", () => {
		const { selectedLanguage, setSelectedLanguage } = setup();
		expect(selectedLanguage.value).toBeUndefined();

		setSelectedLanguage(LanguageType.Es);
		expect(selectedLanguage.value).toBe(LanguageType.Es);
	});
});
