<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.confirmations.infoText") }}
	</p>
	<div class="mb-12 mt-8">
		<ConfirmationTable :header-bottom="headerBottom" :show-select="true" />
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ConfirmationTable } from "@feature-room";

defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
});

const { t } = useI18n();
</script>
