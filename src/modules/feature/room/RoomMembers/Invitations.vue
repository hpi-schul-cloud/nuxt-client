<template>
	<p data-testid="info-text">
		{{ t("pages.rooms.members.tab.invitations.infoText") }}
	</p>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
