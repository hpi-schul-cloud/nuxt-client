import { storiesOf } from "@storybook/vue";
import { text, number, color, boolean } from "@storybook/addon-knobs";

import CourseCard from "@components/molecules/CourseCard";
import notes from "@docs/storybook/courseCard.md";
import NewsCard from "@components/molecules/NewsCard";

import { defaultCourse, courseOldDataFormat } from "./mockData/CourseCard";

storiesOf("Cards", module)
	.addParameters({
		notes,
	})
	.add("CourseCard", () => ({
		components: { CourseCard },
		template: `<CourseCard :course="course" />`,
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
		template: `<CourseCard />`,
	}))
	.add("Newscard", () => ({
		components: { NewsCard },
		data: () => ({
			title: text("title", "Title"),
			category: text("Category", "Schultheater"),
			content: text(
				"Content",
				`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
			),
			createdAt: text("CreatedAt", "2019-07-17-14:30"),
			createdBy: text("CreatedBy", "Mona Weizenberg"),
			picture: text("Picture", "https://source.unsplash.com/daily"),
			eventDate: text("Event date", "2019-02-22-19:00"),
			color: color("color", "#412363"),
			isLandscape: boolean("isLandscape"),
		}),
		template: `
		<div style="max-width: 500px; margin: 0 auto">
			<news-card
				:category="category"
				:title="title"
				:content="content"
				:createdAt="createdAt"
				:createdBy="createdBy"
				:picture="picture"
				:eventDate="eventDate"
				:isLandscape="isLandscape"
				:color="color"
			/>
		</div>
		`,
	}));
