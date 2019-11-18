<template>
	<div v-if="course">
		<course-wizard
			:steps="stepList"
			:course="course"
			:user="$user"
			:teachers="teachers"
			:classes="classes"
			:students="students"
			@course-creation-submit="create"
		/>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CourseWizard from "@components/organisms/CourseWizard";

export default {
	components: { CourseWizard },
	async asyncData({ store }) {
		try {
			const teacherRole = (await store.dispatch("roles/find", {
				query: {
					name: "teacher",
				},
			})).data[0];
			const teachers = await store.dispatch("users/getByRole", teacherRole);

			const studentsRole = (await store.dispatch("roles/find", {
				query: {
					name: "student",
				},
			})).data[0];
			const students = await store.dispatch("users/getByRole", studentsRole);

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
				{ name: "Kursdaten" },
				{ name: "Kurs-Mitglieder" },
				{ name: "Abschließen" },
			],
			course: {
				name: "",
				description: "",
				startDate: "",
				untilDate: "",
				times: [],
				teacherIds: [],
				substitutionIds: [],
				userIds: [],
				classIds: [],
			},
		};
	},
	computed: {
		...mapGetters("classes", {
			classes: "list",
		}),
	},
	created() {
		this.course.schoolId = this.$user.schoolId;
	},
	methods: {
		async create() {
			const { course } = this;

			try {
				await this.$store.dispatch("courses/create", course);
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
