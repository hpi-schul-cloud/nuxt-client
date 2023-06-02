type BoardBreadcrumbsData = {
	courseName: string | undefined;
	courseUrl: string;
	boardName: string | undefined;
};

type BoardBreadcrumbs = {
	text: string;
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
	return [
		{
			text: boardBreadCrumbsData.courseName || "Course",
			to: boardBreadCrumbsData.courseUrl,
		},
		{
			text: boardBreadCrumbsData.boardName || "Board",
			disabled: true,
		},
	];
};
