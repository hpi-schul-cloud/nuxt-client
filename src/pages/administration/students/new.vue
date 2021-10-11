<template>
	<default-wireframe
		:headline="$t('pages.administration.students.new.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<form-create-user @create-user="createStudent">
			<template v-slot:inputs>
				<v-menu
					ref="menu"
					v-model="menu"
					:close-on-content-click="false"
					:return-value.sync="date"
					transition="scale-transition"
					offset-y
					min-width="auto"
					data-testid="input_create-student_birthdate"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="dateFomatted"
							:label="$t('common.labels.birthdate')"
							:hint="$t('common.placeholder.birthdate')"
							append-icon="fa-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="date"
						:min="minDate"
						:max="maxDate"
						:show-current="maxDate"
						:locale="language"
						no-title
						scrollable
					>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
						<v-btn text color="primary" @click="$refs.menu.save(date)">
							OK
						</v-btn>
					</v-date-picker>
				</v-menu>
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
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { printDate, inputRangeDate } from "@plugins/datetime";

import AuthModule from "@/store/auth";
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
		language: () => AuthModule.getLocale,
		dateFomatted() {
			return this.date ? printDate(this.date) : this.date;
		},
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
				birthday: this.dateFomatted,
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
