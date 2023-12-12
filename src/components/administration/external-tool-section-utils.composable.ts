import { DataTableHeader } from "@/store/types/data-table-header";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import { SchoolExternalTool } from "@/store/external-tool";
import SchoolExternalToolsModule from "@/store/school-external-tools";

export function useExternalToolsSectionUtils(
	t: (key: string) => string = () => ""
) {
	const getHeaders: DataTableHeader[] = [
		{
			title: t("common.labels.name"),
			value: "name",
			key: "name",
		},
		{
			title: t(
				"components.administration.externalToolsSection.table.header.status"
			),
			value: "status",
			key: "status",
		},
		{
			title: "",
			value: "actions",
			sortable: false,
			align: "end",
			key: "actions",
		},
	];

	const getItems = (
		schoolExternalToolsModule: SchoolExternalToolsModule
	): SchoolExternalToolItem[] => {
		const schoolExternalTools: SchoolExternalTool[] =
			schoolExternalToolsModule.getSchoolExternalTools;
		return schoolExternalTools.map((tool: SchoolExternalTool) => {
			const outdated: boolean = tool.status.isOutdatedOnScopeSchool;
			const statusTranslationKey: string = tool.status.isOutdatedOnScopeSchool
				? "components.externalTools.status.outdated"
				: "components.externalTools.status.latest"; // VUE3_UPGRADE: need to test if that works now, see BC-6007

			return {
				id: tool.id,
				name: tool.name,
				status: t(statusTranslationKey),
				outdated,
			};
		});
	};

	return {
		getHeaders,
		getItems,
	};
}
