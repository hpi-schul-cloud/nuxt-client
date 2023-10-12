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
				<v-icon size="small" @click="manageClass(item)">
					{{ mdiAccountMultipleOutline }}
				</v-icon>
				<v-icon v-if="showIcons(item)" size="small" @click="editItem(item)">
					{{ mdiPencilOutline }}
				</v-icon>
				<v-icon v-if="showIcons(item)" size="small" @click="deleteItem(item)">
					{{ mdiTrashCanOutline }}
				</v-icon>
				<v-icon
					v-if="showIcons(item)"
					size="small"
					@click="createSuccessor(item)"
				>
					{{ mdiArrowUpBoldOutline }}
				</v-icon>
			</template>
		</v-data-table>

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
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
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
	mdiArrowUpBoldOutline,
	mdiAccountMultipleOutline,
} from "@mdi/js";

export default defineComponent({
	components: { DefaultWireframe },
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

		const showIcons = (item: ClassInfo): boolean =>
			!item.externalSourceName &&
			authModule.getUserPermissions.includes("CLASS_EDIT".toLowerCase());

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
				text: "Hier könnte ihre Werbung stehen", // "actions"? does not exist in old table
				sortable: false, // does it make sense to sort here?
			},
		];

		const manageClass = (item: ClassInfo) => {
			console.log("manage: ", item);
		};

		const editItem = (item: ClassInfo) => {
			console.log(
				"edit: ",
				item,
				authModule.getUserPermissions.includes("CLASS_EDIT".toLowerCase())
			);
		};

		const deleteItem = (item: ClassInfo) => {
			console.log("delete: ", item);
		};

		const createSuccessor = (item: ClassInfo) => {
			console.log("successor: ", item);
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
			showIcons,
			page,
			sortBy,
			sortOrder,
			pagination,
			manageClass,
			editItem,
			deleteItem,
			createSuccessor,
			onUpdateSortBy,
			updateSortOrder,
			onUpdateCurrentPage,
			onUpdateItemsPerPage,
			mdiAccountMultipleOutline,
			mdiPencilOutline,
			mdiTrashCanOutline,
			mdiArrowUpBoldOutline,
		};
	},
});
</script>
