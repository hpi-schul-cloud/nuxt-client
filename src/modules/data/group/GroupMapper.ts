import { Group, GroupType, GroupUser, GroupUserRole } from "./types";
import { ClassInfo, ClassRootType, CourseInfo } from "@/store/types/class-info";
import {
	ClassInfoResponse,
	ClassInfoResponseType,
	CourseInfoResponse,
	GroupResponse,
	GroupResponseType,
	GroupUserResponse,
	RoleName,
} from "@api-server";

export const GroupTypeMapping: Record<GroupResponseType, GroupType> = {
	[GroupResponseType.CLASS]: GroupType.Class,
	[GroupResponseType.COURSE]: GroupType.Course,
	[GroupResponseType.OTHER]: GroupType.Other,
	[GroupResponseType.ROOM]: GroupType.Room,
};

export const GroupUserRoleMapping: Partial<Record<RoleName, GroupUserRole>> = {
	[RoleName.ADMINISTRATOR]: GroupUserRole.Administrator,
	[RoleName.STUDENT]: GroupUserRole.Student,
	[RoleName.TEACHER]: GroupUserRole.Teacher,
	[RoleName.GROUP_SUBSTITUTION_TEACHER]: GroupUserRole.GroupSubstitutionTeacher,
};

export const GroupUserRoleNameTranslationMapping: Record<GroupUserRole, string> = {
	[GroupUserRole.Administrator]: "common.roleName.administrator",
	[GroupUserRole.Student]: "common.roleName.student",
	[GroupUserRole.Teacher]: "common.roleName.teacher",
	[GroupUserRole.GroupSubstitutionTeacher]: "common.roleName.groupSubstitutionTeacher",
	[GroupUserRole.Unknown]: "common.labels.unknown",
};

export const ClassRootTypeMapping: Record<ClassInfoResponseType, ClassRootType> = {
	[ClassInfoResponseType.CLASS]: ClassRootType.CLASS,
	[ClassInfoResponseType.GROUP]: ClassRootType.GROUP,
};

export class GroupMapper {
	static mapToGroup(groupResponse: GroupResponse): Group {
		return {
			id: groupResponse.id,
			name: groupResponse.name,
			type: GroupTypeMapping[groupResponse.type],
			users: groupResponse.users.map((user) => GroupMapper.mapToGroupUser(user)),
			externalSource: groupResponse.externalSource,
			organizationId: groupResponse.organizationId,
		};
	}

	private static mapToGroupUser(groupUserResponse: GroupUserResponse): GroupUser {
		return {
			id: groupUserResponse.id,
			firstName: groupUserResponse.firstName,
			lastName: groupUserResponse.lastName,
			role: GroupUserRoleMapping[groupUserResponse.role] ?? GroupUserRole.Unknown,
		};
	}

	static mapToClassInfo(response: ClassInfoResponse[]): ClassInfo[] {
		const mapped: ClassInfo[] = response.map(
			(classInfoResponse: ClassInfoResponse): ClassInfo =>
				new ClassInfo({
					name: classInfoResponse.name,
					externalSourceName: classInfoResponse.externalSourceName,
					teacherNames: classInfoResponse.teacherNames,
					type: ClassRootTypeMapping[classInfoResponse.type],
					id: classInfoResponse.id,
					isUpgradable: classInfoResponse.isUpgradable,
					studentCount: classInfoResponse.studentCount,
					synchronizedCourses: classInfoResponse.synchronizedCourses?.map(
						(course: CourseInfoResponse): CourseInfo => ({
							id: course.id,
							name: course.name,
						})
					),
				})
		);

		return mapped;
	}

	static getTranslationKey(role: GroupUserRole): string {
		const translationKey: string = GroupUserRoleNameTranslationMapping[role];

		return translationKey;
	}
}
