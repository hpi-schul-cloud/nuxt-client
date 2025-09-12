<template>
	<DefaultWireframe
		:headline="$t('components.administration.provisioningOptions.page.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<VSkeletonLoader :loading="isLoading" type="list-item-two-line@4">
			<div class="d-flex flex-column ga-9">
				<div>
					<VCheckboxBtn
						v-model="provisioningOptions.class"
						color="primary"
						:label="
							$t('components.administration.provisioningOptions.class.label')
						"
						data-testid="checkbox-option-class"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							$t(
								"components.administration.provisioningOptions.class.description",
								{
									instance: theme.name,
								}
							)
						}}
					</div>
				</div>

				<div>
					<VCheckboxBtn
						v-model="provisioningOptions.course"
						color="primary"
						:label="
							$t('components.administration.provisioningOptions.course.label')
						"
						data-testid="checkbox-option-course"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							$t(
								"components.administration.provisioningOptions.course.description",
								{
									instance: theme.name,
								}
							)
						}}
					</div>
				</div>

				<div>
					<VCheckboxBtn
						v-model="provisioningOptions.others"
						color="primary"
						:label="
							$t(
								'components.administration.provisioningOptions.otherGroups.label'
							)
						"
						data-testid="checkbox-option-others"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							$t(
								"components.administration.provisioningOptions.otherGroups.description",
								{
									instance: theme.name,
								}
							)
						}}
					</div>
				</div>

				<div v-if="isMediaLicensingEnabled">
					<VCheckboxBtn
						v-model="provisioningOptions.schoolExternalTools"
						color="primary"
						:label="
							$t(
								'components.administration.provisioningOptions.schoolExternalTools.label'
							)
						"
						data-testid="checkbox-option-school-external-tools"
					/>
					<div class="ml-10 text-body-2 text-medium-emphasis">
						{{
							$t(
								"components.administration.provisioningOptions.schoolExternalTools.description",
								{
									instance: theme.name,
								}
							)
						}}
					</div>
				</div>
			</div>
		</VSkeletonLoader>

		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				data-testid="provisioning-options-cancel-button"
				variant="outlined"
				@click="onCancel"
			>
				{{ t("common.actions.cancel") }}
			</v-btn>

			<v-btn
				class="mr-2"
				data-testid="provisioning-options-save-button"
				color="primary"
				variant="flat"
				:disabled="isLoading"
				@click="onSaveButtonClick"
			>
				{{ t("common.actions.save") }}
			</v-btn>
		</v-row>

		<v-custom-dialog
			:is-open="isWarningDialogOpen"
			:has-buttons="true"
			:buttons="['cancel', 'confirm']"
			data-testId="warning-dialog"
			@dialog-closed="isWarningDialogOpen = false"
			@dialog-confirmed="saveOptions"
		>
			<template #title>
				<h2 class="text-h4 my-2">
					{{ t("components.administration.provisioningOptions.warning.title") }}
				</h2>
			</template>
			<template #content>
				<span class="text-md mt-2">
					{{
						t(
							"components.administration.provisioningOptions.warning.question",
							{
								groupTypes: newlyTurnedOffOptions
									.map(translateProvisioningOption)
									.join(", "),
							}
						)
					}}
				</span>
				<v-alert type="warning" class="mt-4 mb-0">
					{{
						t(
							"components.administration.provisioningOptions.warning.consequence",
							{
								groupTypes: newlyTurnedOffOptions
									.map(translateProvisioningOption)
									.join(", "),
							}
						)
					}}
				</v-alert>
			</template>
		</v-custom-dialog>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/common/vCustomDialog.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ENV_CONFIG_MODULE_KEY, injectStrict, THEME_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	ProvisioningOptions,
	ProvisioningOptionsEnum,
	useProvisioningOptionsState,
} from "@data-provisioning-options";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

type Props = {
	systemId: string;
};

const props = defineProps<Props>();

const provisioningOptionTranslations = {
	[ProvisioningOptionsEnum.COURSE]: "common.words.courses",
	[ProvisioningOptionsEnum.CLASS]: "common.words.classes",
	[ProvisioningOptionsEnum.OTHERS]: "common.words.otherGroups",
	[ProvisioningOptionsEnum.SCHOOL_EXTERNAL_TOOLS]: "common.words.externalTools",
};

const { t } = useI18n();
const {
	fetchProvisioningOptionsData,
	updateProvisioningOptionsData,
	provisioningOptionsData,
	isLoading,
	error,
} = useProvisioningOptionsState();
const router = useRouter();
const theme = injectStrict(THEME_KEY);

const pageTitle = buildPageTitle(
	t("components.administration.provisioningOptions.page.title")
);
useTitle(pageTitle);

const schoolSettingsPage: Breadcrumb = {
	title: t("pages.administration.school.index.title"),
	to: "/administration/school-settings",
};
const breadcrumbs: Breadcrumb[] = [
	{
		title: t("pages.administration.index.title"),
		disabled: true,
	},
	schoolSettingsPage,
	{
		title: t("components.administration.provisioningOptions.page.title"),
		disabled: true,
	},
];

const provisioningOptions: ComputedRef<ProvisioningOptions> = computed(
	() => provisioningOptionsData.value
);

const initialProvisioningOptions: Ref<ProvisioningOptions> = ref({
	...provisioningOptionsData.value,
});

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const isMediaLicensingEnabled =
	envConfigModule.getEnv.FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED;

const wasOptionTurnedOff = (
	provisioningOption: ProvisioningOptionsEnum
): boolean => {
	const wasTurnedOff =
		initialProvisioningOptions.value[provisioningOption] &&
		!provisioningOptions.value[provisioningOption];

	return wasTurnedOff;
};

const newlyTurnedOffOptions: ComputedRef<ProvisioningOptionsEnum[]> = computed(
	() => {
		const options: ProvisioningOptionsEnum[] = Object.values(
			ProvisioningOptionsEnum
		);

		return options.filter((option: ProvisioningOptionsEnum): boolean =>
			wasOptionTurnedOff(option)
		);
	}
);

const translateProvisioningOption = (option: ProvisioningOptionsEnum) => {
	if (option === ProvisioningOptionsEnum.SCHOOL_EXTERNAL_TOOLS) {
		return;
	}
	return t(provisioningOptionTranslations[option]);
};

const isWarningDialogOpen: Ref<boolean> = ref(false);

onMounted(async () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
	await fetchProvisioningOptionsData(props.systemId);

	initialProvisioningOptions.value = { ...provisioningOptionsData.value };
});

const onSaveButtonClick = async () => {
	if (newlyTurnedOffOptions.value.length) {
		if (
			newlyTurnedOffOptions.value.length === 1 &&
			newlyTurnedOffOptions.value[0] ===
				ProvisioningOptionsEnum.SCHOOL_EXTERNAL_TOOLS
		) {
			await saveOptions();
		}

		isWarningDialogOpen.value = true;
	} else {
		await saveOptions();
	}
};

const saveOptions = async () => {
	await updateProvisioningOptionsData(
		props.systemId,
		provisioningOptions.value
	);

	if (!error.value) {
		await redirectToAdminPage();
	}
};

const onCancel = async () => {
	await redirectToAdminPage();
};

const redirectToAdminPage = async () => {
	await router.push({
		path: schoolSettingsPage.to,
		query: { openPanels: "authentication" },
	});
};
</script>
