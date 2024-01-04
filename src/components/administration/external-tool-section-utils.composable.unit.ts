import { useExternalToolsSectionUtils } from "./external-tool-section-utils.composable";
import { DataTableHeader } from "vuetify";
import { schoolExternalToolsModule } from "@/store";
import {
	SchoolExternalToolResponse,
	SchoolExternalToolSearchListResponse,
} from "@/serverApi/v3";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import { ContextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";

const schoolExternalToolsModuleMock = () => {
	return {
		getSchoolExternalTools: [
			{
				id: "id",
				name: "toolName",
				version: 1,
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
			toolVersion: 1,
			schoolId: "schoolId",
			parameters: [
				{
					name: "name",
					value: "value",
				},
			],
			status: ContextExternalToolConfigurationStatusFactory.build({
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

			const items: SchoolExternalToolItem[] = getItems(
				schoolExternalToolsModule
			);

			expect(items).toEqual([
				{
					id: "id",
					name: "toolName",
					statusText: "translated",
					isOutdated: false,
					isDeactivated: false,
					version: undefined,
				},
			]);
		});
	});
});
