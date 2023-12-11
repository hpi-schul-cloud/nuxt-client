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
				data-testid="cancel-provisioning-options"
				color="secondary"
				outlined
				@click="onCancel"
				>{{ t("common.actions.cancel") }}</v-btn
			>

			<v-btn
				class="mr-2"
				data-testid="save-provisioning-options"
				color="primary"
				depressed
				@click="onSave({ systemId }, provisioningOptions)"
				:disabled="isLoading"
				>{{ t("common.actions.save") }}</v-btn
			>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useI18n } from "../../composables/i18n.composable";
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
			isLoading.value = false;
		});

		const onSave = async (
			props: { systemId: string },
			provisioningOptions: ProvisioningOptions
		) => {
			await updateProvisioningOptionsData(props.systemId, provisioningOptions);
			await router.push({
				path: schoolSettingsPage.to,
				query: { openPanels: "authentication" },
			});
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
