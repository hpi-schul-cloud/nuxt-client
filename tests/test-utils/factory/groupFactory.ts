import { Group, GroupType, GroupUserRole } from "@data-group";
import { Factory } from "fishery";

export const groupFactory = Factory.define<Group>(({ sequence }) => ({
	id: `group-${sequence}`,
	name: `Group ${sequence}`,
	type: GroupType.Class,
	organizationId: `organization-${sequence}`,
	users: [
		{
			id: `user-${sequence}`,
			firstName: `Users firstname ${sequence}`,
			lastName: `Users lastname ${sequence}`,
			role: GroupUserRole.Student,
		},
	],
	externalSource: {
		externalId: `external-id-${sequence}`,
		systemId: `system-id-${sequence}`,
	},
}));
