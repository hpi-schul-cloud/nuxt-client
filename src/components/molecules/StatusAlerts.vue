<template>
	<v-list
		data-test-id="status-alerts"
		min-width="250"
		max-height="400"
		class="alerts pa-0 rounded"
		elevation="2"
	>
		<v-list-item
			v-for="(item, index) in statusAlerts"
			:key="index"
			:data-test-id="`alert-item-${index}`"
			class="alert-item"
		>
			<v-list-item-icon class="mt-3 mr-3">
				<v-icon :color="`var(--v-${getIconTag(item.status).color}-base)`">
					{{ getIconTag(item.status).icon }}
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title
					:data-test-id="`alert-title-${index}`"
					class="subtitle-1 ma-0"
				>
					{{ item.title }}
				</v-list-item-title>
				<v-list-item-subtitle
					:data-test-id="`alert-text-${index}`"
					class="subtitle-2 text--primary ma-0 mt-1"
				>
					{{ item.text }}
				</v-list-item-subtitle>
				<v-list-item-subtitle
					class="text-left text-caption d-flex flex-row alert-date text--secondary mt-0 mt-2"
					:data-test-id="`alert-date-${index}`"
				>
					{{ $t("common.labels.updateAt") }}
					{{ getDate(item.timestamp) }} |
					{{ $t("common.labels.createAt") }}
					{{ getCreatedDate(item.createdAt) }}
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { printDateTime, fromNow } from "../../plugins/datetime";
import { mdiAlertCircle, mdiInformation } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "StatusAlerts",
	props: {
		statusAlerts: {
			type: Array,
			default: () => [],
		},
	},
	setup() {
		const getIconTag = (status: string) => {
			return status === "danger"
				? { icon: mdiAlertCircle, color: "error" }
				: { icon: mdiInformation, color: "info" };
		};

		const getDate = (date: string) => {
			return fromNow(date, true);
		};
		const getCreatedDate = (dateTime: string) => {
			return printDateTime(dateTime);
		};

		return { getIconTag, getDate, getCreatedDate };
	},
});
</script>

<style lang="scss" scoped>
@import "../../../node_modules/vuetify/src/styles/styles";
@import "@/styles/mixins";

.alerts {
	width: auto;
	max-width: 250px;
	max-height: 400px;
	overflow-y: auto;
	@include breakpoint(tablet) {
		width: 400px;
		max-width: 400px;
	}
	.alert-item {
		border-top: 1px solid var(--v-grey-lighten2);
		&:first-child {
			border-top: none;
		}
	}
	.subtitle-1 {
		overflow: visible;
		text-overflow: clip;
		white-space: normal;
	}
	.subtitle-2 {
		overflow: unset;
		text-overflow: unset;
		white-space: unset;
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
