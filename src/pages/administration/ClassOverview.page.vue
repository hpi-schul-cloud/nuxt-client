<template>
	<default-wireframe
		:headline="t('pages.administration.classes.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
		data-testid="admin-class-title"
	>
		<backend-data-table
			:columns="tableColumns"
			:current-page.sync="page"
			:data="classes"
			:paginated="true"
			track-by=""
			:total="pagination.total"
			:rows-per-page.sync="pagination.limit"
			:sort-by="sortBy"
			:sort-order="sortOrder"
			data-testid="admin-class-table"
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template #datacolumn-teachers="{ data }">
				{{ (data || []).join(", ") }}
			</template>
		</backend-data-table>

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
import BackendDataTable from "@/components/organisms/DataTable/BackendDataTable.vue";
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import GroupModule from "@/store/group";
import { useI18n } from "@/composables/i18n.composable";
import { Pagination } from "@/store/types/commons";
import { ClassInfo } from "@/store/types/class-info";
import { GROUP_MODULE_KEY, injectStrict } from "@/utils/inject";
import { SortOrder } from "@/store/types/sort-order.enum";

export default defineComponent({
	components: { DefaultWireframe, BackendDataTable },
	setup() {
		const groupModule: GroupModule = injectStrict(GROUP_MODULE_KEY);

		const { t } = useI18n();

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

		const pagination: ComputedRef<Pagination> = computed(
			() => groupModule.getPagination
		);
		const classes: ComputedRef<ClassInfo[]> = computed(
			() => groupModule.getClasses
		);

		const sortBy: ComputedRef<string> = computed(
			() => groupModule.getSortBy || "name"
		);
		const sortOrder: ComputedRef<SortOrder> = computed(
			() => groupModule.getSortOrder
		);
		const page: ComputedRef<number> = computed(() => groupModule.getPage || 1);

		const tableColumns = [
			{
				field: "name", // classes
				label: t("common.labels.classes"),
				sortable: true,
			},
			{
				field: "externalSourceName",
				label: t("common.labels.externalsource"),
				sortable: true,
			},
			{
				field: "teachers",
				label: t("common.labels.teacher"),
				sortable: true,
			},
		];

		const onUpdateSort = async (sortBy: string, sortOrder: SortOrder) => {
			groupModule.setSortBy(sortBy);
			groupModule.setSortOrder(sortOrder);
			await groupModule.loadClassesForSchool();
		};
		const onUpdateCurrentPage = async (_page: number) => {
			groupModule.setPage(_page);
			const _skip = (page.value - 1) * groupModule.getPagination.limit;
			groupModule.setPagination({ ...pagination.value, skip: _skip });
			await groupModule.loadClassesForSchool();
		};
		const onUpdateRowsPerPage = async (rowsPerPage: number) => {
			groupModule.setPagination({ ...pagination.value, limit: rowsPerPage });
			await groupModule.loadClassesForSchool();
		};

		onMounted(() => {
			groupModule.loadClassesForSchool();
		});

		return {
			t,
			breadcrumbs,
			tableColumns,
			classes,
			page,
			sortBy,
			sortOrder,
			pagination,
			onUpdateSort,
			onUpdateCurrentPage,
			onUpdateRowsPerPage,
		};
	},
});
</script>
