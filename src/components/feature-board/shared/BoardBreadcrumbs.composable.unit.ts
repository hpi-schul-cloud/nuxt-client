import {
	useBoardBreadcrumbs,
	setBoardBreadcrumbs,
} from "./BoardBreadcrumbs.composable";

describe("BoardBreadcrumbs.composable", () => {
	it("should generate breadcrumb list", () => {
		const courseBreadCrumbsData = {
			courseName: "Mathe",
			courseUrl: "/test-url",
			boardName: "Board",
		};
		setBoardBreadcrumbs(
			courseBreadCrumbsData.courseName,
			courseBreadCrumbsData.courseUrl,
			courseBreadCrumbsData.boardName
		);
		const breadcrumbList = useBoardBreadcrumbs();
		expect(breadcrumbList.length).toBe(2);
		expect(breadcrumbList[0].text).toStrictEqual(
			courseBreadCrumbsData.courseName
		);
		expect(breadcrumbList[0].to).toStrictEqual(courseBreadCrumbsData.courseUrl);
		expect(breadcrumbList[1].text).toStrictEqual(
			courseBreadCrumbsData.boardName
		);
		expect(breadcrumbList[1].disabled).toBe(true);
	});
});
