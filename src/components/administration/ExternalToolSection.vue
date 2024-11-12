<template>
	<div>
		<p class="mb-6">
			{{ t("components.administration.externalToolsSection.info") }}
		</p>
		<v-data-table
			data-testid="external-tool-section-table"
			:items="items"
			:headers="headers"
			:loading="isLoading"
			:loading-text="t('common.loading.text')"
			:no-data-text="t('common.nodata')"
		>
			<template #[`item.name`]="{ item }">
				<span>
					{{ item.name }}
				</span>
			</template>
			<template #[`item.statusText`]="{ item }">
				<div class="text-no-wrap">
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
			<template #[`item.actions`]="{ item }">
				<external-tool-toolbar
					class="text-no-wrap"
					@edit="editTool(item)"
					@datasheet="showDatasheet(item)"
					@delete="openDeleteDialog(item)"
				/>
			</template>
		</v-data-table>
		<v-btn
			class="mt-8 mb-4 button-save float-right"
			color="primary"
			variant="flat"
			data-testid="add-external-tool-button"
			:to="{ name: 'administration-tool-config-overview' }"
		>
			{{ t("components.administration.externalToolsSection.action.add") }}
		</v-btn>

		<v-dialog
			v-if="metadata"
			data-testid="delete-dialog"
			v-model="isDeleteDialogOpen"
			max-width="360"
		>
			<v-card :ripple="false">
				<v-card-title data-testid="delete-dialog-title">
					<h2 class="text-h4 my-2">
						{{
							t("components.administration.externalToolsSection.dialog.title")
						}}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<RenderHTML
						data-testid="delete-dialog-content-header"
						class="text-md mt-2 mb-0"
						:html="
							t(
								'components.administration.externalToolsSection.dialog.content.header',
								{
									itemName: getItemName,
								}
							)
						"
						component="p"
					/>
					<p data-testid="delete-dialog-content-courses" class="text-md mb-0">
						<b>{{ metadata.course }}</b>
						{{ t("common.tool.context.type.courses") }}
					</p>
					<p
						data-testid="delete-dialog-content-board-elements"
						:class="isMediaBoardUsageVisible ? 'text-md mb-0' : 'text-md'"
					>
						<b>{{ metadata.boardElement }}</b>
						{{ t("common.tool.context.type.boardElements") }}
					</p>
					<p
						v-if="isMediaBoardUsageVisible"
						data-testid="delete-dialog-content-media-shelves"
						class="text-md"
					>
						<b>{{ metadata.mediaBoard }}</b>
						{{ t("common.tool.context.type.mediaShelves") }}
					</p>
					<RenderHTML
						data-testid="delete-dialog-content-media-warning"
						class="text-md mb-0"
						:html="
							t(
								'components.administration.externalToolsSection.dialog.content.warning'
							)
						"
						component="p"
					/>
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
</template>

<script lang="ts">
import { ToolApiAxiosParamCreator } from "@/serverApi/v3";
import { RequestArgs } from "@/serverApi/v3/base";
import AuthModule from "@/store/auth";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { DataTableHeader } from "@/store/types/data-table-header";
import {
	AUTH_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
} from "@/utils/inject";
import { useSchoolExternalToolUsage } from "@data-external-tool";
import { RenderHTML } from "@feature-render-html";
import { mdiAlert, mdiCheckCircle } from "@icons/material";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useExternalToolsSectionUtils } from "./external-tool-section-utils.composable";
import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import { SchoolExternalToolItem } from "./school-external-tool-item";
import EnvConfigModule from "@/store/env-config";

export default defineComponent({
	name: "ExternalToolSection",
	components: { ExternalToolToolbar, RenderHTML },
	setup() {
		const schoolExternalToolsModule: SchoolExternalToolsModule = injectStrict(
			SCHOOL_EXTERNAL_TOOLS_MODULE_KEY
		);
		const envConfigModule: EnvConfigModule = injectStrict(
			ENV_CONFIG_MODULE_KEY
		);
		const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

		const router = useRouter();

		onMounted(async () => {
			if (authModule.getSchool) {
				await schoolExternalToolsModule.loadSchoolExternalTools(
					authModule.getSchool.id
				);
			}
		});

		const { t } = useI18n();

		const { getHeaders, getItems } = useExternalToolsSectionUtils(t);
		const { fetchSchoolExternalToolUsage, metadata } =
			useSchoolExternalToolUsage();

		const headers: DataTableHeader[] = getHeaders;

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

		const isMediaBoardUsageVisible: ComputedRef<boolean> = computed(() => {
			if (!metadata.value) {
				return false;
			}
			const isVisible =
				metadata.value.mediaBoard > 0 ||
				envConfigModule.getEnv.FEATURE_MEDIA_SHELF_ENABLED;
			return isVisible;
		});

		return {
			t,
			headers,
			items,
			isLoading,
			editTool,
			onDeleteTool,
			showDatasheet,
			isDeleteDialogOpen,
			openDeleteDialog,
			onCloseDeleteDialog,
			itemToDelete,
			getItemName,
			mdiAlert,
			mdiCheckCircle,
			metadata,
			isMediaBoardUsageVisible,
		};
	},
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
