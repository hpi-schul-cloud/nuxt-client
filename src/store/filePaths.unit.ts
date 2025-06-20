import { envConfigModule } from "@/store";
import { envsFactory } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "./env-config";
import FilePathsModule from "./filePaths";
import { SpecificFiles, GlobalFiles } from "./types/filePaths";

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

const mockSetSpecificFiles = (payload: string) =>
	Object.fromEntries(
		Object.entries(specificFiles).map(([key, value]) => [
			key,
			String(new URL(value, payload)),
		])
	) as SpecificFiles;

const mockSetGloablFiles = (payload: string) =>
	Object.fromEntries(
		Object.entries(globalFiles).map(([key, value]) => [
			key,
			String(new URL(`global/${value}`, payload)),
		])
	) as GlobalFiles;

describe("filePaths module", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores({ envConfigModule: EnvConfigModule });
		});

		it("init should call the setDocumentBaseDir, setSpecificFiles, and setGlobalFiles mutations", async () => {
			const filePathsModule = new FilePathsModule({});
			const mockURL = "http://mock.url/";
			const envs = envsFactory.build({
				DOCUMENT_BASE_DIR: mockURL,
			});
			envConfigModule.setEnvs(envs);
			const spyBaseDir = vi.fn();
			const spySpecificFiles = vi.fn();
			const spyGlobalFiles = vi.fn();

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
			const envs = envsFactory.build({ DOCUMENT_BASE_DIR: mockURL });
			envConfigModule.setEnvs(envs);
			await filePathsModule.init();
			expect(filePathsModule.getDocumentBaseDir).toBe(
				`${mockURL}${envs.SC_THEME}/`
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
