import { ExternalSourceResponse } from "@/serverApi/v3";
import { GroupUser } from "@/components/data-group/types/GroupUser";
import { GroupType } from "@/components/data-group/types/GroupType";

export type Group = {
	id: string;
	name: string;
	type: GroupType;
	users: Array<GroupUser>;
	externalSource?: ExternalSourceResponse;
	organizationId?: string;
};
