<template>
	<default-wireframe
		:headline="t('pages.administration.classes.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
		data-testid="admin-class-title"
	>
		<v-tabs
			class="tabs-max-width mb-5"
			grow
			@change="onTabsChange"
			:value="activeTab"
		>
			<v-tab tab-value="next" data-testid="admin-class-next-year-tab">
				<span>{{ nextYear }}</span>
			</v-tab>
			<v-tab tab-value="current" data-testid="admin-class-current-year-tab">
				<span>{{ currentYear }}</span>
			</v-tab>
			<v-tab tab-value="archive" data-testid="admin-class-previous-years-tab">
				<span>{{ t("pages.administration.classes.label.archive") }}</span>
			</v-tab>
		</v-tabs>

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
				<template v-if="showClassAction(item)">
					<v-btn
						:title="t('pages.administration.classes.manage')"
						:aria-label="t('pages.administration.classes.manage')"
						data-testid="legacy-class-table-manage-btn"
						outlined
						color="secondary"
						small
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
						outlined
						color="secondary"
						small
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
						outlined
						color="secondary"
						small
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
						outlined
						color="secondary"
						small
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
						outlined
						color="secondary"
						small
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
		</v-data-table>

		<v-custom-dialog
			:is-open="isDeleteDialogOpen"
			max-width="360"
			data-testId="delete-dialog"
			has-buttons
			:buttons="['cancel', 'confirm']"
			@dialog-closed="onCancelClassDeletion"
			@dialog-confirmed="onConfirmClassDeletion"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{ t("pages.administration.classes.deleteDialog.title") }}
			</h2>
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
			depressed
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
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "@/composables/i18n.composable";
import GroupModule from "@/store/group";
import { ClassInfo, ClassRootType } from "@/store/types/class-info";
import { Pagination } from "@/store/types/commons";
import { SortOrder } from "@/store/types/sort-order.enum";
import {
	AUTH_MODULE_KEY,
	GROUP_MODULE_KEY,
	injectStrict,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { RenderHTML } from "@feature-render-html";
import {
	mdiAccountGroupOutline,
	mdiArrowUp,
	mdiPencilOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	PropType,
	ref,
	Ref,
	WritableComputedRef,
} from "vue";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import { useRouter } from "vue-router/composables";
import { SchoolYearQueryType } from "@/serverApi/v3";

type Tab = "current" | "next" | "archive";

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

		const router = useRouter();

		const { t } = useI18n();

		const activeTab: WritableComputedRef<string> = computed({
			get: () => props.tab,
			set: () => ({}),
		});

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
			await groupModule.loadClassesForSchool(schoolYearQueryType.value);

			await router.replace({ query: { ...router.currentRoute.query, tab } });
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
				value: "studentCount",
				text: "Schüler:innen",
				sortable: true,
			},
			{
				value: "actions",
				text: "",
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

		const onUpdateSortBy = async (sortBy: string) => {
			groupModule.setSortBy(sortBy);

			await groupModule.loadClassesForSchool(schoolYearQueryType.value);
		};
		const updateSortOrder = async (sortDesc: boolean) => {
			const sortOrder = sortDesc ? SortOrder.DESC : SortOrder.ASC;
			groupModule.setSortOrder(sortOrder);

			await groupModule.loadClassesForSchool(schoolYearQueryType.value);
		};
		const onUpdateCurrentPage = async (currentPage: number) => {
			groupModule.setPage(currentPage);
			const skip = (currentPage - 1) * groupModule.getPagination.limit;
			groupModule.setPagination({ ...pagination.value, skip });

			await groupModule.loadClassesForSchool(schoolYearQueryType.value);
		};
		const onUpdateItemsPerPage = async (itemsPerPage: number) => {
			groupModule.setPagination({ ...pagination.value, limit: itemsPerPage });

			await groupModule.loadClassesForSchool(schoolYearQueryType.value);
		};

		onMounted(() => {
			onTabsChange(activeTab.value);
		});

		const getInstituteTitle: ComputedRef<string> = computed(() => {
			switch (process.env.SC_THEME) {
				case "n21":
					return "Landesinitiative n-21: Schulen in Niedersachsen online e.V.";
				case "thr":
					return "Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien";
				case "brb":
					return "Dataport";
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
			updateSortOrder,
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
