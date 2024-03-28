import { ExternalSourceResponse } from "@/serverApi/v3";
import { GroupType } from "./GroupType";
import { GroupUser } from "./GroupUser";

export type Group = {
	id: string;

	name: string;

	type: GroupType;

	users: GroupUser[];

	externalSource?: ExternalSourceResponse;

	organizationId?: string;
};
