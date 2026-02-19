<template>
	<default-wireframe
		:headline="t('pages.administration.teachers.new.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<FormCreateUser role-name="teacher" @create-user="createTeacherHandler">
			<template #inputs>
				<VCheckbox
					v-model="sendRegistration"
					name="switch"
					class="mt-8"
					:label="t('pages.administration.teachers.new.checkbox.label')"
				/>
			</template>
			<template #errors>
				<InfoMessage v-if="businessError" :message="t('pages.administration.teachers.new.error')" type="bc-error" />
			</template>
		</FormCreateUser>
	</default-wireframe>
</template>

<script setup lang="ts">
import FormCreateUser from "@/components/administration/FormCreateUser.vue";
import InfoMessage from "@/components/administration/InfoMessage.vue";
import { RoleName } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStore } from "@data-app";
import { UserCreatingData, useUsers } from "@data-users";
import { DefaultWireframe } from "@ui-layout";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const { createUser } = useUsers(RoleName.Teacher);

const businessError = ref(false);
const router = useRouter();
const sendRegistration = ref(false);
const breadcrumbs = [
	{
		title: t("pages.administration.teachers.index.title"),
		to: "/administration/teachers",
	},
	{
		title: t("pages.administration.teachers.new.title"),
		disabled: true,
	},
];
document.title = buildPageTitle(t("pages.administration.teachers.new.title"));

const createTeacherHandler = async (teacherData: UserCreatingData) => {
	const { error } = await createUser({
		firstName: teacherData.firstName,
		lastName: teacherData.lastName,
		email: teacherData.email,
		roles: [RoleName.Teacher],
		schoolId: useAppStore().school?.id ?? "",
		sendRegistration: sendRegistration.value,
		generateRegistrationLink: true,
	});
	if (error) {
		businessError.value = true;
	}
	router.push("/administration/teachers");
};
</script>
