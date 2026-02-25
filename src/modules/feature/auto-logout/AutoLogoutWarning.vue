<template>
	<SvsDialog
		v-model="showDialog"
		title="feature-autoLogout.button.title"
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
			<img :src="image" class="w-75 d-block mx-auto" role="presentation" alt="" />
		</template>
	</SvsDialog>
</template>

<script lang="ts" setup>
import { useAutoLogout } from "../auto-logout/autoLogout.composable";
import { SessionStatus } from "../auto-logout/types";
import SlothSvg from "@/assets/img/logout/Sloth.svg";
import SlothErrorSvg from "@/assets/img/logout/Sloth_error.svg";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();

const { remainingTimeInMinutes, showDialog, errorOnExtend, sessionStatus, extendSession, createSession } =
	useAutoLogout();

const image = computed(() => {
	if (errorOnExtend.value) return SlothErrorSvg;
	return SlothSvg;
});

const isSessionEnded = computed(() => sessionStatus.value === SessionStatus.Ended);

const confirmButtonKey = computed(() =>
	isSessionEnded.value ? "feature-autoLogout.button.confirm.returnToLogin" : "feature-autoLogout.button.confirm"
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
