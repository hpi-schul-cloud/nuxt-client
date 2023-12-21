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

		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				data-testid="provisioning-options-cancel-button"
				color="secondary"
				variant="outlined"
				@click="onCancel"
				>{{ t("common.actions.cancel") }}</v-btn
			>

			<v-btn
				class="mr-2"
				data-testid="provisioning-options-save-button"
				color="primary"
				variant="flat"
				@click="onSave(provisioningOptions)"
				:disabled="isLoading"
				>{{ t("common.actions.save") }}</v-btn
			>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import {
	ProvisioningOptions,
	useProvisioningOptionsState,
} from "../data-provisioning-options";
import { useRouter } from "vue-router";
import DefaultWireframe from "../templates/DefaultWireframe.vue";
import { Breadcrumb } from "../templates/default-wireframe.types";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import themeConfig from "@/theme.config";

export default defineComponent({
	name: "ProvisioningOptionsPage",
	components: { DefaultWireframe },
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

		onMounted(async () => {
			await fetchProvisioningOptionsData(props.systemId);
		});

		const onSave = async (provisioningOptions: ProvisioningOptions) => {
			await updateProvisioningOptionsData(props.systemId, provisioningOptions);
			if (!error.value) {
				await router.push({
					path: schoolSettingsPage.to,
					query: { openPanels: "authentication" },
				});
			}
		};

		const onCancel = async () => {
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
			onSave,
			onCancel,
			themeName: themeConfig.name,
		};
	},
});
</script>