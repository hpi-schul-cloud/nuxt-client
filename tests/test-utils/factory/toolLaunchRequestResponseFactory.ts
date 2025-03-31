import {
	LaunchRequestMethod,
	LaunchType,
	ToolLaunchRequestResponse,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const toolLaunchRequestResponseFactory =
	Factory.define<ToolLaunchRequestResponse>(() => ({
		method: LaunchRequestMethod.Get,
		payload: '{ "key": "value" }',
		url: "https://example.com/tool-launch",
		launchType: LaunchType.Basic,
	}));
