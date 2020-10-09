<template>
	<div v-if="course">
		<<<<<<< HEAD
		<base-grid>
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
							{{ idx }}. {{ content.type }} {{ content.name }}
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
						label: 'Thema',
						icon: 'create',
						iconSource: 'custom',
					},
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
		=======
		<section class="section">
			<!-- <base-breadcrumb :inputs="breadcrumbs" /> -->
			<h1 class="h2">{{ course.name }}</h1>
			<p>Amount of homeworks found: {{ homeworks.length }}</p>
			<div v-for="(homework, index) in homeworks" :key="index">
				{{ homework.name }}
			</div>
			<p>Amount of lessons found: {{ lessons.length }}</p>
		</section>
		>>>>>>> 44cfb8fa... some work
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Tabs from "@components/organisms/Tabs/Tabs";
import Tab from "@components/atoms/Tab";
import FabIcon from "@components/molecules/FabIcon";
import BaseGrid from "@components/base/BaseGrid";
import EmptyState from "@components/molecules/EmptyState";

export default {
	layout: "loggedInFull",
	components: {
		Tabs,
		Tab,
		FabIcon,
		BaseGrid,
		EmptyState,
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
			// const store = this.$store;
			// const lessons = store.getters["lessons/list"];
			// lessons.forEach((lesson) => (lesson.type = "lesson"));
			// const homeworks = store.getters["homeworks/list"];
			// homeworks.forEach((homework) => (homework.type = "homework"));
			// return [...lessons, ...homeworks];
			return [];
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
