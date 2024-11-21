import { ToolLaunchRequestMethodEnum } from "@/store/external-tool/tool-launch-request-method.enum";

export type ToolLaunchRequest = {
	method: ToolLaunchRequestMethodEnum;
	url: string;
	payload?: string;
	openNewTab?: boolean;
};
