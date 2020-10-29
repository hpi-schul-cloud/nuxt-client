import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import CourseHeader from "./CourseHeader";

const actions = [
	{
		text: "add",
		event: "add",
		icon: "add",
	},
];

storiesOf("5 Molecules/CourseHeader", module).add("default", () => ({
	components: { CourseHeader },
	template: `<CourseHeader :nextLessonDate="nextLessonDate" :title="title" :actions="actions" :courseId="courseId" />`,
	data: () => ({
		nextLessonDate: text("nextLessonDate", "12.10.2020 14:30"),
		title: text("title", "Mathe"),
		courseId: text("courseId", "1234"),
		actions: actions,
	}),
}));
