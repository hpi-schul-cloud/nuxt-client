<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.confirmations.infoText") }}
	</p>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
