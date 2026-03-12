import { LaunchRequestMethod, LaunchType } from "@api-server";
import { ToolLaunchRequestMethodEnum } from "@/store/external-tool/tool-launch-request-method.enum";

export type ToolLaunchRequest = {
	method: ToolLaunchRequestMethodEnum | LaunchRequestMethod;
	url: string;
	payload?: string;
	openNewTab?: boolean;
	launchType: LaunchType;
};
