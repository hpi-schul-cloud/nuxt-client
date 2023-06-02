import { inject } from "vue";
import VueI18n from "vue-i18n";

type BoardBreadcrumbsData = {
	courseName: string | undefined;
	courseUrl: string;
	boardName: string | undefined;
};

type BoardBreadcrumbs = {
	text: string | undefined;
	to?: string;
	disabled?: boolean;
};

const boardBreadCrumbsData: BoardBreadcrumbsData = {
	courseName: "",
	courseUrl: "/rooms-overview",
	boardName: "",
};

export const setBoardBreadcrumbs = (
	courseName: string | undefined,
	courseUrl: string,
	boardName: string | undefined
) => {
	boardBreadCrumbsData.courseName = courseName;
	boardBreadCrumbsData.courseUrl = courseUrl;
	boardBreadCrumbsData.boardName = boardName;
};

export const useBoardBreadcrumbs = (): BoardBreadcrumbs[] => {
	const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
	return [
		{
			text:
				boardBreadCrumbsData.courseName ||
				i18n?.t("pages.courses.index.title").toString(),
			to: boardBreadCrumbsData.courseUrl,
		},
		{
			text:
				boardBreadCrumbsData.boardName ||
				i18n?.t("components.board").toString(),
			disabled: true,
		},
	];
};
