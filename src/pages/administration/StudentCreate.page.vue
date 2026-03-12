<template>
	<DefaultWireframe
		:headline="t('pages.administration.students.new.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<CreateUserForm @create-user="createStudentHandler">
			<template #inputs>
				<DatePicker
					:label="t('common.labels.birthdate')"
					data-testid="input_create-student_birthdate"
					:min-date="minDate"
					:max-date="maxDate"
					:date="date"
					@update:date="date = $event"
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
		</CreateUserForm>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import CreateUserForm from "@/components/administration/CreateUserForm.vue";
import InfoMessage from "@/components/administration/InfoMessage.vue";
import { RoleName } from "@api-server";
import { dateFromToday } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStore } from "@data-app";
import { UserCreatingData, useUsers } from "@data-users";
import { DatePicker } from "@ui-date-time-picker";
import { DefaultWireframe } from "@ui-layout";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const { createUser } = useUsers(RoleName.STUDENT);
const router = useRouter();

const date = ref<string | undefined>(undefined);
const minDate = dateFromToday(-100, "year");
const maxDate = dateFromToday(-4, "year");
const sendRegistration = ref(false);
const businessError = ref(false);
const breadcrumbs = [
	{
		title: t("pages.administration.students.index.title"),
		to: "/administration/students",
	},
	{
		title: t("pages.administration.students.new.title"),
		disabled: true,
	},
];
document.title = buildPageTitle(t("pages.administration.students.new.title"));

const createStudentHandler = async (userData: UserCreatingData) => {
	const { error } = await createUser({
		firstName: userData.firstName,
		lastName: userData.lastName,
		email: userData.email,
		birthday: date.value ? new Date(date.value) : undefined,
		roles: [RoleName.STUDENT],
		schoolId: useAppStore().school?.id ?? "",
		sendRegistration: sendRegistration.value,
	});
	if (error) {
		businessError.value = true;
		return;
	}
	router.push("/administration/students");
};
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
