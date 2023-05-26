import { inject } from "vue";
import VueI18n from "vue-i18n";

export const useBoardBreadcrums = (rootId: string) => {
	const i18n: VueI18n | undefined = inject<VueI18n>("i18n");

	// It will call backend and generate the breadcrumbs list for the column-board
	return [
		{
			text: i18n?.t("pages.courses.index.title"),
			to: `/rooms/${rootId}`,
		},
		{
			text: "Kurs-Titel",
			to: `/rooms/${rootId}/board`,
		},
	];
};
