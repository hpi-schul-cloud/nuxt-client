<template>
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
    <template #[`item.lastChanged`]="{ item }">{{ timesAgo(item.lastChanged) }}</template>
  </v-data-table>
</template>

<script lang="ts">
import { DataTableHeader } from "vuetify";
import { defineComponent } from "@vue/composition-api";
import { i18n } from "../../utils/i18n-util";
import moment from "moment/moment";
import { FileTableItem } from "./data";
import { useRouter } from "@nuxtjs/composition-api";
import VueRouter from "vue-router";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  setup() {
    const router: VueRouter = useRouter();
    const { t, locale } = i18n();

    const headers: DataTableHeader[] = [
      { text: "", value: "icon", sortable: false, width: 5 },
      { text: t("common.labels.name"), value: "name", class: "primary--text", cellClass: "primary--text" },
      {
        text: t("common.labels.size"),
        value: "size",
        class: "primary--text",
        width: "94",
      },
      {
        text: t("common.labels.changed"),
        value: "lastChanged",
        class: "primary--text",
        width: "140",
      },
    ];

    const timesAgo = function (value: Date): string {
      if (!value) return "";
      return moment(value).locale(locale()).fromNow();
    };

    const click = function (item: FileTableItem): void {
      router.push({ path: item.path });
    };

    return { headers, click, timesAgo };
  },
});
</script>

<style lang="scss" scoped>
$arrow-offset: 8px;

.v-data-table /deep/ th i {
  margin-left: $arrow-offset;
}

.v-data-table /deep/ td {
  cursor: pointer;
}
</style>
