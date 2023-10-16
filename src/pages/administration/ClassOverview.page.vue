<template>
	<default-wireframe
		:headline="t('pages.administration.classes.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
		data-testid="admin-class-title"
	>
		<v-data-table
			:headers="headers"
			:items="classes"
			:items-per-page.sync="pagination.limit"
			:server-items-length="pagination.total"
			:sort-by="sortBy"
			:sort-Order="sortOrder"
			:page="page"
			:footer-props="footerProps"
			data-testid="admin-class-table"
			class="elevation-1"
			:no-data-text="t('common.nodata')"
			@update:sort-by="onUpdateSortBy"
			@update:sort-desc="updateSortOrder"
			@update:items-per-page="onUpdateItemsPerPage"
			@update:page="onUpdateCurrentPage"
		>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon
					v-if="hasPermission && !item.externalSourceName"
					size="small"
					data-testid="class-table-manage-icon"
					@click="manageClass(item)"
				>
					{{ mdiAccountGroupOutline }}
				</v-icon>
				<v-icon
					v-if="hasPermission && !item.externalSourceName"
					size="small"
					data-testid="class-table-edit-icon"
					@click="editItem(item)"
				>
					{{ mdiPencilOutline }}
				</v-icon>
				<v-icon
					v-if="hasPermission && !item.externalSourceName"
					size="small"
					data-testid="class-table-delete-icon"
					@click="onOpenDeleteDialog(item)"
				>
					{{ mdiTrashCanOutline }}
				</v-icon>
				<v-icon
					v-if="hasPermission && !item.externalSourceName"
					:disabled="!item.isUpgradable"
					size="small"
					data-testid="class-table-successor-icon"
					@click="createSuccessor(item)"
				>
					{{ mdiArrowUp }}
				</v-icon>
			</template>
		</v-data-table>

		<v-dialog
			v-model="isDeleteDialogOpen"
			max-width="360"
			data-testId="delete-dialog"
		>
			<v-card :ripple="false">
				<v-card-title>
					<h2 class="text-h4 my-2">
						{{ t("pages.administration.classes.deleteDialog.title") }}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<RenderHTML
						class="text-md mt-2"
						:html="
							t('pages.administration.classes.deleteDialog.content', {
								itemName: selectedItemName,
							})
						"
						component="p"
					/>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						data-testId="dialog-cancel"
						depressed
						text
						@click="onCloseDeleteDialog"
					>
						{{ t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="dialog-confirm"
						class="px-6"
						color="primary"
						depressed
						@click="onDeleteClass"
					>
						{{ t("common.actions.confirm") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-btn
			class="my-5 button-start"
			color="primary"
			depressed
			data-testid="admin-class-add-button"
		>
			{{ t("pages.administration.classes.index.add") }}
		</v-btn>
	</default-wireframe>
</template>

<script lang="ts">
import { RenderHTML } from "@feature-render-html";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
} from "vue";
import GroupModule from "@/store/group";
import { useI18n } from "@/composables/i18n.composable";
import { Pagination } from "@/store/types/commons";
import { ClassInfo } from "@/store/types/class-info";
import { GROUP_MODULE_KEY, injectStrict } from "@/utils/inject";
import { SortOrder } from "@/store/types/sort-order.enum";
import { authModule } from "@/store";
import {
	mdiPencilOutline,
	mdiTrashCanOutline,
	mdiArrowUp,
	mdiAccountGroupOutline,
} from "@mdi/js";
import VueRouter from "vue-router";
import { useRouter } from "vue-router/composables";

export default defineComponent({
	components: { DefaultWireframe, RenderHTML },
	setup() {
		const groupModule: GroupModule = injectStrict(GROUP_MODULE_KEY);

		const { t } = useI18n();

		const footerProps = {
			itemsPerPageText: t("components.organisms.Pagination.recordsPerPage"),
			itemsPerPageOptions: [5, 10, 25, 50, 100],
		};

		const breadcrumbs: Breadcrumb[] = [
			{
				text: t("pages.administration.index.title"),
				href: "/administration/",
			},
			{
				text: t("pages.administration.classes.index.title"),
				disabled: true,
			},
		];

		const classes: ComputedRef<ClassInfo[]> = computed(
			() => groupModule.getClasses
		);

		const hasPermission: ComputedRef<boolean> = computed(() =>
			authModule.getUserPermissions.includes("CLASS_EDIT".toLowerCase())
		);

		const isDeleteDialogOpen: Ref<boolean> = ref(false);

		const selectedItem: Ref<ClassInfo | undefined> = ref();

		const selectedItemName: ComputedRef<string> = computed(
			() => selectedItem.value?.name || "???"
		);

		const onOpenDeleteDialog = (selectedClass: ClassInfo) => {
			selectedItem.value = selectedClass;
			isDeleteDialogOpen.value = true;
		};

		const onCloseDeleteDialog = () => {
			selectedItem.value = undefined;
			isDeleteDialogOpen.value = false;
		};

		const pagination: ComputedRef<Pagination> = computed(
			() => groupModule.getPagination
		);

		const sortBy: ComputedRef<string> = computed(() => groupModule.getSortBy);
		const sortOrder: ComputedRef<SortOrder> = computed(
			() => groupModule.getSortOrder
		);
		const page: ComputedRef<number> = computed(() => groupModule.getPage);

		const headers = [
			{
				value: "name",
				text: t("common.labels.classes"),
				sortable: true,
			},
			{
				value: "externalSourceName",
				text: t("common.labels.externalsource"),
				sortable: true,
			},
			{
				value: "teachers",
				text: t("common.labels.teacher"),
				sortable: true,
			},
			{
				value: "actions",
				text: "",
				sortable: false,
			},
		];

		const router: VueRouter = useRouter();

		const manageClass = async (item: ClassInfo) => {
			await router.push({
				path: `/administration/classes/${item.id}/manage`,
			});
		};

		const editItem = async (item: ClassInfo) => {
			await router.push({
				path: `/administration/classes/${item.id}/edit`,
			});
		};

		const onDeleteClass = async () => {
			if (selectedItem.value) {
				await groupModule.deleteClass(selectedItem.value.id);
			}

			onCloseDeleteDialog();
		};

		const createSuccessor = async (item: ClassInfo) => {
			await router.push({
				path: `/administration/classes/${item.id}/createSuccessor`,
			});
		};

		const onUpdateSortBy = async (sortBy: string) => {
			groupModule.setSortBy(sortBy);
			await groupModule.loadClassesForSchool();
		};
		const updateSortOrder = async (sortDesc: boolean) => {
			const sortOrder = sortDesc ? SortOrder.DESC : SortOrder.ASC;
			groupModule.setSortOrder(sortOrder);
			await groupModule.loadClassesForSchool();
		};
		const onUpdateCurrentPage = async (currentPage: number) => {
			groupModule.setPage(currentPage);
			const skip = (currentPage - 1) * groupModule.getPagination.limit;
			groupModule.setPagination({ ...pagination.value, skip });
			await groupModule.loadClassesForSchool();
		};
		const onUpdateItemsPerPage = async (itemsPerPage: number) => {
			groupModule.setPagination({ ...pagination.value, limit: itemsPerPage });
			await groupModule.loadClassesForSchool();
		};

		onMounted(() => {
			(async () => {
				await groupModule.loadClassesForSchool();
			})();
		});

		return {
			t,
			footerProps,
			breadcrumbs,
			headers,
			classes,
			hasPermission,
			page,
			sortBy,
			sortOrder,
			pagination,
			selectedItem,
			selectedItemName,
			isDeleteDialogOpen,
			onOpenDeleteDialog,
			onCloseDeleteDialog,
			onDeleteClass,
			manageClass,
			editItem,
			createSuccessor,
			onUpdateSortBy,
			updateSortOrder,
			onUpdateCurrentPage,
			onUpdateItemsPerPage,
			mdiAccountGroupOutline,
			mdiPencilOutline,
			mdiTrashCanOutline,
			mdiArrowUp,
		};
	},
});
</script>
