<template>
	<default-wireframe
		:headline="$t('pages.administration.teachers.new.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<form-create-user role-name="teacher" @create-user="createTeacher">
			<template #inputs>
				<v-checkbox
					v-model="sendRegistration"
					name="switch"
					class="mt-8"
					:label="$t('pages.administration.teachers.new.checkbox.label')"
				/>
			</template>
			<template #errors>
				<info-message
					v-if="error"
					:message="$t('pages.administration.teachers.new.error')"
					type="bc-error"
				/>
			</template>
		</form-create-user>
	</default-wireframe>
</template>

<script>
import FormCreateUser from "@/components/organisms/FormCreateUser";
import InfoMessage from "@/components/atoms/InfoMessage";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { notifierModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { RoleName } from "@/serverApi/v3";
import { useAppStore } from "@data-app";

export default {
	components: {
		FormCreateUser,
		InfoMessage,
		DefaultWireframe,
	},
	data() {
		return {
			error: false,
			sendRegistration: false,
			breadcrumbs: [
				{
					title: this.$t("pages.administration.teachers.index.title"),
					to: "/administration/teachers",
				},
				{
					title: this.$t("pages.administration.teachers.new.title"),
					disabled: true,
				},
			],
		};
	},
	mounted() {
		document.title = buildPageTitle(
			this.$t("pages.administration.teachers.new.title")
		);
	},
	methods: {
		createTeacher(teacherData) {
			this.error = false;
			this.$store
				.dispatch("users/createTeacher", {
					firstName: teacherData.firstName,
					lastName: teacherData.lastName,
					email: teacherData.email,
					roles: [RoleName.Teacher],
					schoolId: useAppStore().school?.id,
					sendRegistration: this.sendRegistration,
					generateRegistrationLink: true,
				})
				.then(() => {
					notifierModule.show({
						text: this.$t("pages.administration.teachers.new.success"),
						status: "success",
						timeout: 5000,
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
};
</script>
