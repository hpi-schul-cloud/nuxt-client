<template>
	<div v-if="course">
		<base-grid class="no-margin">
			<h1 class="h2 header">
				<!-- TODO: Replace with HEADER component when ready -->
				{{ course.name }}
			</h1>
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
						<div
							v-for="(content, idx) in courseContents"
							:key="idx"
							class="task-item-container"
						>
							<task-item v-bind="content"></task-item>
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
import TaskDraftImage from "@assets/img/courses/draft.svg";
import BaseButton from "@components/base/BaseButton";
import BaseIcon from "@components/base/BaseIcon";

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
			const store = this.$store;
			let lessons = store.getters["lessons/list"];
			let homeworks = store.getters["homeworks/list"];
			lessons = lessons.map((value) => {
				return {
					title: value.name,
					subtitle: "Aufgabe",
					status: "Entwurf",
					actionNeeded: true,
					image: TaskDraftImage,
				};
			});

			homeworks = homeworks.map((value) => {
				return {
					title: value.name,
					subtitle: "Editor-Dokument",
					status: "Entwurf",
					actionNeeded: false,
				};
			});
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
	margin: 0 var(--space-xl-5);

	@media (max-width: 750px) {
		margin: 0 var(--space-lg);
	}
}
</style>
