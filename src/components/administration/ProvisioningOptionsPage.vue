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
			inset
			dense
			data-testid="checkbox-option-class"
			class="ml-1"
		/>
		<p>
			{{
				t("components.administration.provisioningOptions.class.description", {
					instance: $theme.name,
				})
			}}
		</p>

		<v-checkbox
			:label="t('components.administration.provisioningOptions.course.label')"
			:loading="isLoading"
			v-model="provisioningOptions.course"
			inset
			dense
			data-testid="checkbox-option-course"
			class="ml-1"
		/>
		<p>
			{{
				t("components.administration.provisioningOptions.course.description", {
					instance: $theme.name,
				})
			}}
		</p>

		<v-checkbox
			:label="
				t('components.administration.provisioningOptions.otherGroups.label')
			"
			:loading="isLoading"
			v-model="provisioningOptions.others"
			inset
			dense
			data-testid="checkbox-option-others"
			class="ml-1"
		/>
		<p>
			{{
				t(
					"components.administration.provisioningOptions.otherGroups.description",
					{
						instance: $theme.name,
					}
				)
			}}
		</p>

		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				data-testid="provisioning-options-cancel-button"
				color="secondary"
				outlined
				@click="onCancel"
				>{{ t("common.actions.cancel") }}</v-btn
			>

			<v-btn
				class="mr-2"
				data-testid="provisioning-options-save-button"
				color="primary"
				depressed
				@click="onSave(provisioningOptions)"
				:disabled="isLoading"
				>{{ t("common.actions.save") }}</v-btn
			>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import {
	ProvisioningOptions,
	useProvisioningOptionsState,
} from "../data-provisioning-options";
import { useRouter } from "vue-router/composables";
import DefaultWireframe from "../templates/DefaultWireframe.vue";
import { Breadcrumb } from "../templates/default-wireframe.types";

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

		const schoolSettingsPage: Breadcrumb = {
			text: t("pages.administration.school.index.title"),
			to: "/administration/school-settings",
		};
		const breadcrumbs: Breadcrumb[] = [
			{
				text: t("pages.administration.index.title"),
				href: "/administration/",
			},
			schoolSettingsPage,
			{
				text: t("components.administration.provisioningOptions.page.title"),
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
		};
	},
});
</script>
