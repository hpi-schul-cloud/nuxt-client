<template>
	<DefaultWireframe
		:headline="t('pages.administration.students.new.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<FormCreateUser @create-user="createStudentHandler">
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

<script setup lang="ts">
import FormCreateUser from "@/components/administration/FormCreateUser.vue";
import InfoMessage from "@/components/administration/InfoMessage.vue";
import { inputRangeDate } from "@/plugins/datetime";
import { RoleName } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStore } from "@data-app";
import { UserCreatingData, useUsers } from "@data-users";
import { DefaultWireframe } from "@ui-layout";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const { createUser } = useUsers(RoleName.Student);
const router = useRouter();

const date = ref<Date | undefined>(undefined);
const minDate = inputRangeDate(-100, "y");
const maxDate = inputRangeDate(-4, "y");
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
		birthday: date?.value,
		roles: [RoleName.Student],
		schoolId: useAppStore().school?.id,
		sendRegistration: sendRegistration.value,
	});
	if (error) {
		businessError.value = true;
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
