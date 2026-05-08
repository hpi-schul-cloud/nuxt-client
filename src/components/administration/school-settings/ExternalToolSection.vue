<template>
	<div class="mb-4">
		<p class="mb-6">
			{{ t("components.administration.externalToolsSection.info") }}
		</p>
		<VDataTable
			data-testid="external-tool-section-table"
			:items="items"
			:headers="getHeaders"
			:loading="isLoading"
			:loading-text="t('common.loading.text')"
			:no-data-text="t('common.nodata')"
		>
			<template #[`item.name`]="{ item }">
				<span data-testid="external-tool-name">
					{{ item.name }}
				</span>
			</template>
			<template #[`item.statusText`]="{ item }">
				<div class="text-no-wrap" data-testid="external-tool-status">
					<VIcon v-if="item.isOutdated || item.isDeactivated" color="warning" start :icon="mdiAlert" />
					<VIcon v-else color="success" start :icon="mdiCheckCircle" />
					<span>
						{{ item.statusText }}
					</span>
				</div>
			</template>
			<template #[`item.medium`]="{ item }">
				<div v-if="item.medium" class="text-no-wrap" data-testid="external-tool-medium">
					<VProgressCircular v-if="isLicensesLoading" />
					<VIcon
						v-else-if="
							item.medium.mediaSourceLicenseType !== MediaSourceLicenseType.SCHOOL_LICENSE ||
							isLicensedToSchool(item.medium.mediumId, item.medium.mediaSourceId)
						"
						start
						color="success"
						aria-hidden="false"
						:aria-label="t('components.administration.externalToolsSection.table.ariaLabel.mediumAvailable')"
						:icon="mdiCheckCircle"
					/>
					<VIcon
						v-else
						start
						color="warning"
						aria-hidden="false"
						:aria-label="t('components.administration.externalToolsSection.table.ariaLabel.mediumUnavailable')"
						:icon="mdiAlert"
					/>
					<span>
						{{ item.medium.mediaSourceName || t("pages.tool.medium.noMediaSource") }}
					</span>
				</div>
				<span v-else data-testid="external-tool-medium"> - </span>
			</template>
			<template #[`item.restrictToContexts`]="{ item }">
				<span data-testid="external-tool-context-restriction">
					{{ item.restrictToContexts }}
				</span>
			</template>
			<template #[`item.actions`]="{ item }">
				<ExternalToolToolbar
					class="text-no-wrap"
					data-testid="external-tool-actions"
					@edit="editTool(item)"
					@datasheet="showDatasheet(item)"
					@delete="openDeleteDialog(item)"
				/>
			</template>
		</VDataTable>
		<div class="d-flex mt-8" data-testid="external-tool-section-table-actions">
			<VSpacer />
			<VBtn
				color="primary"
				variant="flat"
				data-testid="add-external-tool-button"
				:to="{ name: 'administration-tool-config-overview' }"
				:text="t('components.administration.externalToolsSection.action.add')"
			/>
		</div>

		<SvsDialog
			v-model="isDeleteDialogOpen"
			:title="t('components.administration.externalToolsSection.dialog.title', { itemName: getItemName })"
			data-testid="delete-dialog"
			@confirm="onDeleteTool"
			@close="onCloseDeleteDialog"
		>
			<template v-if="metadata" #content>
				<p>{{ t("components.administration.externalToolsSection.dialog.content.header") }}</p>

				<ul class="ml-6 mb-4">
					<li data-testid="delete-dialog-content-courses">
						{{ t("common.tool.context.type.courses") }} <b>({{ metadata.course }})</b>
					</li>
					<li data-testid="delete-dialog-content-board-elements">
						{{ t("common.tool.context.type.boardElements") }} <b>({{ metadata.boardElement }})</b>
					</li>
					<li v-if="isMediaBoardUsageVisible" data-testid="delete-dialog-content-media-shelves">
						{{ t("common.tool.context.type.mediaShelves") }} <b>({{ metadata.mediaBoard }})</b>
					</li>
				</ul>

				<WarningAlert data-testid="delete-dialog-content-media-warning">
					{{ t("components.administration.externalToolsSection.dialog.content.warning") }}
				</WarningAlert>
			</template>
		</SvsDialog>
	</div>
	<VidisMediaSyncSection v-if="isVidisEnabled" />
</template>

<script setup lang="ts">
import { useExternalToolsSectionUtils } from "./external-tool-section-utils.composable";
import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import VidisMediaSyncSection from "./VidisMediaSyncSection.vue";
import { MediaSourceLicenseType, ToolApiAxiosParamCreator } from "@api-server";
import { notifyError, useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useSchoolExternalTools, useSchoolExternalToolUsage } from "@data-external-tool";
import { useSchoolLicenseStore } from "@data-license";
import { mdiAlert, mdiCheckCircle } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { loadSchoolExternalTools, schoolExternalTools, isLoadingExternalTools, deleteSchoolExternalTool } =
	useSchoolExternalTools();
const router = useRouter();

const schoolLicenseStore = useSchoolLicenseStore();

onMounted(() => {
	const school = useAppStore().school;
	if (school) {
		loadSchoolExternalTools(school.id);
		schoolLicenseStore.fetchMediaSchoolLicenses();
	}
});

const { t } = useI18n();

const { getHeaders, getItems } = useExternalToolsSectionUtils(
	t,
	useEnvConfig().value.FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED
);

const { fetchSchoolExternalToolUsage, metadata } = useSchoolExternalToolUsage();

const items = computed(() => getItems(schoolExternalTools.value));

const isLoading = computed(() => isLoadingExternalTools.value);

const editTool = (item: SchoolExternalToolItem) => {
	router.push({
		name: "administration-tool-config-edit",
		params: { configId: item.id },
	});
};

const showDatasheet = async (item: SchoolExternalToolItem) => {
	const requestArgs = await ToolApiAxiosParamCreator().toolControllerGetDatasheet(item.externalToolId);

	window.open("/api/v3" + requestArgs.url);
};

const onDeleteTool = async () => {
	if (itemToDelete.value) {
		await deleteSchoolExternalTool(itemToDelete.value.id);
	}

	onCloseDeleteDialog();
};

const itemToDelete: Ref<SchoolExternalToolItem | undefined> = ref();
const getItemName = computed(() => (itemToDelete.value ? itemToDelete.value?.name : ""));

const isDeleteDialogOpen = ref(false);

const openDeleteDialog = async (item: SchoolExternalToolItem) => {
	itemToDelete.value = item;
	await fetchSchoolExternalToolUsage(item.id);

	if (!metadata.value) {
		notifyError(t("components.administration.externalToolsSection.dialog.content.metadata.error"));
	} else {
		isDeleteDialogOpen.value = true;
	}
};

const onCloseDeleteDialog = () => {
	itemToDelete.value = undefined;

	isDeleteDialogOpen.value = false;
};

const isMediaBoardUsageVisible = computed(() => {
	if (!metadata.value) return false;
	return metadata.value.mediaBoard > 0 || useEnvConfig().value.FEATURE_MEDIA_SHELF_ENABLED;
});

const isVidisEnabled = computed(() => useEnvConfig().value.FEATURE_VIDIS_MEDIA_ACTIVATIONS_ENABLED);

const isLicensedToSchool = (mediumId?: string, mediaSourceId?: string) =>
	schoolLicenseStore.isLicensed(mediumId, mediaSourceId);

const isLicensesLoading = computed(() => schoolLicenseStore.isLoading);
</script>

<style lang="scss" scoped>
$arrow-offset: 8px;

.v-data-table :deep(th i) {
	margin-left: $arrow-offset;
}
</style>
