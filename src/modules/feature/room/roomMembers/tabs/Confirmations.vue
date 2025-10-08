<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.confirmations.infoText") }}
	</p>
	<div class="mb-12">
		<ConfirmationTable :header-bottom="headerBottom" :show-select="true" />
	</div>
</template>

<script setup lang="ts">
import { ConfirmationTable } from "@feature-room";
import { useI18n } from "vue-i18n";

defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
});

const { t } = useI18n();
</script>
