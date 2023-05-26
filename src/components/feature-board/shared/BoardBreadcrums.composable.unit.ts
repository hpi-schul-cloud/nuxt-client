import { useBoardBreadcrums } from "./BoardBreadcrums.composable";

const boardId = "column-board-id";
describe("BoardBreadcrumbs.composable", () => {
	it("should generate breadcrumb list", () => {
		const breadcrumbList = useBoardBreadcrums(boardId);
		expect(breadcrumbList.length).toBeDefined();
		expect(breadcrumbList[0].to).toContain(boardId);
	});
});
