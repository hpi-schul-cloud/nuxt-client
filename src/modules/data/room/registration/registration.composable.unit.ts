import { useRegistration } from "./registration.composable";
import { LanguageType } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";
import { useNotificationStore } from "@data-app";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { ref } from "vue";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({
		t: vi.fn().mockImplementation((key) => key),
		locale: ref(LanguageType.En),
	}),
}));

describe("useRegistration", () => {
	let registrationApi: DeepMocked<serverApi.RegistrationApiInterface>;
	beforeEach(() => {
		registrationApi = createMock<serverApi.RegistrationApiInterface>();
		vi.spyOn(serverApi, "RegistrationApiFactory").mockReturnValue(registrationApi);
		setActivePinia(createTestingPinia());
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const { selectedLanguage, setCookie, setSelectedLanguage, initializeLanguage } = useRegistration();
		return { selectedLanguage, setCookie, setSelectedLanguage, initializeLanguage };
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
		const { selectedLanguage, initializeLanguage } = setup();
		initializeLanguage();

		expect(selectedLanguage.value).toBeUndefined();
	});

	it("should return the correct language from USER_LANG cookie", () => {
		Object.defineProperty(document, "cookie", {
			writable: true,
			value: `USER_LANG=${LanguageType.En}`,
		});
		const { selectedLanguage, initializeLanguage } = setup();
		initializeLanguage();

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

	describe("fetchUserData", () => {
		it("should fetch and set user data correctly", async () => {
			const { fetchUserData, userData, registrationSecret } = useRegistration();
			registrationSecret.value = "test-secret";
			registrationApi.registrationControllerGetBySecret.mockResolvedValueOnce({
				data: { firstName: "Max", lastName: "Mustermann", email: "sample-mail@de.de" },
			});

			await fetchUserData();

			expect(userData.value).toEqual({
				firstName: "Max",
				lastName: "Mustermann",
				email: "sample-mail@de.de",
			});
		});

		it("should handle errors when fetching user data fails", async () => {
			const { fetchUserData, registrationSecret, hasApiErrorOccurred } = useRegistration();
			expect(hasApiErrorOccurred.value).toBe(false);
			registrationSecret.value = "test-secret";
			registrationApi.registrationControllerGetBySecret.mockRejectedValueOnce(new Error("API Error"));

			await fetchUserData();

			expect(registrationApi.registrationControllerGetBySecret).toHaveBeenCalledWith("test-secret");
			expect(useNotificationStore().notify).toHaveBeenCalledWith({
				text: "pages.registrationExternalMembers.error.notFetchedUserData",
				status: "error",
				autoClose: false,
			});
			expect(hasApiErrorOccurred.value).toBe(true);
		});
	});

	describe("createAccount", () => {
		const pass = "something-123";
		it("should create account successfully", async () => {
			const { createAccount, registrationSecret, password } = useRegistration();
			registrationSecret.value = "test-secret";
			password.value = pass;
			registrationApi.registrationControllerCompleteRegistration.mockResolvedValueOnce({});

			const result = await createAccount();

			expect(result).toBe(true);
			expect(registrationApi.registrationControllerCompleteRegistration).toHaveBeenCalledWith("test-secret", {
				language: undefined,
				password: pass,
			});
		});

		it("should handle errors when account creation fails", async () => {
			const { createAccount, registrationSecret, password } = useRegistration();
			registrationSecret.value = "test-secret";
			password.value = pass;
			registrationApi.registrationControllerCompleteRegistration.mockRejectedValueOnce(new Error("API Error"));

			const result = await createAccount();

			expect(result).toBe(false);
			expect(useNotificationStore().notify).toHaveBeenCalledWith({
				text: "pages.registrationExternalMembers.error.notCompleted",
				status: "error",
				autoClose: false,
			});
		});
	});
});
