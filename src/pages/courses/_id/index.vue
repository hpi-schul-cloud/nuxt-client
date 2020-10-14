<template>
	<div v-if="course">
		<section class="section">
			<h1 class="h2">{{ course.name }}</h1>
			<tabs>
				<tab
					:name="$t('pages.courses._id.educational_content')"
					icon-name="fa fa-book"
					:selected="true"
				>
					<div v-for="(content, idx) in courseContents" :key="idx">
						{{ idx }}. {{ content.type }} {{ content.name }}
					</div>
					<fab-floating
						:show-label="true"
						:actions="[
							{
								label: 'Thema',
								icon: 'create',
							},
							{
								label: 'Editor-Document',
								icon: 'create',
							},
							{
								label: 'Aufgabe',
								icon: 'create',
							},
						]"
					>
					</fab-floating>
				</tab>
				<tab name="Tools">Tools</tab>
				<tab name="Groups">Groups</tab>
			</tabs>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Tabs from "@components/organisms/Tabs/Tabs";
import Tab from "@components/atoms/Tab";
import FabFloating from "@components/molecules/FabFloating";

export default {
	layout: "loggedInFull",
	components: {
		Tabs,
		Tab,
		FabFloating,
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
			const lessons = store.getters["lessons/list"];
			lessons.forEach((lesson) => (lesson.type = "lesson"));
			const homeworks = store.getters["homeworks/list"];
			homeworks.forEach((homework) => (homework.type = "homework"));
			return [...lessons, ...homeworks];
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
