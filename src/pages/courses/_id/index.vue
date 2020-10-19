<template>
	<div v-if="course">
		<base-grid column-width="3.4rem">
			<h1 class="h2" style="grid-row: 1; grid-column: 1 / -1;">
				{{ course.name }}
			</h1>
			<tabs style="grid-row: 2; grid-column: 1 / -1;">
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
									v-html="$t('pages.courses._id.empty_course_description')"
								/>
							</template>
						</empty-state>
					</template>
					<template v-else>
						<div v-for="(content, idx) in courseContents" :key="idx">
							<task-item v-bind="content"></task-item>
						</div>
					</template>
				</tab>
				<tab name="Groups" icon-name="gruppen">Groups</tab>
				<tab name="Tools" icon-name="tools">Tools</tab>
			</tabs>
			<fab-icon
				style="grid-row: 2; grid-column: -1;"
				:show-label="true"
				:actions="[
					{
						label: 'Editor-Document',
						icon: 'create',
						iconSource: 'custom',
					},
					{
						label: 'Aufgabe',
						icon: 'create',
						iconSource: 'custom',
					},
				]"
			>
			</fab-icon>
		</base-grid>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Tabs from "@components/organisms/Tabs/Tabs";
import Tab from "@components/atoms/Tab";
import FabIcon from "@components/molecules/FabIcon";
import BaseGrid from "@components/base/BaseGrid";
import EmptyState from "@components/molecules/EmptyState";
import TaskItem from "@components/molecules/TaskItem";
import TaskDraftImage from "@assets/img/courses/draft.svg";

export default {
	layout: "loggedInFull",
	components: {
		Tabs,
		Tab,
		FabIcon,
		BaseGrid,
		EmptyState,
		TaskItem,
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
