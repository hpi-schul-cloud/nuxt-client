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
	.add("CourseCard with content", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
		data: () => ({
			course: defaultCourse,
		}),
	}))
	.add("CourseCard with assignment", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
		data: () => ({
			course: courseWithAssignment,
		}),
	}))
	.add("CourseCard with alert", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
		data: () => ({
			course: courseWithAlert,
		}),
	}))
	.add("CourseCard with notification", () => ({
		components: { CourseCard },
		template: outdent`<CourseCard :course="course" />`,
		data: () => ({
			course: courseWithNotification,
		}),
	}))
	.add("CourseCard getting old data format", () => ({
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
