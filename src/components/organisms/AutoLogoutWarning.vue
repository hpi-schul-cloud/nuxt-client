<template>
	<base-modal v-model:active="showDialog">
		<template #body>
			<div class="wrapper">
				<img
					:src="image"
					class="sloth"
					role="presentation"
					:alt="t('components.organisms.AutoLogoutWarning.image.alt')"
				/>
				<p v-if="isSessionEnded" class="sloth-text">
					{{ t("components.organisms.AutoLogoutWarning.error.401") }}
				</p>
				<p v-else class="sloth-text">
					<i18n-t
						keypath="components.organisms.AutoLogoutWarning.warning"
						scope="global"
					>
						<span class="text-error">
							{{
								t(
									"components.organisms.AutoLogoutWarning.warning.remainingTime",
									remainingTimeInMinutes,
									{
										named: { remainingTime: remainingTimeInMinutes },
									}
								)
							}}
						</span>
					</i18n-t>
				</p>
			</div>
		</template>
		<template #footer>
			<div class="d-flex justify-center align-center mb-4">
				<v-btn color="primary" variant="flat" @click="onConfirm">
					{{ confirmButtonText }}
				</v-btn>
			</div>
		</template>
	</base-modal>
</template>

<script lang="ts" setup>
import { SessionStatus, useAutoLogout } from "@/store/autoLogout.composable";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import SlothSvg from "@/assets/img/logout/Sloth.svg";
import SlothErrorSvg from "@/assets/img/logout/Sloth_error.svg";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();

const {
	remainingTimeInMinutes,
	showDialog,
	errorOnExtend,
	remainingTimeInSeconds,
	sessionStatus,
	extendSession,
	createSession,
} = useAutoLogout();

const image = computed(() => {
	if (errorOnExtend.value) return SlothErrorSvg;
	return SlothSvg;
});

const isSessionEnded = computed(() => {
	return sessionStatus.value === SessionStatus.Ended;
});

const confirmButtonText = computed(() => {
	if (isSessionEnded.value) return "Return to login page";
	return t("components.organisms.AutoLogoutWarning.confirm");
});

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
@import "@/styles/mixins";

.wrapper {
	width: 100%;
	height: 100%;
	text-align: center;

	.sloth {
		display: inline-block;
		width: 35%;
		min-width: 150px;
		vertical-align: top;
		opacity: 0.9;

		@include breakpoint(tablet) {
			float: right;
		}
	}

	.sloth-text {
		display: inline-block;
		width: 100%;
		font-size: var(--text-lg);

		@include breakpoint(tablet) {
			width: 60%;
			margin-top: var(--space-xl-4);
			text-align: left;
			vertical-align: middle;
		}
	}
}
</style>
