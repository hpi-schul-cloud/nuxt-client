import {
	ToolLaunchRequest,
	ToolLaunchRequestMethodEnum,
} from "@/store/external-tool";
import { Factory } from "fishery";

export const toolLaunchRequestFactory = Factory.define<ToolLaunchRequest>(
	() => ({
		method: ToolLaunchRequestMethodEnum.Get,
		payload: '{ "key": "value" }',
		url: "https://example.com/tool-launch",
	})
);
