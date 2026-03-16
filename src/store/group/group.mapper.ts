import { ClassInfo, ClassRootType, CourseInfo } from "../types/class-info";
import { ClassInfoResponse, ClassInfoResponseType, CourseInfoResponse } from "@api-server";

export const ClassRootTypeMapping: Record<ClassInfoResponseType, ClassRootType> = {
	[ClassInfoResponseType.CLASS]: ClassRootType.CLASS,
	[ClassInfoResponseType.GROUP]: ClassRootType.GROUP,
};

export class GroupMapper {
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
}
