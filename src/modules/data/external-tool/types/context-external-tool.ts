import { ToolParameterEntry } from "./tool-parameter";
import { ToolContextType } from "@api-server";

export interface ContextExternalToolSave {
	schoolToolId: string;
	contextId: string;
	contextType: ToolContextType;
	parameters: ToolParameterEntry[];
	displayName?: string;
}

export interface ContextExternalTool extends ContextExternalToolSave {
	id: string;
}

export interface ContextExternalToolConfigurationStatus {
	isOutdatedOnScopeSchool: boolean;
	isOutdatedOnScopeContext: boolean;
	isIncompleteOnScopeContext: boolean;
	isIncompleteOperationalOnScopeContext: boolean;
	isDeactivated: boolean;
	isNotLicensed: boolean;
}

export interface ContextExternalToolTemplateListItem {
	id: string;
	name: string;
	logoUrl?: string;
	schoolToolId: string;
}
