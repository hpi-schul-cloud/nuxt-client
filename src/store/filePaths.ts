import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { GlobalFiles, SpecificFiles } from "./types/filePaths";
import { BusinessError } from "./types/commons";
import { envConfigModule } from "@/store";

const specificFiles = {
	privacyExemplary:
		"Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	privacy: "Onlineeinwilligung/Datenschutzerklaerung-Onlineeinwilligung.pdf",
	termsOfUseExemplary:
		"Onlineeinwilligung/Nutzungsordnung-HPI-Schule-Schueler-Onlineeinwilligung.pdf",
	termsOfUse: "Onlineeinwilligung/Nutzungsordnung-Onlineeinwilligung.pdf",
	termsOfUseSchool:
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

@Module({
	name: "filePaths",
	namespaced: true,
	stateFactory: true,
})
export class FilePaths extends VuexModule {
	documentBaseDir: string = "";
	specificFiles: SpecificFiles = {
		privacyExemplary: "",
		privacy: "",
		termsOfUseExemplary: "",
		termsOfUse: "",
		termsOfUseSchool: "",
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
	error: {} = {};

	@Mutation
	setDocumentBaseDir(payload: { baseDir: string; theme: string }) {
		this.documentBaseDir = String(
			new URL(`${payload.theme}/`, payload.baseDir)
		);
	}

	@Mutation
	setSpecificFiles(payload: string) {
		this.specificFiles = Object.entries(specificFiles).reduce(
			(obj: any, [key, value]) => {
				obj[key] = String(new URL(value, payload));
				return obj;
			},
			{}
		);
	}

	@Mutation
	setGlobalFiles(payload: string) {
		this.globalFiles = Object.entries(globalFiles).reduce(
			(obj: any, [key, value]) => {
				obj[key] = String(new URL(`global/${value}`, payload));
				return obj;
			},
			{}
		);
	}

	@Mutation
	setError(payload: {}): void {
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
			const baseDir =
				envConfigModule.getEnv.DOCUMENT_BASE_DIR ||
				"https://s3.hidrive.strato.com/cloud-instances/";
			const theme = envConfigModule.getEnv.SC_THEME;
			const documentBaseDirThemed = String(new URL(`${theme}/`, baseDir));

			this.setDocumentBaseDir({ baseDir, theme });
			this.setSpecificFiles(documentBaseDirThemed);
			this.setGlobalFiles(baseDir);
		} catch (error) {
			this.setError(error as BusinessError);
		}
	}
}
