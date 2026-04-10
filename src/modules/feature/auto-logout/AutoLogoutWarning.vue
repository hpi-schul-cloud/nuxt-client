<template>
	<SvsDialog
		v-model="showDialog"
		:title="dialogTitle"
		no-cancel
		persistent
		:confirm-btn-lang-key="confirmButtonKey"
		@confirm="onConfirm"
	>
		<template #content>
			<WarningAlert class="sloth-text">
				<span v-if="isSessionEnded">
					{{ t("feature-autoLogout.message.error.401") }}
				</span>
				<i18n-t v-else keypath="feature-autoLogout.warning" scope="global">
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
import { useAutoLogout } from "../auto-logout/autoLogout.composable";
import SlothSvg from "@/assets/img/logout/Sloth.svg";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { SessionState } from "@util-broadcast-channel";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();

const { remainingTimeInMinutes, showDialog, sessionState, extendSession, createSession } = useAutoLogout();

const isSessionEnded = computed(() => sessionState.value === SessionState.Expired);

const confirmButtonKey = computed(() =>
	isSessionEnded.value ? "feature-autoLogout.button.confirm.returnToLogin" : "feature-autoLogout.button.confirm"
);

const dialogTitle = computed(() =>
	isSessionEnded.value ? "feature-loggedout.title" : "feature-autoLogout.button.title"
);

const onConfirm = () => {
	if (isSessionEnded.value) {
		router.push("/login");
		return;
	}

	extendSession();
};

watch(
	() => router.currentRoute.value,
	(newVal) => {
		if (newVal) {
			createSession();
		}
	},
	{ immediate: true }
);
</script>

<style lang="scss" scoped>
@use "@/styles/settings.scss" as *;

.sloth-text {
	font-size: var(--text-md);
}
</style>
