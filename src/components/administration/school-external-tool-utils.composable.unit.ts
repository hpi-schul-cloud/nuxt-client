import { useSchoolExternalToolUtils } from "./school-external-tool-utils.composable";
import { SchoolExternalTool } from "@store/external-tool/school-external-tool";
import { DataTableHeader } from "vuetify";
import { externalToolsModule } from "@utils/store-accessor";
import {
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
} from "../../serverApi/v3";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import { SchoolExternalToolStatus } from "@store/external-tool/school-external-tool-status";

jest.mock("@utils/store-accessor", () => ({
	externalToolsModule: {
		getSchoolExternalTools: [
			{
				id: "id",
				name: "toolName",
				version: 1,
				status: SchoolExternalToolStatus.Latest,
			},
		],
	},
}));

describe("useSchoolExternalToolUtils", () => {
	const setup = () => {
		const expectedTranslation = "translated";
		const tMock = jest.fn().mockReturnValue(expectedTranslation);

		const {
			mapSchoolExternalToolSearchListResponse,
			getHeaders,
			getItems,
			mapSchoolExternalToolItemToSchoolExternalTool,
		} = useSchoolExternalToolUtils(tMock);

		const toolResponse: SchoolExternalToolResponse = {
			id: "id",
			name: "toolName",
			toolId: "toolId",
			toolVersion: 1,
			schoolId: "schoolId",
			parameters: [
				{
					name: "name",
					value: "value",
				},
			],
			status: SchoolExternalToolResponseStatusEnum.Latest,
		};
		const listResponse: SchoolExternalToolSearchListResponse = {
			data: [toolResponse],
		};

		const schoolExternaToolItem: SchoolExternalToolItem = {
			name: toolResponse.name,
			id: toolResponse.id,
			status: SchoolExternalToolStatus.Latest,
			outdated: false,
		};

		return {
			mapSchoolExternalToolItemToSchoolExternalTool,
			mapSchoolExternalToolSearchListResponse,
			getHeaders,
			getItems,
			listResponse,
			toolResponse,
			tMock,
			expectedTranslation,
			schoolExternaToolItem,
		};
	};

	describe("mapSchoolExternalToolSearchListResponse is called", () => {
		describe("when maps the response", () => {
			it("should return a schoolExternalTool array", () => {
				const { mapSchoolExternalToolSearchListResponse, listResponse } =
					setup();

				const schoolExternalTools: SchoolExternalTool[] =
					mapSchoolExternalToolSearchListResponse(listResponse);

				expect(Array.isArray(schoolExternalTools)).toBeTruthy();
			});

			it("should map the response correctly", () => {
				const {
					mapSchoolExternalToolSearchListResponse,
					listResponse,
					toolResponse,
				} = setup();

				const schoolExternalTools: SchoolExternalTool[] =
					mapSchoolExternalToolSearchListResponse(listResponse);

				expect(schoolExternalTools).toEqual(
					expect.objectContaining<SchoolExternalTool[]>([
						{
							id: toolResponse.id,
							name: toolResponse.name,
							version: toolResponse.toolVersion,
							status: SchoolExternalToolStatus.Latest,
						},
					])
				);
			});
		});
	});

	describe("getHeaders is called", () => {
		it("should return a dataTableHeader array", () => {
			const { getHeaders } = setup();

			const headers: DataTableHeader[] = getHeaders;

			expect(Array.isArray(headers)).toBeTruthy();
		});

		describe("when translate the headers", () => {
			it("should call the translation function for name", () => {
				const { getHeaders, tMock } = setup();

				getHeaders;

				expect(tMock).toHaveBeenCalledWith("common.labels.name");
			});

			it("should call the translation function for value", () => {
				const { getHeaders, tMock } = setup();

				getHeaders;

				expect(tMock).toHaveBeenCalledWith(
					"components.administration.externalToolsSection.table.header.status"
				);
			});
		});

		it("should return the correct headers", () => {
			const { getHeaders, expectedTranslation } = setup();

			const headers: DataTableHeader[] = getHeaders;

			expect(headers[0]).toEqual({
				text: expectedTranslation,
				value: "name",
			});
			expect(headers[1]).toEqual({
				text: expectedTranslation,
				value: "status",
			});
			expect(headers[2]).toEqual({
				text: "",
				value: "actions",
				sortable: false,
				align: "end",
			});
		});
	});

	describe("getItems is called", () => {
		it("should return schoolExternalToolItems", () => {
			const { getItems } = setup();

			const items: SchoolExternalToolItem[] = getItems(externalToolsModule);

			expect(items).toEqual([
				{
					id: "id",
					name: "toolName",
					status: "translated",
					outdated: false,
					version: undefined,
				},
			]);
		});
	});

	describe("mapSchoolExternalToolItemToSchoolExternalTool is called", () => {
		it("should return mapped schoolExternalTool", () => {
			const {
				mapSchoolExternalToolItemToSchoolExternalTool,
				schoolExternaToolItem,
			} = setup();

			const schoolExternalTool: SchoolExternalTool =
				mapSchoolExternalToolItemToSchoolExternalTool(schoolExternaToolItem);

			expect(schoolExternalTool).toEqual(
				expect.objectContaining<SchoolExternalTool>({
					id: schoolExternaToolItem.id,
					name: schoolExternaToolItem.name,
					status: SchoolExternalToolStatus.Unknown,
					version: undefined,
				})
			);
		});
	});
});
