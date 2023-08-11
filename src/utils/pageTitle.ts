import { envConfigModule } from "@/store";

export function buildPageTitle(pageTitle?: string): string {
	const instanceTitle = envConfigModule.getEnv?.SC_TITLE;
	return pageTitle ? `${pageTitle} - ${instanceTitle}` : instanceTitle;
}
