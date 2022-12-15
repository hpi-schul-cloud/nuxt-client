<template>
	<default-wireframe
		:headline="$t('pages.administration.teachers.new.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<form-create-user role-name="teacher" @create-user="createTeacher">
			<template #inputs>
				<v-checkbox
					v-model="sendRegistration"
					name="switch"
					class="mt--xl"
					:label="$t('pages.administration.teachers.new.checkbox.label')"
				/>
			</template>
			<template #errors>
				<info-message
					v-if="error"
					:message="$t('pages.administration.teachers.new.error')"
					type="bc-error"
				></info-message>
			</template>
		</form-create-user>
	</default-wireframe>
</template>

<script>
import FormCreateUser from "@/components/organisms/FormCreateUser";
import InfoMessage from "@/components/atoms/InfoMessage";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { notifierModule } from "@/store";

export default {
	components: {
		FormCreateUser,
		InfoMessage,
		DefaultWireframe,
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
				},
				{
					text: this.$t("pages.administration.teachers.index.title"),
					to: "/administration/teachers",
				},
				{
					text: this.$t("pages.administration.teachers.new.title"),
					disabled: true,
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
					notifierModule.show({
						text: this.$t("pages.administration.teachers.new.success"),
						status: "success",
						timeout: 10000,
					});
					this.$router.push({
						path: `/administration/teachers`,
					});
				})
				.catch(() => {
					this.error = true;
				});
		},
	},
	mounted() {
		document.title = `${this.$t("pages.administration.teachers.new.title")} - ${
			this.$theme.short_name
		}`;
	},
};
</script>
