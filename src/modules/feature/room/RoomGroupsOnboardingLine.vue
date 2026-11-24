<template>
	<div class="room-groups-onboarding d-flex flex-wrap align-center column-gap-2" data-testid="room-groups-onboarding">
		<!-- A quiet line instead of an alert: the hint is optional and must not be announced as urgent. -->
		<span class="room-groups-onboarding-text text-body-2 text-medium-emphasis">
			{{ t("pages.rooms.groups.onboarding.text") }}
		</span>
		<span class="d-inline-flex flex-wrap">
			<VBtn
				variant="text"
				color="primary"
				height="40"
				:prepend-icon="mdiPlus"
				:disabled="disabled"
				data-testid="room-groups-onboarding-add"
				@click="emit('add')"
			>
				{{ t("pages.rooms.groups.add") }}
			</VBtn>
			<VBtn variant="text" height="40" data-testid="room-groups-onboarding-dismiss" @click="emit('dismiss')">
				{{ t("pages.rooms.groups.onboarding.dismiss") }}
			</VBtn>
		</span>
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
	line-height: 1.5;
}
</style>
