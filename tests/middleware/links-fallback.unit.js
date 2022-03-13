// import must be after mock
jest.mock("@serverMiddleware/routes.js", () => [`^/news`]);
import linksFallback from "@middleware/links-fallback";
import { envConfigModule } from "@/store";

const envs = {
	FALLBACK_DISABLED: false,
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default",
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: null,
	FEATURE_ES_COLLECTIONS_ENABLED: null,
	FEATURE_EXTENSIONS_ENABLED: null,
	FEATURE_TEAMS_ENABLED: null,
	I18N__AVAILABLE_LANGUAGES: "",
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	DOCUMENT_BASE_DIR: "",
	SC_TITLE: "",
	SC_SHORT_TITLE: "",
};

jest.useFakeTimers();

describe("@middleware/linksFallback", () => {
	it("use nuxt when a loop is detected", async () => {
		window.location.pathname = "/homework";
		envConfigModule.setEnvs(envs);
		const promise = linksFallback({
			route: { path: "/homework" },
		});
		jest.runAllTimers();
		const result = await promise;
		expect(result).toBe(true);
		expect(window.location.pathname).toBe("/homework");
	});
	it("use vue route for whitelisted regex", async () => {
		window.location.pathname = "/news";
		envConfigModule.setEnvs(envs);
		const promise = linksFallback({
			route: { path: "/news/add" },
		});
		jest.runAllTimers();
		const result = await promise;
		expect(result).toBe(true);
		expect(window.location.pathname).toBe("/news");
	});
	it("use vue when fallback disabled flag is set", async () => {
		window.location.pathname = "/news";
		envConfigModule.setEnvs({
			...envs,
			FALLBACK_DISABLED: true,
		});
		const promise = linksFallback({
			route: { path: "/homework" },
		});
		jest.runAllTimers();
		const result = await promise;
		expect(result).toBe(true);
		expect(window.location.pathname).toBe("/news");
	});
	it("use legacy proxy for non matching routes", async () => {
		window.location.pathname = "/news";
		envConfigModule.setEnvs(envs);
		const promise = linksFallback({
			route: { path: "/homework" },
		});
		jest.runAllTimers();
		const result = await promise;
		expect(result).not.toBe(true);
		expect(window.location.pathname).toBe("/homework");
	});
});
