import { GroupResponse, GroupResponseType, RoleName } from "@/serverApi/v3";
import { Factory } from "fishery";

export const groupResponseFactory = Factory.define<GroupResponse>(
	({ sequence }) => ({
		id: `group-${sequence}`,
		name: `Group ${sequence}`,
		type: GroupResponseType.CLASS,
		organizationId: `organization-${sequence}`,
		users: [
			{
				id: `user-${sequence}`,
				firstName: `Users firstname ${sequence}`,
				lastName: `Users lastname ${sequence}`,
				role: RoleName.STUDENT,
			},
		],
		externalSource: {
			externalId: `external-id-${sequence}`,
			systemId: `system-id-${sequence}`,
		},
	})
);
