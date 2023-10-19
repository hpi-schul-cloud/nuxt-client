import {
	GroupResponse,
	GroupResponseTypeEnum,
	GroupUserResponse,
	GroupUserResponseRoleEnum,
} from "@/serverApi/v3";
import { Group, GroupType, GroupUser, GroupUserRole } from "./types";

export const GroupTypeMapping: Record<GroupResponseTypeEnum, GroupType> = {
	[GroupResponseTypeEnum.Class]: GroupType.Class,
};

export const GroupUserRoleMapping: Partial<
	Record<GroupUserResponseRoleEnum, GroupUserRole>
> = {
	[GroupUserResponseRoleEnum.Administrator]: GroupUserRole.Administrator,
	[GroupUserResponseRoleEnum.Student]: GroupUserRole.Student,
	[GroupUserResponseRoleEnum.Teacher]: GroupUserRole.Teacher,
};

export const GroupUserRoleNameTranslationMapping: Record<
	GroupUserRole,
	string
> = {
	[GroupUserRole.Administrator]: "common.roleName.administrator",
	[GroupUserRole.Student]: "common.roleName.student",
	[GroupUserRole.Teacher]: "common.roleName.teacher",
	[GroupUserRole.Unknown]: "common.labels.unknown",
};

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
			role:
				GroupUserRoleMapping[groupUserResponse.role] ?? GroupUserRole.Unknown,
		};
	}

	static getTranslationKey(role: GroupUserRole): string {
		const translationKey: string = GroupUserRoleNameTranslationMapping[role];

		return translationKey;
	}
}
