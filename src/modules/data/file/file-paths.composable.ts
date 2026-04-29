import { SchulcloudTheme } from "@api-server";
import { useEnvConfig } from "@data-env";
import { computed, ComputedRef } from "vue";

export type SpecificFiles = {
	accessibilityStatement: string;
	privacy: string;
	termsOfUse: string;
	analogConsent: string;
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

export const useFilePaths = (): {
	documentBaseDir: ComputedRef<string>;
	specificFiles: ComputedRef<SpecificFiles>;
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

	return {
		documentBaseDir,
		specificFiles,
	};
};
