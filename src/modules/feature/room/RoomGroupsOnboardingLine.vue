<template>
	<div class="room-groups-onboarding" data-testid="room-groups-onboarding">
		<!-- Optional guidance stays out of the live region and keeps its actions beside the explanation. -->
		<h2 class="text-body-1 font-weight-bold mb-1">{{ t("pages.rooms.groups.onboarding.title") }}</h2>
		<p class="room-groups-onboarding-text text-body-2 text-medium-emphasis mb-3">
			{{ t("pages.rooms.groups.onboarding.text") }}
		</p>
		<div class="room-groups-onboarding-actions d-flex flex-wrap ga-2">
			<VBtn
				variant="tonal"
				color="primary"
				min-height="44"
				:prepend-icon="mdiPlus"
				:disabled="disabled"
				data-testid="room-groups-onboarding-add"
				@click="emit('add')"
			>
				{{ t("pages.rooms.groups.add") }}
			</VBtn>
			<VBtn
				variant="text"
				min-height="44"
				class="font-weight-regular"
				data-testid="room-groups-onboarding-dismiss"
				@click="emit('dismiss')"
			>
				{{ t("pages.rooms.groups.onboarding.dismiss") }}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { mdiPlus } from "@icons/material";
import { useI18n } from "vue-i18n";

withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false });

const emit = defineEmits<{
	add: [];
	dismiss: [];
}>();

const { t } = useI18n();
</script>

<style scoped>
.room-groups-onboarding-text {
	max-inline-size: 65ch;
	line-height: 1.5;
}

.room-groups-onboarding-actions :deep(.v-btn) {
	max-inline-size: 100%;
	height: auto;
	white-space: normal;
}

.room-groups-onboarding-actions :deep(.v-btn__content) {
	min-inline-size: 0;
	overflow-wrap: anywhere;
}
</style>
