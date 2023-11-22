import { Factory } from "fishery";
import { Group, GroupType, GroupUserRole } from "@data-group";

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
