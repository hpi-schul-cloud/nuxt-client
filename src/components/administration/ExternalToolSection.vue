<template>
	<div class="mb-4">
		<p class="mb-6">
			{{ t("components.administration.externalToolsSection.info") }}
		</p>
		<v-data-table
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
					<v-icon
						v-if="item.isOutdated || item.isDeactivated"
						color="warning"
						start
					>
						{{ mdiAlert }}
					</v-icon>
					<v-icon v-else color="success" start>
						{{ mdiCheckCircle }}
					</v-icon>
					<span>
						{{ item.statusText }}
					</span>
				</div>
			</template>
			<template #[`item.medium`]="{ item }">
				<div
					v-if="item.medium"
					class="text-no-wrap"
					data-testid="external-tool-medium"
				>
					<VProgressCircular v-if="isLicensesLoading" />
					<VIcon
						v-else-if="
							item.medium.mediaSourceLicenseType !==
								MediaSourceLicenseType.SchoolLicense ||
							isLicensedToSchool(
								item.medium.mediumId,
								item.medium.mediaSourceId
							)
						"
						start
						color="success"
						aria-hidden="false"
						:aria-label="
							t(
								'components.administration.externalToolsSection.table.ariaLabel.mediumAvailable'
							)
						"
					>
						{{ mdiCheckCircle }}
					</VIcon>
					<VIcon
						v-else
						start
						color="warning"
						aria-hidden="false"
						:aria-label="
							t(
								'components.administration.externalToolsSection.table.ariaLabel.mediumUnavailable'
							)
						"
					>
						{{ mdiAlert }}
					</VIcon>
					<span>
						{{
							item.medium.mediaSourceName ||
							$t("pages.tool.medium.noMediaSource")
						}}
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
				<external-tool-toolbar
					class="text-no-wrap"
					data-testid="external-tool-actions"
					@edit="editTool(item)"
					@datasheet="showDatasheet(item)"
					@delete="openDeleteDialog(item)"
				/>
			</template>
		</v-data-table>
		<div class="d-flex mt-8" data-testid="external-tool-section-table-actions">
			<VSpacer />
			<VBtn
				color="primary"
				variant="flat"
				data-testid="add-external-tool-button"
				:to="{ name: 'administration-tool-config-overview' }"
			>
				{{ t("components.administration.externalToolsSection.action.add") }}
			</VBtn>
		</div>

		<v-dialog
			v-if="metadata"
			v-model="isDeleteDialogOpen"
			data-testid="delete-dialog"
			max-width="360"
		>
			<v-card :ripple="false">
				<v-card-title data-testid="delete-dialog-title">
					<h2 class="my-2">
						{{
							t("components.administration.externalToolsSection.dialog.title")
						}}
					</h2>
				</v-card-title>
				<v-card-text>
					<div data-testid="delete-dialog-content-header">
						<i18n-t
							keypath="components.administration.externalToolsSection.dialog.content.header.firstParagraph"
							scope="global"
							tag="p"
						>
							<b>{{ getItemName }}</b>
						</i18n-t>
						<p class="mb-0">
							{{
								t(
									"components.administration.externalToolsSection.dialog.content.header.secondParagraph"
								)
							}}
						</p>
					</div>
					<p data-testid="delete-dialog-content-courses" class="text-md mb-0">
						{{ t("common.tool.context.type.courses") }}
						<b>({{ metadata.course }})</b>
					</p>
					<p
						data-testid="delete-dialog-content-board-elements"
						:class="isMediaBoardUsageVisible ? 'text-md mb-0' : 'text-md'"
					>
						{{ t("common.tool.context.type.boardElements") }}
						<b>({{ metadata.boardElement }})</b>
					</p>
					<p
						v-if="isMediaBoardUsageVisible"
						data-testid="delete-dialog-content-media-shelves"
						class="text-md"
					>
						{{ t("common.tool.context.type.mediaShelves") }}
						<b>({{ metadata.mediaBoard }})</b>
					</p>
					<p data-testid="delete-dialog-content-media-warning">
						{{
							t(
								"components.administration.externalToolsSection.dialog.content.warning"
							)
						}}
					</p>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn
						data-testId="delete-dialog-cancel"
						class="dialog-closed"
						variant="text"
						@click="onCloseDeleteDialog"
					>
						{{ t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="delete-dialog-confirm"
						class="dialog-confirmed px-6"
						color="primary"
						variant="flat"
						@click="onDeleteTool"
					>
						{{ t("common.actions.confirm") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
	<VidisMediaSyncSection v-if="isVidisEnabled" />
</template>

<script setup lang="ts">
import {
	MediaSourceLicenseType,
	ToolApiAxiosParamCreator,
} from "@/serverApi/v3";
import { RequestArgs } from "@/serverApi/v3/base";
import AuthModule from "@/store/auth";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import {
	AUTH_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import { useSchoolExternalToolUsage } from "@data-external-tool";
import { useSchoolLicenseStore } from "@data-license";
import { mdiAlert, mdiCheckCircle } from "@icons/material";
import { computed, ComputedRef, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useExternalToolsSectionUtils } from "./external-tool-section-utils.composable";
import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import VidisMediaSyncSection from "./VidisMediaSyncSection.vue";
import { useEnvConfig } from "@data-env";

const schoolExternalToolsModule: SchoolExternalToolsModule = injectStrict(
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY
);
const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

const router = useRouter();

const schoolLicenseStore = useSchoolLicenseStore();

onMounted(() => {
	if (authModule.getSchool) {
		schoolExternalToolsModule.loadSchoolExternalTools(authModule.getSchool.id);

		schoolLicenseStore.fetchMediaSchoolLicenses();
	}
});

const { t } = useI18n();

const { getHeaders, getItems } = useExternalToolsSectionUtils(
	t,
	useEnvConfig().value.FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED
);

const { fetchSchoolExternalToolUsage, metadata } = useSchoolExternalToolUsage();

const items: ComputedRef<SchoolExternalToolItem[]> = computed(() => {
	return getItems(schoolExternalToolsModule);
});

const isLoading: ComputedRef<boolean> = computed(() => {
	return schoolExternalToolsModule.getLoading;
});

const editTool = (item: SchoolExternalToolItem) => {
	router.push({
		name: "administration-tool-config-edit",
		params: { configId: item.id },
	});
};

const showDatasheet = async (item: SchoolExternalToolItem) => {
	const requestArgs: RequestArgs =
		await ToolApiAxiosParamCreator().toolControllerGetDatasheet(
			item.externalToolId
		);

	window.open("/api/v3" + requestArgs.url);
};

const onDeleteTool = async () => {
	if (itemToDelete.value) {
		await schoolExternalToolsModule.deleteSchoolExternalTool(
			itemToDelete.value.id
		);
	}

	notifierModule.show({
		text: t(
			"components.administration.externalToolsSection.notification.deleted"
		),
		status: "success",
	});

	onCloseDeleteDialog();
};

const itemToDelete: Ref<SchoolExternalToolItem | undefined> = ref();
const getItemName: ComputedRef<string> = computed(() => {
	return itemToDelete.value ? itemToDelete.value?.name : "";
});

const isDeleteDialogOpen: Ref<boolean> = ref(false);

const openDeleteDialog = async (item: SchoolExternalToolItem) => {
	itemToDelete.value = item;
	isDeleteDialogOpen.value = true;
	await fetchSchoolExternalToolUsage(item.id);

	if (!metadata.value) {
		notifierModule.show({
			text: t(
				"components.administration.externalToolsSection.dialog.content.metadata.error"
			),
			status: "error",
		});
	}
};

const onCloseDeleteDialog = () => {
	itemToDelete.value = undefined;

	isDeleteDialogOpen.value = false;
};

const isMediaBoardUsageVisible = computed(() => {
	if (!metadata.value) {
		return false;
	}
	const isVisible =
		metadata.value.mediaBoard > 0 ||
		useEnvConfig().value.FEATURE_MEDIA_SHELF_ENABLED;
	return isVisible;
});

const isVidisEnabled = computed(() => {
	return useEnvConfig().value.FEATURE_VIDIS_MEDIA_ACTIVATIONS_ENABLED;
});

const isLicensedToSchool = (
	mediumId?: string,
	mediaSourceId?: string
): boolean => {
	return schoolLicenseStore.isLicensed(mediumId, mediaSourceId);
};

const isLicensesLoading: ComputedRef<boolean> = computed(() => {
	return schoolLicenseStore.isLoading;
});
</script>

<style lang="scss" scoped>
$arrow-offset: 8px;

.v-data-table :deep(th i) {
	margin-left: $arrow-offset;
}

.v-data-table :deep(td) {
	cursor: pointer;
}
</style>
