<template>
	<SvsDialog
		v-model="showDialog"
		:title="t('feature-autoLogout.button.title')"
		no-cancel
		persistent
		:confirm-btn-lang-key="'feature-autoLogout.button.confirm'"
		@confirm="extendSession"
	>
		<template #content>
			<WarningAlert class="sloth-text">
				<i18n-t keypath="feature-autoLogout.warning" scope="global">
					<span class="text-error">
						{{
							t("feature-autoLogout.warning.remainingTime", remainingTimeInMinutes, {
								named: { remainingTime: remainingTimeInMinutes },
							})
						}}
					</span>
				</i18n-t>
			</WarningAlert>
			<img :src="SlothSvg" class="w-75 d-block mx-auto" alt="" />
		</template>
	</SvsDialog>
</template>

<script lang="ts" setup>
import SlothSvg from "@/assets/img/logout/Sloth.svg";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { logger } from "@util-logger";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const DEFAULT_WARNING_SECONDS = 1 * 60 * 60; // 1 hour
const { JWT_SHOW_TIMEOUT_WARNING_SECONDS } = useEnvConfig().value;
const WARNING_THRESHOLD = JWT_SHOW_TIMEOUT_WARNING_SECONDS || DEFAULT_WARNING_SECONDS;

const remainingTimeInSeconds = ref(0);
const remainingTimeInMinutes = computed(() => Math.ceil(remainingTimeInSeconds.value / 60));

const { t } = useI18n();

const router = useRouter();
const showDialog = ref(false);

const { autoLogout, extendSession, startTimer, stopTimer } = useAppStore();
const { sessionTimeoutTimestamp } = useAppStoreRefs();

const regularChecks = () => {
	if (sessionTimeoutTimestamp.value === null || sessionTimeoutTimestamp.value < 0) {
		logger.warn("timer not running");
		return;
	}

	const timeleft = Math.max(sessionTimeoutTimestamp.value - Date.now(), 0);
	remainingTimeInSeconds.value = Math.ceil(timeleft / 1000);

	if (Date.now() >= sessionTimeoutTimestamp.value) {
		logger.warn("Session timeout time was set but is already in the past.", sessionTimeoutTimestamp.value);
		stopTimer();
		autoLogout();
		return;
	}

	showDialog.value = remainingTimeInSeconds.value <= WARNING_THRESHOLD;
};

// reset the timer whenever the route changes, if the user is logged in
watch(() => router.currentRoute.value, startTimer, { immediate: true });

setInterval(regularChecks, 1000);
</script>

<style lang="scss" scoped>
@use "@/styles/settings.scss" as *;

.sloth-text {
	font-size: var(--text-md);
}
</style>
