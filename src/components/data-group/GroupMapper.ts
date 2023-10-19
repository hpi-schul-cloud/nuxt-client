import { Group, GroupType, GroupUser, GroupUserRole } from "./types";
import {
	GroupResponse,
	GroupResponseTypeEnum,
	GroupUserResponse,
	GroupUserResponseRoleEnum,
} from "@/serverApi/v3";

export const GroupTypeMapping: Record<GroupResponseTypeEnum, GroupType> = {
	[GroupResponseTypeEnum.Class]: GroupType.Class,
};

export const GroupUserRoleMapping: Record<
	GroupUserResponseRoleEnum,
	GroupUserRole
> = {
	[GroupUserResponseRoleEnum.Administrator]: GroupUserRole.Administrator,
	[GroupUserResponseRoleEnum.Student]: GroupUserRole.Student,
	[GroupUserResponseRoleEnum.Teacher]: GroupUserRole.Teacher,
} as Record<GroupUserResponseRoleEnum, GroupUserRole>;

export class GroupMapper {
	static mapToGroup(groupResponse: GroupResponse): Group {
		return {
			id: groupResponse.id,
			name: groupResponse.name,
			type: GroupTypeMapping[groupResponse.type],
			users: groupResponse.users.map((user) =>
				GroupMapper.mapToGroupUser(user)
			),
			externalSource: groupResponse.externalSource,
			organizationId: groupResponse.organizationId,
		};
	}

	private static mapToGroupUser(
		groupUserResponse: GroupUserResponse
	): GroupUser {
		return {
			id: groupUserResponse.id,
			firstName: groupUserResponse.firstName,
			lastName: groupUserResponse.lastName,
			role: GroupUserRoleMapping[groupUserResponse.role],
		};
	}
}
