<template>
	<v-list
		data-testid="status-alerts"
		min-width="250"
		max-height="400"
		class="alerts pa-0 rounded"
		elevation="2"
	>
		<v-list-item
			v-for="(item, index) in statusAlerts"
			:key="index"
			:data-test-id="`alert-item-${index}`"
			class="alert-item py-2"
		>
			<template v-slot:prepend>
				<v-icon
					:color="`rgba(var(--v-theme-${getIconTag(item.status).color}))`"
					class="item-icon"
				>
					{{ getIconTag(item.status).icon }}
				</v-icon>
			</template>
			<v-list-item-title
				:data-testid="`alert-title-${index}`"
				class="item-title ma-0"
			>
				{{ item.title }}
			</v-list-item-title>
			<v-list-item-subtitle
				:data-testid="`alert-text-${index}`"
				class="item-subtitle text-black ma-0 mt-1"
			>
				{{ item.text }}
			</v-list-item-subtitle>
			<v-list-item-subtitle
				class="text-left text-caption d-flex flex-row alert-date text-black mt-0 mt-2"
				:data-testid="`alert-date-${index}`"
			>
				<template v-if="item.timestamp !== item.createdAt">
					{{ $t("common.labels.updateAt") }}
					{{ formatDate(item.timestamp) }} |
				</template>
				{{ $t("common.labels.createAt") }} {{ formatDate(item.createdAt) }}
			</v-list-item-subtitle>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { formatDateForAlerts } from "../../plugins/datetime";
import { mdiAlertCircle, mdiInformation } from "@mdi/js";
import { StatusAlert } from "@/store/types/status-alert";

export default defineComponent({
	name: "StatusAlerts",
	props: {
		statusAlerts: {
			type: Array as PropType<StatusAlert[]>,
			default: () => [],
		},
	},
	setup() {
		const getIconTag = (status: string) => {
			return status === "danger"
				? { icon: mdiAlertCircle, color: "error" }
				: { icon: mdiInformation, color: "info" };
		};

		const formatDate = (dateTime: string) => {
			return formatDateForAlerts(dateTime, true);
		};

		return { getIconTag, formatDate };
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";
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
		border-top: 1px solid map-get($grey, lighten-2);
		&:first-child {
			border-top: none;
		}

		:deep(.v-list-item__prepend) {
			align-self: start;
		}
	}

	.item-icon {
		opacity: unset;
	}

	.item-title {
		overflow: visible;
		text-overflow: clip;
		white-space: normal;
		word-break: break-word;
		line-height: 1rem;
	}
	.item-subtitle {
		overflow: unset;
		text-overflow: unset;
		white-space: unset;
		display: flex;
		flex-wrap: wrap;
		word-break: break-word;
	}
}
</style>
