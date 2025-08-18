<template>
	<nav class="pagination d-flex" role="navigation" aria-label="pagination">
		<v-select
			:model-value="perPageSelected"
			:items="perPageOptions"
			item-title="text"
			:aria-label="$t('components.organisms.Pagination.recordsPerPage')"
			class="select-input-width"
			item-value="value"
			return-object
			active
			@update:model-value="setPagination"
		/>
		<div v-if="perPage > 0" class="d-flex align-center">
			<p class="total">
				{{
					$t("components.organisms.Pagination.currentPage", {
						start: total > 0 ? currentPage * perPage - perPage + 1 : 0,
						end:
							perPage > total
								? total
								: currentPage * perPage > total
									? total
									: currentPage * perPage,
						total,
					})
				}}
			</p>
			<ul v-if="total > 0" class="pagination-list">
				<li v-if="currentPage > 1" class="pagination-link-wrapper">
					<v-btn
						min-width="35"
						variant="outlined"
						class="pagination-link"
						aria-label="Go to previous page"
						@click="previousPage"
					>
						<v-icon>{{ mdiChevronLeft }} </v-icon>
					</v-btn>
				</li>
				<li v-if="currentPage < lastPage" class="pagination-link-wrapper">
					<v-btn
						min-width="35"
						variant="outlined"
						class="pagination-link"
						aria-label="Go to next page"
						@click="nextPage"
					>
						<v-icon>{{ mdiChevronRight }} </v-icon>
					</v-btn>
				</li>
			</ul>
		</div>
		<div v-else>
			{{ $t("components.organisms.Pagination.showTotalRecords", { total }) }}
		</div>
	</nav>
</template>

<script setup lang="ts">
import { mdiChevronLeft, mdiChevronRight } from "@icons/material";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	currentPage?: number;
	perPage?: number;
	total?: number;
};

const props = withDefaults(defineProps<Props>(), {
	currentPage: 1,
	perPage: 10,
	total: 0,
});

const emit = defineEmits<{
	(e: "update:current-page", value: number): void;
	(e: "update:per-page", value: number): void;
}>();

const { t } = useI18n();

const perPageOptions = ref([
	{
		text: t("components.organisms.Pagination.perPage.5"),
		value: 5,
	},
	{
		text: t("components.organisms.Pagination.perPage.10"),
		value: 10,
	},
	{
		text: t("components.organisms.Pagination.perPage.25"),
		value: 25,
	},
	{
		text: t("components.organisms.Pagination.perPage.50"),
		value: 50,
	},
	{
		text: t("components.organisms.Pagination.perPage.100"),
		value: 100,
	},
]);

const perPageSelected = computed(() => ({
	text: props.perPage + " " + t("components.organisms.Pagination.perPage"),
	value: props.perPage,
}));
const lastPage = computed(() => Math.ceil(props.total / props.perPage));

const setPagination = (val: { text: string; value: number }) => {
	emit("update:per-page", val.value);
	emit("update:current-page", 1);
};

const previousPage = () => {
	if (props.currentPage > 1) {
		emit("update:current-page", props.currentPage - 1);
	}
};

const nextPage = () => {
	if (props.currentPage < lastPage.value) {
		emit("update:current-page", props.currentPage + 1);
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
}

.pagination-list {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	list-style: none;
}

.pagination-link-wrapper .pagination-link {
	padding: var(--space-xs);
	margin-left: var(--space-sm);
}

.total {
	margin-right: var(--space-sm);
	margin-bottom: 0;
}

:deep(.v-input__icon .v-icon) {
	font-size: var(--text-base-size);
}

.select-input-width {
	max-width: 150px;
}
</style>
