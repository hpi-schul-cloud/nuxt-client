<template>
	<room-base-card
		:title="t('pages.videoConference.title')"
		:logo-url="logoUrl"
		test-id="vc-card"
		@click="onClick"
	>
		<template #right>
			<div v-if="isRunning && hasPermission" class="pulsating-dot my-auto" />
		</template>
		<template #footer>
			<div
				v-show="!isRunning && !canStart"
				class="mt-2"
				data-testId="vc-info-box-show"
			>
				<v-alert
					density="compact"
					class="ma-0"
					type="info"
					data-testId="vc-info-box"
				>
					<div class="d-flex flex-wrap gap-4">
						<span class="flex-1 my-auto">
							{{
								hasPermission
									? t("pages.videoConference.info.notStarted")
									: t("pages.videoConference.info.noPermission")
							}}
						</span>
						<v-btn
							class="my-auto"
							variant="outlined"
							:disabled="isRefreshing"
							data-testId="refresh-btn"
							:aria-label="t('pages.videoConference.action.refresh')"
							@click.stop="refreshVideoConferenceStatus"
						>
							<v-icon size="small" class="mr-1">{{ mdiReload }}</v-icon>
							{{ t("pages.videoConference.action.refresh") }}
						</v-btn>
					</div>
				</v-alert>
			</div>
		</template>
	</room-base-card>
</template>

<script setup lang="ts">
import noPermissionImg from "@/assets/img/bbb/no_permission.png";
import availableImg from "@/assets/img/bbb/available.png";
import notStartedImg from "@/assets/img/bbb/not_started.png";
import { mdiReload } from "@icons/material";
import { computed, ComputedRef } from "vue";
import RoomBaseCard from "./RoomBaseCard.vue";
import { useI18n } from "vue-i18n";

type Props = {
	isRunning: boolean;
	hasPermission: boolean;
	canStart: boolean;
	isRefreshing: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "click"): void;
	(e: "refresh"): void;
}>();

const { t } = useI18n();

const refreshVideoConferenceStatus = () => {
	emit("refresh");
};

const onClick = () => {
	emit("click");
};

const logoUrl: ComputedRef<string> = computed(() => {
	if (!props.hasPermission) {
		return noPermissionImg;
	} else if (props.isRunning) {
		return availableImg;
	}

	return notStartedImg;
});
</script>

<style lang="scss" scoped>
.v-alert {
	:deep(.v-icon) {
		margin-top: auto;
		margin-bottom: auto;
	}
}

.gap-4 {
	gap: 4px;
}

.flex-1 {
	flex: 1;
}

$pulseIconColor: #15ba97;

.pulsating-dot {
	background: $pulseIconColor;
	border-radius: 50%;
	height: 20px;
	width: 20px;
	margin: 10px;
	box-shadow: 0 0 0 0 $pulseIconColor;
	transform: scale(1);
	animation: pulse 1.5s infinite;

	@keyframes pulse {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 $pulseIconColor;
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
}
</style>
