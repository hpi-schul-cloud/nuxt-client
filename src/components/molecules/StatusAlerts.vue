<template>
	<v-list
		data-test-id="status-alerts"
		min-width="250"
		max-height="400"
		class="alerts pa-0"
		elevation="2"
		style="border-radius: 4px"
	>
		<v-list-item
			v-for="(item, index) in statusAlerts"
			:key="index"
			:data-test-id="`alert-item-${index}`"
			class="alert-item"
			:style="{
				'border-top': index === 0 ? 'none' : '1px solid #e5e5e5',
			}"
		>
			<v-list-item-icon class="mt-3 mr-3">
				<v-icon :color="`var(--v-${getIconTag(item.status).color}-base)`">
					{{ getIconTag(item.status).icon }}
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title
					:data-test-id="`alert-title-${index}`"
					style="overflow: visible; text-overflow: clip; white-space: normal"
					class="subtitle-1 ma-0"
				>
					{{ item.title }}
				</v-list-item-title>
				<v-list-item-subtitle
					:data-test-id="`alert-text-${index}`"
					style="
						overflow: unset;
						text-overflow: unset;
						white-space: unset;
						display: flex;
						flex-wrap: wrap;
					"
					class="subtitle-2 text--primary ma-0 mt-1"
				>
					{{ item.text }}
				</v-list-item-subtitle>
				<v-list-item-subtitle
					class="text-left text-caption d-flex flex-row alert-date text--secondary mt-0 mt-2"
					:data-test-id="`alert-date-${index}`"
					style="font-size: 14px"
				>
					Updated: {{ getDate(item.timestamp) }} | Created:
					{{ getCreatedDate(item.created_at) }}
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { createdDate, fromNow } from "@/plugins/datetime";
import { mdiAlertCircle, mdiInformation, mdiCheckCircle } from "@mdi/js";

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
			switch (status) {
				case "danger":
					return { icon: mdiAlertCircle, color: "error" };
				case "done":
					return { icon: mdiCheckCircle, color: "success" };
				default:
					return { icon: mdiInformation, color: "info" };
			}
		};

		const getDate = (date: string) => {
			return fromNow(date, true);
		};
		const getCreatedDate = (dateTime: string) => {
			return createdDate(dateTime, true);
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
	border-radius: 4px;
	@include breakpoint(tablet) {
		width: 400px;
		max-width: 400px;
	}
}
</style>
