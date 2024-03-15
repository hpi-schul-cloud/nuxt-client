<template>
	<default-wireframe
		:headline="t('pages.administration.classes.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
		data-testid="admin-class-title"
	>
		<v-tabs class="tabs-max-width mb-5" grow v-model="activeTab">
			<v-tab value="next" data-testid="admin-class-next-year-tab">
				<span>{{ nextYear }}</span>
			</v-tab>
			<v-tab value="current" data-testid="admin-class-current-year-tab">
				<span>{{ currentYear }}</span>
			</v-tab>
			<v-tab value="archive" data-testid="admin-class-previous-years-tab">
				<span>{{ t("pages.administration.classes.label.archive") }}</span>
			</v-tab>
		</v-tabs>

		<v-data-table-server
			:headers="headers"
			:items="classes"
			v-model:items-per-page="pagination.limit"
			:items-length="pagination.total"
			:sort-by="sortBy"
			:page="page"
			:items-per-page-text="footerProps.itemsPerPageText"
			:items-per-page-options="footerProps.itemsPerPageOptions"
			data-testid="admin-class-table"
			class="elevation-1"
			:no-data-text="t('common.nodata')"
			@update:sortBy="onUpdateSortBy"
			@update:itemsPerPage="onUpdateItemsPerPage"
			@update:page="onUpdateCurrentPage"
		>
			<template v-slot:[`item.actions`]="{ item }">
				<template v-if="showClassAction(item)">
					<v-btn
						:title="t('pages.administration.classes.manage')"
						:aria-label="t('pages.administration.classes.manage')"
						data-testid="legacy-class-table-manage-btn"
						variant="outlined"
						color="secondary"
						size="small"
						:href="`/administration/classes/${item.id}/manage`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiAccountGroupOutline }}</v-icon>
					</v-btn>
					<v-btn
						:title="t('pages.administration.classes.edit')"
						:aria-label="t('pages.administration.classes.edit')"
						data-testid="class-table-edit-btn"
						variant="outlined"
						color="secondary"
						size="small"
						:href="`/administration/classes/${item.id}/edit`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiPencilOutline }}</v-icon>
					</v-btn>
					<v-btn
						:title="$t('pages.administration.classes.delete')"
						:aria-label="$t('pages.administration.classes.delete')"
						data-testid="class-table-delete-btn"
						variant="outlined"
						color="secondary"
						size="small"
						@click="onClickDeleteIcon(item)"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiTrashCanOutline }}</v-icon>
					</v-btn>
					<v-btn
						:disabled="!item.isUpgradable"
						:aria-label="t('pages.administration.classes.createSuccessor')"
						:title="t('pages.administration.classes.createSuccessor')"
						data-testid="class-table-successor-btn"
						variant="outlined"
						color="secondary"
						size="small"
						:href="`/administration/classes/${item.id}/createSuccessor`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiArrowUp }}</v-icon>
					</v-btn>
				</template>
				<template v-else-if="showGroupAction(item)">
					<v-btn
						:title="t('pages.administration.classes.manage')"
						:aria-label="t('pages.administration.classes.manage')"
						data-testid="class-table-members-manage-btn"
						variant="outlined"
						color="secondary"
						size="small"
						:to="{
							name: 'administration-groups-classes-members',
							params: { groupId: item.id },
						}"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiAccountGroupOutline }}</v-icon>
					</v-btn>
				</template>
			</template>
		</v-data-table-server>
		<v-custom-dialog
			:is-open="isDeleteDialogOpen"
			max-width="360"
			data-testid="delete-dialog"
			has-buttons
			:buttons="['cancel', 'confirm']"
			@dialog-closed="onCancelClassDeletion"
			@dialog-confirmed="onConfirmClassDeletion"
		>
			<template #title>
				<h2 class="text-h4 my-2">
					{{ t("pages.administration.classes.deleteDialog.title") }}
				</h2>
			</template>
			<template #content>
				<RenderHTML
					class="text-md mt-2"
					:html="
						t('pages.administration.classes.deleteDialog.content', {
							itemName: selectedItemName,
						})
					"
					component="p"
				/>
			</template>
		</v-custom-dialog>

		<v-btn
			class="my-5 button-start"
			color="primary"
			variant="flat"
			data-testid="admin-class-add-button"
			href="/administration/classes/create"
		>
			{{ t("pages.administration.classes.index.add") }}
		</v-btn>

		<p class="text-muted">
			{{
				t("pages.administration.classes.hint", {
					institute_title: getInstituteTitle,
				})
			}}
		</p>
	</default-wireframe>
