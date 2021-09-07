<template>
	<default-wireframe
		:headline="$t('pages.administration.students.new.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
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
					v-if="businessError"
					:message="$t('pages.administration.students.new.error')"
					type="error"
				></info-message>
			</template>
		</form-create-user>
	</default-wireframe>
</template>

<script>
import FormCreateUser from "@components/organisms/FormCreateUser";
import InfoMessage from "@components/atoms/InfoMessage";
import DefaultWireframe from "@components/molecules/DefaultWireframe.vue";

import { mapGetters } from "vuex";

export default {
	components: {
		FormCreateUser,
		InfoMessage,
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	meta: {
		requiredPermissions: ["STUDENT_CREATE"],
	},
	data() {
		return {
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
	computed: {
		...mapGetters("users", {
			businessError: "getBusinessError",
		}),
	},
	created() {
		this.$store.commit("users/resetBusinessError");
	},
	methods: {
		createStudent(userData) {
			this.$store.dispatch("users/createStudent", {
				firstName: userData.firstName,
				lastName: userData.lastName,
				email: userData.email,
				birthday: this.birthday,
				roles: ["student"],
				schoolId: this.$user.schoolId,
				sendRegistration: this.sendRegistration,
				successMessage: this.$t("pages.administration.students.new.success"),
			});
		},
	},
	head() {
		return {
			title: `${this.$t("pages.administration.students.new.title")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>
