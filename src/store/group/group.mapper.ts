import { ClassInfo, ClassRootType, CourseInfo } from "../types/class-info";
import { ClassInfoResponse, ClassInfoResponseTypeEnum, CourseInfoResponse } from "@/serverApi/v3";

export const ClassRootTypeMapping: Record<ClassInfoResponseTypeEnum, ClassRootType> = {
	[ClassInfoResponseTypeEnum.Class]: ClassRootType.Class,
	[ClassInfoResponseTypeEnum.Group]: ClassRootType.Group,
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
