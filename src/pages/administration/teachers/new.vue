<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.teachers.new.title") }}
		</h1>
		<form-create-user role-name="teacher" @create-user="createTeacher">
			<template v-slot:inputs>
				<base-input
					v-model="sendRegistration"
					type="checkbox"
					name="switch"
					class="mt--xl"
					:label="$t('pages.administration.teachers.new.checkbox.label')"
				/>
			</template>
			<template v-slot:errors>
				<info-message
					v-if="error"
					:message="$t('pages.administration.students.new.error')"
					type="error"
				></info-message>
			</template>
		</form-create-user>
	</section>
</template>

<script>
import FormCreateUser from "@components/organisms/FormCreateUser";
import InfoMessage from "@components/atoms/InfoMessage";

export default {
	components: {
		FormCreateUser,
		InfoMessage,
	},
	meta: {
		requiredPermissions: ["TEACHER_CREATE"],
	},
	data() {
		return {
			error: false,
			sendRegistration: false,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.teachers.index.title"),
					to: "/administration/teachers",
				},
				{
					text: this.$t("pages.administration.teachers.new.title"),
				},
			],
		};
	},
	methods: {
		createTeacher(teacherData) {
			this.error = false;
			this.$store
				.dispatch("users/createTeacher", {
					firstName: teacherData.firstName,
					lastName: teacherData.lastName,
					email: teacherData.email,
					roles: ["teacher"],
					schoolId: this.$user.schoolId,
					sendRegistration: this.sendRegistration,
					generateRegistrationLink: true,
				})
				.then(() => {
					this.$toast.success(
						this.$t("pages.administration.teachers.new.success")
					);
					this.$router.push({
						path: `/administration/teachers`,
					});
				})
				.catch(() => {
					this.error = true;
				});
		},
	},
};
</script>
