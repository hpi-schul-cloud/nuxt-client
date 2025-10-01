<template>
	<VList
		data-testid="status-alerts"
		min-width="250"
		max-height="400"
		class="alerts pa-0 rounded"
		lines="three"
	>
		<template v-for="(item, index) in statusAlerts" :key="index">
			<VListItem :data-test-id="`alert-item-${index}`" class="alert-item">
				<template #prepend>
					<VIcon :color="getIcon(item.status).color" class="item-icon">
						{{ getIcon(item.status).icon }}
					</VIcon>
				</template>
				<VListItemTitle
					:data-testid="`alert-title-${index}`"
					class="item-title ma-0"
				>
					{{ item.title }}
				</VListItemTitle>
				<VListItemSubtitle
					:data-testid="`alert-text-${index}`"
					class="item-subtitle ma-0 mt-1"
				>
					{{ item.text }}
				</VListItemSubtitle>
				<VListItemSubtitle
					class="text-left text-caption d-flex flex-row alert-date mt-0 mt-2"
					:data-testid="`alert-date-${index}`"
				>
					<template v-if="item.timestamp !== item.createdAt">
						{{ $t("common.labels.updateAt") }}
						{{ formatDate(item.timestamp) }} |
					</template>
					{{ $t("common.labels.createAt") }} {{ formatDate(item.createdAt) }}
				</VListItemSubtitle>
			</VListItem>
			<VDivider />
		</template>
	</VList>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { formatDateForAlerts } from "@/plugins/datetime";
import { mdiAlertCircle, mdiInformation } from "@icons/material";
import { StatusAlert } from "@/store/types/status-alert";

defineProps({
	statusAlerts: {
		type: Array as PropType<StatusAlert[]>,
		default: () => [],
	},
});

const getIcon = (status: string) => {
	return status === "danger"
		? { icon: mdiAlertCircle, color: "error" }
		: { icon: mdiInformation, color: "info" };
};

const formatDate = (dateTime: string) => formatDateForAlerts(dateTime, true);
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.alerts {
	width: auto;
	max-width: 250px;
	max-height: 400px;
	overflow-y: auto;

	@media #{map.get($display-breakpoints, 'sm-and-up')} {
		width: 400px;
		max-width: 400px;
	}

	.alert-item {
		:deep(.v-list-item__prepend) {
			align-self: start;
			padding-top: 0;
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
