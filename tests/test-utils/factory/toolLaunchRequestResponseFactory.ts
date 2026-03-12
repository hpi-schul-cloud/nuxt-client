import {
	LaunchRequestMethod,
	LaunchType,
	ToolLaunchRequestResponse,
} from "@/generated/serverApi/v3";
import { Factory } from "fishery";

export const toolLaunchRequestResponseFactory =
	Factory.define<ToolLaunchRequestResponse>(() => ({
		method: LaunchRequestMethod.GET,
		payload: '{ "key": "value" }',
		url: "https://example.com/tool-launch",
		launchType: LaunchType.BASIC,
	}));
