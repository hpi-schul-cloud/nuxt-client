<template>
	<default-wireframe
		:headline="t('components.administration.provisioningOptions.page.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<v-checkbox
			:label="t('components.administration.provisioningOptions.class.label')"
			:loading="isLoading"
			v-model="provisioningOptions.class"
			data-testid="checkbox-option-class"
			class="ml-1"
		/>
		<p>
			{{
				t("components.administration.provisioningOptions.class.description", {
					instance: themeName,
				})
			}}
		</p>

		<v-checkbox
			:label="t('components.administration.provisioningOptions.course.label')"
			:loading="isLoading"
			v-model="provisioningOptions.course"
			data-testid="checkbox-option-course"
			class="ml-1"
		/>
		<p>
			{{
				t("components.administration.provisioningOptions.course.description", {
					instance: themeName,
				})
			}}
		</p>

		<v-checkbox
			:label="
				t('components.administration.provisioningOptions.otherGroups.label')
			"
			:loading="isLoading"
			v-model="provisioningOptions.others"
			data-testid="checkbox-option-others"
			class="ml-1"
		/>
		<p>
			{{
				t(
					"components.administration.provisioningOptions.otherGroups.description",
					{
						instance: themeName,
					}
				)
			}}
		</p>
		<!-- possible check for feature flag-->
		<v-checkbox
			:label="t('components.administration.provisioningOptions.ctlTool.label')"
			:loading="isLoading"
			v-model="provisioningOptions.ctltool"
			data-testid="checkbox-option-ctlTool"
			class="ml-1"
		/>
		<p>
			{{
				t("components.administration.provisioningOptions.ctlTool.description", {
					instance: themeName,
				})
			}}
		</p>

		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				data-testid="provisioning-options-cancel-button"
				variant="outlined"
				@click="onCancel"
				>{{ t("common.actions.cancel") }}</v-btn
			>

			<v-btn
				class="mr-2"
				data-testid="provisioning-options-save-button"
				color="primary"
				variant="flat"
				@click="onSaveButtonClick"
				:disabled="isLoading"
				>{{ t("common.actions.save") }}</v-btn
			>
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
	</default-wireframe>
</template>

<script lang="ts">
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import { useI18n } from "vue-i18n";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	ProvisioningOptions,
	ProvisioningOptionsEnum,
	useProvisioningOptionsState,
} from "@data-provisioning-options";
import { useTitle } from "@vueuse/core";
import { useRouter } from "vue-router";
import VCustomDialog from "../organisms/vCustomDialog.vue";
import { Breadcrumb } from "../templates/default-wireframe.types";
import DefaultWireframe from "../templates/DefaultWireframe.vue";
import themeConfig from "@/theme.config";

const provisioningOptionTranslations = {
	[ProvisioningOptionsEnum.COURSE]: "common.words.courses",
	[ProvisioningOptionsEnum.CLASS]: "common.words.classes",
	[ProvisioningOptionsEnum.OTHERS]: "common.words.otherGroups",
	[ProvisioningOptionsEnum.CTLTOOL]: "common.words.ctlTool",
};

export default defineComponent({
	name: "ProvisioningOptionsPage",
	components: { VCustomDialog, DefaultWireframe },
	props: {
		systemId: { type: String, required: true },
	},
	setup(props) {
		const { t } = useI18n();
		const {
			fetchProvisioningOptionsData,
			updateProvisioningOptionsData,
			provisioningOptionsData,
			isLoading,
			error,
		} = useProvisioningOptionsState();
		const router = useRouter();

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
				href: "/administration/",
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

		const wasOptionTurnedOff = (
			provisioningOption: ProvisioningOptionsEnum
		): boolean => {
			const wasTurnedOff =
				initialProvisioningOptions.value[provisioningOption] &&
				!provisioningOptions.value[provisioningOption];

			return wasTurnedOff;
		};

		const newlyTurnedOffOptions: ComputedRef<ProvisioningOptionsEnum[]> =
			computed(() => {
				const options: ProvisioningOptionsEnum[] = Object.values(
					ProvisioningOptionsEnum
				);

				return options.filter((option: ProvisioningOptionsEnum): boolean =>
					wasOptionTurnedOff(option)
				);
			});

		const translateProvisioningOption = (option: ProvisioningOptionsEnum) => {
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

		return {
			t,
			isLoading,
			breadcrumbs,
			provisioningOptions,
			isWarningDialogOpen,
			saveOptions,
			onCancel,
			themeName: themeConfig.name,
			onSaveButtonClick,
			newlyTurnedOffOptions,
			translateProvisioningOption,
		};
	},
});
</script>
