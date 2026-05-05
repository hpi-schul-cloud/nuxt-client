<template>
	<DefaultWireframe
		:headline="t('components.administration.provisioningOptions.page.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<VSkeletonLoader :loading="isLoadingSchoolData" type="list-item-two-line@4">
			<div v-if="targetOptions" class="d-flex flex-column ga-9">
				<div>
					<VCheckboxBtn
						v-model="targetOptions.groupProvisioningClassesEnabled"
						color="primary"
						:label="t('components.administration.provisioningOptions.class.label')"
						data-testid="checkbox-option-class"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							t("components.administration.provisioningOptions.class.description", {
								instance: instanceName,
							})
						}}
					</div>
				</div>

				<div>
					<VCheckboxBtn
						v-model="targetOptions.groupProvisioningCoursesEnabled"
						color="primary"
						:label="t('components.administration.provisioningOptions.course.label')"
						data-testid="checkbox-option-course"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							t("components.administration.provisioningOptions.course.description", {
								instance: instanceName,
							})
						}}
					</div>
				</div>

				<div>
					<VCheckboxBtn
						v-model="targetOptions.groupProvisioningOtherEnabled"
						color="primary"
						:label="t('components.administration.provisioningOptions.otherGroups.label')"
						data-testid="checkbox-option-others"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							t("components.administration.provisioningOptions.otherGroups.description", {
								instance: instanceName,
							})
						}}
					</div>
				</div>

				<div v-if="isMediaLicensingEnabled">
					<VCheckboxBtn
						v-model="targetOptions.schoolExternalToolProvisioningEnabled"
						color="primary"
						:label="t('components.administration.provisioningOptions.schoolExternalTools.label')"
						data-testid="checkbox-option-school-external-tools"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							t("components.administration.provisioningOptions.schoolExternalTools.description", {
								instance: instanceName,
							})
						}}
					</div>
				</div>
			</div>
		</VSkeletonLoader>

		<VRow class="justify-end mt-10">
			<VBtn class="mr-2" data-testid="provisioning-options-cancel-button" variant="outlined" @click="onCancel">
				{{ t("common.actions.cancel") }}
			</VBtn>

			<VBtn
				class="mr-2"
				data-testid="provisioning-options-save-button"
				color="primary"
				variant="flat"
				:disabled="isLoadingSchoolData"
				@click="onSaveButtonClick"
			>
				{{ t("common.actions.save") }}
			</VBtn>
		</VRow>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { SchulConneXProvisioningOptionsResponse } from "@api-server";
import { useSchoolStore } from "@data-app";
import { useEnvConfig, useEnvStore } from "@data-env";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps<{
	systemId: string;
}>();

const currentOptions = ref<SchulConneXProvisioningOptionsResponse>();
const targetOptions = ref<SchulConneXProvisioningOptionsResponse>();

const { t } = useI18n();
const { isLoadingSchoolData, fetchProvisioningOptions, setProvisioningOptions } = useSchoolStore();
const router = useRouter();
const { instanceName } = storeToRefs(useEnvStore());

const pageTitle = buildPageTitle(t("components.administration.provisioningOptions.page.title"));
useTitle(pageTitle);
const breadcrumbs = computed<Breadcrumb[]>(() => [
	{
		title: t("pages.administration.school.index.title"),
		to: "/administration/school-settings",
	},
	{
		title: t("components.administration.provisioningOptions.page.title"),
		disabled: true,
	},
]);

const isMediaLicensingEnabled = computed(() => useEnvConfig().value.FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED);

type ProvisioningOptionKey = keyof SchulConneXProvisioningOptionsResponse;

const GROUP_OPTION_LABELS: Partial<Record<ProvisioningOptionKey, string>> = {
	groupProvisioningClassesEnabled: t("common.words.classes"),
	groupProvisioningCoursesEnabled: t("common.words.courses"),
	groupProvisioningOtherEnabled: t("common.words.otherGroups"),
};

const justDisabledGroupOptions = computed(() => {
	if (!currentOptions.value || !targetOptions.value) return [];

	return (Object.keys(currentOptions.value) as ProvisioningOptionKey[])
		.filter((key) => currentOptions.value![key] && !targetOptions.value![key])
		.flatMap((key) => GROUP_OPTION_LABELS[key] ?? []);
});

onMounted(async () => {
	const { result, success } = await fetchProvisioningOptions(props.systemId);
	if (success && result?.data) {
		currentOptions.value = { ...result.data };
		targetOptions.value = { ...result.data };
	} else {
		targetOptions.value = {
			groupProvisioningClassesEnabled: true,
			groupProvisioningCoursesEnabled: false,
			groupProvisioningOtherEnabled: false,
			schoolExternalToolProvisioningEnabled: false,
		};
	}
});

const onSaveButtonClick = async () => {
	const turnedOffLabels = justDisabledGroupOptions.value;

	if (!turnedOffLabels.length) {
		await saveOptions();
		return;
	}

	const isConfirmed = await askConfirmation({
		title: "components.administration.provisioningOptions.warning.title",
		message: t("components.administration.provisioningOptions.warning", {
			groupTypes: turnedOffLabels.join(", "),
		}),
		messageType: "warning",
	});

	if (isConfirmed) {
		await saveOptions();
	}
};

const saveOptions = async () => {
	if (targetOptions.value) {
		const { success } = await setProvisioningOptions(props.systemId, targetOptions.value);

		if (success) {
			await redirectToAdminPage();
		}
	}
};

const onCancel = async () => {
	await redirectToAdminPage();
};

const redirectToAdminPage = async () => {
	await router.push({
		path: "/administration/school-settings",
		query: { openPanels: "authentication" },
	});
};
</script>
