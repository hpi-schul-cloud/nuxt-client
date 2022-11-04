<template>
	<default-wireframe :full-width="true">
		<h1>{{ $t("pages.files.overview.headline") }}</h1>
		<base-file-table :items="items" :headers="headers"></base-file-table>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DefaultWireframe, { Breadcrumb } from "@components/templates/DefaultWireframe.vue";
import { i18n } from "../../utils/i18n-util";
import BaseFileTable from "@basecomponents/BaseTable/BaseTable.vue";
import { FileTableItem } from "@pages/files/file-table-item";
import { DataTableHeader } from "vuetify";
import { authModule, filesModule } from "@/store";
import { computed, ComputedRef, onMounted, Ref, ref, useRoute } from "@nuxtjs/composition-api";
import { File } from "@store/types/file";
import { getDeepBreadcumbs, getFileCategory, mapFileToFileTableItem } from "@pages/files/file-table-utils";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  components: { BaseFileTable, DefaultWireframe },
  beforeRouteEnter(to, from, next) {
    if (authModule.getUserPermissions.includes("collaborative_files")) {
      next();
    } else {
      next("/dashboard");
    }
  },
  setup() {
    const { t } = i18n();
    const { path, params } = useRoute().value;

    const title: Ref<string> = ref(t("pages.files.overview.headline"));

    const breadcrumbs: Ref<Breadcrumb[]> = ref([]);

    const headers: DataTableHeader[] = [
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

    const items: ComputedRef<FileTableItem[]> = computed(() => {
      return filesModule.getFiles.map(
          (file: File) => {
            return mapFileToFileTableItem(file, t);
          }
      );
    });

    const pathArray: string[] = path.split("/").filter((element: string) => element !== "");
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
          const paramsArray: string[] = params.catchAll.split("/").filter((element: string) => element !== "");
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
            ...deepBreadcrumbs
          ];

          loadFilesFunc = async () => filesModule.fetchTeamFiles(teamsPath);
        }
        break;
      }
      default: {
        break;
      }
    }

    onMounted(async () => {
      await loadFilesFunc();
    });

		return { items, headers };
	},
});
</script>
