<template>
	<default-wireframe :breadcrumbs="breadcrumbs" :full-width="true">
		<h1>{{ title }}</h1>
		<v-data-table
			:disable-pagination="true"
			:hide-default-footer="true"
			:items="items"
			:headers="headers"
			@click:row="click"
		>
			<template #[`item.icon`]="{ item }">
				<base-icon
					source="material"
					:icon="item.icon.name"
					:fill="
						item.icon.colored
							? 'var(--v-primary-base)'
							: 'var(--v-secondary-base)'
					"
				></base-icon>
			</template>
			<template #[`item.lastChanged`]="{ item }"
				>{{ timesAgo(item.lastChanged) }}
			</template>
		</v-data-table>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DefaultWireframe, {
	Breadcrumb,
} from "@components/templates/DefaultWireframe.vue";
import { FileTableItem } from "@pages/files/file-table-item";
import { DataTableHeader } from "vuetify";
import { authModule, filesModule } from "@/store";
import {
	computed,
	ComputedRef,
	inject,
	onMounted,
	Ref,
	ref,
	useRoute,
	useRouter,
} from "@nuxtjs/composition-api";
import { File } from "@store/types/file";
import {
	getDeepBreadcumbs,
	getFileCategory,
	mapFileToFileTableItem,
} from "@pages/files/file-table-utils";
import VueI18n from "vue-i18n";
import { I18nUtil } from "@utils/i18n-util";
import moment from "moment/moment";
import VueRouter from "vue-router";

function getHeaders(t: (key: string) => string) {
	return [
		{ text: "", value: "icon", sortable: false, width: 5 },
		{
			text: t("common.labels.name"),
			value: "name",
			class: "primary--text",
			cellClass: "primary--text",
		},
		{
			text: t("common.labels.size"),
			value: "size",
			class: "primary--text",
			width: "110",
		},
		{
			text: t("common.labels.changed"),
			value: "lastChanged",
			class: "primary--text",
			width: "140",
		},
	];
}

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	components: { DefaultWireframe },
	beforeRouteEnter(to, from, next) {
		if (authModule.getUserPermissions.includes("collaborative_files")) {
			next();
		} else {
			next("/dashboard");
		}
	},
	setup() {
		const i18nLib = inject<VueI18n>("i18n");
		const i18nUtil: I18nUtil = new I18nUtil(i18nLib);
		const t = (key: string) => i18nUtil.t(key);

		const { path, params } = useRoute().value;

		const title: Ref<string> = ref(t("pages.files.overview.headline"));

		const breadcrumbs: Ref<Breadcrumb[]> = ref([]);

		const headers: DataTableHeader[] = getHeaders(t);

		const items: ComputedRef<FileTableItem[]> = computed(() => {
			return filesModule.getFiles.map((file: File) => {
				return mapFileToFileTableItem(file, t);
			});
		});

		const pathArray: string[] = path
			.split("/")
			.filter((element: string) => element !== "");
		const currentCategory: string = getFileCategory(pathArray);
		let loadFilesFunc: () => Promise<void> = async (): Promise<void> => {};

		switch (currentCategory) {
			case "cfiles": {
				title.value = t("pages.files.overview.headline");

				loadFilesFunc = async () => filesModule.fetchFilesOverview();
				break;
			}
			case "teams": {
				if (pathArray.length == 2) {
					title.value = t("pages.files.overview.teamFiles");
					breadcrumbs.value = [
						{
							text: t("pages.files.overview.headline"),
							to: "/cfiles/",
						},
					];

					loadFilesFunc = async () => filesModule.fetchTeams();
				} else {
					const paramsArray: string[] = params.catchAll
						.split("/")
						.filter((element: string) => element !== "");
					const teamsPath: string = path.replace("/cfiles/teams", "");

					title.value = paramsArray.slice(-1)[0];

					const deepBreadcrumbs: Breadcrumb[] = getDeepBreadcumbs(paramsArray);
					breadcrumbs.value = [
						{
							text: t("pages.files.overview.headline"),
							to: "/cfiles/",
						},
						{
							text: t("pages.files.overview.teamFiles"),
							to: "/cfiles/teams",
						},
						...deepBreadcrumbs,
					];

					loadFilesFunc = async () => filesModule.fetchTeamFiles(teamsPath);
				}
				break;
			}
			default:
				{
					break;
				}
				const router: VueRouter = useRouter();
				const locale = () => i18nUtil.locale();
				const timesAgo = function (value: Date): string {
					if (!value) return "";
					return moment(value).locale(locale()).fromNow();
				};

				const click = function (item: FileTableItem): void {
					router.push({ path: item.path });
				};

				return { click, timesAgo };
		}

		onMounted(async () => {
			await loadFilesFunc();
		});

		return { items, headers, breadcrumbs, title };
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
