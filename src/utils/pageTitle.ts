import { useEnvConfig } from "@data-env";

export function buildPageTitle(pageTitle?: string): string {
	const instanceTitle = useEnvConfig().value.SC_TITLE;
	return pageTitle ? `${pageTitle} - ${instanceTitle}` : instanceTitle;
}
