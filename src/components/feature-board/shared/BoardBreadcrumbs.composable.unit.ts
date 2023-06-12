import { I18N_KEY } from "@/utils/inject";
import {
	setBoardBreadcrumbs,
	useBoardBreadcrumbs,
} from "./BoardBreadcrumbs.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";

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
		const breadcrumbList = mountComposable(() => useBoardBreadcrumbs(), {
			[I18N_KEY as symbol]: { t: (key: string) => key },
		});
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
