import {
	ToolLaunchRequestResponse,
	ToolLaunchRequestResponseMethodEnum,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const toolLaunchRequestResponseFactory =
	Factory.define<ToolLaunchRequestResponse>(() => ({
		method: ToolLaunchRequestResponseMethodEnum.Get,
		payload: '{ "key": "value" }',
		url: "https://example.com/tool-launch",
		isDeepLink: false,
	}));
