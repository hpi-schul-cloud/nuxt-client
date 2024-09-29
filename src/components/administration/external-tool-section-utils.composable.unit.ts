import {
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
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

describe("useSchoolExternalToolUtils", () => {
	const setup = () => {
		const expectedTranslation = "translated";
		const tMock = jest.fn().mockReturnValue(expectedTranslation);

		const { getHeaders, getItems } = useExternalToolsSectionUtils(tMock);

		const schoolExternalTool = schoolExternalToolFactory.build();
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

	describe("getHeaders is called", () => {
		it("should return a dataTableHeader array", () => {
			const { getHeaders } = setup();

			const headers: DataTableHeader[] = getHeaders;

			expect(Array.isArray(headers)).toBeTruthy();
		});

		describe("when translate the headers", () => {
			it("should call the translation function for name", () => {
				const { tMock } = setup();

				expect(tMock).toHaveBeenCalledWith("common.labels.name");
			});

			it("should call the translation function for value", () => {
				const { tMock } = setup();

				expect(tMock).toHaveBeenCalledWith(
					"components.administration.externalToolsSection.table.header.status"
				);
			});

			it("should call the translation function for restrictToContexts", () => {
				const { tMock } = setup();

				expect(tMock).toHaveBeenCalledWith(
					"components.administration.externalToolsSection.table.header.restrictedTo"
				);
			});
		});

		it("should return the correct headers", () => {
			const { getHeaders, expectedTranslation } = setup();

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
		it("should return schoolExternalToolItems", () => {
			const {
				getItems,
				schoolExternalToolsModule,
				schoolExternalTool,
				expectedTranslation,
			} = setup();

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
					restrictToContexts: "",
				},
			]);
		});
	});
});
