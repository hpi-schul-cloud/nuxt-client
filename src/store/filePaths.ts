import { SchulcloudTheme } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { BusinessError } from "./types/commons";
import { GlobalFiles, SpecificFiles } from "./types/filePaths";

const specificFiles: SpecificFiles = {
	accessibilityStatement:
		"Willkommensordner/Barrierefreiheit/Barrierefreiheitserklaerung.pdf",
	privacy:
		"Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	termsOfUse:
		"Willkommensordner/Datenschutz/Nutzungsordnung_Schueler-innen.pdf",
	analogConsent: "Dokumente/Einwilligungserklaerung_analog.pdf",
};

const termsOfUseThr = "Willkommensordner/Datenschutz/Nutzungsordnung.pdf";
const privacyThr = "Onlineeinwilligung/Datenschutzhinweise.pdf";

const globalFiles: GlobalFiles = {
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

@Module({
	name: "filePathsModule",
	namespaced: true,
	stateFactory: true,
})
export default class FilePathsModule extends VuexModule {
	documentBaseDir = "";
	specificFiles: SpecificFiles = {
		accessibilityStatement: "",
		privacy: "",
		termsOfUse: "",
		analogConsent: "",
	};
	globalFiles: GlobalFiles = {
		BeschreibungDerSchulCloud: "",
		TechnischerBericht2019: "",
		BroschuereSCimUnterricht1: "",
		BroschuereSCimUnterricht2: "",
		BroschuereSCundLernen4: "",
		SchulrechnerInDieSC2017: "",
		SCKonzeptPilotierung2017: "",
	};
	error: object = {};

	@Mutation
	setDocumentBaseDir(payload: { baseDir: string; theme: string }) {
		this.documentBaseDir = String(
			new URL(`${payload.theme}/`, payload.baseDir)
		);
	}

	@Mutation
	setSpecificFiles(payload: string) {
		this.specificFiles = Object.fromEntries(
			Object.entries(specificFiles).map(([key, value]) => [
				key,
				String(new URL(value, payload)),
			])
		) as SpecificFiles;
	}

	@Mutation
	setGlobalFiles(payload: string) {
		this.globalFiles = Object.fromEntries(
			Object.entries(globalFiles).map(([key, value]) => [
				key,
				String(new URL(`global/${value}`, payload)),
			])
		) as GlobalFiles;
	}

	@Mutation
	setError(payload: object): void {
		this.error = payload;
	}

	get getDocumentBaseDir(): string {
		return this.documentBaseDir;
	}

	get getSpecificFiles(): SpecificFiles {
		return this.specificFiles;
	}

	get getGlobalFiles(): GlobalFiles {
		return this.globalFiles;
	}

	@Action
	init() {
		try {
			const theme = envConfigModule.getTheme;
			if (theme === SchulcloudTheme.Thr) {
				specificFiles.termsOfUse = termsOfUseThr;
				specificFiles.privacy = privacyThr;
			}
			const baseDir = envConfigModule.getEnv.DOCUMENT_BASE_DIR;
			const documentBaseDirThemed = String(new URL(`${theme}/`, baseDir));

			this.setDocumentBaseDir({ baseDir, theme });
			this.setSpecificFiles(documentBaseDirThemed);
			this.setGlobalFiles(baseDir);
		} catch (error) {
			this.setError(error as BusinessError);
		}
	}
}
