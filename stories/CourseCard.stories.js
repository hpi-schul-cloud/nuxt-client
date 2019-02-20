/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import CourseCard from "@components/CourseCard.vue";
import courseCardDoc from "@docs/storybook/courseCard.md";

import {
	defaultCourse,
	courseWithAlert,
	courseWithAssignment,
	courseWithNotification,
	courseOldDataFormat,
} from "./mockData/CourseCard";

storiesOf("CourseCard", module)
	.addDecorator(withMarkdownNotes(courseCardDoc))
	.add("CourseCard mit Content", () => ({
		components: { CourseCard },
		template: '<CourseCard :course="course"/>',
		data: () => ({
			course: defaultCourse,
		}),
	}))
	.add("CourseCard mit Aufgabe", () => ({
		components: { CourseCard },
		template: '<CourseCard :course="course"/>',
		data: () => ({
			course: courseWithAssignment,
		}),
	}))
	.add("CourseCard mit Alert", () => ({
		components: { CourseCard },
		template: '<CourseCard :course="course"/>',
		data: () => ({
			course: courseWithAlert,
		}),
	}))
	.add("CourseCard mit Notification", () => ({
		components: { CourseCard },
		template: '<CourseCard :course="course"/>',
		data: () => ({
			course: courseWithNotification,
		}),
	}))
	.add("CourseCard Old Data format", () => ({
		components: { CourseCard },
		template: '<CourseCard :course="course" />',
		data: () => ({
			course: courseOldDataFormat,
		}),
	}))
	.add("CourseCard Empty", () => ({
		components: { CourseCard },
		template: "<CourseCard/>",
	}));

/* eslint-enable react/react-in-jsx-scope */
