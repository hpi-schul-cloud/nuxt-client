<template>
	<InfoAlert
		v-if="showBannerForThr"
		class="my-4"
		data-testid="admin-class-info-alert"
		alert-title="pages.administration.classes.thr.hint.title"
	>
		{{ t("pages.administration.classes.thr.hint.text") }}
	</InfoAlert>
</template>
<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { InfoAlert } from "@ui-alert";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const showBannerForThr = computed(() => useEnvConfig().value.SC_THEME === "thr");
</script>
