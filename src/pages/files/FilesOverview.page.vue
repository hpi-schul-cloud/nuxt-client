<template>
  <default-wireframe :full-width="true">
    <h1>{{ $t("pages.files.headline") }}</h1>
    <v-data-table :items="data" :headers="headers">
      <template #[`item.icon`]="{ item }">
        <base-icon source="material" :icon="item.icon.name" :fill="item.icon.colored ? 'var(--v-primary-base)' : 'var(--v-secondary-base)'"></base-icon>
      </template>
      <template #[`item.lastChanged`]="{ item }">
        <p>{{ timesAgo(item.lastChanged) }}</p>
      </template>
    </v-data-table>
  </default-wireframe>
</template>

<script lang="ts">
import { DataTableHeader } from "vuetify";
import { defineComponent } from "@vue/composition-api";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import data from "./data";
import { i18n } from "../../utils/i18n-util";
import moment from "moment/moment";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  components: { DefaultWireframe },
  setup() {
    const { t, locale } = i18n();

    const headers: DataTableHeader[] = [
      { text: "", value: "icon", sortable: false },
      { text: t("common.labels.name"), value: "name", class: "primary--text" },
      { text: t("common.labels.size"), value: "size", class: "primary--text", align: "end" },
      { text: t("common.labels.changed"), value: "lastChanged", class: "primary--text", align: "end" }
    ];

    const timesAgo = function (value: Date) {
      if (!value) return '';
      return moment(value).locale(locale()).fromNow();
    }

    return { headers, data, timesAgo };
  }
});
</script>
