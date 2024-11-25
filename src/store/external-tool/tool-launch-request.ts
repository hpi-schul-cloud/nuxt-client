import { LaunchType } from "@/serverApi/v3";
import { ToolLaunchRequestMethodEnum } from "@/store/external-tool/tool-launch-request-method.enum";

export type ToolLaunchRequest = {
	method: ToolLaunchRequestMethodEnum;
	url: string;
	payload?: string;
	openNewTab?: boolean;
	launchType: LaunchType;
};
