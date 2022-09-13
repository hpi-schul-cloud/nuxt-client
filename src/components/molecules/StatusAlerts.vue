<template>
	<div>
		<v-card width="400" max-height="200" class="alerts" data-testid="status-alerts">
			<div
				v-for="(item, index) in statusAlerts"
				:key="index"
				class="alert-item"
				:data-testid="`alert-item${index}`"
			>
				<v-card-text class="">
					<div class="top-row-container">
						<div class="alert-title" :data-testid="`alert-title${index}`">
							<base-icon
								:fill="`var(--color-${getIconTag(item.status).color})`"
								source="fa"
								:icon="getIconTag(item.status).icon"
							/>
							{{ item.title }}
						</div>
						<div class="alert-date text--primary mt-1 mb-0 pb-0" :data-testid="`alert-date${index}`">
							{{ getDate(item.timestamp) }}
						</div>
					</div>
					<div class="alert-text" :data-testid="`alert-text${index}`">
						{{ getAlertText(item.text) }}
					</div>
					<div class="alert-link">
						<a
							:href="item.url"
							rel="noopener"
							target="_blank"
							class="action-button"
							:data-testid="`alert-link${index}`"
						>
							{{ getUrl(item.url) }}
						</a>
					</div>
				</v-card-text>
			</div>
		</v-card>
	</div>
</template>

<script>
import { timeAgo } from "@plugins/datetime";

export default {
	props: {
		statusAlerts: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	mounted() {},
	methods: {
		getIconTag(status) {
			switch (status) {
				case "danger":
					return { icon: "exclamation-circle", color: "danger" };
				case "done":
					return { icon: "check-circle", color: "success" };
				default:
					return { icon: "info-circle", color: "info" };
			}
		},
		getAlertText(text) {
			if (text.length > 200) {
				return `${text.substring(0, 200)}...`;
			}
			return text;
		},
		getUrl(url) {
			return url.replace(/(^\w+:|^)\/\//, "");
		},
		getDate(date) {
			return timeAgo(date);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/vuetify/src/styles/styles";
@import "@styles";

.alerts {
	overflow-y: auto;
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
