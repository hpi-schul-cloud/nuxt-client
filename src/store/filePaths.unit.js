//  TODO new tests should be done for the TS version of this store

import { actions, mutations, getters, state } from "./filePaths";
import EnvConfigModule from "@/store/env-config";

const baseDir = "https://s3.hidrive.strato.com/schul-cloud-hpi/";
const theme = "default";
const documentBaseDirThemed = String(new URL(`${theme}/`, baseDir));

const envs = {
	FALLBACK_DISABLED: false,
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: theme,
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: null,
	FEATURE_ES_COLLECTIONS_ENABLED: null,
	FEATURE_EXTENSIONS_ENABLED: null,
	FEATURE_TEAMS_ENABLED: null,
	I18N__AVAILABLE_LANGUAGES: "",
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	DOCUMENT_BASE_DIR: baseDir,
	SC_TITLE: "",
	SC_SHORT_TITLE: "",
};

const mockTheme = "testTheme";

const mockSpecificFiles = {
	privacyExemplary:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	privacy:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Onlineeinwilligung.pdf",
	termsOfUseExemplary:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Nutzungsordnung-HPI-Schule-Schueler-Onlineeinwilligung.pdf",
	termsOfUse:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Nutzungsordnung-Onlineeinwilligung.pdf",
	termsOfUseSchool:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
	analogConsent:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Dokumente/Einwilligungserklaerung_analog.pdf",
};

const mockGlobalFiles = {
	BeschreibungDerSchulCloud:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/global/Dokumente/Beschreibung-der-HPI-Schul-Cloud.pdf",
	TechnischerBericht2019:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/global/Dokumente/Die-HPI-Schul-Cloud_Roll-Out-einer-Cloud-Architektur-f%C3%BCr-Schulen-in-Deutschland.pdf",
	BroschuereSCimUnterricht1:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/global/Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-Fachuebergreifende-Unterrichtsszenarien-und-Methoden.pdf",
	BroschuereSCimUnterricht2:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/global/Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-und-Schulalltag-Mehrwert-und-Voraussetzungen.pdf",
	BroschuereSCundLernen4:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/global/Willkommensordner/Begleitmaterial/Broschuere_HPI-Schul-Cloud-und-Lernen-4.0.pdf",
	SchulrechnerInDieSC2017:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/global/Dokumente/Schulrechner-wandern-in-die-Cloud-2017.pdf",
	SCKonzeptPilotierung2017:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/global/Dokumente/Konzept-und-Pilotierung-der-Schul-Cloud-2017.pdf",
};

describe.skip("store/filePaths", () => {
	describe("actions", () => {
		describe("init", () => {
			it("commits all 3 mutations", async () => {
				const spyCommit = jest.fn();
				await actions.init({ commit: spyCommit }, { baseDir, theme });
				expect(spyCommit.mock.calls).toHaveLength(3);
				expect(spyCommit.mock.calls[0][0]).toBe("setDocumentBaseDir");
				expect(spyCommit.mock.calls[1][0]).toBe("setSpecificFiles");
				expect(spyCommit.mock.calls[2][0]).toBe("setGlobalFiles");
			});
			it("sets baseDir to DOCUMENT_BASE_DIR if it is defined", async () => {
				const spyCommit = jest.fn();
				const mockURL = "https://other-url.com/";
				EnvConfigModule.setEnvs({ ...envs, DOCUMENT_BASE_DIR: mockURL });
				await actions.init({ commit: spyCommit }, { baseDir, theme });
				expect(spyCommit.mock.calls[0][1].baseDir).toBe(mockURL);
			});
			it("sets theme to SC_THEME if it is defined", async () => {
				EnvConfigModule.setEnvs({ ...envs, SC_THEME: mockTheme });
				const spyCommit = jest.fn();
				await actions.init({ commit: spyCommit }, { baseDir, theme });
				expect(spyCommit.mock.calls[0][1].theme).toBe(mockTheme);
			});
		});
	});
	describe("mutations", () => {
		describe("setDocumentBaseDir", () => {
			it("sets documentBaseDir values correctly", () => {
				mutations.setDocumentBaseDir(state, { baseDir, theme });
				expect(state.documentBaseDir).toBe(`${baseDir}${theme}/`);
			});
		});
		describe("setSpecificFiles", () => {
			it("sets specificFiles values correctly", () => {
				mutations.setSpecificFiles(state, documentBaseDirThemed);
				expect(state.specificFiles).toStrictEqual(mockSpecificFiles);
			});
		});
		describe("setGlobalFiles", () => {
			it("sets globalFiles values correctly", () => {
				mutations.setGlobalFiles(state, baseDir);
				expect(state.globalFiles).toStrictEqual(mockGlobalFiles);
			});
		});
		describe("setError", () => {
			it("sets error values correctly", () => {
				const mockError = "something bad happened";
				mutations.setError(state, mockError);
				expect(state.error).toBe(mockError);
			});
		});
	});
	describe("getters", () => {
		describe("getDocumentBaseDir", () => {
			it("returns documentBaseDir object", () => {
				const documentBaseDir = getters.getDocumentBaseDir(state);
				expect(documentBaseDir).toBe(`${baseDir}${theme}/`);
			});
		});
		describe("getSpecificFiles", () => {
			it("returns specificFiles object", () => {
				const specificFiles = getters.getSpecificFiles(state);
				expect(specificFiles).toStrictEqual(mockSpecificFiles);
			});
		});
		describe("getGlobalFiles", () => {
			it("returns globalFiles object", () => {
				const globalFiles = getters.getGlobalFiles(state);
				expect(globalFiles).toStrictEqual(mockGlobalFiles);
			});
		});
	});
});
