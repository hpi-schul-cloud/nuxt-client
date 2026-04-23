import { SchulcloudTheme } from "@api-server";
import { useEnvConfig } from "@data-env";
import { computed, ComputedRef } from "vue";

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

const specificFilesDefaults = {
	accessibilityStatement: "Willkommensordner/Barrierefreiheit/Barrierefreiheitserklaerung.pdf",
	privacy: "Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	termsOfUse: "Willkommensordner/Datenschutz/Nutzungsordnung_Schueler-innen.pdf",
	analogConsent: "Dokumente/Einwilligungserklaerung_analog.pdf",
};

const specificFilesThr = {
	termsOfUse: "Willkommensordner/Datenschutz/Nutzungsordnung.pdf",
	privacy: "Onlineeinwilligung/Datenschutzhinweise.pdf",
};

const globalFilesDefaults = {
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

export const useFilePaths = (): {
	documentBaseDir: ComputedRef<string>;
	specificFiles: ComputedRef<SpecificFiles>;
	globalFiles: ComputedRef<GlobalFiles>;
} => {
	const env = useEnvConfig();

	const documentBaseDir = computed(() => {
		const theme = env.value.SC_THEME;
		const baseDir = env.value.DOCUMENT_BASE_DIR;
		return String(new URL(`${theme}/`, baseDir));
	});

	const specificFiles = computed<SpecificFiles>(() => {
		const theme = env.value.SC_THEME;
		const themedBaseDir = documentBaseDir.value;

		const filePaths =
			theme === SchulcloudTheme.THR ? { ...specificFilesDefaults, ...specificFilesThr } : { ...specificFilesDefaults };

		return Object.fromEntries(
			Object.entries(filePaths).map(([key, value]) => [key, String(new URL(value, themedBaseDir))])
		) as SpecificFiles;
	});

	const globalFiles = computed<GlobalFiles>(() => {
		const baseDir = env.value.DOCUMENT_BASE_DIR;

		return Object.fromEntries(
			Object.entries(globalFilesDefaults).map(([key, value]) => [key, String(new URL(`global/${value}`, baseDir))])
		) as GlobalFiles;
	});

	return {
		documentBaseDir,
		specificFiles,
		globalFiles,
	};
};
