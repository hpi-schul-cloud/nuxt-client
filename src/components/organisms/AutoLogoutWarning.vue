<template>
	<base-modal v-model:active="active">
		<template #body>
			<div class="wrapper">
				<img
					:src="getImage"
					class="sloth"
					role="presentation"
					:alt="$t('components.organisms.AutoLogoutWarning.image.alt')"
				/>
				<p v-if="error" class="sloth-text">
					{{ $t("components.organisms.AutoLogoutWarning.error") }}
				</p>
				<p v-else class="sloth-text">
					<i18n-t
						keypath="components.organisms.AutoLogoutWarning.warning"
						scope="global"
					>
						<span class="text-error">
							{{
								$t(
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
				<v-btn color="primary" variant="flat" @click="extendSession">
					{{ $t("components.organisms.AutoLogoutWarning.confirm") }}
				</v-btn>
			</div>
		</template>
	</base-modal>
</template>

<script lang="ts" setup>
import { useAutoLogout } from "@/store/autoLogout.composable";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

const { t } = useI18n();

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const {
	jwtTimerDisabled,
	remainingTimeInSeconds,
	remainingTimeInMinutes,
	showWarningOnRemainingSeconds,
	active,
	error,
	extendSession,
	initSession,
} = useAutoLogout();

const getImage = computed(() => {
	if (error.value)
		return "https://s3.hidrive.strato.com/cloud-instances/images/Sloth_error.svg";
	return "https://s3.hidrive.strato.com/cloud-instances/images/Sloth.svg";
});

onMounted(() => {
	initSession();
});

const showToast = (state: number) => {
	switch (state) {
		case toast.success:
			notifierModule.show({
				text: t("components.organisms.AutoLogoutWarning.success"),
				status: "success",
				timeout: 5000,
			});
			break;

		case toast.error:
			notifierModule.show({
				text: t("components.organisms.AutoLogoutWarning.error.retry"),
				status: "error",
				timeout: 5000,
			});
			break;

		case toast.error401:
			notifierModule.show({
				text: t("components.organisms.AutoLogoutWarning.error.401"),
				status: "error",
				timeout: 5000,
			});
			break;

		default:
			break;
	}
};
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
