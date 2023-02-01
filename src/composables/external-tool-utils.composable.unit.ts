import {
	SchoolExternalTool,
	SchoolExternalToolStatusEnum,
} from "@store/external-tool";
import {
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
} from "../serverApi/v3";
import { SchoolExternalToolItem } from "@components/administration/school-external-tool-item";
import { useExternalToolUtils } from "./external-tool-utils.composable";

jest.mock("@utils/store-accessor", () => ({
	externalToolsModule: {
		getSchoolExternalTools: [
			{
				id: "id",
				name: "toolName",
				version: 1,
				status: SchoolExternalToolStatusEnum.Latest,
			},
		],
	},
}));

describe("useExternalToolUtils", () => {
	const setup = () => {
		const expectedTranslation = "translated";
		const tMock = jest.fn().mockReturnValue(expectedTranslation);

		const {
			mapSchoolExternalToolResponse,
			mapSchoolExternalToolSearchListResponse,
			mapSchoolExternalToolItemToSchoolExternalTool,
		} = useExternalToolUtils(tMock);

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
			status: SchoolExternalToolStatusEnum.Latest,
			outdated: false,
		};

		return {
			listResponse,
			toolResponse,
			tMock,
			expectedTranslation,
			schoolExternaToolItem,
			mapSchoolExternalToolSearchListResponse,
			mapSchoolExternalToolResponse,
			mapSchoolExternalToolItemToSchoolExternalTool,
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
							status: SchoolExternalToolStatusEnum.Latest,
						},
					])
				);
			});
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
					status: SchoolExternalToolStatusEnum.Unknown,
					version: undefined,
				})
			);
		});
	});
});
