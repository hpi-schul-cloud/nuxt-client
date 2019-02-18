<template>
	<div v-if="course" class="root">
		<TemplateCourseWizard
			:steps="stepList"
			:course="course"
			:user="user"
			:teachers="teachers"
			:classes="classes"
			:students="students"
			@course-creation-submit="create()"
		/>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TemplateCourseWizard from "@components/TemplateCourseWizard";

var moment = require('moment');


export default {
	components: { TemplateCourseWizard },
	async asyncData({ store }) {
		try {
			const teacherRole = (await store.dispatch("roles/find", {
				query: {
					name: "teacher",
				},
			})).data[0];

			const studentsRole = (await store.dispatch("roles/find", {
				query: {
					name: "student",
				},
			})).data[0];

			const query = {
				roles: [teacherRole._id],
			};
			const teachers = (await store.dispatch("users/find", { query })).data;

			const query2 = {
				roles: [studentsRole._id],
			};
			const students = (await store.dispatch("users/find", { query: query2 }))
				.data;

			await store.dispatch("classes/find");

			return {
				teachers,
				students,
			};
		} catch (err) {}
	},
	data() {
		return {
			stepList: [
				{ name: "Kurs anlegen" },
				{ name: "Kurs-Mitglieder" },
				{ name: "Abschließen" },
			],
			course: {
				name: "",
				description: "",
				startDate: "",
				untilDate: "",
				teachers: [],
				substitutions: [],
				classes: [],
				students: [],
				times: []
			},
			moment: moment,
		};
	},
	computed: {
		...mapState("auth", {
			user: "user",
		}),
		...mapGetters("classes", {
			classes: "list",
		}),
	},
	methods: {
		async create(id) {
			try {
				const course = await this.$store.dispatch("courses/create", {
					schoolId: this.user.schoolId,
					name: this.course.name,
					description: this.course.description,
					startDate: this.course.startDate,
					untilDate: this.course.untilDate,
					times: this.course.times.map((time) => {
						time.startTime = moment.duration(time.startTime, "HH:mm").asMilliseconds().toString();
						time.duration = (time.duration * 60 * 1000).toString();
						time.weekday = time.weekday.value;
						return time;
					}),
					teacherIds: this.course.teachers,
					substitutionIds: this.course.substitutions,
					classIds: this.course.classes,
					userIds: this.course.students,
				});

				this.$router.push({ name: "courses" });
			} catch (e) {}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

	.root{
	  max-width: $size-content-width-max;
		min-width: $size-content-width-min;
		margin: 0 auto;
	}
</style>
