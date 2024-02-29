import { envConfigModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "./env-config";
import FilePathsModule from "./filePaths";

const specificFiles = {
	accessibilityStatement:
		"Willkommensordner/Barrierefreiheit/Barrierefreiheitserklaerung.pdf",
	privacy:
		"Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	termsOfUse:
		"Willkommensordner/Datenschutz/Nutzungsordnung_Schueler-innen.pdf",
	analogConsent: "Dokumente/Einwilligungserklaerung_analog.pdf",
};

const globalFiles = {
	BeschreibungDerSchulCloud: "Dokumente/Beschreibung-der-HPI-Schul-Cloud.pdf",
	TechnischerBericht2019:
		"Dokumente/Die-HPI-Schul-Cloud_Roll-Out-einer-Cloud-Architektur-für-Schulen-in-Deutschland.pdf",
	BroschuereSCimUnterricht1:
		"Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-Fachuebergreifende-Unterrichtsszenarien-und-Methoden.pdf",
	BroschuereSCimUnterricht2:
		"Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-und-Schulalltag-Mehrwert-und-Voraussetzungen.pdf",
	BroschuereSCundLernen4:
		"Willkommensordner/Begleitmaterial/Broschuere_HPI-Schul-Cloud-und-Lernen-4.0.pdf",
	SchulrechnerInDieSC2017:
		"Dokumente/Schulrechner-wandern-in-die-Cloud-2017.pdf",
	SCKonzeptPilotierung2017:
		"Dokumente/Konzept-und-Pilotierung-der-Schul-Cloud-2017.pdf",
};

const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
	CTL_TOOLS_RELOAD_TIME_MS: 299000,
};

const configsFromEnvironmentVars = {
	LERNSTORE_MODE: "",
	ALERT_STATUS_URL: "",
	MIGRATION_END_GRACE_PERIOD_MS: 1,
};

const envs = {
	...requiredVars,
	...configsFromEnvironmentVars,
	FALLBACK_DISABLED: false,
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	I18N__AVAILABLE_LANGUAGES: "",
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	DOCUMENT_BASE_DIR: "",
	SC_TITLE: "",
	GHOST_BASE_URL: "",
	FEATURE_CONSENT_NECESSARY: true,
	FILES_STORAGE__MAX_FILE_SIZE: 0,
};

const mockSetSpecificFiles = (payload: string) =>
	Object.entries(specificFiles).reduce((obj: any, [key, value]) => {
		obj[key] = String(new URL(value, payload));
		return obj;
	}, {});

const mockSetGloablFiles = (payload: string) =>
	Object.entries(globalFiles).reduce((obj: any, [key, value]) => {
		obj[key] = String(new URL(`global/${value}`, payload));
		return obj;
	}, {});

describe("filePaths module", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores({ envConfigModule: EnvConfigModule });
		});

		it("init should call the setDocumentBaseDir, setSpecificFiles, and setGlobalFiles mutations", async () => {
			const filePathsModule = new FilePathsModule({});
			const spyBaseDir = jest.fn();
			const spySpecificFiles = jest.fn();
			const spyGlobalFiles = jest.fn();

			filePathsModule.setDocumentBaseDir = spyBaseDir;
			filePathsModule.setSpecificFiles = spySpecificFiles;
			filePathsModule.setGlobalFiles = spyGlobalFiles;

			expect(spyBaseDir).not.toHaveBeenCalled();
			expect(spySpecificFiles).not.toHaveBeenCalled();
			expect(spyGlobalFiles).not.toHaveBeenCalled();

			filePathsModule.init();

			expect(spyBaseDir).toHaveBeenCalled();
			expect(spySpecificFiles).toHaveBeenCalled();
			expect(spyGlobalFiles).toHaveBeenCalled();
		});
		it("sets baseDir to DOCUMENT_BASE_DIR env if it is defined", async () => {
			const filePathsModule = new FilePathsModule({});
			const mockURL = "http://mock.url/";
			envConfigModule.setEnvs({ ...envs, DOCUMENT_BASE_DIR: mockURL });
			await filePathsModule.init();
			expect(filePathsModule.getDocumentBaseDir).toBe(
				`${mockURL}${requiredVars.SC_THEME}/`
			);
		});
	});
	describe("mutations", () => {
		it("setDocumentBasedir should correctly set the documentBaseDir state object ", () => {
			const filePathsModule = new FilePathsModule({});
			const mockPayload = {
				baseDir: "https://mock.com/",
				theme: "mock",
			};

			filePathsModule.setDocumentBaseDir(mockPayload);
			expect(filePathsModule.getDocumentBaseDir).toBe(
				`${mockPayload.baseDir}${mockPayload.theme}/`
			);
		});
		it("setSpecificfiles should correctly set the specificFiles state object ", () => {
			const filePathsModule = new FilePathsModule({});
			const mockUrl = "https://mock.com/";
			const mockSpecificFiles = mockSetSpecificFiles(mockUrl);

			filePathsModule.setSpecificFiles(mockUrl);
			expect(filePathsModule.getSpecificFiles).toStrictEqual(mockSpecificFiles);
		});
		it("setGlobalFiles should correctly set the globalFiles state object ", () => {
			const filePathsModule = new FilePathsModule({});
			const mockUrl = "https://mock.com/";
			const mockGloablFiles = mockSetGloablFiles(mockUrl);

			filePathsModule.setGlobalFiles(mockUrl);
			expect(filePathsModule.getGlobalFiles).toStrictEqual(mockGloablFiles);
		});
	});
	describe("getters", () => {
		it("getDocumentBaseDir correctly gets the documentBaseDir state object", () => {
			const filePathsModule = new FilePathsModule({});
			const mockBaseDir = "mockBaseDir";
			filePathsModule.documentBaseDir = mockBaseDir;

			expect(filePathsModule.getDocumentBaseDir).toBe(mockBaseDir);
		});
		it("getSpecificFiles correctly gets the documentBaseDir state object", () => {
			const filePathsModule = new FilePathsModule({});
			const mockSpecificFiles = {
				accessibilityStatement: "mockValue",
				privacy: "mockValue",
				termsOfUse: "mockValue",
				analogConsent: "mockValue",
			};
			filePathsModule.specificFiles = mockSpecificFiles;

			expect(filePathsModule.getSpecificFiles).toBe(mockSpecificFiles);
		});
		it("getGlobalFiles correctly gets the documentBaseDir state object", () => {
			const filePathsModule = new FilePathsModule({});
			const mockGlobalFiles = {
				BeschreibungDerSchulCloud: "mockValue",
				TechnischerBericht2019: "mockValue",
				BroschuereSCimUnterricht1: "mockValue",
				BroschuereSCimUnterricht2: "mockValue",
				BroschuereSCundLernen4: "mockValue",
				SchulrechnerInDieSC2017: "mockValue",
				SCKonzeptPilotierung2017: "mockValue",
			};
			filePathsModule.globalFiles = mockGlobalFiles;

			expect(filePathsModule.getGlobalFiles).toBe(mockGlobalFiles);
		});
	});
});
