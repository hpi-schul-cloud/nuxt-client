import { Factory } from "fishery";
import {
	ToolLaunchRequestResponse,
	ToolLaunchRequestResponseMethodEnum,
} from "@/serverApi/v3";

export const toolLaunchRequestResponeFactory =
	Factory.define<ToolLaunchRequestResponse>(() => ({
		method: ToolLaunchRequestResponseMethodEnum.Get,
		payload: '{ "key": "value" }',
		url: "https://example.com/tool-launch",
	}));
