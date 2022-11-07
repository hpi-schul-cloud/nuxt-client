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
	FilesPage,
	getFilesPageFromCategory,
	getHeaders,
	mapFileToFileTableItem,
} from "@pages/files/file-table-utils";
import VueI18n, { Locale } from "vue-i18n";
import moment from "moment/moment";
import VueRouter, { Route } from "vue-router";
import { ChangeLanguageParamsLanguageEnum } from "@/serverApi/v3";

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
		const i18n = inject<VueI18n>("i18n");
		const t = (key: string) => {
			const translateResult = i18n?.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const headers: DataTableHeader[] = getHeaders(t);

		const items: ComputedRef<FileTableItem[]> = computed(() => {
			return filesModule.getFiles.map((file: File) => {
				return mapFileToFileTableItem(file, t);
			});
		});

		const route: Route = useRoute().value;
		const filesPage: FilesPage = getFilesPageFromCategory(t, route);

		const title: Ref<string> = ref(filesPage.title);
		const breadcrumbs: Ref<Breadcrumb[]> = ref(filesPage.breadcumbs);

		const locale = (): Locale => {
			if (i18n?.locale === ChangeLanguageParamsLanguageEnum.Ua) {
				return "uk"; // TODO https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes use everywhere uk (language code)
			}
			return i18n?.locale || "de";
		};

		const timesAgo = function (value: Date): string {
			if (!value) return "";
			return moment(value).locale(locale()).fromNow();
		};

		const router: VueRouter = useRouter();
		const click = function (item: FileTableItem): void {
			router.push({ path: item.path });
		};

		onMounted(async () => {
			await filesPage.loadFilesFunction();
		});

		return { items, headers, breadcrumbs, title, click, timesAgo };
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
