<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.new.title") }}
		</h1>
		<form-create-user @create-user="createStudent">
			<template v-slot:inputs>
				<base-input
					v-model="birthday"
					type="date"
					:label="$t('common.labels.birthdate')"
					:placeholder="$t('common.placeholder.birthdate')"
					class="mt--md"
					:birth-date="true"
					data-testid="input_create-student_birthdate"
				>
				</base-input>
				<base-input
					v-model="sendRegistration"
					type="checkbox"
					name="switch"
					class="mt--xl"
					:label="$t('pages.administration.students.new.checkbox.label')"
					data-testid="input_create-student_send-registration"
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
		requiredPermissions: ["STUDENT_CREATE"],
	},
	data() {
		return {
			error: false,
			birthday: null,
			sendRegistration: false,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.students.index.title"),
					to: "/administration/students",
				},
				{
					text: this.$t("pages.administration.students.new.title"),
					to: "/administration/students/new",
				},
			],
		};
	},
	methods: {
		createStudent(userData) {
			this.error = false;
			this.$store
				.dispatch("users/createStudent", {
					firstName: userData.firstName,
					lastName: userData.lastName,
					email: userData.email,
					birthday: this.birthday,
					roles: ["student"],
					schoolId: this.$user.schoolId,
					sendRegistration: this.sendRegistration,
				})
				.then(() => {
					this.$toast.success(
						this.$t("pages.administration.students.new.success")
					);
					this.$router.push({
						path: `/administration/students`,
					});
				})
				.catch(() => {
					this.error = true;
				});
		},
	},
};
</script>
