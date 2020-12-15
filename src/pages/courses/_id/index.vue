<template>
	<div v-if="course">
		<base-grid column-width="4rem" class="no-margin">
			<course-header
				class="header"
				:title="course.name"
				:next-lesson-date="nextLessonDate"
				:actions="courseActions"
				:course-id="$route.params.id"
				@edit="courseEdit"
			></course-header>
			<tabs class="tabs">
				<tab
					:name="$t('pages.courses._id.tab.educationalContent')"
					icon-name="lerninhalte"
					:selected="true"
				>
					<template v-if="courseIsEmpty">
						<empty-state
							image="@assets/img/empty-state/course-empty-state.svg"
							:title="$t('pages.courses._id.emptyCourseTitle')"
						>
							<template v-slot:description>
								<span style="display: block">
									{{ $t("pages.courses._id.emptyCourseDescription") }}</span
								>
								<base-button class="add-inhalt" size="medium" design="primary">
									<base-icon source="material" icon="add" />
									{{ $t("pages.courses._id.addContent") }}
								</base-button>
							</template>
						</empty-state>
					</template>
					<template v-else>
						<ol class="task-item-container">
							<task-item
								v-for="(content, idx) in courseContents"
								:key="idx"
								:actions="createActionsForCourseItem(content)"
								v-bind="content"
								@edit="eventEdit(content.url)"
								@delete="eventDeleteModal"
							></task-item>
							<delete-modal
								:show-delete-modal.sync="showDeleteModal"
								:confirmation-text="confirmationText"
								@delete="handleCourseItemDeletion"
							></delete-modal>
						</ol>
					</template>
				</tab>
				<tab :name="$t('pages.courses._id.tab.groups')" icon-name="gruppen">{{
					$t("pages.courses._id.tab.groups")
				}}</tab>
				<tab :name="$t('pages.courses._id.tab.tools')" icon-name="tools">{{
					$t("pages.courses._id.tab.tools")
				}}</tab>
			</tabs>
		</base-grid>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
	currentDate,
	fromUTC,
	printDateFromDayJs,
	printDateTime,
} from "@plugins/datetime";
import { min } from "lodash";

import Tabs from "@components/organisms/Tabs/Tabs";
import Tab from "@components/atoms/Tab";
import BaseGrid from "@components/base/BaseGrid";
import EmptyState from "@components/molecules/EmptyState";
import TaskItem from "@components/molecules/TaskItem";
import BaseButton from "@components/base/BaseButton";
import BaseIcon from "@components/base/BaseIcon";
import CourseHeader from "@components/molecules/CourseHeader";
import DeleteModal from "../../../components/molecules/DeleteModal";

export default {
	layout: "loggedInFullNoPadding",
	components: {
		DeleteModal,
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
			showDeleteModal: false,
			toDelete: "",
			confirmationText: "",
			courseActions: [
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
			taskActions: [
				{
					text: this.$t("pages.courses._id.courseOption.edit"),
					event: "edit",
					icon: "create",
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
		...mapActions("courses", {
			deleteCourseItem: "removeCourseItem",
		}),
		createActionsForCourseItem(courseItem) {
			const actionsTemplate = JSON.parse(JSON.stringify([...this.taskActions]));
			const indexOfDeleteEvent = actionsTemplate.findIndex(
				(action) => action.event === "delete"
			);
			if (indexOfDeleteEvent >= 0) {
				actionsTemplate[indexOfDeleteEvent].arguments = {
					type: courseItem.type,
					id: courseItem.id,
				};
			}
			return actionsTemplate;
		},
		courseEdit() {
			this.$router.push({ path: `${this.$route.path}/edit` });
		},
		eventEdit(url) {
			this.$router.push({ path: `${url}/edit` });
		},
		eventDeleteModal(deletionData) {
			if (deletionData.type === "homework") {
				this.confirmationText = this.$t(
					"pages.courses._id.modal.title.homework"
				);
			} else {
				this.confirmationText = this.$t(
					"pages.courses._id.modal.title.editorDocument"
				);
			}
			this.toDelete = deletionData;
			this.showDeleteModal = true;
		},
		async handleCourseItemDeletion() {
			await this.deleteCourseItem(this.toDelete);
		},
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
				id: lesson._id,
				imgSrc: lesson.hidden
					? "@assets/img/courses/document-draft.svg"
					: "@assets/img/courses/document-new.svg",
				title: lesson.name,
				subtitle: this.$t("pages.courses._id.lesson"),
				status: lesson.hidden
					? this.$t("pages.courses._id.courseContentDraft")
					: "",
				fill: lesson.hidden ? undefined : this.course.color,
				url: `/courses/${this.course.id}/topics/${lesson._id}`,
				type: "lesson",
			};
		},
		adaptHomeworkDataToTaskItemProperties(homework) {
			return {
				id: homework._id,
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
				url: `/homework/${homework._id}`,
				type: "homework",
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
	margin: 0 var(--space-xs);

	@include breakpoint(tablet) {
		margin: 0 var(--space-lg);
	}

	@include breakpoint(desktop) {
		margin: 0 var(--space-xl-5);
	}
}
</style>
