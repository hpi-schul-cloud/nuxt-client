import { Factory } from "fishery";
import {
	ToolLaunchRequest,
	ToolLaunchRequestMethodEnum,
} from "@/store/external-tool";

export const toolLaunchRequestFactory = Factory.define<ToolLaunchRequest>(
	({ sequence }) => ({
		method: ToolLaunchRequestMethodEnum.Get,
		payload: '{ "key": "value" }',
		url: "https://example.com/tool-launch",
	})
);
