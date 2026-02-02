<template>
	<DefaultWireframe
		:headline="t('pages.administration.students.new.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<FormCreateUser @create-user="createStudent">
			<template #inputs>
				<VTextField
					v-model="date"
					:label="t('common.labels.birthdate')"
					:min="minDate"
					:max="maxDate"
					data-testid="input_create-student_birthdate"
					:class="{ hideCurrentDate: !date }"
					type="date"
				/>
				<VCheckbox
					v-model="sendRegistration"
					name="switch"
					class="mt-8"
					:label="t('pages.administration.students.new.checkbox.label')"
					data-testid="input_create-student_send-registration"
				/>
			</template>
			<template #errors>
				<InfoMessage v-if="businessError" :message="t('pages.administration.students.new.error')" type="bc-error" />
			</template>
		</FormCreateUser>
	</DefaultWireframe>
</template>

<script>
import FormCreateUser from "@/components/administration/FormCreateUser.vue";
import InfoMessage from "@/components/administration/InfoMessage.vue";
import { inputRangeDate } from "@/plugins/datetime";
import { RoleName } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifySuccess, useAppStore } from "@data-app";
import { DefaultWireframe } from "@ui-layout";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { mapGetters } from "vuex";

export default defineComponent({
	components: {
		FormCreateUser,
		InfoMessage,
		DefaultWireframe,
	},
	setup() {
		const { t } = useI18n();
		return { t };
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
					title: this.t("pages.administration.students.index.title"),
					to: "/administration/students",
				},
				{
					title: this.t("pages.administration.students.new.title"),
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
	mounted() {
		document.title = buildPageTitle(this.t("pages.administration.students.new.title"));
	},
	methods: {
		async createStudent(userData) {
			await this.$store.dispatch("users/createStudent", {
				firstName: userData.firstName,
				lastName: userData.lastName,
				email: userData.email,
				birthday: this.date,
				roles: [RoleName.Student],
				schoolId: useAppStore().school?.id,
				sendRegistration: this.sendRegistration,
			});
			if (!this.businessError) {
				notifySuccess(this.t("pages.administration.students.new.success"));
				this.$router.push({
					path: `/administration/students`,
				});
			}
		},
	},
});
</script>

<style lang="scss" scoped>
// hide default current date in MacOS/Safari if input date is indeed empty
:deep() {
	.hideCurrentDate {
		input[type="date"]::-webkit-datetime-edit-day-field,
		input[type="date"]::-webkit-datetime-edit-month-field,
		input[type="date"]::-webkit-datetime-edit-year-field {
			opacity: 0;
		}
	}
}
</style>
