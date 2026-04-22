import { GlobalFiles, SpecificFiles, useFilePathsStore } from "./filePaths.store";
import { createTestEnvStore } from "@@/tests/test-utils";
import { SchulcloudTheme } from "@api-server";
import { useEnvConfig } from "@data-env";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

const specificFilesDefaults: SpecificFiles = {
	accessibilityStatement: "Willkommensordner/Barrierefreiheit/Barrierefreiheitserklaerung.pdf",
	privacy: "Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	termsOfUse: "Willkommensordner/Datenschutz/Nutzungsordnung_Schueler-innen.pdf",
	analogConsent: "Dokumente/Einwilligungserklaerung_analog.pdf",
};

const globalFilesDefaults: GlobalFiles = {
	BeschreibungDerSchulCloud: "Dokumente/Beschreibung-der-HPI-Schul-Cloud.pdf",
	TechnischerBericht2019:
		"Dokumente/Die-HPI-Schul-Cloud_Roll-Out-einer-Cloud-Architektur-für-Schulen-in-Deutschland.pdf",
	BroschuereSCimUnterricht1:
		"Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-Fachuebergreifende-Unterrichtsszenarien-und-Methoden.pdf",
	BroschuereSCimUnterricht2:
		"Willkommensordner/Begleitmaterial/Broschuere_Die-Schul-Cloud-im-Unterricht-und-Schulalltag-Mehrwert-und-Voraussetzungen.pdf",
	BroschuereSCundLernen4: "Willkommensordner/Begleitmaterial/Broschuere_HPI-Schul-Cloud-und-Lernen-4.0.pdf",
	SchulrechnerInDieSC2017: "Dokumente/Schulrechner-wandern-in-die-Cloud-2017.pdf",
	SCKonzeptPilotierung2017: "Dokumente/Konzept-und-Pilotierung-der-Schul-Cloud-2017.pdf",
};

const buildExpectedSpecificFiles = (baseUrl: string): SpecificFiles =>
	Object.fromEntries(
		Object.entries(specificFilesDefaults).map(([key, value]) => [key, String(new URL(value, baseUrl))])
	) as SpecificFiles;

const buildExpectedGlobalFiles = (baseUrl: string): GlobalFiles =>
	Object.fromEntries(
		Object.entries(globalFilesDefaults).map(([key, value]) => [key, String(new URL(`global/${value}`, baseUrl))])
	) as GlobalFiles;

describe("filePathsStore", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	describe("init", () => {
		it("should set documentBaseDir based on DOCUMENT_BASE_DIR env and theme", () => {
			const mockURL = "http://mock.url/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL });
			const store = useFilePathsStore();

			store.init();

			const expectedBaseDir = `${mockURL}${useEnvConfig().value.SC_THEME}/`;
			expect(store.documentBaseDir).toBe(expectedBaseDir);
		});

		it("should set specificFiles with resolved URLs", () => {
			const mockURL = "http://mock.url/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL });
			const store = useFilePathsStore();

			store.init();

			const themedBaseDir = `${mockURL}${useEnvConfig().value.SC_THEME}/`;
			const expectedSpecificFiles = buildExpectedSpecificFiles(themedBaseDir);
			expect(store.specificFiles).toStrictEqual(expectedSpecificFiles);
		});

		it("should set globalFiles with resolved URLs", () => {
			const mockURL = "http://mock.url/";
			createTestEnvStore({ DOCUMENT_BASE_DIR: mockURL });
			const store = useFilePathsStore();

			store.init();

			const expectedGlobalFiles = buildExpectedGlobalFiles(mockURL);
			expect(store.globalFiles).toStrictEqual(expectedGlobalFiles);
		});

		it("should use THR-specific files when theme is THR", () => {
			const mockURL = "http://mock.url/";
			createTestEnvStore({
				DOCUMENT_BASE_DIR: mockURL,
				SC_THEME: SchulcloudTheme.THR,
			});
			const store = useFilePathsStore();

			store.init();

			const themedBaseDir = `${mockURL}${SchulcloudTheme.THR}/`;
			expect(store.specificFiles.termsOfUse).toBe(
				String(new URL("Willkommensordner/Datenschutz/Nutzungsordnung.pdf", themedBaseDir))
			);
			expect(store.specificFiles.privacy).toBe(
				String(new URL("Onlineeinwilligung/Datenschutzhinweise.pdf", themedBaseDir))
			);
		});

		it("should set error when URL construction fails", () => {
			createTestEnvStore({ DOCUMENT_BASE_DIR: "invalid-url" });
			const store = useFilePathsStore();

			store.init();

			expect(store.error).not.toBeNull();
		});
	});

	describe("initial state", () => {
		it("should have empty documentBaseDir initially", () => {
			const store = useFilePathsStore();

			expect(store.documentBaseDir).toBe("");
		});

		it("should have empty specificFiles initially", () => {
			const store = useFilePathsStore();

			expect(store.specificFiles).toStrictEqual({
				accessibilityStatement: "",
				privacy: "",
				termsOfUse: "",
				analogConsent: "",
			});
		});

		it("should have empty globalFiles initially", () => {
			const store = useFilePathsStore();

			expect(store.globalFiles).toStrictEqual({
				BeschreibungDerSchulCloud: "",
				TechnischerBericht2019: "",
				BroschuereSCimUnterricht1: "",
				BroschuereSCimUnterricht2: "",
				BroschuereSCundLernen4: "",
				SchulrechnerInDieSC2017: "",
				SCKonzeptPilotierung2017: "",
			});
		});

		it("should have null error initially", () => {
			const store = useFilePathsStore();

			expect(store.error).toBeNull();
		});
	});
});
