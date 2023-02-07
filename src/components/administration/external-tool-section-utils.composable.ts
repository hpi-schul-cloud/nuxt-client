import { DataTableHeader } from "vuetify";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import ExternalToolsModule from "@/store/external-tools";
import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
} from "@/store/external-tool";

export function useExternalToolsSectionUtils(
	t: (key: string) => string = () => ""
) {
	const getHeaders: DataTableHeader[] = [
		{
			text: t("common.labels.name"),
			value: "name",
		},
		{
			text: t(
				"components.administration.externalToolsSection.table.header.status"
			),
			value: "status",
		},
		{
			text: "",
			value: "actions",
			sortable: false,
			align: "end",
		},
	];

	const getItems = (
		externalToolsModule: ExternalToolsModule
	): SchoolExternalToolItem[] => {
		const schoolExternalTools: SchoolExternalTool[] =
			externalToolsModule.getSchoolExternalTools;
		return schoolExternalTools.map((tool: SchoolExternalTool) => {
			const outdated: boolean =
				tool.status === SchoolExternalToolStatus.Outdated;
			const status: string =
				tool.status === SchoolExternalToolStatus.Latest
					? t(
							"components.administration.externalToolsSection.table.header.status.latest"
					  )
					: t(
							"components.administration.externalToolsSection.table.header.status.outdated"
					  );
			return { id: tool.id, name: tool.name, status: status, outdated };
		});
	};

	return {
		getHeaders,
		getItems,
	};
}
