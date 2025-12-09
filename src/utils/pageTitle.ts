import { useEnvConfig } from "@data-env";

export function buildPageTitle(pageTitle?: string, parentTitle?: string): string {
	const instanceTitle = useEnvConfig().value.SC_TITLE;

	return [pageTitle, parentTitle, instanceTitle].filter(Boolean).join(" - ");
}
