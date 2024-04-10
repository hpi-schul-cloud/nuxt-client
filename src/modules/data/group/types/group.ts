import { ExternalSource } from "./externalSource";
import { GroupType } from "./groupType";
import { GroupUser } from "./groupUser";

export type Group = {
	id: string;

	name: string;

	type: GroupType;

	users: GroupUser[];

	externalSource?: ExternalSource;

	organizationId?: string;
};
