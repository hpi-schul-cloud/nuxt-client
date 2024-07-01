import {
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
} from "@/serverApi/v3";
import { schoolExternalToolsModule } from "@/store";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { DataTableHeader } from "@/store/types/data-table-header";
import { contextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";
import { useExternalToolsSectionUtils } from "./external-tool-section-utils.composable";
import { SchoolExternalToolItem } from "./school-external-tool-item";

const schoolExternalToolsModuleMock =
	(): Partial<SchoolExternalToolsModule> => {
		return {
			getSchoolExternalTools: [
				{
					id: "id",
					name: "toolName",
					isDeactivated: false,
					toolId: "toolId",
					schoolId: "schoolId",
					parameters: [],
					status: {
						isOutdatedOnScopeSchool: false,
						isDeactivated: false,
					},
				},
			],
		};
	};

jest.mock("@/store", () => ({
	schoolExternalToolsModule: schoolExternalToolsModuleMock(),
}));

describe("useSchoolExternalToolUtils", () => {
	const setup = () => {
		const expectedTranslation = "translated";
		const tMock = jest.fn().mockReturnValue(expectedTranslation);

		const { getHeaders, getItems } = useExternalToolsSectionUtils(tMock);

		const toolResponse: SchoolExternalToolResponse = {
			id: "id",
			name: "toolName",
			toolId: "toolId",
			schoolId: "schoolId",
			parameters: [
				{
					name: "name",
					value: "value",
				},
			],
			status: contextExternalToolConfigurationStatusFactory.build({
				isOutdatedOnScopeSchool: false,
				isDeactivated: false,
			}),
		};
		const listResponse: SchoolExternalToolSearchListResponse = {
			data: [toolResponse],
		};

		const schoolExternaToolItem: SchoolExternalToolItem =
			new SchoolExternalToolItem({
				name: toolResponse.name,
				id: toolResponse.id,
				externalToolId: toolResponse.toolId,
				statusText: "translationKey",
				isOutdated: false,
				isDeactivated: false,
			});

		return {
			getHeaders,
			getItems,
			listResponse,
			toolResponse,
			tMock,
			expectedTranslation,
			schoolExternaToolItem,
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
		});

		it("should return the correct headers", () => {
			const { getHeaders, expectedTranslation } = setup();

			const headers: DataTableHeader[] = getHeaders;

			expect(headers[0].title).toEqual(expectedTranslation);
			expect(headers[0].value).toEqual("name");

			expect(headers[1].title).toEqual(expectedTranslation);
			expect(headers[1].value).toEqual("statusText");

			expect(headers[2].title).toEqual("");
			expect(headers[2].value).toEqual("actions");
			expect(headers[2].sortable).toBe(false);
			expect(headers[2].align).toEqual("end");
		});
	});

	describe("getItems is called", () => {
		it("should return schoolExternalToolItems", () => {
			const { getItems } = setup();

			const items: SchoolExternalToolItem[] = getItems(
				schoolExternalToolsModule
			);

			expect(items).toEqual<SchoolExternalToolItem[]>([
				{
					id: "id",
					externalToolId: "toolId",
					name: "toolName",
					statusText: "translated",
					isOutdated: false,
					isDeactivated: false,
				},
			]);
		});
	});
});
