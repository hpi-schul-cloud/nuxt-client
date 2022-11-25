<template>
	<v-list
		data-test-id="status-alerts"
		min-width="250"
		max-height="200"
		class="alerts"
		elevation="2"
		rounded
	>
		<v-list-item
			v-for="(item, index) in statusAlerts"
			:key="index"
			:data-test-id="`alert-item-${index}`"
			three-line
			class="px-2"
		>
			<v-list-item-avatar size="24" class="mt-6">
				<v-icon :color="`var(--v-${getIconTag(item.status).color}-base)`">
					{{ getIconTag(item.status).icon }}
				</v-icon>
			</v-list-item-avatar>
			<v-list-item-content class="pb-0">
				<v-list-item-subtitle
					class="text-right text-caption"
					:data-test-id="`alert-date-${index}`"
				>
					{{ getDate(item.timestamp) }}
				</v-list-item-subtitle>
				<v-list-item-title :data-test-id="`alert-title-${index}`">
					{{ item.title }}
				</v-list-item-title>
				<v-list-item-subtitle :data-test-id="`alert-text-${index}`">
					{{ getAlertText(item.text) }}
				</v-list-item-subtitle>
				<div class="text-right text-subtitle-2">
					<a
						:href="item.url"
						rel="noopener"
						target="_blank"
						:data-test-id="`alert-link-${index}`"
					>
						{{ prettifiedUrl(item.url) }}
					</a>
				</div>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { fromNow } from "@plugins/datetime";
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

		const getAlertText = (text: string) => {
			if (text.length > 200) {
				return `${text.substring(0, 200)}...`;
			}
			return text;
		};

		const prettifiedUrl = (url: string) => {
			return url.replace(/(^\w+:|^)\/\//, "");
		};

		const getDate = (date: string) => {
			return fromNow(date, true);
		};

		return { getIconTag, getAlertText, prettifiedUrl, getDate };
	},
});
</script>

<style lang="scss" scoped>
@import "../../../node_modules/vuetify/src/styles/styles";
@import "@styles";

.alerts {
	width: auto;
	max-width: 250px;
	overflow-y: auto;

	@include breakpoint(tablet) {
		width: 400px;
		max-width: 400px;
	}
}
</style>
