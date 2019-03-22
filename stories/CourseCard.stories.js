import { storiesOf } from "@storybook/vue";
import outdent from "outdent";
import { withKnobs, text, number, color } from "@storybook/addon-knobs";

import CourseCard from "@components/CourseCard.vue";
import notes from "@docs/storybook/courseCard.md";

import {
	defaultCourse,
	courseWithAlert,
	courseWithAssignment,
	courseWithNotification,
	courseOldDataFormat,
} from "./mockData/CourseCard";

function injectKnobsInCourse(course) {
	return {
		...course,
		color: color("Color", course.color || ""),
		colorGradient: color("colorGradient", course.colorGradient || ""),
	};
}

storiesOf("CourseCard", module)
	.addDecorator(withKnobs)
	.addParameters({
		notes,
	})
	.add("CourseCard", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
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
		template: '<CourseCard :course="course" />',
		data: () => ({
			course: {
				...courseOldDataFormat,
				color: color("Color", courseOldDataFormat.color),
			},
		}),
	}))
	.add("CourseCard Empty", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard />`,
	}));
