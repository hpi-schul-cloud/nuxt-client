import { storiesOf } from "@storybook/vue";
import { text, number, color } from "@storybook/addon-knobs";

import CourseCard from "@components/molecules/CourseCard";
import notes from "@docs/storybook/courseCard.md";

import { defaultCourse, courseOldDataFormat } from "./mockData/CourseCard";

storiesOf("Molecules|CourseCard", module)
	.addParameters({
		notes,
	})
	.add("CourseCard", () => ({
		components: { CourseCard },
		template: `<CourseCard v-bind="course" />`,
		data: () => ({
			course: {
				...defaultCourse,
				teacherName: text("teacherName", defaultCourse.teacherName),
				name: text("name", defaultCourse.name),
				abbreviation: text("abbreviation", defaultCourse.abbreviation),
				nextCourseTime: text("nextCourseTime", defaultCourse.nextCourseTime),
				nextCourseRoom: text("nextCourseRoom", defaultCourse.nextCourseRoom),
				color: color("Color", defaultCourse.color),
				colorGradient: color("colorGradient", defaultCourse.colorGradient),
				newAssignments: number("newAssignments", defaultCourse.newAssignments),
				notification: number("notification", defaultCourse.notification),
				alert: text("alert", defaultCourse.alert),
			},
		}),
	}))
	.add("CourseCard getting old data format", () => ({
		components: { CourseCard },
		template: '<CourseCard v-bind="course" />',
		data: () => ({
			course: {
				...courseOldDataFormat,
				color: color("Color", courseOldDataFormat.color),
			},
		}),
	}));
