import { useEnvConfig } from "@data-env";

export function buildPageTitle(pageTitle?: string, parentTitle?: string): string {
	const instanceTitle = useEnvConfig().value.SC_TITLE;

	if (pageTitle && !parentTitle) {
		return `${pageTitle} - ${instanceTitle}`;
	}

	if (!pageTitle && parentTitle) {
		return `${parentTitle} - ${instanceTitle}`;
	}

	if (pageTitle && parentTitle) {
		return `${pageTitle} - ${parentTitle} - ${instanceTitle}`;
	}

	return instanceTitle;
}
