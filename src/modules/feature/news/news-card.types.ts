import { NewsTargetModel } from "@api-server";

export type NewsCardItem = {
	readonly id: string;
	readonly title: string;
	readonly content: string;
	readonly displayAt: string;
	readonly targetModel?: NewsTargetModel;
	readonly target?: {
		readonly name?: string;
	} | null;
};
