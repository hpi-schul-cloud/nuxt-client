import { SchoolExternalTool } from "@store/external-tool/school-external-tool.enum";
import { DataTableHeader } from "vuetify";
import ExternalToolsModule from "@store/external-tools";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import { SchoolExternalToolStatusEnum } from "@store/external-tool/school-external-tool-status.enum";

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
				tool.status === SchoolExternalToolStatusEnum.Outdated;
			const status: string =
				tool.status === SchoolExternalToolStatusEnum.Latest
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
