<template>
	<div v-if="course">
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
					:name="$t('pages.courses._id.educationalContent')"
					icon-name="lerninhalte"
					:selected="true"
				>
					<template v-if="courseIsEmpty">
						<empty-state
							image="@assets/img/empty-state/course-empty-state.svg"
							:title="$t('pages.courses._id.emptyCourseTitle')"
						>
							<template v-slot:description>
								<span style="display: block;">
									{{ $t("pages.courses._id.emptyCourseDescription") }}</span
								>
								<base-button
									class="add-inhalt"
									size="medium"
									design="floating-action-button"
								>
									<base-icon source="material" icon="add" />
									{{ $t("pages.courses._id.addContent") }}
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
import { currentDate, fromUTC, printDateFromDayJs } from "@plugins/datetime";
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
					text: this.$t("pages.courses._id.courseOption.edit"),
					event: "edit",
					icon: "create",
				},
				{
					text: this.$t("pages.courses._id.courseOption.invite"),
					event: "invite",
					icon: "mail_outline",
				},
				{
					text: this.$t("pages.courses._id.courseOption.share"),
					event: "share",
					icon: "share",
				},
				{
					text: this.$t("pages.courses._id.courseOption.duplicate"),
					event: "duplicate",
					icon: "file_copy",
				},
				{
					text: this.$t("pages.courses._id.courseOption.delete"),
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
				this.lessons.map(this.adaptLessonDataToTaskItemProperties),
				this.homeworks.map(this.adaptHomeworkDataToTaskItemProperties),
			];
			return [...lessons, ...homeworks];
		},
		courseIsEmpty() {
			return this.courseContents.length === 0;
		},
		nextLessonDate() {
			if ((this.course.times || []).length <= 0) return;
			const mappedTimes = this.course.times.map((lessonTime) => {
				const now = currentDate();
				const utcLessonTime = this.createUTCDateFromLessonTime(lessonTime);
				const timezoneLessonTime = fromUTC(utcLessonTime.toISOString());
				if (timezoneLessonTime.isBefore(now)) return;
				return timezoneLessonTime;
			});
			const minDate = min(mappedTimes);
			return printDateTime(minDate);
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
		adaptLessonDataToTaskItemProperties(lesson) {
			return {
				imgSrc: lesson.hidden
					? "@assets/img/courses/document-draft.svg"
					: "@assets/img/courses/document-new.svg",
				title: lesson.name,
				subtitle: this.$t("pages.courses._id.lesson"),
				status: lesson.hidden
					? this.$t("pages.courses._id.courseContentDraft")
					: "",
				fill: lesson.hidden ? undefined : this.course.color,
			};
		},
		adaptHomeworkDataToTaskItemProperties(homework) {
			return {
				imgSrc: homework.private
					? "@assets/img/courses/task-draft.svg"
					: "@assets/img/courses/task-new.svg",
				title: homework.name,
				subtitle: this.formatSubtitleForHomework(homework),
				status: homework.private
					? this.$t("pages.courses._id.courseContentDraft")
					: "",
				actionNeeded: false,
				fill: homework.private ? undefined : this.course.color,
			};
		},
		formatSubtitleForHomework(homework) {
			const now = currentDate();
			const tomorrow = now.add(1, "d");
			const dueDate = fromUTC(homework.dueDate);
			const prefix = `${this.$t(
				"pages.courses._id.homework.until"
			)} ${printDateFromDayJs(dueDate)}`;
			if (dueDate <= tomorrow && dueDate > now) {
				const remainingHours = dueDate.diff(now, "h");
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
		createUTCDateFromLessonTime(lessonTime) {
			const now = new Date();
			const nowDay = now.getDay();
			const nowDate = now.getDate();
			if (lessonTime.weekday < nowDay) {
				now.setDate(nowDate + nowDay + lessonTime.weekday - 1);
			} else {
				now.setDate(nowDate + Math.abs(nowDay - lessonTime.weekday));
			}
			now.setUTCHours(0, 0, 0, lessonTime.startTime);
			return now;
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