</template>

<script lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ClassRequestContext, SchoolYearQueryType } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import AuthModule from "@/store/auth";
import GroupModule from "@/store/group";
import SchoolsModule from "@/store/schools";
import { ClassInfo, ClassRootType } from "@/store/types/class-info";
import { Pagination } from "@/store/types/commons";
import { SortOrder } from "@/store/types/sort-order.enum";
import {
	AUTH_MODULE_KEY,
	GROUP_MODULE_KEY,
	injectStrict,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { RenderHTML } from "@feature-render-html";
import {
	mdiAccountGroupOutline,
	mdiArrowUp,
	mdiPencilOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import { useTitle } from "@vueuse/core";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	PropType,
	ref,
	Ref,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

type Tab = "current" | "next" | "archive";
// vuetify typing: https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VDataTable/composables/sort.ts#L29-L29
type SortItem = { key: string; order?: boolean | "asc" | "desc" };

export default defineComponent({
	components: { DefaultWireframe, RenderHTML, VCustomDialog },
	props: {
		tab: {
			type: String as PropType<Tab>,
			default: "current",
		},
	},
	setup(props) {
		const groupModule: GroupModule = injectStrict(GROUP_MODULE_KEY);
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
		const schoolsModule: SchoolsModule = injectStrict(SCHOOLS_MODULE_KEY);

		const route = useRoute();
		const router = useRouter();

		const { t } = useI18n();

		const activeTab = computed({
			get() {
				return props.tab;
			},
			set(newTab: string) {
				onTabsChange(newTab);
			},
		});

		const footerProps = {
			itemsPerPageText: t("components.organisms.Pagination.recordsPerPage"),
			itemsPerPageOptions: [5, 10, 25, 50, 100],
		};

		const breadcrumbs: Ref<Breadcrumb[]> = computed(() => [
			{
				title: t("pages.administration.index.title"),
				href: "/administration/",
			},
			{
				title: t("pages.administration.classes.index.title"),
				disabled: true,
			},
		]);

		useTitle(buildPageTitle(t("pages.administration.classes.index.title")));

		const schoolYearQueryType: ComputedRef<SchoolYearQueryType> = computed(
			() => {
				switch (props.tab) {
					case "next":
						return SchoolYearQueryType.NextYear;
					case "current":
						return SchoolYearQueryType.CurrentYear;
					case "archive":
						return SchoolYearQueryType.PreviousYears;
					default:
						return SchoolYearQueryType.CurrentYear;
				}
			}
		);

		const nextYear: ComputedRef<string> = computed(
			() => schoolsModule.getSchool.years.nextYear.name
		);

		const currentYear: ComputedRef<string> = computed(
			() => schoolsModule.getSchool.years.activeYear.name
		);

		const onTabsChange = async (tab: string) => {
			await groupModule.loadClassesForSchool({
				schoolYearQuery: schoolYearQueryType.value,
				calledFrom: ClassRequestContext.ClassOverview,
			});

			await router.replace({
				query: { ...route.query, tab },
			});
		};

		const classes: ComputedRef<ClassInfo[]> = computed(
			() => groupModule.getClasses
		);

		const hasPermission: ComputedRef<boolean> = computed(() =>
			authModule.getUserPermissions.includes("CLASS_EDIT".toLowerCase())
		);

		const showClassAction = (item: ClassInfo) =>
			hasPermission.value && item.type === ClassRootType.Class;

		const showGroupAction = (item: ClassInfo) =>
			hasPermission.value && item.type === ClassRootType.Group;

		const isDeleteDialogOpen: Ref<boolean> = ref(false);

		const selectedItem: Ref<ClassInfo | undefined> = ref();

		const selectedItemName: ComputedRef<string> = computed(
			() => selectedItem.value?.name || "???"
		);

		const onClickDeleteIcon = (selectedClass: ClassInfo) => {
			selectedItem.value = selectedClass;
			isDeleteDialogOpen.value = true;
		};

		const onCancelClassDeletion = () => {
			selectedItem.value = undefined;
			isDeleteDialogOpen.value = false;
		};

		const pagination: ComputedRef<Pagination> = computed(
			() => groupModule.getPagination
		);

		const sortBy: ComputedRef<SortItem[]> = computed(() => [
			{
				key: groupModule.getSortBy,
				order: groupModule.getSortOrder,
			},
		]);
		const sortOrder: ComputedRef<SortOrder> = computed(
			() => groupModule.getSortOrder
		);
		const page: ComputedRef<number> = computed(() => groupModule.getPage);

		const headers = [
			{
				value: "name",
				title: t("common.labels.classes"),
				sortable: true,
			},
			{
				value: "externalSourceName",
				title: t("common.labels.externalsource"),
				sortable: true,
			},
			{
				key: "teachers",
				value: (item: ClassInfo) => item.teachers.join(", "),
				title: t("common.labels.teacher"),
				sortable: true,
			},
			{
				value: "studentCount",
				title: t("common.labels.students"),
				sortable: true,
			},
			{
				value: "actions",
				title: "",
				sortable: false,
			},
		];

		const onConfirmClassDeletion = async () => {
			if (selectedItem.value) {
				await groupModule.deleteClass({
					classId: selectedItem.value.id,
					query: schoolYearQueryType.value,
				});
			}
		};

		const onUpdateSortBy = async (sortBy: SortItem[]) => {
			const fieldToSortBy = sortBy[0];
			groupModule.setSortBy(fieldToSortBy ? fieldToSortBy.key : "");

			const sortOrder =
				fieldToSortBy?.order === "desc" ? SortOrder.DESC : SortOrder.ASC;
			groupModule.setSortOrder(sortOrder);

			await groupModule.loadClassesForSchool({
				schoolYearQuery: schoolYearQueryType.value,
				calledFrom: ClassRequestContext.ClassOverview,
			});
		};

		const onUpdateCurrentPage = async (currentPage: number) => {
			groupModule.setPage(currentPage);
			const skip = (currentPage - 1) * groupModule.getPagination.limit;
			groupModule.setPagination({ ...pagination.value, skip });

			await groupModule.loadClassesForSchool({
				schoolYearQuery: schoolYearQueryType.value,
				calledFrom: ClassRequestContext.ClassOverview,
			});
		};
		const onUpdateItemsPerPage = async (itemsPerPage: number) => {
			groupModule.setPagination({ ...pagination.value, limit: itemsPerPage });

			await groupModule.loadClassesForSchool({
				schoolYearQuery: schoolYearQueryType.value,
				calledFrom: ClassRequestContext.ClassOverview,
			});
		};

		onMounted(() => {
			onTabsChange(activeTab.value);
		});

		const getInstituteTitle: ComputedRef<string> = computed(() => {
			switch (envConfigModule.getTheme) {
				case "n21":
					return "Landesinitiative n-21: Schulen in Niedersachsen online e.V.";
				case "thr":
					return "Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien";
				case "brb":
					return "Ministerium für Bildung, Jugend und Sport des Landes Brandenburg";
				default:
					return "Dataport";
			}
		});

		return {
			t,
			footerProps,
			breadcrumbs,
			nextYear,
			currentYear,
			onTabsChange,
			headers,
			classes,
			hasPermission,
			showClassAction,
			showGroupAction,
			page,
			sortBy,
			sortOrder,
			pagination,
			selectedItem,
			selectedItemName,
			isDeleteDialogOpen,
			onClickDeleteIcon,
			onCancelClassDeletion,
			onConfirmClassDeletion,
			onUpdateSortBy,
			onUpdateCurrentPage,
			onUpdateItemsPerPage,
			mdiAccountGroupOutline,
			mdiPencilOutline,
			mdiTrashCanOutline,
			mdiArrowUp,
			getInstituteTitle,
			activeTab,
		};
	},
});
</script>
