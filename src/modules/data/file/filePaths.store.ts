import { SchulcloudTheme } from "@api-server";
import { useEnvConfig } from "@data-env";
import { defineStore } from "pinia";
import { ref } from "vue";

export type SpecificFiles = {
	accessibilityStatement: string;
	privacy: string;
	termsOfUse: string;
	analogConsent: string;
};

export type GlobalFiles = {
	BeschreibungDerSchulCloud: string;
	TechnischerBericht2019: string;
	BroschuereSCimUnterricht1: string;
	BroschuereSCimUnterricht2: string;
	BroschuereSCundLernen4: string;
	SchulrechnerInDieSC2017: string;
	SCKonzeptPilotierung2017: string;
};

const specificFilesDefaults: SpecificFiles = {
	accessibilityStatement: "Willkommensordner/Barrierefreiheit/Barrierefreiheitserklaerung.pdf",
	privacy: "Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	termsOfUse: "Willkommensordner/Datenschutz/Nutzungsordnung_Schueler-innen.pdf",
	analogConsent: "Dokumente/Einwilligungserklaerung_analog.pdf",
};

const termsOfUseThr = "Willkommensordner/Datenschutz/Nutzungsordnung.pdf";
const privacyThr = "Onlineeinwilligung/Datenschutzhinweise.pdf";

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

export const useFilePathsStore = defineStore("filePathsStore", () => {
	const documentBaseDir = ref("");
	const specificFiles = ref<SpecificFiles>({
		accessibilityStatement: "",
		privacy: "",
		termsOfUse: "",
		analogConsent: "",
	});
	const globalFiles = ref<GlobalFiles>({
		BeschreibungDerSchulCloud: "",
		TechnischerBericht2019: "",
		BroschuereSCimUnterricht1: "",
		BroschuereSCimUnterricht2: "",
		BroschuereSCundLernen4: "",
		SchulrechnerInDieSC2017: "",
		SCKonzeptPilotierung2017: "",
	});
	const error = ref<unknown>(null);

	const init = (): void => {
		try {
			const theme = useEnvConfig().value.SC_THEME;
			const baseDir = useEnvConfig().value.DOCUMENT_BASE_DIR;

			const specificFilesToUse = { ...specificFilesDefaults };
			if (theme === SchulcloudTheme.THR) {
				specificFilesToUse.termsOfUse = termsOfUseThr;
				specificFilesToUse.privacy = privacyThr;
			}

			const documentBaseDirThemed = String(new URL(`${theme}/`, baseDir));

			documentBaseDir.value = documentBaseDirThemed;

			specificFiles.value = Object.fromEntries(
				Object.entries(specificFilesToUse).map(([key, value]) => [key, String(new URL(value, documentBaseDirThemed))])
			) as SpecificFiles;

			globalFiles.value = Object.fromEntries(
				Object.entries(globalFilesDefaults).map(([key, value]) => [key, String(new URL(`global/${value}`, baseDir))])
			) as GlobalFiles;
		} catch (err: unknown) {
			error.value = err;
		}
	};

	return {
		documentBaseDir,
		specificFiles,
		globalFiles,
		error,
		init,
	};
});
