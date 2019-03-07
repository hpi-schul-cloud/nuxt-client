import { storiesOf } from "@storybook/vue";
import outdent from "outdent";

import CourseCard from "@components/CourseCard.vue";
import notes from "@docs/storybook/courseCard.md";

import {
	defaultCourse,
	courseWithAlert,
	courseWithAssignment,
	courseWithNotification,
	courseOldDataFormat,
} from "./mockData/CourseCard";

storiesOf("CourseCard", module)
	.addParameters({
		notes,
	})
	.add("CourseCard mit Content", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
		data: () => ({
			course: defaultCourse,
		}),
	}))
	.add("CourseCard mit Aufgabe", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
		data: () => ({
			course: courseWithAssignment,
		}),
	}))
	.add("CourseCard mit Alert", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
		data: () => ({
			course: courseWithAlert,
		}),
	}))
	.add("CourseCard mit Notification", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
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
		template: outdent`<CourseCard />`,
	}));
