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
import Tabs from "@components/organisms/Tabs/Tabs";
import Tab from "@components/atoms/Tab";
import BaseGrid from "@components/base/BaseGrid";
import EmptyState from "@components/molecules/EmptyState";
import TaskItem from "@components/molecules/TaskItem";
import BaseButton from "@components/base/BaseButton";
import BaseIcon from "@components/base/BaseIcon";
import CourseHeader from "@components/molecules/CourseHeader";
import moment from "moment";

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
			nextLessonDate: "12.10.2020 14:30",
			actions: [
				{
					text: "Bearbeiten",
					event: "edit",
					icon: "create",
				},
				{
					text: "Einladen",
					event: "invite",
					icon: "mail_outline",
				},
				{
					text: "Teilen",
					event: "share",
					icon: "share",
				},
				{
					text: "Duplizieren",
					event: "duplicate",
					icon: "file_copy",
				},
				{
					text: "Löschen",
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
				subtitle: "Editor-Document",
				status: lesson.hidden ? "Entwurf" : "",
				fill: lesson.hidden ? undefined : this.course.color,
			};
		},
		adaptHomework(homework) {
			return {
				title: homework.name,
				subtitle: this.prepareSubtitleForHomework(homework),
				actionNeeded: false,
			};
		},
		prepareSubtitleForHomework(homework) {
			const now = moment();
			const tomorrow = moment(now).add(24, "hours");
			const dueDate = moment(new Date(homework.dueDate));
			const prefix = `Aufgabe bis ${dueDate.format("DD/MM/YYYY")}`;
			if (dueDate <= tomorrow && dueDate > now) {
				const remainingHours = dueDate.diff(now, "hours");
				return `${prefix} - endet in ${remainingHours} ${
					remainingHours === 1 ? "Stunde" : "Stunden"
				}`;
			}
			if (dueDate <= now) {
				return `${prefix} - Beendet`;
			}
			return prefix;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.tabs,
.header {
	grid-column: 1 / -1;
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
