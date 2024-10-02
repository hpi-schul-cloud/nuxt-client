import {
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
	ToolContextType,
} from "@/serverApi/v3";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { DataTableHeader } from "@/store/types/data-table-header";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	schoolExternalToolFactory,
	schoolExternalToolResponseFactory,
} from "@@/tests/test-utils";
import { useExternalToolsSectionUtils } from "./external-tool-section-utils.composable";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import { SchoolExternalTool } from "@/store/external-tool";

describe("useSchoolExternalToolUtils", () => {
	const setup = (schoolExternalTool: SchoolExternalTool) => {
		const expectedTranslation = "translated";
		const tMock = jest.fn().mockReturnValue(expectedTranslation);

		const { getHeaders, getItems } = useExternalToolsSectionUtils(tMock);

		const schoolExternalToolsModule = createModuleMocks(
			SchoolExternalToolsModule,
			{
				getSchoolExternalTools: [schoolExternalTool],
			}
		);

		const toolResponse: SchoolExternalToolResponse =
			schoolExternalToolResponseFactory.build();
		const listResponse: SchoolExternalToolSearchListResponse = {
			data: [toolResponse],
		};

		return {
			getHeaders,
			getItems,
			listResponse,
			toolResponse,
			tMock,
			expectedTranslation,
			schoolExternalToolsModule,
			schoolExternalTool,
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getHeaders is called", () => {
		const setupTool = () => {
			const tool = schoolExternalToolFactory.build();
			return { tool };
		};

		it("should return a dataTableHeader array", () => {
			const { tool } = setupTool();
			const { getHeaders } = setup(tool);

			const headers: DataTableHeader[] = getHeaders;

			expect(Array.isArray(headers)).toBeTruthy();
		});

		describe("when translate the headers", () => {
			it("should call the translation function for name", () => {
				const { tool } = setupTool();
				const { tMock } = setup(tool);

				expect(tMock).toHaveBeenCalledWith("common.labels.name");
			});

			it("should call the translation function for value", () => {
				const { tool } = setupTool();
				const { tMock } = setup(tool);

				expect(tMock).toHaveBeenCalledWith(
					"components.administration.externalToolsSection.table.header.status"
				);
			});

			it("should call the translation function for restrictToContexts", () => {
				const { tool } = setupTool();
				const { tMock } = setup(tool);

				expect(tMock).toHaveBeenCalledWith(
					"components.administration.externalToolsSection.table.header.restrictedTo"
				);
			});
		});

		it("should return the correct headers", () => {
			const { tool } = setupTool();
			const { getHeaders, expectedTranslation } = setup(tool);

			const headers: DataTableHeader[] = getHeaders;

			expect(headers[0].title).toEqual(expectedTranslation);
			expect(headers[0].value).toEqual("name");

			expect(headers[1].title).toEqual(expectedTranslation);
			expect(headers[1].value).toEqual("statusText");

			expect(headers[2].title).toEqual(expectedTranslation);
			expect(headers[2].value).toEqual("restrictToContexts");

			expect(headers[3].title).toEqual("");
			expect(headers[3].value).toEqual("actions");
			expect(headers[3].sortable).toBe(false);
			expect(headers[3].align).toEqual("end");
		});
	});

	describe("getItems is called", () => {
		describe("when receiving tools", () => {
			const setupTool = () => {
				const tool = schoolExternalToolFactory.build({
					restrictToContexts: [ToolContextType.MediaBoard],
				});
				return { tool };
			};

			it("should return schoolExternalToolItems", () => {
				const { tool } = setupTool();

				const {
					getItems,
					expectedTranslation,
					schoolExternalToolsModule,
					schoolExternalTool,
				} = setup(tool);

				const items: SchoolExternalToolItem[] = getItems(
					schoolExternalToolsModule
				);

				expect(items).toEqual<SchoolExternalToolItem[]>([
					{
						id: schoolExternalTool.id,
						externalToolId: schoolExternalTool.toolId,
						name: schoolExternalTool.name,
						statusText: expectedTranslation,
						isOutdated: schoolExternalTool.status.isOutdatedOnScopeSchool,
						isDeactivated: false,
						restrictToContexts: expectedTranslation,
					},
				]);
			});
		});

		describe("when translating context type", () => {
			const setupTool = () => {
				const tool = schoolExternalToolFactory.build({
					restrictToContexts: [
						ToolContextType.MediaBoard,
						ToolContextType.BoardElement,
						ToolContextType.Course,
					],
				});

				return { tool };
			};

			it("should call the translation function for context type mediaShelves", () => {
				const { tool } = setupTool();
				const { getItems, tMock, schoolExternalToolsModule } = setup(tool);

				getItems(schoolExternalToolsModule);

				expect(tMock).toHaveBeenCalledWith(
					"common.tool.context.type.mediaShelves"
				);
			});

			it("should call the translation function for context type course", () => {
				const { tool } = setupTool();
				const { getItems, tMock, schoolExternalToolsModule } = setup(tool);

				getItems(schoolExternalToolsModule);

				expect(tMock).toHaveBeenCalledWith("common.tool.context.type.courses");
			});

			it("should call the translation function for context type boardElements", () => {
				const { tool } = setupTool();
				const { getItems, tMock, schoolExternalToolsModule } = setup(tool);

				getItems(schoolExternalToolsModule);

				expect(tMock).toHaveBeenCalledWith(
					"common.tool.context.type.boardElements"
				);
			});
		});
	});
});
