<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.externalToolsSection.header") }}
		</h2>
		<v-data-table
			:disable-pagination="true"
			:hide-default-footer="true"
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
			<template #[`item.status`]="{ item }">
				<v-icon v-if="item.outdated" color="error">
					{{ mdiRefreshCircle }}
				</v-icon>
				<v-icon v-else color="success">
					{{ mdiCheckCircle }}
				</v-icon>
				<span>
					{{ item.status }}
				</span>
			</template>
			<template #[`item.actions`]="{ item }">
				<external-tool-toolbar
					@delete="openDeleteDialog(item)"
					@edit="editTool(item)"
				/>
			</template>
		</v-data-table>
		<v-btn
			class="my-5 button-save"
			color="primary"
			depressed
			:to="{ name: 'administration-tool-config-overview' }"
		>
			{{ t("components.administration.externalToolsSection.action.add") }}
		</v-btn>

		<v-dialog v-model="isDeleteDialogOpen" max-width="360">
			<v-card :ripple="false">
				<v-card-title>
					<h2 class="text-h4 my-2">
						{{
							t("components.administration.externalToolsSection.dialog.title")
						}}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<RenderHTML
						class="text-md mt-2"
						:html="
							t(
								'components.administration.externalToolsSection.dialog.content',
								{ itemName: getItemName }
							)
						"
						component="p"
					/>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						data-testId="dialog-cancel"
						class="dialog-closed"
						depressed
						text
						@click="onCloseDeleteDialog"
					>
						{{ t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="dialog-confirm"
						class="dialog-confirmed px-6"
						color="primary"
						depressed
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
import { RenderHTML } from "@feature-render-html";
import AuthModule from "@/store/auth";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import {
	AUTH_MODULE_KEY,
	I18N_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import { mdiCheckCircle, mdiRefreshCircle } from "@mdi/js";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import VueI18n from "vue-i18n";
import { default as VueRouter } from "vue-router";
import { useRouter } from "vue-router/composables";
import { DataTableHeader } from "vuetify";
import { useExternalToolsSectionUtils } from "./external-tool-section-utils.composable";
import ExternalToolToolbar from "./ExternalToolToolbar.vue";
import { SchoolExternalToolItem } from "./school-external-tool-item";

export default defineComponent({
	name: "ExternalToolSection",
	components: { ExternalToolToolbar, RenderHTML },
	setup() {
		const i18n = injectStrict(I18N_KEY);
		const schoolExternalToolsModule: SchoolExternalToolsModule = injectStrict(
			SCHOOL_EXTERNAL_TOOLS_MODULE_KEY
		);
		const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

		const router: VueRouter = useRouter();

		onMounted(async () => {
			if (authModule.getUser) {
				await schoolExternalToolsModule.loadSchoolExternalTools(
					authModule.getUser.schoolId
				);
			}
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values): string =>
			i18n.tc(key, 0, values);

		const { getHeaders, getItems } = useExternalToolsSectionUtils(t);

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

		const openDeleteDialog = (item: SchoolExternalToolItem) => {
			itemToDelete.value = item;
			isDeleteDialogOpen.value = true;
		};

		const onCloseDeleteDialog = () => {
			itemToDelete.value = undefined;

			isDeleteDialogOpen.value = false;
		};

		return {
			t,
			headers,
			items,
			isLoading,
			editTool,
			onDeleteTool,
			isDeleteDialogOpen,
			openDeleteDialog,
			onCloseDeleteDialog,
			itemToDelete,
			getItemName,
			mdiRefreshCircle,
			mdiCheckCircle,
		};
	},
});
</script>

<style lang="scss" scoped>
$arrow-offset: 8px;

.v-data-table ::v-deep th i {
	margin-left: $arrow-offset;
}

.v-data-table ::v-deep td {
	cursor: pointer;
}
</style>
