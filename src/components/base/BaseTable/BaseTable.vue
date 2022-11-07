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
		<template #[`item.lastChanged`]="{ item }">{{
			timesAgo(item.lastChanged)
		}}</template>
	</v-data-table>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { I18nUtil } from "@utils/i18n-util";
import moment from "moment/moment";
import { inject, useRouter } from "@nuxtjs/composition-api";
import VueRouter from "vue-router";
import { BaseTableItem } from "@basecomponents/BaseTable/BaseTableItem";
import VueI18n from "vue-i18n";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	props: {
		items: {
			type: Array,
			required: false,
			default: () => [],
		},
		headers: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
	setup() {
		const router: VueRouter = useRouter();
		const i18nLib = inject<VueI18n>("i18n");
		const i18nUtil: I18nUtil = new I18nUtil(i18nLib);
		const locale = () => i18nUtil.locale();

		const timesAgo = function (value: Date): string {
			if (!value) return "";
			return moment(value).locale(locale()).fromNow();
		};

		const click = function (item: BaseTableItem): void {
			router.push({ path: item.path });
		};

		return { click, timesAgo };
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
