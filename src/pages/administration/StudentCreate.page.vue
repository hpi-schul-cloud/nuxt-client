<template>
	<default-wireframe
		:headline="$t('pages.administration.students.new.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<form-create-user @create-user="createStudent">
			<template #inputs>
				<v-text-field
					v-model="date"
					:label="$t('common.labels.birthdate')"
					:min="minDate"
					:max="maxDate"
					data-testid="input_create-student_birthdate"
					type="date"
				></v-text-field>
				<base-input
					v-model="sendRegistration"
					type="checkbox"
					name="switch"
					class="mt--xl"
					:label="$t('pages.administration.students.new.checkbox.label')"
					data-testid="input_create-student_send-registration"
				/>
			</template>
			<template #errors>
				<info-message
					v-if="businessError"
					:message="$t('pages.administration.students.new.error')"
					type="bc-error"
				></info-message>
			</template>
		</form-create-user>
	</default-wireframe>
</template>

<script>
import FormCreateUser from "@components/organisms/FormCreateUser";
import InfoMessage from "@components/atoms/InfoMessage";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { inputRangeDate } from "@plugins/datetime";

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
			date: null,
			menu: false,
			minDate: inputRangeDate(-100, "y"),
			maxDate: inputRangeDate(-4, "y"),
			sendRegistration: false,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
				},
				{
					text: this.$t("pages.administration.students.index.title"),
					to: "/administration/students",
				},
				{
					text: this.$t("pages.administration.students.new.title"),
					to: "/administration/students/new",
					disabled: true,
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
				birthday: this.date,
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
