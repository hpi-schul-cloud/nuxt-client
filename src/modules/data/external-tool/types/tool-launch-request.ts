import { LaunchRequestMethod, LaunchType } from "@api-server";

export enum ToolLaunchRequestMethodEnum {
	Get = "GET",
	Post = "POST",
}

export type ToolLaunchRequest = {
	method: ToolLaunchRequestMethodEnum | LaunchRequestMethod;
	url: string;
	payload?: string;
	openNewTab?: boolean;
	launchType: LaunchType;
};
