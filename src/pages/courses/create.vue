<template>
	<div v-if="course">
		<course-wizard
			:steps="stepList"
			:course="course"
			:user="user"
			:teachers="teachers"
			:classes="classes"
			:students="students"
			@course-creation-submit="create"
		/>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CourseWizard from "@components/CourseWizard";

export default {
	components: { CourseWizard },
	data() {
		return {
			stepList: [
				{ name: "Kursdaten" },
				{ name: "Kurs-Mitglieder" },
				{ name: "Abschließen" },
			],
			course: {},
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

			const queryTeachers = {
				roles: [teacherRole._id],
			};
			const teachers = (await store.dispatch("users/find", {
				query: queryTeachers,
			})).data;

			const queryStudents = {
				roles: [studentsRole._id],
			};
			const students = (await store.dispatch("users/find", {
				query: {}, // queryStudents,
			})).data;

			await store.dispatch("classes/find");

			return {
				teachers,
				students,
			};
		} catch (err) {}
	},
	created() {
		const { Course } = this.$FeathersVuex;
		this.course = new Course({
			schoolId: this.user.schoolId,
		});
	},
	methods: {
		async create(id) {
			const course = this.course;

			course.times = this.course.times.map((time) => {
				let [startHours, startMinutes] = time.startTime.split(":");
				startMinutes = startMinutes * 60 * 1000;
				startHours = startHours * 60 * 60 * 1000;
				time.startTime = startHours + startMinutes;
				time.duration = (time.duration * 60 * 1000).toString();
				time.weekday = time.weekday.value;
				return time;
			});

			(course.teacherIds = course.teachers),
				(course.substitutionIds = course.substitutions),
				(course.classIds = course.classes),
				(course.userIds = course.students);

			try {
				await course.create();
				this.$toast.success("Kurs erstellt");
			} catch (e) {
				console.error(e);
				this.$toast.error("Fehler beim Erstellen");
			}

			this.$router.push({ name: "courses" });
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
