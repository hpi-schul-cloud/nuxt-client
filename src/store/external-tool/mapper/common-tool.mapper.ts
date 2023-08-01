import {
	CustomParameterEntryParam,
	CustomParameterEntryResponse,
} from "@/serverApi/v3";
import { ToolParameterEntry } from "../tool-parameter-entry";

export class CommonToolMapper {
	static mapToCustomParameterEntryParam(
		parameter: ToolParameterEntry
	): CustomParameterEntryParam {
		const mapped: CustomParameterEntryParam = {
			name: parameter.name,
			value: parameter.value,
		};

		return mapped;
	}

	static mapToToolParameterEntry(
		response: CustomParameterEntryResponse
	): ToolParameterEntry {
		const mapped: ToolParameterEntry = {
			name: response.name,
			value: response.value,
		};

		return mapped;
	}
}
