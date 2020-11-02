<template>
	<div v-if="course">
		<base-breadcrumb :inputs="breadcrumbs" />
		<base-grid column-width="4rem" class="no-margin">
			<course-header
				class="header"
				:title="course.name"
				:next-lesson-date="nextLessonDate"
				:actions="actions"
				:course-id="$route.params.id"
			></course-header>
			<tabs class="tabs">
				<tab
					:name="$t('pages.courses._id.educational_content')"
					icon-name="lerninhalte"
					:selected="true"
				>
					<template v-if="courseIsEmpty">
						<empty-state
							image="@assets/img/empty-state/course-empty-state.svg"
							:title="$t('pages.courses._id.empty_course_title')"
						>
							<template v-slot:description>
								<!-- eslint-disable vue/no-v-html -->
								<span
									style="display: block;"
									v-html="$t('pages.courses._id.empty_course_description')"
								/>
								<base-button
									class="add-inhalt"
									size="medium"
									design="floating-action-button"
								>
									<base-icon source="material" icon="add" />
									{{ $t("pages.courses._id.empty_course_add_content") }}
								</base-button>
							</template>
						</empty-state>
					</template>
					<template v-else>
						<div class="task-item-container">
							<task-item
								v-for="(content, idx) in courseContents"
								:key="idx"
								v-bind="content"
							></task-item>
						</div>
					</template>
				</tab>
				<tab name="Groups" icon-name="gruppen">Groups</tab>
				<tab name="Tools" icon-name="tools">Tools</tab>
			</tabs>
		</base-grid>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { min } from "lodash";

import Tabs from "@components/organisms/Tabs/Tabs";
import Tab from "@components/atoms/Tab";
import BaseGrid from "@components/base/BaseGrid";
import EmptyState from "@components/molecules/EmptyState";
import TaskItem from "@components/molecules/TaskItem";
import BaseButton from "@components/base/BaseButton";
import BaseIcon from "@components/base/BaseIcon";
import CourseHeader from "@components/molecules/CourseHeader";

export default {
	layout: "loggedInFullNoPadding",
	components: {
		Tabs,
		Tab,
		BaseGrid,
		EmptyState,
		TaskItem,
		BaseButton,
		BaseIcon,
		CourseHeader,
	},
	data() {
		return {
			actions: [
				{
					text: this.$t("pages.courses._id.course_option.edit"),
					event: "edit",
					icon: "create",
				},
				{
					text: this.$t("pages.courses._id.course_option.invite"),
					event: "invite",
					icon: "mail_outline",
				},
				{
					text: this.$t("pages.courses._id.course_option.share"),
					event: "share",
					icon: "share",
				},
				{
					text: this.$t("pages.courses._id.course_option.duplicate"),
					event: "duplicate",
					icon: "file_copy",
				},
				{
					text: this.$t("pages.courses._id.course_option.delete"),
					event: "delete",
					icon: "delete",
				},
			],
		};
	},
	computed: {
		...mapGetters("courses", {
			course: "current",
		}),
		...mapGetters("lessons", {
			lessons: "list",
		}),
		...mapGetters("homeworks", {
			homeworks: "list",
		}),
		courseContents() {
			const [lessons, homeworks] = [
				this.lessons.map(this.adaptLesson),
				this.homeworks.map(this.adaptHomework),
			];
			return [...lessons, ...homeworks];
		},
		courseIsEmpty() {
			return this.courseContents.length === 0;
		},
		nextLessonDate() {
			if ((this.course.times || []).length <= 0) return;
			const mappedTimes = this.course.times.map((lessonTime) => {
				let weekDayIdentifier = lessonTime.weekday + 1;
				if (moment().day() > weekDayIdentifier) weekDayIdentifier += 7;
				const date = moment()
					.day(weekDayIdentifier)
					.hours(0)
					.minutes(0)
					.seconds(0)
					.milliseconds(lessonTime.startTime);
				if (date.isBefore()) return;
				return date;
			});
			const minDate = min(mappedTimes);
			return moment(minDate).format("DD.MM.YYYY HH:mm");
		},
		breadcrumbs() {
			return [
				{ text: "Kurse", to: { name: "courses" } },
				{
					text: this.course.name,
					to: { name: "courses-id", params: { id: this.course._id } },
				},
			];
		},
	},
	created(ctx) {
		this.getCourse(this.$route.params.id);
		this.getCourseContent(this.$route.params.id);
	},
	methods: {
		getCourse(id) {
			this.$store.dispatch("courses/get", id);
		},
		getCourseContent(id) {
			this.$store.dispatch("homeworks/find", {
				query: {
					courseId: id,
				},
			});
			this.$store.dispatch("lessons/find", {
				query: {
					courseId: id,
				},
			});
		},
		adaptCourseContent() {
			this.lessons = this.lessons.map(this.adaptLesson);
			this.homeworks = this.homeworks.map(this.adaptHomework);
		},
		adaptLesson(lesson) {
			return {
				imgSrc: lesson.hidden
					? "@assets/img/courses/document-draft.svg"
					: "@assets/img/courses/document-new.svg",
				title: lesson.name,
				subtitle: this.$t("pages.courses._id.lesson"),
				status: lesson.hidden
					? this.$t("pages.courses._id.course_content_draft")
					: "",
				fill: lesson.hidden ? undefined : this.course.color,
			};
		},
		adaptHomework(homework) {
			return {
				title: homework.name,
				subtitle: this.prepareSubtitleForHomework(homework),
				status: homework.private
					? this.$t("pages.courses._id.course_content_draft")
					: "",
				actionNeeded: false,
			};
		},
		prepareSubtitleForHomework(homework) {
			const now = moment();
			const tomorrow = moment(now).add(24, "hours");
			const dueDate = moment(new Date(homework.dueDate));
			const prefix = `${this.$t(
				"pages.courses._id.homework.until"
			)} ${dueDate.format("DD/MM/YYYY")}`;
			if (dueDate <= tomorrow && dueDate > now) {
				const remainingHours = dueDate.diff(now, "hours");
				return `${prefix} - ${this.$t(
					"pages.courses._id.homework.remaining"
				)} ${remainingHours} ${
					remainingHours === 1
						? this.$t("pages.courses._id.homework.hour")
						: this.$t("pages.courses._id.homework.hours")
				}`;
			}
			if (dueDate <= now) {
				return `${prefix} - ${this.$t("pages.courses._id.homework.ended")}`;
			}
			return prefix;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.tabs {
	grid-column: 1 / -1;
}

.header {
	grid-column: 1 / -1;
	margin: 0 var(--space-lg);

	@include breakpoint(desktop) {
		margin: 0 var(--space-xl-5);
	}
}

.add-inhalt {
	margin-top: var(--space-md);
}

.task-item-container {
	margin: 0 var(--space-lg);

	@include breakpoint(desktop) {
		margin: 0 var(--space-xl-5);
	}
}
</style>
