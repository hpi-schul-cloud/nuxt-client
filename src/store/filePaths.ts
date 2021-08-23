import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import EnvConfigModule from "@/store/env-config";

const specificFiles = {
	privacyExemplary:
		"Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	privacy: "Onlineeinwilligung/Datenschutzerklaerung-Onlineeinwilligung.pdf",
	termsOfUseExemplary:
		"Onlineeinwilligung/Nutzungsordnung-HPI-Schule-Schueler-Onlineeinwilligung.pdf",
	termsOfUse: "Onlineeinwilligung/Nutzungsordnung-Onlineeinwilligung.pdf",
	termsOfUseSchool:
		"Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
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

type Specific = {
	privacyExemplary: URL | string;
	privacy: URL | string;
	termsOfUseExemplary: URL | string;
	termsOfUse: URL | string;
	termsOfUseSchool: URL | string;
	analogConsent: URL | string;
};

type Global = {
	BeschreibungDerSchulCloud: URL | string;
	TechnischerBericht2019: URL | string;
	BroschuereSCimUnterricht1: URL | string;
	BroschuereSCimUnterricht2: URL | string;
	BroschuereSCundLernen4: URL | string;
	SchulrechnerInDieSC2017: URL | string;
	SCKonzeptPilotierung2017: URL | string;
};

@Module({
	name: "filePaths",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class FilePaths extends VuexModule {
	documentBaseDir: string = "";
	specificFiles: Specific = {
		privacyExemplary: "",
		privacy: "",
		termsOfUseExemplary: "",
		termsOfUse: "",
		termsOfUseSchool: "",
		analogConsent: "",
	};
	globalFiles: Global = {
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

	get getSpecificFiles(): Specific {
		return this.specificFiles;
	}

	get getGlobalFiles(): Global {
		return this.globalFiles;
	}

	@Action
	init() {
		try {
			const baseDir =
				EnvConfigModule.getEnv.DOCUMENT_BASE_DIR ||
				"https://s3.hidrive.strato.com/schul-cloud-hpi/";
			const theme = EnvConfigModule.getEnv.SC_THEME;
			const documentBaseDirThemed = String(new URL(`${theme}/`, baseDir));

			this.setDocumentBaseDir({ baseDir, theme });
			this.setSpecificFiles(documentBaseDirThemed);
			this.setGlobalFiles(baseDir);
		} catch (error) {
			this.setError(error);
		}
	}
}

export default getModule(FilePaths);
