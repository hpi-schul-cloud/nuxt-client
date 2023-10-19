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
		/>

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
		];

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
			page,
			sortBy,
			sortOrder,
			pagination,
			onUpdateSortBy,
			updateSortOrder,
			onUpdateCurrentPage,
			onUpdateItemsPerPage,
		};
	},
});
</script>
