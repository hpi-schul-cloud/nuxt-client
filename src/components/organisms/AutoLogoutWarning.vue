<template>
	<base-modal v-model:active="active">
		<template #body>
			<div class="wrapper">
				<img
					:src="getImage"
					class="sloth"
					role="presentation"
					:alt="t('components.organisms.AutoLogoutWarning.image.alt')"
				/>
				<p v-if="errorOnExtend" class="sloth-text">
					{{ t("components.organisms.AutoLogoutWarning.error") }}
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
				<v-btn color="primary" variant="flat" @click="handleConfirm">
					{{ confirmButtonText }}
				</v-btn>
			</div>
		</template>
	</base-modal>
</template>

<script lang="ts" setup>
import { useAutoLogout } from "@/store/autoLogout.composable";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import SlothSvg from "@/assets/img/logout/Sloth.svg";
import SlothErrorSvg from "@/assets/img/logout/Sloth_error.svg";
import { useRouter } from "vue-router";

const router = useRouter();

const { t } = useI18n();

const {
	remainingTimeInMinutes,
	active,
	errorOnExtend,
	remainingTimeInSeconds,
	sessionStatus,
	extendSession,
	initSession,
} = useAutoLogout();

const getImage = computed(() => {
	if (errorOnExtend.value) return SlothErrorSvg;
	return SlothSvg;
});

const confirmButtonText = computed(() => {
	if (errorOnExtend.value || sessionStatus.value === "ended")
		return "Return to login page";
	return t("components.organisms.AutoLogoutWarning.confirm");
});

const handleConfirm = () => {
	if (errorOnExtend.value || sessionStatus.value === "ended") {
		router.push("/login");
	} else {
		extendSession();
	}
};

onMounted(() => {
	initSession();
});
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
