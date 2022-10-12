<template>
	<v-card
		min-width="250"
		max-height="200"
		class="alerts"
		data-testid="status-alerts"
	>
		<div
			v-for="(item, index) in statusAlerts"
			:key="index"
			class="alert-item"
			:data-testid="`alert-item-${index}`"
		>
			<v-card-text class="py-2">
				<div class="top-row-container">
					<div class="alert-title" :data-testid="`alert-title-${index}`">
						<v-icon :color="`var(--v-${getIconTag(item.status).color}-base)`">
							{{ getIconTag(item.status).icon }}
						</v-icon>
						{{ item.title }}
					</div>
					<div
						class="alert-date text--primary mt-1 mb-0 pb-0"
						:data-testid="`alert-date-${index}`"
					>
						{{ getDate(item.timestamp) }}
					</div>
				</div>
				<div class="alert-text" :data-testid="`alert-text-${index}`">
					{{ getAlertText(item.text) }}
				</div>
				<div class="alert-link">
					<a
						:href="item.url"
						rel="noopener"
						target="_blank"
						class="action-button"
						:data-testid="`alert-link-${index}`"
					>
						{{ getUrl(item.url) }}
					</a>
				</div>
			</v-card-text>
		</div>
	</v-card>
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

		const getUrl = (url: string) => {
			return url.replace(/(^\w+:|^)\/\//, "");
		};

		const getDate = (date: string) => {
			return fromNow(date, true);
		};

		return { getIconTag, getAlertText, getUrl, getDate };
	},
});
</script>

<style lang="scss" scoped>
@import "../../../node_modules/vuetify/src/styles/styles";
@import "@styles";

.alerts {
	width: auto;
	overflow-y: auto;

	@include breakpoint(tablet) {
		width: 400px;
	}
}

.action-button {
	color: var(--color-primary);
}

.alert-item:not(:first-child) {
	padding-top: var(--space-xs-4);
	margin-top: var(--space-xs-4);
	border-top: solid 1px var(--color-gray-light);
}

.top-row-container {
	display: grid;
	grid-template-columns: 75% 25%;
	align-items: center;

	.alert-title {
		margin-bottom: var(--space-xs-2);
		font-size: var(--text-md);
		line-height: var(--line-height-md);
		text-align: left;
	}

	.alert-date {
		align-self: start;
		color: var(--color-gray);
		text-align: right;
	}
}

.alert-link {
	text-align: right;
}
</style>
