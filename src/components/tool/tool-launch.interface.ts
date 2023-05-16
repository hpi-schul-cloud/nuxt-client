import { ToolLaunchMethod } from "./tool-launch-method";

export interface ToolLaunch {
	method: ToolLaunchMethod;

	url: string;

	payload?: string;

	openNewTab?: boolean;
}
