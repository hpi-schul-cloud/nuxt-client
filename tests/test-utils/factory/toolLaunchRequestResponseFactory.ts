import { Factory } from "fishery";
import {
	LaunchType,
	ToolLaunchRequestResponse,
	ToolLaunchRequestResponseMethodEnum,
} from "@/serverApi/v3";

export const toolLaunchRequestResponseFactory =
	Factory.define<ToolLaunchRequestResponse>(() => ({
		method: ToolLaunchRequestResponseMethodEnum.Get,
		payload: '{ "key": "value" }',
		url: "https://example.com/tool-launch",
		launchType: LaunchType.Basic,
	}));
